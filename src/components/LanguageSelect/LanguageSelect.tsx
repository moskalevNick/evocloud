import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { globalActions } from '../../redux/global/actions';
import { globalSettingActions } from '../../redux/global/reducer';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch';

type LanguageSelectType = {
  size?: 'long' | 'short';
  labels?: string[];
};

export const LanguageSelect: React.FC<LanguageSelectType> = ({ size, labels }) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { isRus, isAuth } = useAppSelector((state) => state.globalReducer);

  const [isStateRus, setStateRus] = useState(isRus || false);
  const [unautorizedLang, setUnautorizedLang] = useState(isStateRus ? 'ru' : 'en');

  const defaultLanguage = localStorage.getItem('i18nextLng');

  useEffect(() => {
    if (!isAuth && !unautorizedLang) {
      dispatch(globalSettingActions.setIsRussian(defaultLanguage === 'ru' ? true : false));
    }
  }, [defaultLanguage, isAuth, unautorizedLang, dispatch]);

  useEffect(() => {
    if (defaultLanguage) {
      setStateRus(defaultLanguage === 'ru');
      if (!isAuth) {
        setUnautorizedLang(defaultLanguage === 'ru' ? 'ru' : 'en');
      }
    }
  }, [defaultLanguage]);

  const changeLang = useCallback(() => {
    setStateRus((prev) => !prev);
    if (!isAuth) {
      setUnautorizedLang((prev) => (prev === 'ru' ? 'en' : 'ru'));
      localStorage.setItem('i18nextLng', unautorizedLang === 'ru' ? 'en' : 'ru');
      i18n.changeLanguage(unautorizedLang === 'ru' ? 'en' : 'ru');
    } else {
      i18n.changeLanguage(isStateRus ? 'en' : 'ru');
      localStorage.setItem('i18nextLng', isStateRus ? 'en' : 'ru');
      dispatch(
        globalActions.editSettings({
          isRus: !isStateRus,
        }),
      );
    }
  }, [isStateRus, unautorizedLang, isAuth, dispatch, i18n]);

  // useEffect(() => {
  //   i18n.changeLanguage(isStateRus ? 'ru' : 'en');
  // }, [isStateRus]);

  return (
    <ToggleSwitch checked={isStateRus} readOnly size={size} onChange={changeLang} labels={labels} />
  );
};
