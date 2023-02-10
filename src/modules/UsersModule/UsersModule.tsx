import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../components/Button/Button';
import { CardContainer } from '../../components/CardContainer/CardContainer';

import { PlusIcon } from '../../components/Icons/PlusIcon';

import styles from './Users.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loader } from '../../components/Loader/Loader';
import { CloudFilters } from '../../components/CloudFilters';
import { yesterdayEndDay, yesterdayStartDay } from '../../helpers/constants';
import { visitSettingsActions } from '../../redux/visit/reducers';
import { exisSettingsActions } from '../../redux/exis/reducers';
import { useTranslation } from 'react-i18next';
import UserService from '../../services/UserService';
import { userActions } from '../../redux/user/actions';
import { ArrowDownIcon } from '../../components/Icons/ArrowDown';
import { EditIcon } from '../../components/Icons/EditIcon';
import { LogsIcon } from '../../components/Icons/LogsIcon';
import { WidgetIcon } from '../../components/Icons/WidgetIcon';
import { GroupWidgetsIcon } from '../../components/Icons/GroupWidgetsIcon';
import { UserModal } from '../../components/UserModal/UserModal';
import { globalActions } from '../../redux/global/actions';
import { GroupWidgetsActiveIcon } from '../../components/Icons/GroupWidgetsActiveIcon';
import { WidgetActiveIcon } from '../../components/Icons/WidgetActiveIcon';
import { LogsActiveIcon } from '../../components/Icons/LogsActiveIcon';
import { EditActiveIcon } from '../../components/Icons/EditActiveIcon';
import { deviceActions } from '../../redux/devices/actions';
import { ControllersModal } from '../../components/ControllersModal/ControllersModal';
import { userSettingsActions } from '../../redux/user/reducers';

export const UsersModule = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { users, userGroups, isLoading } = useAppSelector((state) => state.userReducer);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isControllersModalOpen, setControllersModalOpen] = useState<number | null>(null);
  const [activeGroupWidgets, setActiveGroupWidgets] = useState<number | null>(null);
  const [activeWidget, setActiveWidget] = useState<number | null>(null);
  const [activeLogs, setActiveLogs] = useState<number | null>(null);
  const [activeEdit, setActiveEdit] = useState<number | null>(null);

  const headerNumberClasses = classNames(styles.headerItem, styles.headerItemNumber);
  const headerNameClasses = classNames(styles.headerItem, styles.headerItemName);
  const headerLoginClasses = classNames(styles.headerItem, styles.headerItemLogin);
  const headerStatusClasses = classNames(styles.headerItem, styles.headerItemStatus);

  useEffect(() => {
    dispatch(userActions.getUsers());
    dispatch(userActions.getUserGroups());
  }, [dispatch]);

  useEffect(() => {
    if (window.location.pathname.split('/')[2] === 'controllers') {
      setControllersModalOpen(Number(id));
    } else if (id) {
      setUserModalOpen(true);
    } else {
      setUserModalOpen(false);
      setControllersModalOpen(null);
      dispatch(userSettingsActions.clearCurrentUser());
    }
  }, [dispatch, id]);

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

  const getStatusIcon = (group_id: string) => {
    switch (group_id) {
      case '1':
        return <div className={styles.administratorContainer}>{t('administrator')}</div>;
      case '6':
        return <div className={styles.userContainer}>{t('user')}</div>;
      default:
        return <div className={styles.userContainer}>{t('user')}</div>;
    }
  };

  const addNewUser = () => {
    navigate('/users/new');
  };

  const editUser = (e: React.MouseEvent<HTMLElement>, id: number) => {
    console.log('edit user ' + id);
    e.stopPropagation();
  };
  const openLogs = (e: React.MouseEvent<HTMLElement>, id: number) => {
    console.log('view log user ' + id);
    e.stopPropagation();
  };
  const getControllers = (e: React.MouseEvent<HTMLElement>, id: number) => {
    navigate(`/users/controllers/${id}`);
    // setControllersModalOpen(id);
    e.stopPropagation();
  };
  const getGroupWidgets = (e: React.MouseEvent<HTMLElement>, id: number) => {
    console.log('group widgets ' + id);
    e.stopPropagation();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {t('users')}{' '}
        <Button
          beforeIcon={<PlusIcon fill="white" />}
          className={styles.addButton}
          onClick={addNewUser}
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
            {t('name')}
            <button className={styles.arrowDownButton} onClick={() => sortUsers('name')}>
              <ArrowDownIcon />
            </button>
          </div>
          <div className={headerLoginClasses}>
            {t('login')}
            <button className={styles.arrowDownButton} onClick={() => sortUsers('login')}>
              <ArrowDownIcon />
            </button>
          </div>
          <div className={headerStatusClasses}>
            {t('status')}
            <button className={styles.arrowDownButton} onClick={() => sortUsers('status')}>
              <ArrowDownIcon />
            </button>
          </div>
        </div>
        <div className={styles.listItemsWrapper}>
          {isLoading ? (
            <Loader />
          ) : (
            users?.map((user, i) => (
              <div
                className={styles.listItem}
                key={user.id}
                onClick={() => navigate(`/users/${user.id}`)}
              >
                <div className={styles.listItemNumber}>{i + 1}</div>
                <div className={styles.listItemName}>{user.name}</div>
                <div className={styles.listItemLogin}>{user.login}</div>
                <div className={styles.listItemStatus}>{getStatusIcon(user.group_id)}</div>
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.arrowDownButton}
                    onClick={(e) => getGroupWidgets(e, user.id)}
                    onMouseOver={() => setActiveGroupWidgets(user.id)}
                    onMouseLeave={() => setActiveGroupWidgets(null)}
                  >
                    {activeGroupWidgets === user.id ? (
                      <GroupWidgetsActiveIcon />
                    ) : (
                      <GroupWidgetsIcon />
                    )}
                  </button>
                  <button
                    className={styles.arrowDownButton}
                    onClick={(e) => getControllers(e, user.id)}
                    onMouseOver={() => setActiveWidget(user.id)}
                    onMouseLeave={() => setActiveWidget(null)}
                  >
                    {activeWidget === user.id ? <WidgetActiveIcon /> : <WidgetIcon />}
                  </button>
                  <button
                    className={styles.arrowDownButton}
                    onClick={(e) => openLogs(e, user.id)}
                    onMouseOver={() => setActiveLogs(user.id)}
                    onMouseLeave={() => setActiveLogs(null)}
                  >
                    {activeLogs === user.id ? <LogsActiveIcon /> : <LogsIcon />}
                  </button>
                  <button
                    className={styles.arrowDownButton}
                    onClick={(e) => editUser(e, user.id)}
                    onMouseOver={() => setActiveEdit(user.id)}
                    onMouseLeave={() => setActiveEdit(null)}
                  >
                    {activeEdit === user.id ? <EditActiveIcon /> : <EditIcon />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {isUserModalOpen && <UserModal />}
      {isControllersModalOpen && <ControllersModal id={isControllersModalOpen} />}
    </div>
  );
};
