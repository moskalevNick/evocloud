import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../components/Button/Button';
import { CardContainer } from '../../components/CardContainer/CardContainer';

import { PlusIcon } from '../../components/Icons/PlusIcon';

import styles from './Devices.module.css';
import { clientActions } from '../../redux/clients/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loader } from '../../components/Loader/Loader';
import { CloudFilters } from '../../components/CloudFilters';
import { clientSettingsActions } from '../../redux/clients/reducers';
import { yesterdayEndDay, yesterdayStartDay } from '../../helpers/constants';
import { visitSettingsActions } from '../../redux/visit/reducers';
import { exisSettingsActions } from '../../redux/exis/reducers';
import { useTranslation } from 'react-i18next';
import { ArrowDownIcon } from '../../components/Icons/ArrowDown';

export const DevicesModule = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  // const { id } = useParams();
  const { t } = useTranslation();

  // const { isFullScreenCameraOpen } = useAppSelector((state) => state.globalReducer);
  // const { clients, isLoading, isClientLoading, filters } = useAppSelector(
  //   (state) => state.clientReducer,
  // );

  // const containerClassnames = classNames(
  //   styles.container,
  //   isFullScreenCameraOpen && styles.containerWithCamera,
  // );

  // const isDefault = () => {
  //   const defaultDateRange = {
  //     startDate: yesterdayStartDay,
  //     endDate: yesterdayEndDay,
  //   };

  //   if (
  //     filters.date.startDate &&
  //     filters.date.endDate &&
  //     defaultDateRange.startDate.toDateString() ===
  //       new Date(filters.date.startDate).toDateString() &&
  //     defaultDateRange.endDate.toDateString() === new Date(filters.date.endDate).toDateString()
  //   ) {
  //     return t('customers_added_yesterday');
  //   } else return t('customers_added_for_selected_period');
  // };

  // useEffect(() => {
  //   if (!id) {
  //     dispatch(visitSettingsActions.clearVisits());
  //     dispatch(exisSettingsActions.clearExises());
  //     dispatch(clientSettingsActions.clearCurrentClient());
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(clientActions.getClients());
  // }, [dispatch]);

  // useEffect(() => {
  //   const dateForServer = {
  //     startDate: yesterdayStartDay.toISOString(),
  //     endDate: yesterdayEndDay.toISOString(),
  //   };
  //   dispatch(clientSettingsActions.setFilterDate(dateForServer));
  // }, [dispatch]);

  // const addNewClient = () => {
  //   navigate('/cloud/new');
  // };

  const headerNumberClasses = classNames(styles.headerItem, styles.headerItemNumber);
  const headerDeviceClasses = classNames(styles.headerItem, styles.headerItemDevice);
  const headerTitleClasses = classNames(styles.headerItem, styles.headerItemTitle);
  const headerIDClasses = classNames(styles.headerItem, styles.headerItemID);
  const headerFirmwareClasses = classNames(styles.headerItem, styles.headerItemFirmware);

  const sortDevices = (param: string) => {
    switch (param) {
      case 'device':
        console.log('sort by device');
        break;
      case 'title':
        console.log('sort by title');
        break;
      case 'firmware':
        console.log('sort by firmware');
        break;
      case 'user':
        console.log('sort by user');
        break;
      default:
        console.log('sort by device default');
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>{t('devices')}</div>
      <div className={styles.listWrapper}>
        <div className={styles.listHeader}>
          <div className={headerNumberClasses}>№</div>
          <div className={headerDeviceClasses}>
            {t('device')}
            <button className={styles.arrowDownButton} onClick={() => sortDevices('device')}>
              <ArrowDownIcon />
            </button>
          </div>
          <div className={headerTitleClasses}>
            {t('title')}
            <button className={styles.arrowDownButton} onClick={() => sortDevices('title')}>
              <ArrowDownIcon />
            </button>
          </div>
          <div className={headerIDClasses}>ID</div>
          <div className={headerFirmwareClasses}>
            {t('firmware')}
            <button className={styles.arrowDownButton} onClick={() => sortDevices('firmware')}>
              <ArrowDownIcon />
            </button>
          </div>
          <div className={styles.headerItem}>
            {t('users')}
            <button className={styles.arrowDownButton} onClick={() => sortDevices('user')}>
              <ArrowDownIcon />
            </button>
          </div>
        </div>
        <div className={styles.listItemsWrapper}>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
          <div className={styles.listItem}></div>
        </div>
      </div>
    </div>
  );
};
