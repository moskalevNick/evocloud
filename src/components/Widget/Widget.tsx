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

type widgetSizeType = 'big' | 'middle' | 'little';

export const Widget: React.FC<{ WidgetData: WidgetType }> = ({ WidgetData }) => {
  const dispatch = useAppDispatch();
  const [widgetSize, setWidgetSize] = useState<widgetSizeType>('little');
  const [StreamToken, setStreamToken] = useState<string>('');
  const [cameraStream, setCameraStream] = useState<string>('');
  const cameraView = useAppSelector((state) => state.widgetReducer.cameraFrame);
  // console.log(WidgetData);

  // useEffect(() => {
  //   console.log(cameraView);
  // }, [cameraView]);

  useEffect(() => {
    if (WidgetData.type && WidgetData.type.name) {
      switch (WidgetData.type.name) {
        case 'rtsp':
          setStreamToken(WidgetData.control_elements.input.token);
          setWidgetSize('big');
          break;
        case 'temp_regulator_button':
        case 'rgb':
          setWidgetSize('big');
          break;
        case 'bar_button':
          setWidgetSize('middle');
          break;
      }
    }
  }, [WidgetData]);

  useEffect(() => {
    if (StreamToken) {
      setCameraStream(StreamToken);
    }
  }, [StreamToken]);

  useEffect(() => {
    if (cameraStream) {
      // const interval = setInterval(() => {
      //   dispatch(widgetActions.getStream(cameraStream));
      // }, 500);
      // return () => {
      //   clearInterval(interval);
      //   dispatch(widgetSettingsActions.resetCameraFrame());
      // };
    }
  }, [dispatch, cameraStream]);

  const iconClick = (value: string) => {
    console.log('icon value = ', value);
  };

  return (
    <>
      {(() => {
        switch (widgetSize) {
          case 'big':
            return (
              <div className={styles.bigWidgetWrapper}>
                <div className={styles.widgetName}> {WidgetData.name}</div>
                <div className={styles.widgetGroupName}> {WidgetData.group.name}</div>
                {cameraStream && cameraView && (
                  <div>
                    {cameraView[StreamToken]?.img_small ? (
                      <img
                        src={`http://cams.evocontrols.com:8282${cameraView[StreamToken]?.img_small}`}
                        className={styles.webcam}
                        height={145}
                        alt="webcam"
                      />
                    ) : (
                      <Loader />
                    )}
                  </div>
                )}
              </div>
            );
          case 'middle':
            if (WidgetData.controller?.current_raw_state) {
              const states = JSON.parse(WidgetData.controller.current_raw_state);
              const currentDeviceState = states.states.find(
                (state: any) =>
                  state.device.toString() === WidgetData.control_elements.input.device,
              );

              console.log(currentDeviceState);

              return (
                <div className={styles.middleWidgetWrapper}>
                  <div className={styles.widgetName}> {WidgetData.name}</div>
                  <div className={styles.widgetGroupName}> {WidgetData.group.name}</div>
                </div>
              );
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
                    <div className={styles.widgetLabel}>{WidgetData.name}</div>
                    {WidgetData.control_elements.input.icons.length < 5 ? (
                      <div className={styles.littleWidgetIconsWrapper}>
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
                    ) : (
                      <div className={styles.middleWidgetIconsWrapper}>
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
                    )}
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
                      Number(WidgetData.control_elements.input.addr)
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
                    Number(WidgetData.control_elements.input.on.addr)
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
                      Number(WidgetData.control_elements.input.off.addr)
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
                      <div className={styles.widgetName}> {WidgetData.name}</div>
                      <div className={styles.widgetGroupName}> {WidgetData.group.name}</div>
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
                      Number(WidgetData.control_elements.input.addr)
                    ] / 100,
                  );

                  return (
                    <div className={styles.littleWidgetWrapper}>
                      <div className={styles.widgetName}> {WidgetData.name}</div>
                      <div className={styles.widgetGroupName}> {WidgetData.group.name}</div>
                      <div className={styles.temperatureWrapper}>
                        <div className={styles.temperature}>{currentPercents}%</div>
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
                    <img src={`${process.env.REACT_APP_API_URL}${WidgetData.type?.icon}`} />
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
