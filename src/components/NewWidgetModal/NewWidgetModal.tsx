import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import { Modal } from '../Modal/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Loader } from '../Loader/Loader';
import styles from './NewWidgetModal.module.css';
import { widgetActions } from '../../redux/widgets/actions';
import { userActions } from '../../redux/user/actions';
import { WidgetDescriptionType } from '../../types';
import classNames from 'classnames';
import { deviceActions } from '../../redux/devices/actions';
import { Button } from '../Button/Button';
import { ElementsForWidgetType } from './ElementsForWidgetType';

export const NewWidgetModal: React.FC<{ id: number }> = ({ id }) => {
  const { isModalLoading, currentUser } = useAppSelector((state) => state.userReducer);
  const { widgetTypes, groupWidgets } = useAppSelector((state) => state.widgetReducer);
  const { currentDevice } = useAppSelector((state) => state.deviceReducer);
  const [activeType, setActiveType] = useState<WidgetDescriptionType | null>(null);
  const [activeControllerId, setActiveControllerId] = useState<string | null | undefined>(null);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [deviceState, setDeviceState] = useState<any | null>(null);
  const [nameValue, setNameValue] = useState('');
  const [formData, setFormData] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const typeActiveWrapperClasses = classNames(styles.typeWrapper, styles.activeTypeWrapper);

  useEffect(() => {
    if (currentUser?.id !== id) {
      dispatch(userActions.getCurrentUser(id));
    }
    dispatch(widgetActions.getGroupWidgets(id));
    dispatch(widgetActions.getWidgetTypes());
  }, [dispatch, id]);

  const onClose = () => {
    navigate(`/users/widgets/${id}`);
  };

  useEffect(() => {
    if (activeControllerId) {
      dispatch(deviceActions.getDevice(activeControllerId));
      dispatch(deviceActions.getComparisonConditions());
    }
  }, [activeControllerId]);

  useEffect(() => {
    if (currentDevice?.current_raw_state) {
      setDeviceState(JSON.parse(currentDevice.current_raw_state));
    } else {
      setDeviceState(null);
    }
  }, [currentDevice]);

  const changeActiveType = (type: WidgetDescriptionType) => {
    setDeviceState(null);
    setActiveControllerId(null);
    if (activeType && type.id === activeType.id) {
      setActiveType(null);
    } else {
      setActiveType(type);
    }
  };

  useEffect(() => {
    if (!deviceState) {
      setFormData(undefined);
    }
  }, [deviceState]);

  const onSubmit = () => {
    switch (activeType?.name) {
      case 'binary_button':
        const binaryButtonData = {
          name: nameValue,
          controller_id: activeControllerId,
          group_id: activeGroupId,
          input: {
            on: {
              object: formData.input_on.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.input_on.activeDeviceStateIdValue,
              addr: formData.input_on.outputValueNumber,
              value: formData.input_on.varValue,
              condition: formData.input_on.activeConditionValue,
            },
          },
          output: {
            on: {
              object: formData.output_on.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.output_on.activeDeviceStateIdValue,
              addr: formData.output_on.outputValueNumber,
              value: formData.output_on.varValue,
            },
            off: {
              object: formData.output_off.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.output_off.activeDeviceStateIdValue,
              addr: formData.output_off.outputValueNumber,
              value: formData.output_off.varValue,
            },
          },
          state: {
            disable: {
              object: formData.disable.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.disable.activeDeviceStateIdValue,
              addr: formData.disable.outputValueNumber,
              value: formData.disable.varValue,
              condition: formData.disable.activeConditionValue,
            },
            silent: {
              object: formData.silence.activeDeviceTypeElementValue,
              device: formData.silence.activeDeviceStateIdValue,
              addr: formData.silence.outputValueNumber,
              value: formData.silence.varValue,
              condition: formData.silence.activeConditionValue,
              controller_id: formData.silence.activeControllerId,
            },
          },
        };
        let cleanBinaryButtonData = JSON.parse(JSON.stringify(binaryButtonData));

        dispatch(widgetActions.addBinaryButtonWidget({ userId: id, data: cleanBinaryButtonData }));
        onClose();
        break;
      case 'open_close_button':
        const openCloseData = {
          name: nameValue,
          controller_id: activeControllerId,
          group_id: activeGroupId,
          input: {
            on: {
              object: formData.input_on.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.input_on.activeDeviceStateIdValue,
              addr: formData.input_on.outputValueNumber,
              value: formData.input_on.varValue,
              condition: formData.input_on.activeConditionValue,
            },
          },
          state: {
            disable: {
              object: formData.disable.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.disable.activeDeviceStateIdValue,
              addr: formData.disable.outputValueNumber,
              value: formData.disable.varValue,
              condition: formData.disable.activeConditionValue,
            },
            silent: {
              object: formData.silence.activeDeviceTypeElementValue,
              device: formData.silence.activeDeviceStateIdValue,
              addr: formData.silence.outputValueNumber,
              value: formData.silence.varValue,
              condition: formData.silence.activeConditionValue,
              controller_id: formData.silence.activeControllerId,
            },
          },
        };
        let cleanOpenCloseData = JSON.parse(JSON.stringify(openCloseData));

        dispatch(widgetActions.addOpenCloseWidget({ userId: id, data: cleanOpenCloseData }));
        onClose();
        break;
      case 'percent_button':
        const percentData = {
          name: nameValue,
          controller_id: activeControllerId,
          group_id: activeGroupId,
          input: {
            object: formData.input.activeDeviceTypeElementValue,
            device: formData.input.activeDeviceStateIdValue,
            addr: formData.input.outputValueNumber,
          },
          state: {
            disable: {
              object: formData.disable.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.disable.activeDeviceStateIdValue,
              addr: formData.disable.outputValueNumber,
              value: formData.disable.varValue,
              condition: formData.disable.activeConditionValue,
            },
            silent: {
              object: formData.silence.activeDeviceTypeElementValue,
              device: formData.silence.activeDeviceStateIdValue,
              addr: formData.silence.outputValueNumber,
              value: formData.silence.varValue,
              condition: formData.silence.activeConditionValue,
              controller_id: formData.silence.activeControllerId,
            },
          },
        };
        let cleanPercentData = JSON.parse(JSON.stringify(percentData));

        dispatch(widgetActions.addPercentWidget({ userId: id, data: cleanPercentData }));
        onClose();
        break;
      case 'bar_button':
        const barButtonData = {
          name: nameValue,
          controller_id: activeControllerId,
          group_id: activeGroupId,
          min: formData.minMax.minValue,
          max: formData.minMax.maxValue,
          change: {
            object: formData.change.activeDeviceTypeElementValue,
            device: formData.change.activeDeviceStateIdValue,
            addr: formData.change.outputValueNumber,
          },
          state: {
            disable: {
              object: formData.disable.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.disable.activeDeviceStateIdValue,
              addr: formData.disable.outputValueNumber,
              value: formData.disable.varValue,
              condition: formData.disable.activeConditionValue,
            },
            silent: {
              object: formData.silence.activeDeviceTypeElementValue,
              device: formData.silence.activeDeviceStateIdValue,
              addr: formData.silence.outputValueNumber,
              value: formData.silence.varValue,
              condition: formData.silence.activeConditionValue,
              controller_id: formData.silence.activeControllerId,
            },
          },
        };
        let cleanBarButtonData = JSON.parse(JSON.stringify(barButtonData));

        dispatch(widgetActions.addBarButtonWidget({ userId: id, data: cleanBarButtonData }));
        onClose();
        break;
      case 'temp_regulator_button':
        const tempRegulatorData = {
          name: nameValue,
          controller_id: activeControllerId,
          group_id: activeGroupId,
          min: formData.minMax.minValue,
          max: formData.minMax.maxValue,
          change: {
            object: formData.change.activeDeviceTypeElementValue,
            device: formData.change.activeDeviceStateIdValue,
            addr: formData.change.outputValueNumber,
          },
          state: {
            disable: {
              object: formData.disable.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.disable.activeDeviceStateIdValue,
              addr: formData.disable.outputValueNumber,
              value: formData.disable.varValue,
              condition: formData.disable.activeConditionValue,
            },
            silent: {
              object: formData.silence.activeDeviceTypeElementValue,
              device: formData.silence.activeDeviceStateIdValue,
              addr: formData.silence.outputValueNumber,
              value: formData.silence.varValue,
              condition: formData.silence.activeConditionValue,
              controller_id: formData.silence.activeControllerId,
            },
          },
        };
        let cleanTempRegulatorData = JSON.parse(JSON.stringify(tempRegulatorData));

        dispatch(
          widgetActions.addTempRegulatorWidget({ userId: id, data: cleanTempRegulatorData }),
        );
        onClose();
        break;
      case 'rgb':
        const rgbData = {
          name: nameValue,
          controller_id: activeControllerId,
          group_id: activeGroupId,
          min: formData.minMax.minValue,
          max: formData.minMax.maxValue,
          change: {
            red: {
              object: formData.change_r.activeDeviceTypeElementValue,
              device: formData.change_r.activeDeviceStateIdValue,
              addr: formData.change_r.outputValueNumber,
            },
            green: {
              object: formData.change_g.activeDeviceTypeElementValue,
              device: formData.change_g.activeDeviceStateIdValue,
              addr: formData.change_g.outputValueNumber,
            },
            blue: {
              object: formData.change_b.activeDeviceTypeElementValue,
              device: formData.change_b.activeDeviceStateIdValue,
              addr: formData.change_b.outputValueNumber,
            },
          },
          state: {
            disable: {
              object: formData.disable.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.disable.activeDeviceStateIdValue,
              addr: formData.disable.outputValueNumber,
              value: formData.disable.varValue,
              condition: formData.disable.activeConditionValue,
            },
            silent: {
              object: formData.silence.activeDeviceTypeElementValue,
              device: formData.silence.activeDeviceStateIdValue,
              addr: formData.silence.outputValueNumber,
              value: formData.silence.varValue,
              condition: formData.silence.activeConditionValue,
              controller_id: formData.silence.activeControllerId,
            },
          },
        };
        let cleanRgbDataData = JSON.parse(JSON.stringify(rgbData));

        dispatch(widgetActions.addRGBWidget({ userId: id, data: cleanRgbDataData }));
        onClose();
        break;
      case 'point':
        const pointData = {
          name: nameValue,
          controller_id: activeControllerId,
          group_id: activeGroupId,
          input: {
            on: {
              object: formData.input_on.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.input_on.activeDeviceStateIdValue,
              addr: formData.input_on.outputValueNumber,
              value: formData.input_on.varValue,
              condition: formData.input_on.activeConditionValue,
            },
          },
          state: {
            disable: {
              object: formData.disable.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.disable.activeDeviceStateIdValue,
              addr: formData.disable.outputValueNumber,
              value: formData.disable.varValue,
              condition: formData.disable.activeConditionValue,
            },
            silent: {
              object: formData.silence.activeDeviceTypeElementValue,
              device: formData.silence.activeDeviceStateIdValue,
              addr: formData.silence.outputValueNumber,
              value: formData.silence.varValue,
              condition: formData.silence.activeConditionValue,
              controller_id: formData.silence.activeControllerId,
            },
          },
        };
        let cleanPointData = JSON.parse(JSON.stringify(pointData));

        dispatch(widgetActions.addPointWidget({ userId: id, data: cleanPointData }));
        onClose();
        break;
      case 'advanced_openclose':
        const advancedOpencloseData = {
          name: nameValue,
          controller_id: activeControllerId,
          group_id: activeGroupId,
          output: {
            on: {
              object: formData.output_on.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.output_on.activeDeviceStateIdValue,
              addr: formData.output_on.outputValueNumber,
              value: formData.output_on.varValue,
            },
            off: {
              object: formData.output_off.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.output_off.activeDeviceStateIdValue,
              addr: formData.output_off.outputValueNumber,
              value: formData.output_off.varValue,
            },
          },
          state: {
            disable: {
              object: formData.disable.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.disable.activeDeviceStateIdValue,
              addr: formData.disable.outputValueNumber,
              value: formData.disable.varValue,
              condition: formData.disable.activeConditionValue,
            },
            silent: {
              object: formData.silence.activeDeviceTypeElementValue,
              device: formData.silence.activeDeviceStateIdValue,
              addr: formData.silence.outputValueNumber,
              value: formData.silence.varValue,
              condition: formData.silence.activeConditionValue,
              controller_id: formData.silence.activeControllerId,
            },
          },
        };
        let cleanAdvancedOpencloseData = JSON.parse(JSON.stringify(advancedOpencloseData));

        dispatch(
          widgetActions.addAdvancedOpencloseWidget({
            userId: id,
            data: cleanAdvancedOpencloseData,
          }),
        );
        onClose();
        break;
      case 'temp':
        const tempData = {
          name: nameValue,
          controller_id: activeControllerId,
          group_id: activeGroupId,
          input: {
            object: formData.input_temp.activeDeviceTypeElementValue,
            device: formData.input_temp.activeDeviceStateIdValue,
            addr: formData.input_temp.outputValueNumber,
          },
          state: {
            disable: {
              object: formData.disable.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.disable.activeDeviceStateIdValue,
              addr: formData.disable.outputValueNumber,
              value: formData.disable.varValue,
              condition: formData.disable.activeConditionValue,
            },
            silent: {
              object: formData.silence.activeDeviceTypeElementValue,
              device: formData.silence.activeDeviceStateIdValue,
              addr: formData.silence.outputValueNumber,
              value: formData.silence.varValue,
              condition: formData.silence.activeConditionValue,
              controller_id: formData.silence.activeControllerId,
            },
          },
        };
        let cleanTempData = JSON.parse(JSON.stringify(tempData));

        dispatch(widgetActions.addTempWidget({ userId: id, data: cleanTempData }));
        onClose();
        break;
      case 'power_metter':
        const powerMetterData = {
          name: nameValue,
          controller_id: activeControllerId,
          group_id: activeGroupId,
          timeout: formData.timeout.intervalValue,
          input: {
            current: {
              bits_15_0: {
                object: formData.interval_current_value_15_0.activeDeviceTypeElementValue,
                device: formData.interval_current_value_15_0.activeDeviceStateIdValue,
                addr: formData.interval_current_value_15_0.outputValueNumber,
              },
              bits_31_16: {
                object: formData.interval_current_value_31_16.activeDeviceTypeElementValue,
                device: formData.interval_current_value_31_16.activeDeviceStateIdValue,
                addr: formData.interval_current_value_31_16.outputValueNumber,
              },
            },
            hour: {
              bits_15_0: {
                object: formData.interval_hours_15_0.activeDeviceTypeElementValue,
                device: formData.interval_hours_15_0.activeDeviceStateIdValue,
                addr: formData.interval_hours_15_0.outputValueNumber,
              },
              bits_31_16: {
                object: formData.interval_hours_31_16.activeDeviceTypeElementValue,
                device: formData.interval_hours_31_16.activeDeviceStateIdValue,
                addr: formData.interval_hours_31_16.outputValueNumber,
              },
            },
            day: {
              bits_15_0: {
                object: formData.interval_day_15_0.activeDeviceTypeElementValue,
                device: formData.interval_day_15_0.activeDeviceStateIdValue,
                addr: formData.interval_day_15_0.outputValueNumber,
              },
              bits_31_16: {
                object: formData.interval_day_31_16.activeDeviceTypeElementValue,
                device: formData.interval_day_31_16.activeDeviceStateIdValue,
                addr: formData.interval_day_31_16.outputValueNumber,
              },
            },
            week: {
              bits_15_0: {
                object: formData.interval_week_15_0.activeDeviceTypeElementValue,
                device: formData.interval_week_15_0.activeDeviceStateIdValue,
                addr: formData.interval_week_15_0.outputValueNumber,
              },
              bits_31_16: {
                object: formData.interval_week_31_16.activeDeviceTypeElementValue,
                device: formData.interval_week_31_16.activeDeviceStateIdValue,
                addr: formData.interval_week_31_16.outputValueNumber,
              },
            },
            month: {
              bits_15_0: {
                object: formData.interval_month_15_0.activeDeviceTypeElementValue,
                device: formData.interval_month_15_0.activeDeviceStateIdValue,
                addr: formData.interval_month_15_0.outputValueNumber,
              },
              bits_31_16: {
                object: formData.interval_month_31_16.activeDeviceTypeElementValue,
                device: formData.interval_month_31_16.activeDeviceStateIdValue,
                addr: formData.interval_month_31_16.outputValueNumber,
              },
            },
            year: {
              bits_15_0: {
                object: formData.interval_year_15_0.activeDeviceTypeElementValue,
                device: formData.interval_year_15_0.activeDeviceStateIdValue,
                addr: formData.interval_year_15_0.outputValueNumber,
              },
              bits_31_16: {
                object: formData.interval_year_31_16.activeDeviceTypeElementValue,
                device: formData.interval_year_31_16.activeDeviceStateIdValue,
                addr: formData.interval_year_31_16.outputValueNumber,
              },
            },
            all_time: {
              bits_15_0: {
                object: formData.interval_all_time_15_0.activeDeviceTypeElementValue,
                device: formData.interval_all_time_15_0.activeDeviceStateIdValue,
                addr: formData.interval_all_time_15_0.outputValueNumber,
              },
              bits_31_16: {
                object: formData.interval_all_time_31_16.activeDeviceTypeElementValue,
                device: formData.interval_all_time_31_16.activeDeviceStateIdValue,
                addr: formData.interval_all_time_31_16.outputValueNumber,
              },
            },
          },
          state: {
            disable: {
              object: formData.disable.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.disable.activeDeviceStateIdValue,
              addr: formData.disable.outputValueNumber,
              value: formData.disable.varValue,
              condition: formData.disable.activeConditionValue,
            },
            silent: {
              object: formData.silence.activeDeviceTypeElementValue,
              device: formData.silence.activeDeviceStateIdValue,
              addr: formData.silence.outputValueNumber,
              value: formData.silence.varValue,
              condition: formData.silence.activeConditionValue,
              controller_id: formData.silence.activeControllerId,
            },
          },
        };
        let cleanPowerMetterData = JSON.parse(JSON.stringify(powerMetterData));
        console.log(cleanPowerMetterData);

        dispatch(widgetActions.addPowerMetterWidget({ userId: id, data: cleanPowerMetterData }));
        onClose();
        break;
      case 'double_bar_button':
        const doubleBarButtonData = {
          name: nameValue,
          controller_id: activeControllerId,
          group_id: activeGroupId,
          change: {
            bar1: {
              object: formData.change_bar1.activeDeviceTypeElementValue,
              device: formData.change_bar1.activeDeviceStateIdValue,
              addr: formData.change_bar1.outputValueNumber,
              name: formData.change_bar1.name,
              min_name: formData.change_bar1.labelMinValue,
              max_name: formData.change_bar1.labelMaxValue,
              min: formData.change_bar1.minValue,
              max: formData.change_bar1.maxValue,
            },
            bar2: {
              object: formData.change_bar2.activeDeviceTypeElementValue,
              device: formData.change_bar2.activeDeviceStateIdValue,
              addr: formData.change_bar2.outputValueNumber,
              name: formData.change_bar2.name,
              min_name: formData.change_bar2.labelMinValue,
              max_name: formData.change_bar2.labelMaxValue,
              min: formData.change_bar2.minValue,
              max: formData.change_bar2.maxValue,
            },
          },
          state: {
            disable: {
              object: formData.disable.activeDeviceTypeElementValue,
              name: nameValue,
              device: formData.disable.activeDeviceStateIdValue,
              addr: formData.disable.outputValueNumber,
              value: formData.disable.varValue,
              condition: formData.disable.activeConditionValue,
            },
            silent: {
              object: formData.silence.activeDeviceTypeElementValue,
              device: formData.silence.activeDeviceStateIdValue,
              addr: formData.silence.outputValueNumber,
              value: formData.silence.varValue,
              condition: formData.silence.activeConditionValue,
              controller_id: formData.silence.activeControllerId,
            },
          },
        };
        let cleanDoubleBarButtonData = JSON.parse(JSON.stringify(doubleBarButtonData));

        dispatch(
          widgetActions.addDoubleBarButtonWidget({ userId: id, data: cleanDoubleBarButtonData }),
        );
        onClose();
        break;
      default:
        console.log('default case');
        break;
    }
  };

  const getData = (values: any) => {
    const key = values.type;
    let obj: any = {};
    obj[key] = values;

    setFormData((prev: any) => {
      return { ...prev, ...obj };
    });
  };

  if (isModalLoading) return <Loader />;

  return (
    <Modal open={true} onClose={onClose} className={styles.modalNewWidget}>
      <div className={styles.modalLabel}>
        {t('new_widget_for')} {currentUser?.name}
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.chooseTypeContainer}>
          <Swiper
            slidesPerView={7}
            spaceBetween={0}
            slidesPerGroup={1}
            initialSlide={1}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true,
            }}
            speed={activeType ? 999999 : 2500}
            modules={[Autoplay]}
          >
            {widgetTypes.map((type) => (
              <SwiperSlide key={type.id}>
                <div
                  className={
                    activeType?.id === type.id ? typeActiveWrapperClasses : styles.typeWrapper
                  }
                  onClick={() => changeActiveType(type)}
                >
                  {type.icon ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${type.icon}`}
                      className={styles.widgetImg}
                    />
                  ) : (
                    <div className={styles.widgetNoImg}>in dev</div>
                  )}
                  <div className={styles.typeName}>{t(`${type.name}`)}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {activeType && (
          <div className={styles.chooseParamsContainer}>
            <div className={styles.labelParams}>
              {t('choose_params_for_widget')}: {t(`${activeType?.name}`)}
            </div>

            <div className={styles.groupParams}>
              <div className={styles.paramWrapper}>
                <div className={styles.param}>{t('choose_controller')}:</div>
                <select
                  className={styles.select}
                  value={activeControllerId ? activeControllerId : ''}
                  onChange={(e) => setActiveControllerId(e.target.value)}
                >
                  <option value={''} key={0}>
                    {t('---choose_here---')}
                  </option>
                  {currentUser?.devices?.map((device) => (
                    <option
                      key={device.id}
                      value={device.id}
                    >{`${device.name} (${device.x_evo_device})`}</option>
                  ))}
                </select>
              </div>
              <div className={styles.paramWrapper}>
                <div className={styles.param}>{t('choose_group')}:</div>
                <select
                  className={styles.select}
                  onChange={(e) => setActiveGroupId(e.target.value)}
                >
                  <option value={''} key={0}>
                    {t('---choose_here---')}
                  </option>
                  {groupWidgets?.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.paramWrapper}>
                <div className={styles.param}>{t('widget_name')}:</div>
                <input
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            {activeControllerId &&
              (deviceState ? (
                <ElementsForWidgetType
                  type={activeType.name}
                  deviceState={deviceState}
                  getValues={(values) => getData(values)}
                />
              ) : (
                <div className={styles.labelParamsNoStates}>
                  {t('this_controller_without_devices_states')}
                </div>
              ))}
          </div>
        )}
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
