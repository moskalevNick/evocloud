import { useState } from 'react';
import { WidgetType } from '../../types';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';
import styles from './Widget.module.css';

export const BinaryButton: React.FC<{ WidgetData: WidgetType }> = ({ WidgetData }) => {
  const [isOn, setOn] = useState<boolean | undefined>(undefined);
  const [isOff, setOff] = useState<boolean | undefined>(undefined);

  const states = JSON.parse(WidgetData.controller.current_raw_state);

  const conditionForOn = WidgetData.control_elements.input.on.condition;
  const valueForOn = Number(WidgetData.control_elements.input.on.value);

  const device =
    WidgetData.control_elements.input.on.device === ''
      ? '0'
      : WidgetData.control_elements.input.on.device;

  const currentStateValueOn = states.states?.find(
    (state: any) => state.device.toString() === device,
  )[WidgetData.control_elements.input.on.object][Number(WidgetData.control_elements.input.on.addr)];

  let currentStateValueOff;
  let conditionForOff;
  let valueForOff;

  if (WidgetData.control_elements.input.off && WidgetData.control_elements.input.off.object) {
    currentStateValueOff = states.states.find(
      (state: any) => state.device.toString() === WidgetData.control_elements.input.off.device,
    )[WidgetData.control_elements.input.off.object][
      Number(WidgetData.control_elements.input.off.addr)
    ];

    conditionForOff = WidgetData.control_elements.input.off.condition;
    valueForOff = Number(WidgetData.control_elements.input.off.value);
  }

  if (isOn === undefined) {
    switch (conditionForOn) {
      case '=':
        setOn(currentStateValueOn === valueForOn);

        break;
      case '><':
        setOn(currentStateValueOn !== valueForOn);
        break;
      case '>':
        setOn(currentStateValueOn > valueForOn);
        break;
      case '<':
        setOn(currentStateValueOn < valueForOn);
        break;
      case '<=':
        setOn(currentStateValueOn <= valueForOn);
        break;
      case '>=':
        setOn(currentStateValueOn >= valueForOn);
        break;
    }

    switch (conditionForOff) {
      case undefined: {
        break;
      }
      case '=':
        setOff(currentStateValueOff === valueForOff);
        break;
      case '><':
        setOff(currentStateValueOff !== valueForOff);
        break;
      case '>':
        if (valueForOff) {
          setOff(currentStateValueOff > valueForOff);
        }
        break;
      case '<':
        if (valueForOff) {
          setOff(currentStateValueOff < valueForOff);
        }
        break;
      case '<=':
        if (valueForOff) {
          setOff(currentStateValueOff <= valueForOff);
        }
        break;
      case '>=':
        if (valueForOff) {
          setOff(currentStateValueOff >= valueForOff);
        }
        break;
    }

    if (isOff) {
      setOn(false);
    }
  }
  return (
    <div className={styles.littleWidgetWrapper}>
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
      </div>
    </div>
  );
};
