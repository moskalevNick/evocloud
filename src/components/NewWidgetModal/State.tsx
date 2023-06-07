import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../../hooks/redux';
import { ComparisonConditionsType } from '../../types';
import { Loader } from '../Loader/Loader';
import styles from './NewWidgetModal.module.css';
import { Select } from '../Select/Select';
import { getConditionName } from '../../helpers/getConditionName';

export const State: React.FC<{
  deviceState: any;
  type: string;
  label: string;
  getValues: (values: any) => void;
}> = ({ deviceState, type, label, getValues }) => {
  const { t } = useTranslation();
  const { isGetDeviceLoading, comparisonConditions } = useAppSelector(
    (state) => state.deviceReducer,
  );

  const [activeDeviceStateIdValue, setActiveDeviceStateIdValue] = useState<string | null>(null);
  const [activeDeviceState, setActiveDeviceState] = useState<any | null>(null);
  const [deviceElementTypes, setDeviceElementTypes] = useState<string[]>([]);
  const [activeDeviceTypeElementValue, setActiveDeviceTypeElementValue] = useState<string | null>(
    null,
  );
  const [varValue, setVarValue] = useState('');
  const [outputValueNumber, setOutputValueNumber] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');
  const [labelMinValue, setLabelMinValue] = useState('');
  const [labelMaxValue, setLabelMaxValue] = useState('');
  const [barName, setBarName] = useState('');
  const [intervalValue, setIntervalValue] = useState('');
  const [activeConditionValue, setActiveConditionValue] = useState<any | null>(null);
  const [formValues, setFormValues] = useState({ type });

  useEffect(() => {
    if (getValues) {
      getValues(formValues);
    }
  }, [formValues]);

  useEffect(() => {
    if (deviceState) {
      setActiveDeviceState(
        deviceState.states
          ? deviceState.states?.find((state: any) => state.device === activeDeviceStateIdValue)
          : deviceState.state,
      );
    }
  }, [activeDeviceStateIdValue]);

  useEffect(() => {
    if (activeDeviceStateIdValue) {
      setFormValues((prev) => {
        return { ...prev, activeDeviceStateIdValue };
      });
    }
    if (activeDeviceTypeElementValue) {
      setFormValues((prev) => {
        return { ...prev, activeDeviceTypeElementValue };
      });
    }
    if (outputValueNumber) {
      setFormValues((prev) => {
        return { ...prev, outputValueNumber };
      });
    }
    if (varValue) {
      setFormValues((prev) => {
        return { ...prev, varValue };
      });
    }
    if (activeConditionValue) {
      setFormValues((prev) => {
        return { ...prev, activeConditionValue };
      });
    }
    if (outputValue) {
      setFormValues((prev) => {
        return { ...prev, outputValue };
      });
    }
    if (minValue) {
      setFormValues((prev) => {
        return { ...prev, minValue };
      });
    }
    if (maxValue) {
      setFormValues((prev) => {
        return { ...prev, maxValue };
      });
    }
    if (labelMinValue) {
      setFormValues((prev) => {
        return { ...prev, labelMinValue };
      });
    }
    if (labelMaxValue) {
      setFormValues((prev) => {
        return { ...prev, labelMaxValue };
      });
    }
    if (barName) {
      setFormValues((prev) => {
        return { ...prev, barName };
      });
    }
    if (intervalValue) {
      setFormValues((prev) => {
        return { ...prev, intervalValue };
      });
    }
  }, [
    activeDeviceStateIdValue,
    activeDeviceTypeElementValue,
    outputValueNumber,
    varValue,
    activeConditionValue,
    outputValue,
    minValue,
    maxValue,
    labelMinValue,
    labelMaxValue,
    barName,
    intervalValue,
  ]);

  useEffect(() => {
    if (activeDeviceState) {
      const currentDeviceElementTypes = Object.keys(activeDeviceState);
      const withoutRubbish = currentDeviceElementTypes
        .filter((type) => type !== 'addr')
        .filter((type) => type !== 'device')
        .filter((type) => type !== 'index');
      setDeviceElementTypes(withoutRubbish);
    }
  }, [activeDeviceState]);

  const getTypeParams = (type: string) => {
    switch (type) {
      case 'disable':
      case 'silence':
      case 'input_on':
        return (
          <>
            <div className={styles.paramWrapper}>
              <Select
                label={t('choose_block_number')}
                onChange={(val: string | null) => {
                  setActiveDeviceStateIdValue(val);
                }}
                options={deviceState?.states?.length ? deviceState?.states : [deviceState?.state]}
                isBlockNumber
              />
            </div>

            <div className={styles.paramWrapper}>
              <Select
                label={t('choose_element_type')}
                onChange={(val: string | null) => {
                  setActiveDeviceTypeElementValue(val);
                }}
                options={deviceElementTypes}
                isBlockNumber
              />
            </div>
            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('output_variable_number')}</div>
              <input
                placeholder={t('output_variable_number') as string}
                value={outputValueNumber}
                onChange={(e) => setOutputValueNumber(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.paramWrapper}>
              <div className={styles.param}>
                {t('value_for')}
                {activeDeviceTypeElementValue === 'var'
                  ? t('variable')
                  : activeDeviceTypeElementValue === 'obin' ||
                    activeDeviceTypeElementValue === 'odac' ||
                    activeDeviceTypeElementValue === 'opwm'
                  ? t('output')
                  : t('input')}
              </div>
              <input
                value={varValue}
                onChange={(e) => setVarValue(e.target.value)}
                className={styles.input}
                placeholder={`${t('value_for')}${
                  activeDeviceTypeElementValue === 'var'
                    ? t('variable')
                    : activeDeviceTypeElementValue === 'obin' ||
                      activeDeviceTypeElementValue === 'odac' ||
                      activeDeviceTypeElementValue === 'opwm'
                    ? t('output')
                    : t('input')
                }`}
              />
            </div>
            <div className={styles.paramWrapper}>
              <Select
                label={t('comparison_condition')}
                onChange={(val: string | null) => {
                  setActiveConditionValue(val);
                }}
                options={comparisonConditions}
                isComparisonConditions
              />
            </div>
          </>
        );

      case 'input':
      case 'change':
      case 'change_r':
      case 'change_g':
      case 'change_b':
      case 'output_off':
      case 'output_on':
      case 'interval_current_value_15_0':
      case 'interval_current_value_31_16':
      case 'interval_hours_15_0':
      case 'interval_hours_31_16':
      case 'interval_day_15_0':
      case 'interval_day_31_16':
      case 'interval_week_15_0':
      case 'interval_week_31_16':
      case 'interval_month_15_0':
      case 'interval_month_31_16':
      case 'interval_year_15_0':
      case 'interval_year_31_16':
      case 'interval_all_time_15_0':
      case 'interval_all_time_31_16':
        return (
          <>
            <div className={styles.paramWrapper}>
              <Select
                label={t('choose_block_number')}
                onChange={(val: string | null) => {
                  setActiveDeviceStateIdValue(val);
                }}
                options={deviceState?.states?.length ? deviceState?.states : [deviceState?.state]}
                isBlockNumber
              />
            </div>

            <div className={styles.paramWrapper}>
              <Select
                label={t('choose_element_type')}
                onChange={(val: string | null) => {
                  setActiveDeviceTypeElementValue(val);
                }}
                options={deviceElementTypes}
                isBlockNumber
              />
            </div>

            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('output_variable_number')}</div>
              <input
                placeholder={t('output_variable_number') as string}
                value={outputValueNumber}
                onChange={(e) => setOutputValueNumber(e.target.value)}
                className={styles.input}
              />
            </div>
            {(type === 'output_off' || type === 'output_on') && (
              <div className={styles.paramWrapper}>
                <div className={styles.param}>{t('value_output_var')}</div>
                <input
                  placeholder={t('value_output_var') as string}
                  value={outputValue}
                  onChange={(e) => setOutputValue(e.target.value)}
                  className={styles.input}
                />
              </div>
            )}
          </>
        );

      case 'input_temp':
        return (
          <>
            <div className={styles.paramWrapper}>
              <Select
                label={t('choose_block_number')}
                onChange={(val: string | null) => {
                  setActiveDeviceStateIdValue(val);
                }}
                options={deviceState?.states?.length ? deviceState?.states : [deviceState?.state]}
                isBlockNumber
              />
              {/* <div className={styles.param}>{t('choose_block_number')}:</div>
              <select
                className={styles.select}
                onChange={(e) => setActiveDeviceStateIdValue(e.target.value)}
              >
                <option value={''} key={0}>
                  {t('choose_here')}
                </option>
                {deviceState?.states?.length ? (
                  deviceState?.states?.map((state: any) => (
                    <option key={state.device} value={state.device}>
                      {state.device}
                    </option>
                  ))
                ) : (
                  <option value={deviceState.state.device} key={deviceState.state.device}>
                    {deviceState.state.addr}
                  </option>
                )}
              </select> */}
            </div>

            <div className={styles.paramWrapper}>
              <Select
                label={t('choose_element_type')}
                onChange={(val: string | null) => {
                  setActiveDeviceTypeElementValue(val);
                }}
                options={deviceElementTypes}
                isBlockNumber
              />
              {/* <div className={styles.param}>{t('choose_element_type')}:</div>
              <select
                className={styles.select}
                onChange={(e) => setActiveDeviceTypeElementValue(e.target.value)}
              >
                <option value={''} key={0}>
                  {t('choose_here')}
                </option>
                {deviceElementTypes?.map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select> */}
            </div>

            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('output_variable_number')}</div>
              <input
                value={outputValueNumber}
                onChange={(e) => setOutputValueNumber(e.target.value)}
                className={styles.input}
                placeholder={t('output_variable_number') as string}
              />
            </div>
          </>
        );

      case 'change_bar1':
      case 'change_bar2':
        return (
          <>
            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('bar_name')}</div>
              <input
                value={barName}
                onChange={(e) => setBarName(e.target.value)}
                className={styles.input}
                placeholder={t('bar_name') as string}
              />
            </div>

            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('min_value')}</div>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                className={styles.input}
                placeholder={t('min_value') as string}
              />
            </div>

            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('label_min_value')}</div>
              <input
                value={labelMinValue}
                onChange={(e) => setLabelMinValue(e.target.value)}
                className={styles.input}
                placeholder={t('label_min_value') as string}
              />
            </div>

            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('max_value')}</div>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                className={styles.input}
                placeholder={t('max_value') as string}
              />
            </div>

            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('label_max_value')}</div>
              <input
                value={labelMaxValue}
                onChange={(e) => setLabelMaxValue(e.target.value)}
                className={styles.input}
                placeholder={t('label_max_value') as string}
              />
            </div>

            <div className={styles.paramWrapper}>
              <Select
                label={t('choose_block_number')}
                onChange={(val: string | null) => {
                  setActiveDeviceStateIdValue(val);
                }}
                options={deviceState?.states?.length ? deviceState?.states : [deviceState?.state]}
                isBlockNumber
              />
              {/* <div className={styles.param}>{t('choose_block_number')}:</div>
              <select
                className={styles.select}
                onChange={(e) => setActiveDeviceStateIdValue(e.target.value)}
              >
                <option value={''} key={0}>
                  {t('choose_here')}
                </option>
                {deviceState?.states?.length ? (
                  deviceState?.states?.map((state: any) => (
                    <option key={state.device} value={state.device}>
                      {state.device}
                    </option>
                  ))
                ) : (
                  <option value={deviceState.state.device} key={deviceState.state.device}>
                    {deviceState.state.addr}
                  </option>
                )}
              </select> */}
            </div>

            <div className={styles.paramWrapper}>
              <Select
                label={t('choose_element_type')}
                onChange={(val: string | null) => {
                  setActiveDeviceTypeElementValue(val);
                }}
                options={deviceElementTypes}
                isBlockNumber
              />
              {/* <div className={styles.param}>{t('choose_element_type')}:</div>
              <select
                className={styles.select}
                onChange={(e) => setActiveDeviceTypeElementValue(e.target.value)}
              >
                <option value={''} key={0}>
                  {t('choose_here')}
                </option>
                {deviceElementTypes?.map((type: any) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select> */}
            </div>

            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('output_variable_number')}</div>
              <input
                value={outputValueNumber}
                onChange={(e) => setOutputValueNumber(e.target.value)}
                className={styles.input}
                placeholder={t('output_variable_number') as string}
              />
            </div>
          </>
        );

      case 'minMax':
        return (
          <>
            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('min_value')}, %</div>
              <input
                type="number"
                value={minValue}
                onChange={(e) => setMinValue(e.target.value)}
                className={styles.input}
                placeholder={t('min_value') as string}
              />
            </div>
            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('max_value')}, %</div>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(e.target.value)}
                className={styles.input}
                placeholder={t('max_value') as string}
              />
            </div>
          </>
        );

      case 'timeout':
        return (
          <>
            <div className={styles.paramWrapper}>
              <div className={styles.param}>{t('interval')}</div>
              <input
                value={intervalValue}
                type="number"
                onChange={(e) => setIntervalValue(e.target.value)}
                className={styles.input}
                placeholder={t('interval') as string}
              />
            </div>
          </>
        );

      default:
        return <>dev</>;
    }
  };

  return (
    <>
      <div className={styles.labelParams}>{t(`${label}`)}</div>
      <div className={styles.groupParams}>
        {isGetDeviceLoading ? <Loader /> : getTypeParams(type)}
      </div>
    </>
  );
};
