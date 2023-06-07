import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import uuid from 'react-uuid';

import styles from './Checkbox.module.css';
import { Tick } from '../Icons/TickIcon';

export type CheckboxProps = {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  value?: number | string;
  disabled?: boolean;
  hasError?: boolean;
  className?: boolean;
  readOnly?: boolean;
  label?: React.ReactNode;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  onChange,
  checked,
  value,
  disabled = false,
  hasError = false,
  readOnly = false,
  label,
  className,
}) => {
  const labelClasses = classNames(
    styles.label,
    hasError && styles.hasError,
    !checked && styles.hidden,
  );

  const wrapperCheckboxClassnames = classNames(styles.wrapperCheckbox, className);
  const checkboxID = uuid();

  return (
    <div className={wrapperCheckboxClassnames}>
      <input
        checked={checked}
        className={styles.checkbox}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        type="checkbox"
        id={checkboxID}
      />
      <label htmlFor={checkboxID} className={labelClasses}>
        <div className={styles.tick}>
          <Tick fill="#ADEBFF" />
        </div>
        {label}
      </label>
    </div>
  );
};
