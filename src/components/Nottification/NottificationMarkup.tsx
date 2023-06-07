import React from 'react';
import { CrossIcon } from '../Icons/CrossIcon';
import styles from './Nottification.module.css';
import classNames from 'classnames';
import { CircleIcon } from '../Icons/CircleIcon';
import { CloseIcon } from '../Icons/CloseIcon';
import { StopIcon } from '../Icons/StopIcon';
import { Tick } from '../Icons/TickIcon';

export type nottificationType = {
  type?: 'warning' | 'error' | 'success';
  label?: string;
  text?: string;
};

export const NottificationMarkup: React.FC<nottificationType> = ({ type, label, text }) => {
  const containerClassnames = classNames(
    styles.container,
    type === 'warning'
      ? styles.containerWarn
      : type === 'success'
      ? styles.containerSuccess
      : styles.containerError,
  );

  return (
    <div className={containerClassnames}>
      <div className={styles.circle}>
        {type === 'success' ? <Tick fill="#B9FFDD" /> : <StopIcon fill={'#DADADA'} />}
      </div>
      <div className={styles.labelWrapper}>
        <div className={styles.label}>{label}</div>
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.text}>{text}</div>
      </div>
      <div className={styles.iconWrapper}>
        <CrossIcon />
      </div>
    </div>
  );
};
