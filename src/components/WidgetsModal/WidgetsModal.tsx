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
import { RemoveIcon } from '../Icons/RemoveIcon';
import { EditIcon } from '../Icons/EditIcon';

export const WidgetsModal: React.FC<{ id: number }> = ({ id }) => {
  const { isModalLoading, currentUser } = useAppSelector((state) => state.userReducer);
  const { widgets, groupWidgets, isLoading } = useAppSelector((state) => state.widgetReducer);
  const [activeGroup, setActiveGroup] = useState<GroupWidgetsType | null>(null);
  const [currentWidgets, setCurrentWidgets] = useState<WidgetType[]>(widgets);
  const [bigWidgets, setBigWidgets] = useState<WidgetType[]>([]);
  const [middleWidgets, setMiddleWidgets] = useState<WidgetType[]>([]);
  const [littleWidgets, setLittleWidgets] = useState<WidgetType[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const clearButtonClassnames = classNames(styles.groupWrapper, styles.clearButton);

  const onClose = () => {
    navigate('/users');
  };

  useEffect(() => {
    dispatch(userActions.getCurrentUser(id));
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
          if (
            widget.type.name === 'rtsp' ||
            widget.type.name === 'temp_regulator_button' ||
            widget.type.name === 'rgb'
          ) {
            setBigWidgets((prev) => [...prev, widget]);
          } else if (widget.type.name === 'bar_button') {
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
  };

  const editGroup = (e: React.MouseEvent<HTMLElement>, groupId: number) => {
    navigate(`/users/editgroup/${id}/${groupId}`);
    e.stopPropagation();
  };

  if (isModalLoading || isLoading) return <Loader />;

  return (
    <Modal open={true} onClose={onClose} className={styles.modalWidgets}>
      <div className={styles.modalLabel}>
        {t('user_widgets_and_groups')} {currentUser?.name}
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
              <div onClick={(e) => removeGroup(e, group.id)} className={styles.removeIcon}>
                <RemoveIcon />
              </div>
              <div onClick={(e) => editGroup(e, group.id)} className={styles.editIcon}>
                <EditIcon fill="#fff" />
              </div>
            </div>
          ))}
          {groupWidgets.length !== 0 && (
            <div
              className={clearButtonClassnames}
              key="clearBtn"
              onClick={() => setActiveGroup(null)}
            >
              {t('clear')}
            </div>
          )}
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
          {middleWidgets?.map((widget) => (
            <Widget WidgetData={widget} key={widget.id} size="middle" />
          ))}
          {bigWidgets?.map((widget) => (
            <Widget WidgetData={widget} key={widget.id} size="big" />
          ))}
        </div>
      </div>
    </Modal>
  );
};
