import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../../assets/images/smallLogo.png';
import { Input } from '../Input/Input';
import { SearchIcon } from '../Icons/SearchIcon';
import { useAppSelector } from '../../hooks/redux';
import { HeaderSettings } from './HeaderSettings';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [placeholderText, setPlaceholderText] = useState(`${t('device_name_or_ID')}`);
  const { isDark, role } = useAppSelector((state) => state.globalReducer);

  const activeStyle = {
    fontWeight: '700',
    color: '#ADEBFF',
    borderBottom: '3px solid #1487F2',
    transition: 'all .2s',
  };

  useEffect(() => {
    let mainPath = pathname.substring(1);

    if (mainPath.indexOf('/')) {
      mainPath = mainPath.split('/')[0];
    }

    if (mainPath)
      switch (mainPath) {
        case 'devices':
          setPlaceholderText(`${t('device_name_or_ID')}`);
          break;
        case 'distributors':
          setPlaceholderText(`${t('full_name_of_the_distributor')}`);
          break;
        case 'integrators':
          setPlaceholderText(`${t('full_name_of_the_integrator')}`);
          break;
        case 'users':
          setPlaceholderText(`${t('full_name_of_the_user')}`);
          break;
        default:
          setPlaceholderText(`${t('device_name_or_ID')}`);
          break;
      }
  }, [pathname, t]);

  useEffect(() => {
    document.body.setAttribute('color-theme', !isDark ? 'light' : 'dark');
  }, [isDark]);

  const onInputChange = (e: string) => {
    // dispatch(clientSettingsActions.setSearchString(e));
  };

  return (
    <div className={styles.wrapper}>
      <img src={Logo} width="27" height="27" alt="EVO logo" />
      <>
        <Input
          beforeIcon={<SearchIcon />}
          placeholder={placeholderText}
          containerClassName={styles.inputHeader}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <div className={styles.wrapperSectionToggle}>
          <NavLink
            to="/devices"
            end
            className={styles.section}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            {t('devices')}
          </NavLink>
          {role === 'admin' && (
            <NavLink
              to="/distributors"
              end
              className={styles.section}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              {t('distributors')}
            </NavLink>
          )}
          {(role === 'distributor' || role === 'admin') && (
            <NavLink
              to="/integrators"
              end
              className={styles.section}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              {t('integrators')}
            </NavLink>
          )}
          {role !== 'user' && (
            <NavLink
              to="/users"
              className={styles.section}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              {t('users')}
            </NavLink>
          )}
        </div>
      </>
      <HeaderSettings />
    </div>
  );
};
