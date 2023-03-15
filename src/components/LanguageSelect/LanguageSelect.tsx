import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalActions } from '../../redux/global/actions';
import { globalSettingActions } from '../../redux/global/reducer';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';

type LanguageSelectType = {
  size?: 'long' | 'short';
};

export const LanguageSelect: React.FC<LanguageSelectType> = ({ size }) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { isRus, isAuth } = useAppSelector((state) => state.globalReducer);

  const [isStateRus, setStateRus] = useState(isRus);
  const [unautorizedLang, setUnautorizedLang] = useState('');

  const defaultLanguage = localStorage.getItem('i18nextLng') || 'en';

  useEffect(() => {
    if (!isAuth && !unautorizedLang) {
      if (defaultLanguage === 'en-EN' || defaultLanguage === 'ru-RU') {
        setStateRus(defaultLanguage === 'ru-RU' ? true : false);
        dispatch(globalSettingActions.setIsRussian(defaultLanguage === 'ru-RU' ? true : false));
      }
    } else {
      setStateRus(isRus);
    }
  }, [defaultLanguage, isRus, isAuth]);

  const changeLang = useCallback(() => {
    if (!isAuth) {
      setUnautorizedLang(isStateRus ? 'ru' : 'en');
    } else {
      dispatch(
        globalActions.editSettings({
          isRus: !isStateRus,
        }),
      );
    }
    setStateRus((prev) => !prev);
  }, [isStateRus]);

  useEffect(() => {
    i18n.changeLanguage(isStateRus ? 'ru' : 'en');
  }, [isStateRus]);

  return (
    <ToggleSwitch
      checked={isStateRus}
      labels={['РУ', 'EN']}
      readOnly
      size={size}
      onChange={changeLang}
    />
  );
};
