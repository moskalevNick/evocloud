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
import { WidgetType } from '../../types';
import classNames from 'classnames';
import { Widget } from '../Widget/Widget';

export const WidgetsModal: React.FC<{ id: number }> = ({ id }) => {
  const { isModalLoading, currentUser } = useAppSelector((state) => state.userReducer);
  const { widgets, groupWidgets, isLoading } = useAppSelector((state) => state.widgetReducer);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [currentWidgets, setCurrentWidgets] = useState<WidgetType[]>(widgets);
  const [bigWidgets, setBigWidgets] = useState<WidgetType[]>([]);
  const [middleWidgets, setMiddleWidgets] = useState<WidgetType[]>([]);
  const [littleWidgets, setLittleWidgets] = useState<WidgetType[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const clearButtonClassnames = classNames(styles.groupWrapper, styles.clearButton);

  const onClose = () => {
    navigate(-1);
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
      setCurrentWidgets(widgets.filter((widget) => widget.group_id === activeGroup?.toString()));
    }
  }, [activeGroup, widgets]);

  useEffect(() => {
    if (currentWidgets.length) {
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
          } else if (widget.type.name === 'bar_button' || widget.type.name === 'icons') {
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

  const addNewGroup = () => {
    console.log('new group');
  };
  const addNewWidget = () => {
    console.log('new widget');
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
                activeGroup === group.id && styles.activeGroupWrapper,
              )}
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
            >
              {group.name}
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
          <Button
            beforeIcon={<PlusIcon fill="white" />}
            className={styles.addButton}
            onClick={addNewWidget}
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
