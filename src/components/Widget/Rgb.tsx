import { useEffect, useState } from 'react';

import { WidgetType } from '../../types';
import styles from './Widget.module.css';
import IroColorPicker from '../ColorPicker/ColorPicker';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';

type colorType = {
  red: number;
  green: number;
  blue: number;
};

export const Rgb: React.FC<{ WidgetData: WidgetType }> = ({ WidgetData }) => {
  const [rgb, setRgb] = useState('');
  const [isOn, setOn] = useState<boolean>(false);
  const [barAmount, setBarAmount] = useState<number>(100);
  const [meterPlace, setMeterPlace] = useState<number>(0);
  const [isChangeBar, setChangeBar] = useState<boolean>(false);

  const states = JSON.parse(WidgetData.controller.current_raw_state);
  const currentDeviceState = states.state
    ? states.state
    : states.states.find(
        (state: any) => state.device.toString() === WidgetData.control_elements.input.red.device,
      );
  // const currentDeviceStateGreen = states.states.find(
  //   (state: any) => state.device.toString() === WidgetData.control_elements.input.green.device,
  // );
  // const currentDeviceStateBlue = states.states.find(
  //   (state: any) => state.device.toString() === WidgetData.control_elements.input.blue.device,
  // );

  const currentValueRed = Math.round(
    currentDeviceState[WidgetData.control_elements.input.red.object][
      Number(WidgetData.control_elements.input.red.addr) - 1
    ] / 100,
  );
  const currentValueGreen = Math.round(
    currentDeviceState[WidgetData.control_elements.input.green.object][
      Number(WidgetData.control_elements.input.green.addr) - 1
    ] / 100,
  );
  const currentValueBlue = Math.round(
    currentDeviceState[WidgetData.control_elements.input.blue.object][
      Number(WidgetData.control_elements.input.blue.addr) - 1
    ] / 100,
  );

  const barStyles = {
    cursor: isOn ? 'pointer' : 'not-allowed',
    backgroundColor: isOn ? '#c0e0ff' : '#1b5c9e',
  };

  const lineStyles = {
    width: `${barAmount}%`,
    height: '16px',
    backgroundColor: isOn ? rgb : '#173b59',
    borderRadius: '4px',
  };

  let colorPickerCoverBackground = {
    display: isOn ? 'none' : 'block',
    background: isOn ? 'none' : 'rgba(255, 255, 255, 0.6)',
  };

  useEffect(() => {
    if (currentValueRed && currentValueGreen && currentValueBlue) {
      setRgb(`rgb(${currentValueRed}, ${currentValueGreen}, ${currentValueBlue})`);
    } else setRgb('rgb(255,255,255)');
  }, [WidgetData]);

  useEffect(() => {
    if (isOn && isChangeBar) {
      setBarAmount(meterPlace);
    }
  }, [isChangeBar, isOn, meterPlace]);

  const changeMousePlace = (e: any) => {
    if (isOn) {
      setMeterPlace(Math.round(e.nativeEvent.offsetX / 1.4));
    }
  };

  const sendData = () => {
    if (isOn && isChangeBar) {
      console.log('newData: ', barAmount, ' of ', rgb, ' color');
      setChangeBar(false);
    }
  };

  const onColorChange = (color: colorType) => {
    setRgb(`rgb(${color.red}, ${color.green}, ${color.blue})`);
  };

  useEffect(() => {
    if (isOn) {
      console.log('newData: ', barAmount, ' of ', rgb, ' color');
    }
  }, [rgb]);

  return (
    <div className={styles.bigWidgetWrapper}>
      <div className={styles.widgetName}> {WidgetData.name}</div>
      <div className={styles.widgetGroupName}> {WidgetData.group.name}</div>
      <IroColorPicker
        color={rgb}
        onColorChange={(color: colorType) => {
          onColorChange(color);
        }}
        width={120}
        height={120}
      />
      <div className={styles.colorPickerCover} style={colorPickerCoverBackground} />
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
