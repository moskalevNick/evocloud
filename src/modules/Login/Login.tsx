import React, { useLayoutEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/images/logo.png';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { ControlWrapperForm } from '../../components/ControlWrapper/ControlWrapperForm';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ToggleSwitch } from '../../components/ToggleSwitch/ToggleSwitch';
import styles from './Login.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalActions } from '../../redux/global/actions';
import { Loader } from '../../components/Loader/Loader';
import { LanguageSelect } from '../../components/LanguageSelect/LanguageSelect';
import { EyeIcon } from '../../components/Icons/EyeIcon';
import { CrossEyeIcon } from '../../components/Icons/CrossEyeIcon';

type FormType = {
  username: string;
  password: string;
  isRemember: boolean;
};

const defaultValues: FormType = {
  username: '',
  password: '',
  isRemember: false,
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const [isRemember, setRemember] = useState(true);
  const [loginError, setLoginError] = useState(false);
  const [isShowPassword, showPassword] = useState(false);
  const [isDark, setDark] = useState(true);
  const { isLoading } = useAppSelector((state) => state.globalReducer);
  const { t } = useTranslation();

  const methods = useForm<FormType>({
    mode: 'onChange',
    defaultValues,
  });

  useLayoutEffect(() => {
    document.body.setAttribute('color-theme', !isDark ? 'light' : 'dark');
  }, [isDark]);

  const { handleSubmit, watch } = methods;

  let formData = watch();

  const login = () => {
    formData = { ...formData, isRemember: isRemember };
    if (formData.username && formData.password) {
      dispatch(globalActions.login(formData));
    } else {
      setLoginError(true);
    }
  };

  const submit = handleSubmit(login);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <img src={Logo} width="238" height="34" alt="EVO logo" className={styles.logo} />
        <FormProvider {...methods}>
          <form noValidate onSubmit={submit} autoComplete="off">
            <ControlWrapperForm label={t('login')} name="username" error={loginError}>
              <Input placeholder={t('enter_your_login') as string} autocomplete="on" />
            </ControlWrapperForm>
            <ControlWrapperForm label={t('password')} name="password" error={loginError}>
              <Input
                placeholder={t('enter_your_password') as string}
                type={isShowPassword ? 'text' : 'password'}
                autocomplete="on"
                afterIcon={
                  <div onClick={() => showPassword((prev) => !prev)}>
                    {isShowPassword ? <EyeIcon /> : <CrossEyeIcon />}
                  </div>
                }
              />
            </ControlWrapperForm>
            {loginError && <ErrorMessage msg={t('wrong_login_or_password')} />}
            <div className={styles.buttonsContainer}>
              <span className={styles.checkbox}>
                <Checkbox
                  checked={isRemember}
                  onChange={() => setRemember((prev) => !prev)}
                  label={<div className={styles.label}>{t('remember')}</div>}
                />
              </span>
              <Button className={styles.button} type="submit">
                {t('log_in')}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
      <div className={styles.wrapperToggleEng}>
        <LanguageSelect />
      </div>
      <div className={styles.sign}>DESIGNED BY EVO CONTROLS</div>
      <div className={styles.wrapperToggleTheme}>
        <ToggleSwitch
          checked={isDark}
          onChange={() => {
            setDark((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};
