import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../../assets/images/smallLogo.png';
import { Input } from '../Input/Input';
import { SearchIcon } from '../Icons/SearchIcon';
import { useAppSelector } from '../../hooks/redux';
import { HeaderSettings } from './HeaderSettings';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

export const Header = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [placeholderText, setPlaceholderText] = useState(`${t('device_name_or_ID')}`);
  const { isDark, role } = useAppSelector((state) => state.globalReducer);
  const [activeLink, setActiveLink] = useState(0);
  const [isReverse, setIsRevers] = useState(true);

  // const activeStyle = {
  //   fontWeight: '700',
  //   color: '#ADEBFF',
  //   borderBottom: '3px solid #1487F2',
  //   transition: 'all .2s',
  // };

  useEffect(() => {
    let mainPath = pathname.substring(1);

    if (mainPath.indexOf('/')) {
      mainPath = mainPath.split('/')[0];
    }

    if (mainPath)
      switch (mainPath) {
        case 'devices':
          setPlaceholderText(`${t('device_name_or_ID')}`);
          setActiveLink(1);
          break;
        case 'distributors':
          setPlaceholderText(`${t('full_name_of_the_distributor')}`);
          setActiveLink(2);
          break;
        case 'integrators':
          setPlaceholderText(`${t('full_name_of_the_integrator')}`);
          setActiveLink(3);
          break;
        case 'users':
          setPlaceholderText(`${t('full_name_of_the_user')}`);
          setActiveLink(4);
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
      <form autoComplete="off">
        <Input
          beforeIcon={<SearchIcon />}
          placeholder={placeholderText}
          containerClassName={styles.containerInputHeader}
          className={styles.inputHeader}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </form>
      <div className={styles.wrapperSectionToggle}>
        <NavLink
          to="/devices"
          end
          className={classNames(
            styles.section,
            activeLink === 1 && styles.activeSection,
            isReverse && activeLink === 1 && styles.reverseAnimation,
          )}
          onClick={() => {
            setActiveLink(1);
            !isReverse && setIsRevers(true);
          }}
        >
          {t('devices')}
        </NavLink>
        {role === 'admin' && (
          <NavLink
            to="/distributors"
            end
            className={classNames(
              styles.section,
              activeLink === 2 && styles.activeSection,
              isReverse && activeLink === 2 && styles.reverseAnimation,
            )}
            onClick={() => {
              if (activeLink > 2) {
                setIsRevers(true);
              } else setIsRevers(false);
              setActiveLink(2);
            }}
          >
            {t('distributors')}
          </NavLink>
        )}
        {(role === 'distributor' || role === 'admin') && (
          <NavLink
            to="/integrators"
            end
            className={classNames(
              styles.section,
              activeLink === 3 && styles.activeSection,
              isReverse && activeLink === 3 && styles.reverseAnimation,
            )}
            onClick={() => {
              if (activeLink > 3) {
                setIsRevers(true);
              } else setIsRevers(false);
              setActiveLink(3);
            }}
          >
            {t('integrators')}
          </NavLink>
        )}
        {role !== 'user' && (
          <NavLink
            to="/users"
            className={classNames(
              styles.section,
              activeLink === 4 && styles.activeSection,
              isReverse && activeLink === 4 && styles.reverseAnimation,
            )}
            onClick={() => {
              isReverse && setIsRevers(false);
              setActiveLink(4);
            }}
          >
            {t('users')}
          </NavLink>
        )}
      </div>
      <HeaderSettings />
    </div>
  );
};
