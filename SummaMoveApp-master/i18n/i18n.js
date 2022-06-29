
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import hi from './hi.json';
import nl  from './nl.json'
  
i18n.use(initReactI18next).init({
  lng: 'nl',
  fallbackLng: 'nl',
  resources: {
    en: en,
    hi: hi,
    nl: nl,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;