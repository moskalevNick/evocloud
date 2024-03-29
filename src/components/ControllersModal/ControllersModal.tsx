import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loader } from '../Loader/Loader';

import styles from './ControllersModal.module.css';
import { userActions } from '../../redux/user/actions';
import { deviceActions } from '../../redux/devices/actions';
import { DeviceType } from '../../types';
import { Button } from '../Button/Button';
import { WidgetActiveIcon } from '../Icons/WidgetActiveIcon';

export const ControllersModal: React.FC<{ id: number }> = ({ id }) => {
  const { isModalLoading, usersInfo } = useAppSelector((state) => state.userReducer);
  const { isLoading, devices } = useAppSelector((state) => state.deviceReducer);
  const [userDevices, setUserDevices] = useState<DeviceType[]>([]);
  const [otherDevices, setOtherDevices] = useState<DeviceType[]>([]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(userActions.getUserInfo(id));
    dispatch(deviceActions.getDevices());
  }, [dispatch, id]);

  useEffect(() => {
    const currentUser = usersInfo[id];
    currentUser?.devices && setUserDevices(currentUser.devices);

    const currentUserDeviceIds: number[] = [];
    currentUser?.devices?.forEach((device) => currentUserDeviceIds.push(device.id));
    setOtherDevices(devices.filter((device) => !currentUserDeviceIds.includes(device.id)));
  }, [id, devices, usersInfo]);

  const addController = (id: number) => {
    const currentDevice = devices.find((device) => device.id === id);
    if (currentDevice) {
      setUserDevices((prev) => [...prev, currentDevice]);
      setOtherDevices((prev) => prev.filter((device) => device.id !== id));
    }
  };

  const removeController = (id: number) => {
    const currentDevice = devices.find((device) => device.id === id);
    if (currentDevice) {
      setOtherDevices((prev) => [...prev, currentDevice]);
      setUserDevices((prev) => prev.filter((device) => device.id !== id));
    }
  };

  const onSubmit = () => {
    const currentUser = usersInfo[id];
    const oldControllerIds: number[] = [];
    const newControllerIds: number[] = [];
    currentUser?.devices?.forEach((device) => oldControllerIds.push(device.id));
    userDevices.forEach((device) => newControllerIds.push(device.id));

    const deletedControllerIds = oldControllerIds.filter((id) => !newControllerIds.includes(id));
    const addedControllerIds = newControllerIds.filter((id) => !oldControllerIds.includes(id));

    if (deletedControllerIds.length) {
      deletedControllerIds.forEach((id) => {
        dispatch(deviceActions.editDevice({ id: id.toString(), newDevice: { id_user: '0' } }));
      });
    }
    if (addedControllerIds.length) {
      addedControllerIds.forEach((id) => {
        dispatch(
          deviceActions.editDevice({
            id: id.toString(),
            newDevice: { id_user: currentUser?.id.toString() },
          }),
        );
      });
    }
    onClose();
  };

  if (isModalLoading || isLoading) return <Loader />;

  return (
    <Modal open={true} onClose={onClose} className={styles.modalControllers}>
      <div className={styles.modalLabel}>
        <WidgetActiveIcon />
        {t('user_controllers')} {usersInfo[id]?.name}
      </div>
      <div className={styles.controllersContainer}>
        <div className={styles.userControllersWrapper}>
          {userDevices.map((device) => (
            <div className={styles.controllerContainer} key={device.id}>
              {`${device.name} (${device.x_evo_device})`}
              <Button
                className={styles.addButton}
                contentClassName={styles.contentButton}
                onClick={() => removeController(device.id)}
              >
                -
              </Button>
            </div>
          ))}
        </div>
        <div className={styles.otherControllersWrapper}>
          {otherDevices.map((device) => (
            <div className={styles.controllerContainer} key={device.id}>
              {`${device.name} (${device.x_evo_device})`}
              <Button
                className={styles.addButton}
                contentClassName={styles.contentButton}
                onClick={() => addController(device.id)}
              >
                +
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.userDevicesAmount}>{`${t('amount_added')}: ${
        userDevices.length
      }`}</div>
      <div className={styles.otherDevicesAmount}>{`${t('amount_available')}: ${
        otherDevices.length
      }`}</div>
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
