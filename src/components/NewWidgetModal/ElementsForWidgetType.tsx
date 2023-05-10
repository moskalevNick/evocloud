import { useTranslation } from 'react-i18next';
import { State } from './State';
import styles from './NewWidgetModal.module.css';

export const ElementsForWidgetType: React.FC<{
  type: string;
  deviceState: any;
  getValues: (values: any) => void;
}> = ({ type, deviceState, getValues }) => {
  const { t } = useTranslation();

  const getData = (values: any) => {
    if (getValues) {
      getValues(values);
    }
  };

  switch (type) {
    case 'binary_button':
      return (
        <>
          <State
            deviceState={deviceState}
            type="disable"
            label="controller_elements_for_disable_mode"
            getValues={(values) => getData(values)}
          />
          <div className={styles.labelParams}>{t('controller_elements_for_get_state_input')}</div>
          <State
            deviceState={deviceState}
            type="input_on"
            label="we_consider_the_button_to_be_enabled_according_to_this_data"
            getValues={(values) => getData(values)}
          />
          <div className={styles.labelParams}>{t('controller_elements_for_set_state_output')}</div>
          <State
            deviceState={deviceState}
            type="output_off"
            label="to_turn_off"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="output_on"
            label="to_turn_on"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="silence"
            label="silence_mode"
            getValues={(values) => getData(values)}
          />
        </>
      );
    case 'open_close_button':
      return (
        <>
          <State
            deviceState={deviceState}
            type="disable"
            label="controller_elements_for_disable_mode"
            getValues={(values) => getData(values)}
          />
          <div className={styles.labelParams}>{t('controller_elements_for_get_state_input')}</div>
          <State
            deviceState={deviceState}
            type="input_on"
            label="activated_state"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="silence"
            label="silence_mode"
            getValues={(values) => getData(values)}
          />
        </>
      );
    case 'percent_button':
      return (
        <>
          <State
            deviceState={deviceState}
            type="disable"
            label="controller_elements_for_disable_mode"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="input"
            label="controller_elements_for_get_state_input"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="silence"
            label="silence_mode"
            getValues={(values) => getData(values)}
          />
        </>
      );
    case 'bar_button':
      return (
        <>
          <State
            deviceState={deviceState}
            type="disable"
            label="controller_elements_for_disable_mode"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="minMax"
            label="min_max_value"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="change"
            label="controller_elements_for_change_state"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="silence"
            label="silence_mode"
            getValues={(values) => getData(values)}
          />
        </>
      );
    case 'temp_regulator_button':
      return (
        <>
          <State
            deviceState={deviceState}
            type="disable"
            label="controller_elements_for_disable_mode"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="minMax"
            label="min_max_value"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="change"
            label="controller_elements_for_change_state"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="silence"
            label="silence_mode"
            getValues={(values) => getData(values)}
          />
        </>
      );
    case 'rgb':
      return (
        <>
          <State
            deviceState={deviceState}
            type="disable"
            label="controller_elements_for_disable_mode"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="minMax"
            label="min_max_value"
            getValues={(values) => getData(values)}
          />
          <div className={styles.labelParams}>{t('controller_elements_for_change_state')}</div>
          <State
            deviceState={deviceState}
            type="change_r"
            label="channel_red"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="change_g"
            label="channel_green"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="change_b"
            label="channel_blue"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="silence"
            label="silence_mode"
            getValues={(values) => getData(values)}
          />
        </>
      );
    case 'point':
      return (
        <>
          <State
            deviceState={deviceState}
            type="disable"
            label="controller_elements_for_disable_mode"
            getValues={(values) => getData(values)}
          />
          <div className={styles.labelParams}>{t('controller_elements_for_get_state_input')}</div>
          <State
            deviceState={deviceState}
            type="input_on"
            label="activated_state"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="silence"
            label="silence_mode"
            getValues={(values) => getData(values)}
          />
        </>
      );
    case 'advanced_openclose':
      return (
        <>
          <State
            deviceState={deviceState}
            type="disable"
            label="controller_elements_for_disable_mode"
            getValues={(values) => getData(values)}
          />
          <div className={styles.labelParams}>{t('controller_elements_for_set_state_output')}</div>
          <State
            deviceState={deviceState}
            type="output_off"
            label="to_turn_off"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="output_on"
            label="to_turn_on"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="silence"
            label="silence_mode"
            getValues={(values) => getData(values)}
          />
        </>
      );
    case 'temp':
      return (
        <>
          <State
            deviceState={deviceState}
            type="disable"
            label="controller_elements_for_disable_mode"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="input_temp"
            label="controller_elements_for_get_state_input"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="silence"
            label="silence_mode"
            getValues={(values) => getData(values)}
          />
        </>
      );
    case 'power_metter':
      return (
        <>
          <State
            deviceState={deviceState}
            type="disable"
            label="controller_elements_for_disable_mode"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="timeout"
            label="interval_for_read_data"
            getValues={(values) => getData(values)}
          />
          <div className={styles.labelParams}>{t('controller_elements_for_get_state_input')}</div>
          <State
            deviceState={deviceState}
            type="interval_current_value_15_0"
            label="interval_current_value_15_0"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_current_value_31_16"
            label="interval_current_value_31_16"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_hours_15_0"
            label="interval_hours_15_0"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_hours_31_16"
            label="interval_hours_31_16"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_day_15_0"
            label="interval_day_15_0"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_day_31_16"
            label="interval_day_31_16"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_week_15_0"
            label="interval_week_15_0"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_week_31_16"
            label="interval_week_31_16"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_month_15_0"
            label="interval_month_15_0"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_month_31_16"
            label="interval_month_31_16"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_year_15_0"
            label="interval_year_15_0"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_year_31_16"
            label="interval_year_31_16"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_all_time_15_0"
            label="interval_all_time_15_0"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="interval_all_time_31_16"
            label="interval_all_time_31_16"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="silence"
            label="silence_mode"
            getValues={(values) => getData(values)}
          />
        </>
      );
    case 'double_bar_button':
      return (
        <>
          <State
            deviceState={deviceState}
            type="disable"
            label="controller_elements_for_disable_mode"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="change_bar1"
            label="controller_elements_for_change_state_bar_1"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="change_bar2"
            label="controller_elements_for_change_state_bar_2"
            getValues={(values) => getData(values)}
          />
          <State
            deviceState={deviceState}
            type="silence"
            label="silence_mode"
            getValues={(values) => getData(values)}
          />
        </>
      );
    case 'rtsp':
    case 'icons':
    case 'tap_button':
      return <>in dev</>;

    default:
      return <>default case</>;
  }
};
