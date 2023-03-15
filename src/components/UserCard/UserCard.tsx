import styles from './UserCard.module.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { t } from 'i18next';
import { PlusIcon } from '../Icons/PlusIcon';
import { EditIconActive } from '../Icons/EditIconActive';
import { AvatarIcon } from '../Icons/AvatarIcon';
import { EyeIcon } from '../Icons/EyeIcon';
import { CrossEyeIcon } from '../Icons/CrossEyeIcon';
import { StopIcon } from '../Icons/StopIcon';
import { userActions } from '../../redux/user/actions';
import { userSettingsActions } from '../../redux/user/reducers';

export const UserCard = () => {
  const { currentUser } = useAppSelector((state) => state.userReducer);
  const [isShowPassword, showPassword] = useState(false);
  const [isShowPasswordRepeat, showPasswordRepeat] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(true);

  const [currentRole, setCurrentRole] = useState('user');
  const [nameInputValue, setNameInputValue] = useState(currentUser?.name || '');
  const [loginInputValue, setLoginInputValue] = useState(currentUser?.login || '');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [passwordRepeatInputValue, setPasswordRepeatInputValue] = useState('');
  const [emailInputValue, setEmailInputValue] = useState(currentUser?.email || '');
  const [phoneInputValue, setPhoneInputValue] = useState(currentUser?.phone || '');

  const isUserClassnames = classNames(
    styles.isAdminButton,
    currentRole === 'user' && styles.activeButton,
  );
  const isIntegratorClassnames = classNames(
    styles.isAdminButton,
    currentRole === 'integrator' && styles.activeButton,
  );
  const isDistributorClassnames = classNames(
    styles.isAdminButton,
    currentRole === 'distributor' && styles.activeButton,
  );
  const isAdminClassnames = classNames(
    styles.isAdminButton,
    currentRole === 'administrator' && styles.activeButton,
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id && id !== 'new') {
      dispatch(userActions.getCurrentUser(Number(id)));
    } else if (id === 'new') {
      dispatch(userSettingsActions.clearCurrentUser());
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentUser && id !== 'new') {
      setNameInputValue(currentUser.name);
      setLoginInputValue(currentUser.login);
      setEmailInputValue(currentUser.email);
      setPhoneInputValue(currentUser.phone);
      switch (currentUser.group_id) {
        case '1':
          setCurrentRole('administrator');
          break;
        case '2':
          setCurrentRole('integrator');
          break;
        case '3':
          setCurrentRole('distributor');
          break;
        case '6':
        default:
          break;
      }
    } else if (!currentUser) {
      setCurrentRole('user');
      setNameInputValue('');
      setLoginInputValue('');
      setEmailInputValue('');
      setPhoneInputValue('');
    }
  }, [currentUser, id]);

  useEffect(() => {
    const resetCurrentUser = () => {
      dispatch(userSettingsActions.clearCurrentUser());
    };
    return resetCurrentUser();
  }, [dispatch]);

  useEffect(() => {
    if (passwordInputValue && passwordRepeatInputValue) {
      if (passwordInputValue !== passwordRepeatInputValue) {
        setPasswordMismatch(true);
      } else setPasswordMismatch(false);
    } else setPasswordMismatch(false);
  }, [passwordInputValue, passwordRepeatInputValue]);

  const onSubmit = () => {
    if (!id) {
      navigate('/users');
    }

    let groupId;

    switch (currentRole) {
      case 'administrator':
        groupId = '1';
        break;
      case 'integrator':
        groupId = '2';
        break;
      case 'distributor':
        groupId = '3';
        break;
      default:
        groupId = '6';
        break;
    }

    const newUserForServer = {
      group_id: groupId,
      login: loginInputValue,
      password: passwordInputValue,
      name: nameInputValue,
      email: emailInputValue,
      phone: phoneInputValue,
    };

    if (id === 'new') {
      dispatch(userActions.addUser(newUserForServer));
    }

    if (id && id !== 'new') {
      dispatch(userActions.editUser({ newUser: newUserForServer, id }));
    }
    onClose();
  };

  const onClose = () => {
    navigate(-1);
  };

  // const cancelAddingClient = () => {
  //   if (id === 'new') {
  //     dispatch(clientActions.deleteClient(client.id));
  //   }
  //   onClose();
  // };

  return (
    <>
      <div className={styles.userCardHeaderContainer}>
        <div className={styles.modalHeader}>
          {id === 'new' ? (
            <>
              <PlusIcon fill={'#148EF8'} />

              {t('new_user')}
            </>
          ) : (
            <>
              <EditIconActive />
              {t('edit_user_data')}
            </>
          )}
        </div>
      </div>
      <div className={styles.horizontalLine} />
      <div className={styles.userMainDataContainer}>
        <div className={styles.userAvatar}>
          {currentUser && currentUser.avatar ? (
            <img src={currentUser.avatar} alt={`avatar ${currentUser.name}`} />
          ) : (
            <AvatarIcon />
          )}
        </div>
        <div className={styles.isAdminWrapper}>
          <button className={isUserClassnames} onClick={() => setCurrentRole('user')}>
            {t('user')}
          </button>
          <button className={isIntegratorClassnames} onClick={() => setCurrentRole('integrator')}>
            {t('integrator')}
          </button>
          <button className={isDistributorClassnames} onClick={() => setCurrentRole('distributor')}>
            {t('distributor')}
          </button>
          <button className={isAdminClassnames} onClick={() => setCurrentRole('administrator')}>
            {t('administrator')}
          </button>
        </div>
      </div>
      <div className={styles.horizontalFullLine} />
      <div className={styles.userDataContainer}>
        <div className={styles.modalHeader}>{t('user_data')}</div>
        <div className={styles.inputsContainer}>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>{t('full_name_of_the_user')}</div>
            <Input
              placeholder={(t('enter_2') + t('full_name_of_the_user')) as string}
              value={nameInputValue}
              onChange={(e) => setNameInputValue(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>{t('login')}</div>
            <Input
              placeholder={(t('enter_2') + t('login')) as string}
              value={loginInputValue}
              onChange={(e) => setLoginInputValue(e.target.value)}
            />
          </div>
          <form className={styles.inputWrapper} autoComplete="off">
            <div className={styles.inputLabel}>{t('password')}</div>
            <Input
              placeholder={(t('enter_2') + t('password')) as string}
              type={isShowPassword ? 'text' : 'password'}
              afterIcon={
                <div onClick={() => showPassword((prev) => !prev)}>
                  {isShowPassword ? <EyeIcon /> : <CrossEyeIcon />}
                </div>
              }
              value={passwordInputValue}
              onChange={(e) => setPasswordInputValue(e.target.value)}
              hasError={passwordMismatch}
            />
            {passwordMismatch && (
              <div className={styles.errorWrapper}>
                <StopIcon />
                <span className={styles.errorLabel}>{t('passwords_mismatch')}</span>
              </div>
            )}
          </form>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>{t('repeat_password')}</div>
            <Input
              placeholder={(t('enter_2') + t('password')) as string}
              type={isShowPasswordRepeat ? 'text' : 'password'}
              afterIcon={
                <div onClick={() => showPasswordRepeat((prev) => !prev)}>
                  {isShowPasswordRepeat ? <EyeIcon /> : <CrossEyeIcon />}
                </div>
              }
              value={passwordRepeatInputValue}
              onChange={(e) => setPasswordRepeatInputValue(e.target.value)}
              hasError={passwordMismatch}
            />
            {passwordMismatch && (
              <div className={styles.errorWrapper}>
                <StopIcon />
                <span className={styles.errorLabel}>{t('passwords_mismatch')}</span>
              </div>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>E-mail</div>
            <Input
              placeholder={(t('enter_2') + 'E-mail') as string}
              value={emailInputValue}
              onChange={(e) => setEmailInputValue(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>{t('phone_number')}</div>
            <Input
              placeholder={(t('enter_2') + t('phone_number')) as string}
              value={phoneInputValue}
              onChange={(e) => setPhoneInputValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className={styles.horizontalFullLine} />
      <div>
        <div className={styles.submitButtonsWrapper}>
          <Button outlined className={styles.submitButton} onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button className={styles.submitButton} onClick={onSubmit} disabled={passwordMismatch}>
            {t('save')}
          </Button>
        </div>
      </div>
    </>
  );
};
