import { useEffect, useState } from 'react';

import { WidgetType } from '../../types';
import styles from './Widget.module.css';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';

export const TempReg: React.FC<{ WidgetData: WidgetType }> = ({ WidgetData }) => {
  const [barAmount, setBarAmount] = useState<number>(0);
  const [mousePlace, setMousePlace] = useState<number>(0);
  const [isChangeBar, setChangeBar] = useState<boolean>(false);
  const [isOn, setOn] = useState<boolean>(false);
  const [currentQuater, setCurrentQuater] = useState<number>(1);
  const [coordX, setCoordX] = useState<number>(0);
  const [coordY, setCoordY] = useState<number>(0);
  const [currentValue, setCurrentValue] = useState<number>(0);

  const lineStyles = {
    width: '140px',
    height: '140px',
    transform: 'rotate(230deg)',
    background: `conic-gradient(blue 0deg, blue 1deg, red ${barAmount}deg, transparent ${barAmount}deg, transparent 269deg, red 269deg, red 270deg, transparent 270deg)`,
    opacity: '0.7',
    borderRadius: '50%',
  };

  const barStyles = {
    cursor: isOn ? 'pointer' : 'not-allowed',
    backgroundColor: isOn ? '#c0e0ff' : '#1b5c9e',
  };

  let tempPickerCoverBackground = {
    display: isOn ? 'none' : 'block',
    background: isOn ? 'none' : 'rgba(255, 255, 255, 0.6)',
  };

  const states = JSON.parse(WidgetData.controller.current_raw_state);
  const deviceIndex = WidgetData.control_elements.input
    ? WidgetData.control_elements.input.device
    : WidgetData.control_elements.change.device;

  const currentDeviceState = states.state
    ? states.state
    : states.states.find((state: any) => state.device.toString() === deviceIndex);

  useEffect(() => {
    if (WidgetData.control_elements.input) {
      setCurrentValue(
        Math.round(
          currentDeviceState[WidgetData.control_elements.input.object][
            Number(WidgetData.control_elements.input.addr) - 1
          ],
        ),
      );
    } else {
      setCurrentValue(
        Math.round(
          currentDeviceState[WidgetData.control_elements.change.object][
            Number(WidgetData.control_elements.change.addr) - 1
          ],
        ),
      );
    }
  }, [WidgetData]);

  useEffect(() => {
    if (currentValue > Number(WidgetData.max)) {
      setCurrentValue(currentValue / 100);
    }
  }, [currentValue, WidgetData]);

  useEffect(() => {
    let interval = Number(WidgetData.max) - Number(WidgetData.min);

    if (Number(WidgetData.max) > 100) {
      interval = interval / 100;
    }

    const currentValueAbs = currentValue - Number(WidgetData.min);
    const currentPercentValue = (currentValueAbs * 100) / interval;
    const currentGragValue = currentPercentValue * 2.7;
    setBarAmount(currentGragValue);
  }, [currentValue, WidgetData]);

  const changeMousePlace = (e: any) => {
    if (isOn) {
      setCoordX(e.nativeEvent.offsetX / 1.3 - 50);
      setCoordY(-e.nativeEvent.offsetY / 1.3 + 50);
    }
  };

  useEffect(() => {
    if (coordX > 0 && coordY > 0) {
      setCurrentQuater(1);
    }

    if (coordX > 0 && coordY < 0) {
      setCurrentQuater(2);
    }

    if (coordX <= 0 && coordY <= 0) {
      setCurrentQuater(3);
    }

    if (coordX < 0 && coordY > 0) {
      setCurrentQuater(4);
    }
  }, [coordX, coordY]);

  useEffect(() => {
    let alpha = (Math.atan(coordX / coordY) * 180) / Math.PI;

    switch (currentQuater) {
      case 2:
        alpha = 180 + alpha;
        break;
      case 3:
        alpha = 180 + alpha;
        break;
      case 4:
        alpha = 360 + alpha;
        break;
      case 1:
      default:
        break;
    }
    if (currentQuater === 4) {
      if (alpha >= 315) {
        setMousePlace(0);
      } else if (alpha < 315) {
        setMousePlace(270);
      }
    } else {
      setMousePlace(alpha);
    }
  }, [currentQuater, coordX, coordY]);

  useEffect(() => {
    if (isOn && isChangeBar) {
      setBarAmount(mousePlace);
    }
  }, [isChangeBar, isOn, mousePlace]);

  const sendData = () => {
    if (isOn && isChangeBar) {
      let interval = Number(WidgetData.max) - Number(WidgetData.min);

      let minTemp = Number(WidgetData.min);
      if (Number(WidgetData.max) > 100) {
        minTemp = minTemp / 100;
        interval = interval / 100;
      }

      setCurrentValue(Math.round(minTemp + (interval * mousePlace) / 270));
      setChangeBar(false);

      console.log('new temp: ', Math.round(minTemp + (interval * mousePlace) / 270));
    }
  };

  return (
    <div className={styles.bigWidgetWrapper}>
      <div className={styles.widgetName}> {WidgetData.name}</div>
      <div className={styles.widgetGroupName}> {WidgetData.group.name}</div>
      <div className={styles.tempPickerWrapper}>
        <div className={styles.minGrad}>{WidgetData.min}°</div>
        <div
          style={barStyles}
          className={styles.circleBar}
          onMouseMove={(e) => {
            changeMousePlace(e);
          }}
          onMouseDown={(e) => {
            if (isOn) {
              setChangeBar(true);
              changeMousePlace(e);
            }
          }}
          onMouseUp={sendData}
          onMouseLeave={sendData}
        >
          <div style={lineStyles} />
        </div>
        <div className={styles.labelTemp}>{isNaN(currentValue) ? '--' : currentValue}°</div>
        <div className={styles.maxGrad}>
          {Number(WidgetData.max) > 100 ? Number(WidgetData.max) / 100 : WidgetData.max}°
        </div>
      </div>
      <div className={styles.tempPickerCover} style={tempPickerCoverBackground} />
      <div className={styles.toggleWrapperTemp}>
        <ToggleSwitch
          isWidget={true}
          size="short"
          checked={!!isOn}
          labels={[<div />, <div />]}
          onChange={() => setOn((prev) => !prev)}
        />
      </div>
    </div>
  );
};
