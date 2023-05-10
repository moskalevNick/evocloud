import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '../../components/Button/Button';

import { PlusIcon } from '../../components/Icons/PlusIcon';

import styles from './Users.module.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loader } from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { userActions } from '../../redux/user/actions';
import { ArrowDownIcon } from '../../components/Icons/ArrowDown';
import { EditIcon } from '../../components/Icons/EditIcon';
import { LogsIcon } from '../../components/Icons/LogsIcon';
import { WidgetIcon } from '../../components/Icons/WidgetIcon';
import { GroupWidgetsIcon } from '../../components/Icons/GroupWidgetsIcon';
import { UserModal } from '../../components/UserModal/UserModal';
import { GroupWidgetsActiveIcon } from '../../components/Icons/GroupWidgetsActiveIcon';
import { WidgetActiveIcon } from '../../components/Icons/WidgetActiveIcon';
import { LogsActiveIcon } from '../../components/Icons/LogsActiveIcon';
import { EditActiveIcon } from '../../components/Icons/EditActiveIcon';
import { ControllersModal } from '../../components/ControllersModal/ControllersModal';
import { userSettingsActions } from '../../redux/user/reducers';
import { WidgetsModal } from '../../components/WidgetsModal/WidgetsModal';
import { widgetSettingsActions } from '../../redux/widgets/reducers';
import { getStatusIcon } from '../../helpers/getStatusIcon';
import { NewWidgetModal } from '../../components/NewWidgetModal/NewWidgetModal';

export const UsersModule = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { users, isLoading } = useAppSelector((state) => state.userReducer);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isControllersModalOpen, setControllersModalOpen] = useState<number | null>(null);
  const [isWidgetsModalOpen, setWidgetsModalOpen] = useState<number | null>(null);
  const [isNewWidgetModalOpen, setNewWidgetModalOpen] = useState<number | null>(null);
  const [hoverElement, setHoverElement] = useState<number | null>(null);
  const [activeGroupWidgets, setActiveGroupWidgets] = useState<number | null>(null);
  const [activeWidget, setActiveWidget] = useState<number | null>(null);
  const [activeLogs, setActiveLogs] = useState<number | null>(null);
  const [activeEdit, setActiveEdit] = useState<number | null>(null);

  const headerNumberClasses = classNames(styles.headerItem, styles.headerItemNumber);
  const headerNameClasses = classNames(styles.headerItem, styles.headerItemName);
  const headerLoginClasses = classNames(styles.headerItem, styles.headerItemLogin);
  const headerStatusClasses = classNames(styles.headerItem, styles.headerItemStatus);
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
  }, [dispatch]);

  useEffect(() => {
    switch (pathName) {
      case 'info':
        setUserModalOpen(true);
        break;
      case 'controllers':
        setControllersModalOpen(Number(id));
        break;
      case 'widgets':
        setNewWidgetModalOpen(null);
        setWidgetsModalOpen(Number(id));
        break;
      case 'createwidget':
        setWidgetsModalOpen(null);
        setNewWidgetModalOpen(Number(id));
        break;
      default:
        setUserModalOpen(false);
        setControllersModalOpen(null);
        setWidgetsModalOpen(null);
        setNewWidgetModalOpen(null);
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

  const addNewUser = () => {
    navigate('/users/info/new');
  };

  const getUserInfo = (e: React.MouseEvent<HTMLElement>, id: number) => {
    navigate(`/users/info/${id}`);
    e.stopPropagation();
  };
  const openLogs = (e: React.MouseEvent<HTMLElement>, id: number) => {
    console.log('view log user ' + id);
    e.stopPropagation();
  };
  const getControllers = (e: React.MouseEvent<HTMLElement>, id: number) => {
    navigate(`/users/controllers/${id}`);
    e.stopPropagation();
  };
  const getGroupWidgets = (e: React.MouseEvent<HTMLElement>, id: number) => {
    navigate(`/users/widgets/${id}`);
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
                onMouseOver={() => setHoverElement(user.id)}
                onMouseLeave={() => setHoverElement(null)}
              >
                <div
                  className={
                    hoverElement === user.id ? listItemBeforeClassnames : styles.listItemAfter
                  }
                />
                <div className={styles.listItemNumber}>{i + 1}</div>
                <div className={styles.listItemName}>{user.name}</div>
                <div className={styles.listItemLogin}>{user.login}</div>
                <div className={styles.listItemStatus}>{getStatusIcon(user.group_id, t)}</div>
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
                    onClick={(e) => getUserInfo(e, user.id)}
                    onMouseOver={() => setActiveEdit(user.id)}
                    onMouseLeave={() => setActiveEdit(null)}
                  >
                    {activeEdit === user.id ? <EditActiveIcon /> : <EditIcon />}
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
      {isNewWidgetModalOpen && <NewWidgetModal id={isNewWidgetModalOpen} />}
    </div>
  );
};
