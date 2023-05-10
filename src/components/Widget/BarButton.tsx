import { useEffect, useState } from 'react';
import { WidgetType } from '../../types';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';
import styles from './Widget.module.css';

export const BarButton: React.FC<{ WidgetData: WidgetType }> = ({ WidgetData }) => {
  const [barAmount, setBarAmount] = useState<number>(0);
  const [mousePlace, setMousePlace] = useState<number>(0);
  const [isOn, setOn] = useState<boolean>(false);
  const [isChangeBar, setChangeBar] = useState<boolean>(false);

  const lineStyles = {
    width: `${barAmount}%`,
    height: '16px',
    backgroundColor: isOn ? '#ffffff' : '#173b59',
    borderRadius: '4px',
  };

  const barStyles = {
    cursor: isOn ? 'pointer' : 'not-allowed',
    backgroundColor: isOn ? '#c0e0ff' : '#1b5c9e',
  };

  const states = JSON.parse(WidgetData.controller.current_raw_state);

  let currentDeviceState;

  if (WidgetData.control_elements.input?.device) {
    currentDeviceState = states.states.find(
      (state: any) => state.device.toString() === WidgetData.control_elements.input.device,
    );
  } else {
    console.log('device not found', WidgetData.id);
  }

  const currentValue =
    currentDeviceState &&
    Math.round(
      currentDeviceState[WidgetData.control_elements.input.object][
        Number(WidgetData.control_elements.input.addr) - 1
      ] / 100,
    );

  useEffect(() => {
    setBarAmount(currentValue);
    if (currentValue !== 0) {
      setOn(true);
    }
  }, [WidgetData, currentValue]);

  const changeMousePlace = (e: any) => {
    if (isOn) {
      setMousePlace(Math.round(e.nativeEvent.offsetX / 1.4));
    }
  };

  useEffect(() => {
    if (isOn && isChangeBar) {
      setBarAmount(mousePlace);
    }
  }, [isChangeBar, isOn, mousePlace]);

  const sendData = () => {
    if (isOn && isChangeBar) {
      setChangeBar(false);
      console.log(
        'newData: ',
        Math.round((barAmount / 100) * Number(WidgetData.max)),
        'of',
        Number(WidgetData.max),
      );
    }
  };

  return (
    <div className={styles.middleWidgetWrapper}>
      <div className={styles.widgetName}> {WidgetData.name}</div>
      <div className={styles.widgetGroupName}> {WidgetData.group.name}</div>
      <div className={styles.toggleWrapper}>
        <ToggleSwitch
          isWidget={true}
          size="short"
          checked={!!isOn}
          labels={[<div />, <div />]}
          onChange={() => setOn((prev) => !prev)}
        />

        <div className={styles.percentBar}>{barAmount}</div>
        <div
          style={barStyles}
          className={styles.bar}
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
      </div>
    </div>
  );
};
