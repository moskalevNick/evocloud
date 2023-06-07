import { t } from 'i18next';

export const getConditionName = (id: number) => {
  switch (id) {
    case 1:
      return t('equals');
    case 2:
      return t('more');
    case 7:
      return t('less');
    case 8:
      return t('more_or_equal');
    case 9:
      return t('less_or_equal');
    case 10:
      return t('not_equal');
  }
};
