import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './Devices.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { ArrowDownIcon } from '../../components/Icons/ArrowDown';
import { deviceActions } from '../../redux/devices/actions';
import { GroupWidgetsIcon } from '../../components/Icons/GroupWidgetsIcon';
import { LogsIcon } from '../../components/Icons/LogsIcon';
import { GroupWidgetsActiveIcon } from '../../components/Icons/GroupWidgetsActiveIcon';
import { LogsActiveIcon } from '../../components/Icons/LogsActiveIcon';
import { CopyIcon } from '../../components/Icons/CopyIcon';
import { Nottification } from '../../components/Nottification/Nottification';
import { CircleIcon } from '../../components/Icons/CircleIcon';

export const DevicesModule = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [activeGroupWidgets, setActiveGroupWidgets] = useState<number | null>(null);
  const [activeLogs, setActiveLogs] = useState<number | null>(null);

  const { devices } = useAppSelector((state) => state.deviceReducer);
  const { isRus } = useAppSelector((state) => state.globalReducer);

  useEffect(() => {
    dispatch(deviceActions.getDevices());
  }, [dispatch]);

  const headerNumberClasses = classNames(styles.headerItem, styles.headerItemNumber);
  const headerDeviceClasses = classNames(styles.headerItem, styles.headerItemDeviceType);
  const headerTitleClasses = classNames(styles.headerItem, styles.headerItemName);
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

  const getGroupWidgets = (e: React.MouseEvent<HTMLElement>, id: number) => {
    console.log('group widgets ' + id);
    e.stopPropagation();
  };

  const openLogs = (e: React.MouseEvent<HTMLElement>, id: number) => {
    console.log('view log user ' + id);
    e.stopPropagation();
  };

  const copyID = (id: number) => {
    navigator.clipboard.writeText(id.toString());
    Nottification({
      text: isRus ? 'ID устройства скопирован' : 'Device ID copied',
    });
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
          {devices?.map((device, i) => (
            <div className={styles.listItem} key={device.id}>
              <div className={styles.listItemNumber}>{i + 1}</div>
              <div className={styles.listItemDeviceType}>
                <CircleIcon fill={device.status === 'online' ? '#13DA92' : '#F83068'} />
                NGC/NG
              </div>
              <div className={styles.listItemName}>{device.name}</div>
              <div className={styles.listItemIDWrapper}>
                <div className={styles.listItemID} onClick={() => copyID(device.id)}>
                  {device.id}
                  <div className={styles.copyIconWrapper}>
                    <CopyIcon />
                  </div>
                </div>
              </div>
              <div className={styles.listItemFirmware}>{device.proshivka}</div>
              <div className={styles.listItemUser}>{device.id_user}</div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.arrowDownButton}
                  onClick={(e) => getGroupWidgets(e, device.id)}
                  onMouseOver={() => setActiveGroupWidgets(device.id)}
                  onMouseLeave={() => setActiveGroupWidgets(null)}
                >
                  {activeGroupWidgets === device.id ? (
                    <GroupWidgetsActiveIcon />
                  ) : (
                    <GroupWidgetsIcon />
                  )}
                </button>
                <button
                  className={styles.arrowDownButton}
                  onClick={(e) => openLogs(e, device.id)}
                  onMouseOver={() => setActiveLogs(device.id)}
                  onMouseLeave={() => setActiveLogs(null)}
                >
                  {activeLogs === device.id ? <LogsActiveIcon /> : <LogsIcon />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
