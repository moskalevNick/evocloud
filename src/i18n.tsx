import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEnglish from './assets/locales/en/translation.json';
import translationRussian from './assets/locales/ru/translation.json';

const resources = {
  en: {
    translation: translationEnglish,
    dir: 'en',
  },
  ru: {
    translation: translationRussian,
    dir: 'ru',
  },
};

let browserLang = '';
let currentLanguage = '';

if (navigator.language.slice(0, 2) === 'ru' || navigator.language.slice(0, 2) === 'en') {
  browserLang = navigator.language.slice(0, 2);
  localStorage.setItem('i18nextLng', navigator.language.slice(0, 2));
}

if (localStorage.getItem('i18nextLng')) {
  currentLanguage = localStorage.getItem('i18nextLng') || 'en';
} else {
  currentLanguage = browserLang;
}

i18next.use(initReactI18next).init({
  resources,
  lng: currentLanguage,
});

export default i18next;
