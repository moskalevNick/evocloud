import React, {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from 'react';
import classNames from 'classnames';
import { t } from 'i18next';

import styles from './Select.module.css';
import { getConditionName } from '../../helpers/getConditionName';

export type SelectProps = {
  name?: string;
  onChange: (e: string | null) => void;
  value?: number | string;
  defaultValueLabel?: number | string;
  defaultValue?: string;
  disabled?: boolean;
  hasError?: boolean;
  className?: boolean;
  readOnly?: boolean;
  label?: React.ReactNode;
  options: any[];
  withXEvoDevice?: boolean;
  isBlockNumber?: boolean;
  isComparisonConditions?: boolean;
};

export const Select: React.FC<SelectProps> = ({
  name,
  onChange,
  value,
  defaultValueLabel = t('choose_here'),
  defaultValue = '',
  disabled = false,
  hasError = false,
  readOnly = false,
  label,
  className,
  options,
  withXEvoDevice = false,
  isBlockNumber = false,
  isComparisonConditions = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState<string>('');
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref: MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <>
      <div className={styles.param}>{label}:</div>
      <div
        className={classNames(styles.select, disabled && styles.disableSelect)}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        ref={wrapperRef}
      >
        <div className={styles.placeholder}>
          {activeOption === ''
            ? `${defaultValueLabel}`
            : isComparisonConditions
            ? activeOption
            : isBlockNumber
            ? activeOption || '0'
            : options.find((opt) => opt.id === activeOption)?.name
            ? `${options.find((opt) => opt.id === activeOption).name}`
            : `${options.find((opt) => opt.id === activeOption).x_evo_device}`}
        </div>
        {isOpen && options.length > 0 && (
          <div className={styles.sheet}>
            {options.map((option) => {
              if (typeof option === 'string') {
                return (
                  <div
                    key={option}
                    className={styles.option}
                    onClick={() => {
                      setActiveOption(option);
                      onChange(option);
                    }}
                  >
                    {option}
                  </div>
                );
              } else {
                return (
                  <div
                    key={
                      isComparisonConditions
                        ? option.value
                        : isBlockNumber
                        ? option.device || option.value || '0'
                        : option.id
                    }
                    className={styles.option}
                    onClick={() => {
                      setActiveOption(
                        isComparisonConditions
                          ? option.value
                          : isBlockNumber
                          ? option.device || option.value || '0'
                          : option.id,
                      );
                      onChange(
                        isComparisonConditions
                          ? option.value
                          : isBlockNumber
                          ? option.device || option.value || '0'
                          : option.id,
                      );
                    }}
                  >{`${
                    isComparisonConditions
                      ? getConditionName(option.id)
                      : isBlockNumber
                      ? option.device || option.value || '0'
                      : option.name
                  } ${withXEvoDevice ? `(${option.x_evo_device})` : ''}`}</div>
                );
              }
            })}
          </div>
        )}
      </div>
    </>
  );
};
