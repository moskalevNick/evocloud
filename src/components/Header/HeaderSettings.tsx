import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Header.module.css';
import { LogoIcon } from '../Icons/LogoIcon';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';
import { Button } from '../Button/Button';
import { LogoutIcon } from '../Icons/LogoutIcon';
import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalActions } from '../../redux/global/actions';
import { useTranslation } from 'react-i18next';
import { ProfileIcon } from '../Icons/ProfileIcon';
import { userActions } from '../../redux/user/actions';
import { getStatusIcon } from '../../helpers/getStatusIcon';
import { AvatarIcon } from '../Icons/AvatarIcon';
import { Input } from '../Input/Input';
import { EyeIcon } from '../Icons/EyeIcon';
import { CrossEyeIcon } from '../Icons/CrossEyeIcon';
import { StopIcon } from '../Icons/StopIcon';

type HeaderSettingsType = {};

export const HeaderSettings: React.FC<HeaderSettingsType> = () => {
  const { isDark, userId } = useAppSelector((state) => state.globalReducer);
  const { currentUser } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [isOpenBadge, setOpenBadge] = useState(false);
  const [isOpenSettingModal, setOpenSettingModal] = useState(false);
  const [isOpenLogautModal, setOpenLogoutModal] = useState(false);
  const [isShowPassword, showPassword] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [passwordRepeatInputValue, setPasswordRepeatInputValue] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(true);
  const [isShowPasswordRepeat, showPasswordRepeat] = useState(false);
  const [phoneValue, setPhoneValue] = useState(currentUser?.phone || '');
  const [emailValue, setEmailValue] = useState(currentUser?.email || '');
  const refBadge = useRef<HTMLHeadingElement>(null);
  const refAvatar = useRef<HTMLHeadingElement>(null);
  const { t } = useTranslation();
  const { id } = useParams();

  const handleClickOutside = useCallback((e: any) => {
    if (refBadge.current !== null && refAvatar.current !== null) {
      if (!refBadge.current.contains(e.target) && !refAvatar.current.contains(e.target)) {
        setOpenBadge(false);
      }
    } else return;
  }, []);

  useEffect(() => {
    if (passwordInputValue && passwordRepeatInputValue) {
      if (passwordInputValue !== passwordRepeatInputValue) {
        setPasswordMismatch(true);
      } else setPasswordMismatch(false);
    } else setPasswordMismatch(false);
  }, [passwordInputValue, passwordRepeatInputValue]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
  }, [handleClickOutside]);

  useEffect(() => {
    if (userId && !currentUser && !id) {
      dispatch(userActions.getCurrentUser(userId));
    }
  }, [userId, currentUser, dispatch, id]);

  useEffect(() => {
    if (currentUser) {
      setPhoneValue(currentUser.phone);
      setEmailValue(currentUser.email);
    }
  }, [currentUser]);

  const openBadge = () => {
    if (userId) {
      dispatch(userActions.getCurrentUser(userId));
    }
    setOpenBadge((prev) => !prev);
  };

  const logout = async () => {
    await dispatch(globalActions.logout());
    // setOpenLogoutModal(false);
  };

  // const submit = () => {
  //   dispatch(
  //     globalActions.editSettings({
  //       isRus: i18n.resolvedLanguage === 'ru',
  //     }),
  //   );

  //   setOpenSettingModal(false);
  // };

  const changeTheme = () => {
    dispatch(
      globalActions.editSettings({
        isDark: !isDark,
      }),
    );
  };

  const closeProfileModal = () => {
    setOpenSettingModal(false);
    if (currentUser) {
      setPhoneValue(currentUser.phone);
      setEmailValue(currentUser.email);
    }
  };

  const sendSMS = () => {
    console.log('new password: ', passwordRepeatInputValue);
  };

  const submit = () => {
    if (userId) {
      const newUserForServer = {
        password: passwordInputValue,
        email: emailValue,
        phone: phoneValue,
      };

      dispatch(userActions.editUser({ newUser: newUserForServer, id: userId.toString() }));
    }
    setOpenSettingModal(false);
  };

  return (
    <>
      <div className={styles.settingsContainer}>
        <div
          className={styles.avatarContainer}
          ref={refAvatar}
          onClick={openBadge}
          // onMouseEnter={() => !isOpenBadge && setOpenBadge(true)}
        >
          <LogoIcon />
          <div className={styles.avatarHeader}>EVO Electronics</div>
        </div>
        {isOpenBadge && (
          <div className={styles.badge} ref={refBadge}>
            {/* <div className={styles.toggleThemeContainer}>
              <ToggleSwitch checked={isDark} onChange={changeTheme} />
              <div className={styles.toggleLabel}>
                {isDark ? t('dark_theme') : t('light_theme')}
              </div>
            </div> */}
            <Button
              className={styles.badgeButton}
              onClick={() => {
                setOpenSettingModal(true);
              }}
              beforeIcon={<ProfileIcon />}
            >
              <p className={styles.buttonLabel}>{t('profile')}</p>
            </Button>
            <Button
              className={styles.badgeButton}
              onClick={() => {
                setOpenLogoutModal(true);
              }}
              beforeIcon={<LogoutIcon />}
            >
              <p className={styles.buttonLabel}>{t('exit')}</p>
            </Button>
          </div>
        )}
      </div>
      <Modal
        onClose={closeProfileModal}
        open={isOpenSettingModal}
        className={styles.modalSettings}
        label={t('profile') as string}
      >
        {currentUser && (
          <>
            <div className={styles.profileNameWrapper}>
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={`avatar ${currentUser.name}`} />
              ) : (
                <AvatarIcon />
              )}
              <div>
                <div className={styles.profileName}>{currentUser.name}</div>
                <div className={styles.status}>{getStatusIcon(currentUser.group_id, t)}</div>
              </div>
            </div>
            <hr className={styles.line} />
            <div className={styles.emailPhoneContainer}>
              <div>
                <div className={styles.phoneLabel}>{t('phone_number')}</div>
                <Input
                  className={styles.phoneInput}
                  placeholder={t('phone_number') as string}
                  value={phoneValue}
                  onChange={(e) => setPhoneValue(e.target.value)}
                />
              </div>
              <div>
                <div className={styles.emailLabel}>{'e-mail'}</div>
                <Input
                  className={styles.emailInput}
                  placeholder={'e-mail'}
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </div>
            </div>
            <hr className={styles.line} />
            <div className={styles.passwordsContainer}>
              <div className={styles.inputWrapper}>
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
              </div>
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
              <Button
                className={styles.sendSMSButton}
                onClick={sendSMS}
                disabled={
                  passwordMismatch || passwordInputValue === '' || passwordRepeatInputValue === ''
                }
              >
                {t('send_sms')}
              </Button>
            </div>
            <hr className={styles.downLine} />
            <Button className={styles.submitButton} onClick={submit}>
              {t('save')}
            </Button>
          </>
        )}
      </Modal>
      <Modal
        onClose={() => setOpenLogoutModal(false)}
        open={isOpenLogautModal}
        className={styles.modalLogout}
        label={t('log_out') as string}
      >
        <div className={styles.contentWrapperLogout}>
          <div className={styles.contentLogout}>{t('are_you_sure_you_want_to_log_out')}</div>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.cancelButton}
              outlined
              onClick={() => setOpenLogoutModal(false)}
            >
              {t('cancel')}
            </Button>
            <Button className={styles.logoutButton} onClick={logout}>
              {t('log_out_2')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
