import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../components/Button/Button';
import { PlusIcon } from '../../components/Icons/PlusIcon';
import styles from './Distributors.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loader } from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { userActions } from '../../redux/user/actions';
import { ArrowDownIcon } from '../../components/Icons/ArrowDown';
import { EditIcon } from '../../components/Icons/EditIcon';
import { UserModal } from '../../components/UserModal/UserModal';
import { ControllersModal } from '../../components/ControllersModal/ControllersModal';
import { userSettingsActions } from '../../redux/user/reducers';
import { WidgetsModal } from '../../components/WidgetsModal/WidgetsModal';
import { widgetSettingsActions } from '../../redux/widgets/reducers';
import { UserType } from '../../types';
import { CircleIcon } from '../../components/Icons/CircleIcon';
import { EditHoverIcon } from '../../components/Icons/EditHoverIcon';
import { EditActiveIcon } from '../../components/Icons/EditActiveIcon';

export const DistributorsModule = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  let { users, isLoading, usersInfo } = useAppSelector((state) => state.userReducer);
  const { role, userId } = useAppSelector((state) => state.globalReducer);

  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isControllersModalOpen, setControllersModalOpen] = useState<number | null>(null);
  const [isWidgetsModalOpen, setWidgetsModalOpen] = useState<number | null>(null);
  const [hoverEdit, setHoverEdit] = useState<number | null>(null);
  const [activeEdit, setActiveEdit] = useState<number | null>(null);
  const [currentUsers, setCurrentUsers] = useState<UserType[]>([]);
  const [hoverElement, setHoverElement] = useState<number | null>(null);

  const headerNumberClasses = classNames(styles.headerItem, styles.headerItemNumber);
  const headerNameClasses = classNames(styles.headerItem, styles.headerItemName);
  const headerTotalDevicesClasses = classNames(styles.headerItem, styles.headerItemTotalDevices);
  const headerUserDevicesClasses = classNames(styles.headerItem, styles.headerItemUserDevices);
  const headerOnlineDevicesClasses = classNames(styles.headerItem, styles.headerItemOnlineDevices);

  const headerOfflineDevicesClasses = classNames(
    styles.headerItem,
    styles.headerItemOfflineDevices,
  );
  const listItemBeforeClassnames = classNames(
    styles.listItemAfter,
    styles.listItemAfterBeforeActive,
  );
  const listItemAfterClassnames = classNames(
    styles.listItemBefore,
    styles.listItemAfterBeforeActive,
  );

  const pathName = window.location.pathname.split('/')[2];

  useEffect(() => {
    dispatch(userActions.getUsers());
    dispatch(userActions.getUserGroups());
    dispatch(userSettingsActions.clearUsersInfo());
  }, [dispatch]);

  useEffect(() => {
    if (users?.length) {
      setCurrentUsers(
        users.filter((user) => user.id !== userId).filter((user) => user.group_id === '3'),
      );
    }
  }, [users, role, userId]);

  useEffect(() => {
    if (currentUsers.length) {
      currentUsers.forEach((user) => {
        dispatch(userActions.getUserInfo(user.id));
      });
    }
  }, [currentUsers, dispatch]);

  useEffect(() => {
    switch (pathName) {
      case 'info':
        setUserModalOpen(true);
        break;
      default:
        setUserModalOpen(false);
        setControllersModalOpen(null);
        setWidgetsModalOpen(null);
        dispatch(userSettingsActions.clearCurrentUser());
        dispatch(widgetSettingsActions.clearCurrentWidgets());
        dispatch(widgetSettingsActions.clearCurrentGroupWidgets());
    }
  }, [dispatch, id, pathName]);

  const sortUsers = (param: string) => {
    switch (param) {
      case 'number':
        console.log('sort by number');
        break;
      case 'name':
        console.log('sort by name');
        break;
      case 'login':
        console.log('sort by login');
        break;
      case 'status':
        console.log('sort by status');
        break;
      default:
        console.log('sort by default');
        break;
    }
  };

  const addNewIntegrator = () => {
    navigate('/distributors/info/new');
  };

  const getUserInfo = (e: React.MouseEvent<HTMLElement>, id: number) => {
    navigate(`/distributors/info/${id}`);
    e.stopPropagation();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {t('distributors')}
        <Button
          beforeIcon={<PlusIcon fill="white" />}
          className={styles.addButton}
          onClick={addNewIntegrator}
        />
      </div>
      <div className={styles.listWrapper}>
        <div className={styles.listHeader}>
          <div className={headerNumberClasses}>
            №
            <button className={styles.arrowDownButton} onClick={() => sortUsers('number')}>
              <ArrowDownIcon />
            </button>
          </div>
          <div className={headerNameClasses}>
            {t('title')}
            <button className={styles.arrowDownButton} onClick={() => sortUsers('name')}>
              <ArrowDownIcon />
            </button>
          </div>
          <div className={headerTotalDevicesClasses}>
            {t('total_controllers')}
            <button
              className={styles.arrowDownButton}
              onClick={() => sortUsers('total controllers')}
            >
              <ArrowDownIcon />
            </button>
          </div>
          <div className={headerUserDevicesClasses}>
            {t('integrator_devices')}
            <button className={styles.arrowDownButton} onClick={() => sortUsers('user devices')}>
              <ArrowDownIcon />
            </button>
          </div>
          <div className={headerOnlineDevicesClasses}>{t('online')}</div>
          <div className={styles.verticalLine} />
          <div className={headerOfflineDevicesClasses}>
            {t('offline')}
            <button className={styles.arrowDownButton} onClick={() => sortUsers('offline devices')}>
              <ArrowDownIcon />
            </button>
          </div>
        </div>
        <div className={styles.listItemsWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            currentUsers?.map((user, i) => (
              <div
                className={styles.listItem}
                key={user.id}
                onClick={(e) => getUserInfo(e, user.id)}
                onMouseOver={() => setHoverElement(user.id)}
                onMouseLeave={() => {
                  setHoverElement(null);
                  setHoverEdit(null);
                }}
              >
                <div
                  className={
                    hoverElement === user.id ? listItemBeforeClassnames : styles.listItemAfter
                  }
                />
                <div className={styles.listItemNumber}>{i + 1}</div>
                <div className={styles.listItemName}>{user.name}</div>
                <div className={styles.listItemTotalDevices}>
                  {usersInfo[user.id]?.devices?.length}
                </div>
                <div className={styles.listItemUserDevices}>
                  {usersInfo[user.id]?.childs?.reduce((acc, val) => {
                    if (val.devices) {
                      return acc + val.devices.length;
                    } else return 0;
                  }, 0)}
                </div>
                <div className={styles.listItemOnlineDevices}>
                  <CircleIcon fill={'#13DA92'} />
                  {
                    usersInfo[user.id]?.devices?.filter((device) => device.status === 'online')
                      .length
                  }
                </div>
                <div className={styles.verticalLine} />
                <div className={styles.listItemOfflineDevices}>
                  <CircleIcon />
                  {
                    usersInfo[user.id]?.devices?.filter((device) => device.status === 'offline')
                      .length
                  }
                </div>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.arrowDownButton}
                    onClick={(e) => getUserInfo(e, user.id)}
                    onMouseOver={() => setHoverEdit(user.id)}
                    onMouseLeave={() => setHoverEdit(null)}
                    onMouseDown={() => setActiveEdit(user.id)}
                    onMouseUp={(e) => {
                      getUserInfo(e, user.id);
                      setActiveEdit(null);
                    }}
                  >
                    {activeEdit === user.id ? (
                      <EditActiveIcon />
                    ) : hoverEdit === user.id ? (
                      <EditHoverIcon />
                    ) : (
                      <EditIcon width="20" />
                    )}
                  </button>
                </div>
                <div
                  className={
                    hoverElement === user.id ? listItemAfterClassnames : styles.listItemAfter
                  }
                />
              </div>
            ))
          )}
        </div>
      </div>
      {isUserModalOpen && <UserModal />}
      {isControllersModalOpen && <ControllersModal id={isControllersModalOpen} />}
      {isWidgetsModalOpen && <WidgetsModal id={isWidgetsModalOpen} />}
    </div>
  );
};
