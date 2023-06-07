import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loader } from '../Loader/Loader';
import styles from './WidgetsModal.module.css';
import { widgetActions } from '../../redux/widgets/actions';
import { userActions } from '../../redux/user/actions';
import { Button } from '../Button/Button';
import { PlusIcon } from '../Icons/PlusIcon';
import { GroupWidgetsType, WidgetType } from '../../types';
import classNames from 'classnames';
import { Widget } from '../Widget/Widget';
import { EditIcon } from '../Icons/EditIcon';
import { CrossIcon } from '../Icons/CrossIcon';

export const WidgetsModal: React.FC<{ id: number }> = ({ id }) => {
  const { isModalLoading, usersInfo } = useAppSelector((state) => state.userReducer);
  const { widgets, groupWidgets, isLoading } = useAppSelector((state) => state.widgetReducer);
  const [activeGroup, setActiveGroup] = useState<GroupWidgetsType | null>(null);
  const [currentWidgets, setCurrentWidgets] = useState<WidgetType[]>(widgets);
  const [bigWidgets, setBigWidgets] = useState<WidgetType[]>([]);
  const [middleWidgets, setMiddleWidgets] = useState<WidgetType[]>([]);
  const [littleWidgets, setLittleWidgets] = useState<WidgetType[]>([]);
  const [isRemoveOpen, setIsRemoveOpen] = useState<number | undefined>(undefined);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onClose = () => {
    navigate('/users');
  };

  useEffect(() => {
    dispatch(userActions.getUserInfo(id));
    dispatch(widgetActions.getWidgets(id));
    dispatch(widgetActions.getGroupWidgets(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!activeGroup) {
      setCurrentWidgets(widgets);
    } else if (widgets) {
      setCurrentWidgets(widgets.filter((widget) => widget.group_id === activeGroup?.id.toString()));
    }
  }, [activeGroup, widgets]);

  useEffect(() => {
    if (currentWidgets?.length) {
      setBigWidgets([]);
      setMiddleWidgets([]);
      setLittleWidgets([]);
      currentWidgets.forEach((widget) => {
        if (widget.type) {
          if (widget.type.name === 'temp_regulator_button' || widget.type.name === 'rgb') {
            setBigWidgets((prev) => [...prev, widget]);
          } else if (widget.type.name === 'rtsp' || widget.type.name === 'bar_button') {
            setMiddleWidgets((prev) => [...prev, widget]);
          } else setLittleWidgets((prev) => [...prev, widget]);
        }
      });
    } else {
      setBigWidgets([]);
      setMiddleWidgets([]);
      setLittleWidgets([]);
    }
  }, [currentWidgets]);

  const addNewGroup = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/users/creategroup/${id}`);
    e.stopPropagation();
  };

  const addNewWidget = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/users/createwidget/${id}`);
    e.stopPropagation();
  };

  const removeGroup = (e: React.MouseEvent<HTMLElement>, groupId: number) => {
    dispatch(widgetActions.removeGroupWidgets({ userId: id, groupId }));
    e.stopPropagation();
    setIsRemoveOpen(undefined);
    setActiveGroup(null);
  };

  const editGroup = (e: React.MouseEvent<HTMLElement>, groupId: number) => {
    navigate(`/users/editgroup/${id}/${groupId}`);
    e.stopPropagation();
  };

  if (isModalLoading || isLoading) return <Loader />;

  return (
    <Modal open={true} onClose={onClose} className={styles.modalWidgets}>
      <div className={styles.modalLabel}>
        {t('user_widgets_and_groups')} {usersInfo[id]?.name}
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.containerLabelGroups}>
          {t('groups')}
          <Button
            beforeIcon={<PlusIcon fill="white" />}
            className={styles.addButton}
            onClick={addNewGroup}
          />
        </div>
        <div className={styles.groupsContainer}>
          {groupWidgets.length !== 0 && (
            <div
              className={styles.groupWrapper}
              key="clearBtn"
              onClick={() => setActiveGroup(null)}
            >
              {t('all_groups')}
            </div>
          )}
          {groupWidgets.map((group) => (
            <div
              className={classNames(
                styles.groupWrapper,
                activeGroup?.id === group.id && styles.activeGroupWrapper,
              )}
              key={group.id}
              onClick={() => setActiveGroup(group)}
            >
              {group.name}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRemoveOpen(group.id);
                }}
                className={styles.removeIcon}
              >
                <CrossIcon />
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  editGroup(e, group.id);
                }}
                className={styles.editIcon}
              >
                <EditIcon />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.containerLabelWidgets}>
          {t('widgets')}
          {`: ${activeGroup?.name || ''}`}
          <Button
            beforeIcon={<PlusIcon fill="white" />}
            className={styles.addButton}
            onClick={(e) => addNewWidget(e)}
          />
        </div>
        <div className={styles.widgetsContainer}>
          {littleWidgets?.map((widget) => (
            <Widget WidgetData={widget} key={widget.id} size="little" />
          ))}
          {bigWidgets?.map((widget) => (
            <Widget WidgetData={widget} key={widget.id} size="big" />
          ))}
          {middleWidgets?.map((widget) => (
            <Widget WidgetData={widget} key={widget.id} size="middle" />
          ))}
        </div>
      </div>
      <Modal
        onClose={() => setIsRemoveOpen(undefined)}
        open={isRemoveOpen !== undefined}
        className={styles.modalLogout}
        label={t('remove') as string}
      >
        <div className={styles.contentWrapperLogout}>
          <div className={styles.contentLogout}>
            {t('are_you_sure_you_want_to_remove')}{' '}
            {groupWidgets.find((group) => isRemoveOpen === group.id)?.name}
            {' ?'}
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.cancelButton}
              outlined
              onClick={() => setIsRemoveOpen(undefined)}
            >
              {t('cancel')}
            </Button>
            <Button
              className={styles.logoutButton}
              onClick={(e) => {
                if (isRemoveOpen) {
                  removeGroup(e, isRemoveOpen);
                }
              }}
            >
              {t('remove')}
            </Button>
          </div>
        </div>
      </Modal>
    </Modal>
  );
};
