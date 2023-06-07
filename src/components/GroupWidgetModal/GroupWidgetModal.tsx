import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loader } from '../Loader/Loader';
import styles from './GroupWidgetModal.module.css';
import { widgetActions } from '../../redux/widgets/actions';
import { userActions } from '../../redux/user/actions';
import { deviceActions } from '../../redux/devices/actions';
import { Button } from '../Button/Button';
import { State } from '../NewWidgetModal/State';
import { PlusIcon } from '../Icons/PlusIcon';
import { EditIcon } from '../Icons/EditIcon';
import { Select } from '../Select/Select';

export const GroupWidgetModal: React.FC<{ userId: number; groupId?: number }> = ({
  userId,
  groupId,
}) => {
  const { isModalLoading, usersInfo } = useAppSelector((state) => state.userReducer);
  const { currentDevice } = useAppSelector((state) => state.deviceReducer);
  const { groupWidgets } = useAppSelector((state) => state.widgetReducer);
  const [activeControllerId, setActiveControllerId] = useState<string | null | undefined>(null);
  const [deviceState, setDeviceState] = useState<any | null>(null);
  const [nameValue, setNameValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [formData, setFormData] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const currentUser = usersInfo[userId];
    if (currentUser?.id !== userId) {
      dispatch(userActions.getUserInfo(userId));
    }
    dispatch(widgetActions.getGroupWidgets(userId));
    dispatch(widgetActions.getWidgetTypes());
  }, [dispatch, userId]);

  const onClose = () => {
    navigate(`/users/widgets/${userId}`);
  };

  useEffect(() => {
    if (groupId) {
      const currentGroup = groupWidgets.filter((group) => group.id === groupId);
      if (currentGroup[0]) {
        setActiveControllerId(currentGroup[0].control_elements.state?.silent.controller_id);
        setNameValue(currentGroup[0].name);
        setCommentValue(currentGroup[0].comment);
        setFormData({ silence: currentGroup[0].control_elements.state?.silent });
      }
    } else {
      console.log('no group id');
    }
  }, [groupId, groupWidgets]);

  useEffect(() => {
    if (activeControllerId) {
      dispatch(deviceActions.getDevice(activeControllerId));
      dispatch(deviceActions.getComparisonConditions());
    }
  }, [activeControllerId, dispatch]);

  useEffect(() => {
    if (currentDevice?.current_raw_state) {
      setDeviceState(JSON.parse(currentDevice.current_raw_state));
    } else {
      setDeviceState(null);
    }
  }, [currentDevice]);

  useEffect(() => {
    if (!deviceState) {
      setFormData(undefined);
    }
  }, [deviceState]);

  const getData = (values: any) => {
    const key = values.type;
    let obj: any = {};
    obj[key] = values;

    setFormData((prev: any) => {
      return { ...prev, ...obj };
    });
  };

  const onSubmit = () => {
    const data = {
      name: nameValue,
      comment: commentValue,
      control_elements: {
        state: {
          silent: {
            object: formData.silence.activeDeviceTypeElementValue,
            device: formData.silence.activeDeviceStateIdValue,
            addr: formData.silence.outputValueNumber,
            value: formData.silence.varValue,
            condition: formData.silence.activeConditionValue,
            controller_id: activeControllerId,
          },
        },
      },
    };
    let cleanData = JSON.parse(JSON.stringify(data));

    if (groupId) {
      dispatch(widgetActions.editGroupWidgets({ userId, groupId, data: cleanData }));
    } else {
      dispatch(widgetActions.addGroupWidgets({ userId, data: cleanData }));
    }
    onClose();
  };

  if (isModalLoading) return <Loader />;

  return (
    <Modal open={true} onClose={onClose} className={styles.modalNewGroupWidget}>
      <div className={styles.modalLabel}>
        {groupId ? <EditIcon /> : <PlusIcon fill="#4692EC" />}
        {groupId ? t('edit_group_widget_for') : t('new_group_widget_for')}
        {usersInfo[userId]?.name}
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.groupParams}>
          <div className={styles.paramWrapper}>
            <Select
              label={t('choose_controller')}
              defaultValue={activeControllerId ? activeControllerId : ''}
              onChange={(val: string | null) => setActiveControllerId(val)}
              options={usersInfo[userId]?.devices || []}
              withXEvoDevice
            />
          </div>
          <div className={styles.paramWrapper}>
            <div className={styles.param}>{t('group_name')}:</div>
            <input
              placeholder={t('group_name') as string}
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.paramWrapper}>
            <div className={styles.param}>{t('comment')}:</div>
            <input
              placeholder={t('leave_a_comment') as string}
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        {activeControllerId &&
          (deviceState ? (
            <State
              deviceState={deviceState}
              type="silence"
              label="silence_mode"
              getValues={(values) => getData(values)}
            />
          ) : (
            <div className={styles.labelParamsNoStates}>
              {t('this_controller_without_devices_states')}
            </div>
          ))}
        <div className={styles.line} />
      </div>
      <div className={styles.submitButtonsWrapper}>
        <Button outlined className={styles.submitButton} onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button className={styles.submitButton} onClick={onSubmit}>
          {t('save')}
        </Button>
      </div>
    </Modal>
  );
};
