import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WidthLimit.module.css';

export const WidthLimit = () => {
  const { t } = useTranslation();
  return <div className={styles.container}>{t('limit')}</div>;
};
