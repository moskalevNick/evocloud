import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../../assets/images/logo.png';
import { Input } from '../Input/Input';
import { SearchIcon } from '../Icons/SearchIcon';
import { ArrowLeftIcon } from '../Icons/ArrowLeftIcon';
import { FullScreenIcon } from '../Icons/FullScreenIcon';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalSettingActions } from '../../redux/global/reducer';
import { HeaderSettings } from './HeaderSettings';
import { imagesActions } from '../../redux/images/actions';
import { clientSettingsActions } from '../../redux/clients/reducers';
import { Loader } from '../Loader/Loader';
import { useTranslation } from 'react-i18next';
import { yesterdayEndDay, yesterdayStartDay } from '../../helpers/constants';
import { clientActions } from '../../redux/clients/actions';

export const Header = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const [isOpenSearchInput, setOpenSearchInput] = useState(false);
  const [placeholderText, setPlaceholderText] = useState(`${t('device_name_or_ID')}`);
  const isOpenFullScreenCamera = useAppSelector(
    (state) => state.globalReducer.isFullScreenCameraOpen,
  );
  const { isDark } = useAppSelector((state) => state.globalReducer);
  const { cameraToken } = useAppSelector((state) => state.globalReducer);
  const cameraView = useAppSelector((state) => state.imageReducer.cameraFrame);

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
  }, [pathname]);

  useEffect(() => {
    document.body.setAttribute('color-theme', !isDark ? 'light' : 'dark');
  }, [isDark]);

  // useEffect(() => {
  //   if (i18n.resolvedLanguage === 'ru') {
  //     setPlaceholderText('Название уст-ва или ID');
  //   } else setPlaceholderText('Device name or ID');
  // }, [i18n.resolvedLanguage]);

  const onInputChange = (e: string) => {
    dispatch(clientSettingsActions.setSearchString(e));
  };

  const setYesterday = () => {
    const dateForServer = {
      startDate: yesterdayStartDay.toISOString(),
      endDate: yesterdayEndDay.toISOString(),
    };
    dispatch(clientSettingsActions.setFilterDate(dateForServer));
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
          <NavLink
            to="/users"
            className={styles.section}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            {t('users')}
          </NavLink>
        </div>
      </>
      <HeaderSettings />
    </div>
  );
};
