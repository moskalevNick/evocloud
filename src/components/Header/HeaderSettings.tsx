import React, { useCallback, useEffect, useRef, useState } from 'react';
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

type HeaderSettingsType = {};

export const HeaderSettings: React.FC<HeaderSettingsType> = () => {
  const dispatch = useAppDispatch();
  const [isOpenBadge, setOpenBadge] = useState(false);
  const [isOpenSettingModal, setOpenSettingModal] = useState(false);
  const [isOpenLogautModal, setOpenLogoutModal] = useState(false);
  const { isDark } = useAppSelector((state) => state.globalReducer);
  const refBadge = useRef<HTMLHeadingElement>(null);
  const refAvatar = useRef<HTMLHeadingElement>(null);
  const { t } = useTranslation();

  const handleClickOutside = useCallback((e: any) => {
    if (refBadge.current !== null && refAvatar.current !== null) {
      if (!refBadge.current.contains(e.target) && !refAvatar.current.contains(e.target)) {
        setOpenBadge(false);
      }
    } else return;
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
  }, [handleClickOutside]);

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

  return (
    <>
      <div className={styles.settingsContainer}>
        <div
          className={styles.avatarContainer}
          ref={refAvatar}
          onClick={() => setOpenBadge((prev) => !prev)}
          // onMouseEnter={() => !isOpenBadge && setOpenBadge(true)}
        >
          <LogoIcon />
          <div className={styles.avatarHeader}>EVO Electronics</div>
        </div>
        {isOpenBadge && (
          <div className={styles.badge} ref={refBadge}>
            <div className={styles.toggleThemeContainer}>
              <ToggleSwitch checked={isDark} onChange={changeTheme} />
              <div className={styles.toggleLabel}>
                {isDark ? t('dark_theme') : t('light_theme')}
              </div>
            </div>
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
        onClose={() => setOpenSettingModal(false)}
        open={isOpenSettingModal}
        className={styles.modalSettings}
        label={t('settings') as string}
      ></Modal>

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
