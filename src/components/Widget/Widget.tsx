import React, { useEffect, useState } from 'react';

import styles from './Widget.module.css';
import { WidgetType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { widgetActions } from '../../redux/widgets/actions';
import { widgetSettingsActions } from '../../redux/widgets/reducers';
import { Loader } from '../Loader/Loader';
import { TemperatureIcon } from '../Icons/TemperatureIcon';
import { t } from 'i18next';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';
import { BinaryButton } from './BinaryButton';
import { Button } from '../Button/Button';
import { OpenIcon } from '../Icons/OpenIcon';
import { CloseIcon } from '../Icons/CloseIcon';
import { BarButton } from './BarButton';
import { Rgb } from './Rgb';
import { TempReg } from './TempReg';

export const Widget: React.FC<{ WidgetData: WidgetType; size: string }> = ({
  WidgetData,
  size,
}) => {
  const dispatch = useAppDispatch();
  const [StreamToken, setStreamToken] = useState<string>('');
  const [cameraStream, setCameraStream] = useState<string>('');
  const cameraView = useAppSelector((state) => state.widgetReducer.cameraFrame);

  useEffect(() => {
    if (WidgetData.type?.name === 'rtsp') {
      setStreamToken(WidgetData.control_elements.input.token);
    }
  }, [WidgetData]);

  useEffect(() => {
    if (StreamToken) {
      setCameraStream(StreamToken);
    }
  }, [StreamToken]);

  useEffect(() => {
    if (cameraStream) {
      const interval = setInterval(() => {
        dispatch(widgetActions.getStream(cameraStream));
      }, 500);
      return () => {
        clearInterval(interval);
        dispatch(widgetSettingsActions.resetCameraFrame());
      };
    }
  }, [dispatch, cameraStream]);

  const iconClick = (value: string) => {
    console.log('icon value = ', value);
  };

  return (
    <>
      {(() => {
        switch (size) {
          case 'big':
            switch (WidgetData.type?.name) {
              case 'rtsp':
                return (
                  <div className={styles.bigWidgetWrapper}>
                    <div className={styles.widgetName}> {WidgetData.name}</div>
                    <div className={styles.widgetGroupName}> {WidgetData.group.name}</div>
                    {cameraView[StreamToken]?.img_small && (
                      <img
                        src={`https://cams.evocontrols.com/?url=http://cams.evocontrols.com:8282${cameraView[StreamToken]?.img_small}`}
                        className={styles.webcam}
                        height={145}
                        alt="webcam"
                      />
                    )}
                  </div>
                );
              case 'rgb':
                if (WidgetData.controller?.current_raw_state) {
                  return <Rgb WidgetData={WidgetData} />;
                } else
                  return (
                    <div className={styles.littleWidgetWrapper}>
                      widget without controller state
                    </div>
                  );
              case 'temp_regulator_button':
                if (WidgetData.controller?.current_raw_state) {
                  return <TempReg WidgetData={WidgetData} />;
                } else
                  return (
                    <div className={styles.littleWidgetWrapper}>
                      widget without controller state
                    </div>
                  );
              default:
                return (
                  <div className={styles.bigWidgetWrapper}>
                    big widget {WidgetData.type ? WidgetData.type.name : WidgetData.name}
                  </div>
                );
            }
          case 'middle':
            if (WidgetData.controller?.current_raw_state) {
              return <BarButton WidgetData={WidgetData} />;
            } else
              return (
                <div className={styles.littleWidgetWrapper}>widget without controller state</div>
              );
          case 'little':
            let states;
            let currentDeviceState;

            switch (WidgetData.type?.name) {
              case 'icons':
                return (
                  <div className={styles.littleWidgetIconsContainer}>
                    {/* {WidgetData.control_elements.input.icons.length < 5 ? ( */}
                    <div className={styles.widgetIconsWrapper}>
                      <div className={styles.widgetIconsName}>{WidgetData.name}</div>
                      <div
                        className={
                          WidgetData.control_elements.input.icons.length < 5
                            ? styles.iconsContainerWithoutScroll
                            : styles.iconsContainerWithScroll
                        }
                      >
                        {WidgetData.control_elements.input.icons.map((icon: any) => {
                          return (
                            <div key={icon.icon}>
                              <img
                                className={styles.icon}
                                src={icon.icon}
                                onClick={() => iconClick(icon.label)}
                                alt={icon.label}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* ) : (
                      <div className={styles.middleWidgetIconsWrapper}>
                        <div className={styles.widgetIconsName}>{WidgetData.name}</div>
                        {WidgetData.control_elements.input.icons.map((icon: any) => {
                          return (
                            <div key={icon.icon}>
                              <img
                                className={styles.icon}
                                src={icon.icon}
                                onClick={() => iconClick(icon.label)}
                                alt={icon.label}
                              />
                            </div>
                          );
                        })}
                      </div>
                    )} */}
                  </div>
                );
              case 'temp':
                if (WidgetData.controller?.current_raw_state) {
                  states = JSON.parse(WidgetData.controller.current_raw_state);
                  currentDeviceState = states.states.find(
                    (state: any) =>
                      state.device.toString() === WidgetData.control_elements.input.device,
                  );
                  const currentTemperature = Math.round(
                    currentDeviceState[WidgetData.control_elements.input.object][
                      Number(WidgetData.control_elements.input.addr) - 1
                    ] / 100,
                  );

                  return (
                    <div className={styles.littleWidgetWrapper}>
                      <div className={styles.widgetName}> {WidgetData.name}</div>
                      <div className={styles.widgetGroupName}> {WidgetData.group.name}</div>
                      <div className={styles.temperatureWrapper}>
                        <TemperatureIcon />
                        <div className={styles.temperature}>
                          {currentTemperature === -99 ? '--' : currentTemperature} °C
                        </div>
                      </div>
                    </div>
                  );
                } else
                  return (
                    <div className={styles.littleWidgetWrapper}>
                      widget without controller state
                    </div>
                  );
              case 'point':
              case 'open_close_button':
                if (WidgetData.controller?.current_raw_state) {
                  states = JSON.parse(WidgetData.controller.current_raw_state);

                  const conditionForOn = WidgetData.control_elements.input.on.condition;
                  const valueForOn = Number(WidgetData.control_elements.input.on.value);

                  const currentStateValueOn = states.states.find(
                    (state: any) =>
                      state.device.toString() === WidgetData.control_elements.input.on.device,
                  )[WidgetData.control_elements.input.on.object][
                    Number(WidgetData.control_elements.input.on.addr) - 1
                  ];

                  let currentStateValueOff;
                  let conditionForOff;
                  let valueForOff;

                  if (
                    WidgetData.control_elements.input.off &&
                    WidgetData.control_elements.input.off.object
                  ) {
                    currentStateValueOff = states.states.find(
                      (state: any) =>
                        state.device.toString() === WidgetData.control_elements.input.off.device,
                    )[WidgetData.control_elements.input.off.object][
                      Number(WidgetData.control_elements.input.off.addr) - 1
                    ];

                    conditionForOff = WidgetData.control_elements.input.off.condition;
                    valueForOff = Number(WidgetData.control_elements.input.off.value);
                  }

                  let isOn: Boolean = false;
                  let isOff: Boolean = false;

                  switch (conditionForOn) {
                    case '=':
                      isOn = currentStateValueOn === valueForOn;
                      break;
                    case '><':
                      isOn = currentStateValueOn !== valueForOn;
                      break;
                    case '>':
                      isOn = currentStateValueOn > valueForOn;
                      break;
                    case '<':
                      isOn = currentStateValueOn < valueForOn;
                      break;
                    case '<=':
                      isOn = currentStateValueOn <= valueForOn;
                      break;
                    case '>=':
                      isOn = currentStateValueOn >= valueForOn;
                      break;
                  }

                  switch (conditionForOff) {
                    case undefined: {
                      break;
                    }
                    case '=':
                      isOff = currentStateValueOff === valueForOff;
                      break;
                    case '><':
                      isOff = currentStateValueOff !== valueForOff;
                      break;
                    case '>':
                      if (valueForOff) {
                        isOff = currentStateValueOff > valueForOff;
                      }
                      break;
                    case '<':
                      if (valueForOff) {
                        isOff = currentStateValueOff < valueForOff;
                      }
                      break;
                    case '<=':
                      if (valueForOff) {
                        isOff = currentStateValueOff <= valueForOff;
                      }
                      break;
                    case '>=':
                      if (valueForOff) {
                        isOff = currentStateValueOff >= valueForOff;
                      }
                      break;
                  }

                  if (isOff) {
                    isOn = false;
                  }

                  return (
                    <div className={styles.littleWidgetWrapper}>
                      <div className={styles.widgetName}>{WidgetData.name}</div>
                      <div className={styles.widgetGroupName}>{WidgetData.group.name}</div>
                      <div className={styles.pointWrapper}>
                        {WidgetData.type?.name === 'open_close_button' ? (
                          isOn ? (
                            <div className={styles.openLabel}>{t('open')}</div>
                          ) : (
                            <div className={styles.closedLabel}>{t('closed')}</div>
                          )
                        ) : (
                          <div className={isOn ? styles.greyPoint : styles.redPoint} />
                        )}
                      </div>
                    </div>
                  );
                } else
                  return (
                    <div className={styles.littleWidgetWrapper}>
                      widget without controller state
                    </div>
                  );
              case 'percent_button':
                if (WidgetData.controller?.current_raw_state) {
                  states = JSON.parse(WidgetData.controller.current_raw_state);
                  currentDeviceState = states.states.find(
                    (state: any) =>
                      state.device.toString() === WidgetData.control_elements.input.device,
                  );
                  const currentPercents = Math.round(
                    currentDeviceState[WidgetData.control_elements.input.object][
                      Number(WidgetData.control_elements.input.addr) - 1
                    ] / 100,
                  );

                  return (
                    <div className={styles.littleWidgetWrapper}>
                      <div className={styles.widgetName}> {WidgetData.name}</div>
                      <div className={styles.widgetGroupName}> {WidgetData.group.name}</div>
                      <div className={styles.temperatureWrapper}>
                        <div className={styles.temperature}>
                          {isNaN(currentPercents) ? '--' : currentPercents}%
                        </div>
                      </div>
                    </div>
                  );
                } else
                  return (
                    <div className={styles.littleWidgetWrapper}>
                      widget without controller state
                    </div>
                  );

              case 'binary_button':
                if (WidgetData.controller?.current_raw_state) {
                  return <BinaryButton WidgetData={WidgetData} />;
                } else
                  return (
                    <div className={styles.littleWidgetWrapper}>
                      widget without controller state
                    </div>
                  );
              case 'advanced_openclose':
                if (WidgetData.controller?.current_raw_state) {
                  return (
                    <div className={styles.littleWidgetWrapper}>
                      <div className={styles.widgetName}> {WidgetData.name}</div>
                      <div className={styles.widgetGroupName}> {WidgetData.group.name}</div>
                      <div className={styles.buttonsContainer}>
                        <Button beforeIcon={<OpenIcon />} className={styles.openCloseBtns} />
                        <Button beforeIcon={<CloseIcon />} className={styles.openCloseBtns} />
                      </div>
                    </div>
                  );
                } else
                  return (
                    <div className={styles.littleWidgetWrapper}>
                      widget without controller state
                    </div>
                  );
              default:
                return (
                  <div className={styles.littleWidgetWrapper}>
                    {WidgetData.type ? WidgetData.type.name : WidgetData.name}
                    {/* <img src={`${process.env.REACT_APP_API_URL}${WidgetData.type?.icon}`} /> */}
                  </div>
                );
            }

          default:
            return (
              <div className={styles.littleWidgetWrapper}>
                {WidgetData.type ? WidgetData.type.name : WidgetData.name}
              </div>
            );
        }
      })()}
    </>
  );
};
