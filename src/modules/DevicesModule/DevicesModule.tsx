import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './Devices.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { ArrowDownIcon } from '../../components/Icons/ArrowDown';
import { deviceActions } from '../../redux/devices/actions';
import { LogsIcon } from '../../components/Icons/LogsIcon';
import { CopyIcon } from '../../components/Icons/CopyIcon';
import { Nottification } from '../../components/Nottification/Nottification';
import { CircleIcon } from '../../components/Icons/CircleIcon';
import { LogsHoverIcon } from '../../components/Icons/LogsHoverIcon';
import { LayoutIcon } from '../../components/Icons/LayoutIcon';
import { LayoutHoverIcon } from '../../components/Icons/LayoutHoverIcon';
import { DefaultAvatarIcon } from '../../components/Icons/DefaultAvatarIcon';
import { LayoutActiveIcon } from '../../components/Icons/LayoutActiveIcon';
import { LogsActiveIcon } from '../../components/Icons/LogsActiveIcon';

export const DevicesModule = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [activeGroupWidgets, setActiveGroupWidgets] = useState<number | null>(null);
  const [hoverGroupWidgets, setHoverGroupWidgets] = useState<number | null>(null);
  const [activeLogs, setActiveLogs] = useState<number | null>(null);
  const [hoverLogs, setHoverLogs] = useState<number | null>(null);
  const [hoverElement, setHoverElement] = useState<number | null>(null);
  const [showUserInfo, setShowUserInfo] = useState<number | null>(null);

  const { devices } = useAppSelector((state) => state.deviceReducer);
  const { isRus } = useAppSelector((state) => state.globalReducer);
  const { users } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(deviceActions.getDevices());
  }, [dispatch]);

  const headerNumberClasses = classNames(styles.headerItem, styles.headerItemNumber);
  const headerDeviceClasses = classNames(styles.headerItem, styles.headerItemDeviceType);
  const headerTitleClasses = classNames(styles.headerItem, styles.headerItemName);
  const headerIDClasses = classNames(styles.headerItem, styles.headerItemID);
  const headerFirmwareClasses = classNames(styles.headerItem, styles.headerItemFirmware);
  const listItemBeforeClassnames = classNames(
    styles.listItemAfter,
    styles.listItemAfterBeforeActive,
  );
  const listItemAfterClassnames = classNames(
    styles.listItemBefore,
    styles.listItemAfterBeforeActive,
  );

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
      type: 'success',
      label: isRus ? 'ID устройства скопирован' : 'Device ID copied',
      text: isRus ? 'Продолжайте работу с EVO Cloud' : 'Keep working with EVO Cloud',
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
        <div className={styles.listItemsScrollWrapper}>
          <div className={styles.listItemsWrapper}>
            {devices?.map((device, i) => (
              <div
                className={styles.listItem}
                key={device.id}
                onMouseOver={() => setHoverElement(device.id)}
                onMouseLeave={() => {
                  setHoverElement(null);
                  setHoverGroupWidgets(null);
                  setHoverLogs(null);
                }}
              >
                <div
                  className={
                    hoverElement === device.id ? listItemBeforeClassnames : styles.listItemAfter
                  }
                />
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
                <div
                  className={styles.listItemUser}
                  onMouseOver={() => setShowUserInfo(device.id)}
                  onMouseLeave={() => setShowUserInfo(null)}
                >
                  {device.id_user !== '' && <DefaultAvatarIcon />}
                  {showUserInfo === device.id && (
                    <>
                      <div className={styles.avatarHoverWrapper}>
                        <DefaultAvatarIcon />
                      </div>
                      <div className={styles.userInfoContainer}>
                        <div className={styles.userInfoLabel}>{t('users')}</div>
                        <div className={styles.usersWrapper}>
                          <div className={styles.userInfo}>
                            <DefaultAvatarIcon />
                            {users.find((user) => user.id.toString() === device.id_user)?.name}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.arrowDownButton}
                    onMouseOver={() => setHoverGroupWidgets(device.id)}
                    onMouseLeave={() => setHoverGroupWidgets(null)}
                    onMouseDown={() => setActiveGroupWidgets(device.id)}
                    onMouseUp={(e) => {
                      getGroupWidgets(e, device.id);
                      setActiveGroupWidgets(null);
                    }}
                  >
                    {activeGroupWidgets === device.id ? (
                      <LayoutActiveIcon />
                    ) : hoverGroupWidgets === device.id ? (
                      <LayoutHoverIcon />
                    ) : (
                      <LayoutIcon />
                    )}
                  </button>
                  <button
                    className={styles.arrowDownButton}
                    onMouseOver={() => setHoverLogs(device.id)}
                    onMouseLeave={() => setHoverLogs(null)}
                    onMouseDown={() => setActiveLogs(device.id)}
                    onMouseUp={(e) => {
                      openLogs(e, device.id);
                      setActiveLogs(null);
                    }}
                  >
                    {activeLogs === device.id ? (
                      <LogsActiveIcon />
                    ) : hoverLogs === device.id ? (
                      <LogsHoverIcon />
                    ) : (
                      <LogsIcon />
                    )}
                  </button>
                </div>
                <div
                  className={
                    hoverElement === device.id ? listItemAfterClassnames : styles.listItemAfter
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
