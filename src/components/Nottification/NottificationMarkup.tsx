import React from 'react';
import { CrossIcon } from '../Icons/CrossIcon';
import styles from './Nottification.module.css';

export type nottificationType = {
  name?: string;
  text?: string;
};

export const NottificationMarkup: React.FC<nottificationType> = ({ name = 'EVO', text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <div className={styles.clientNameWrapper}>{name}</div>
        <div className={styles.text}>{text}</div>
      </div>
      <div className={styles.iconWrapper}>
        <CrossIcon />
      </div>
    </div>
  );
};
