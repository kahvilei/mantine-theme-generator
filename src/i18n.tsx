import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files directly
import enCoreTranslations from './locales/en/core.json';
import enThemeTranslations from './locales/en/theme.json';
import frCoreTranslations from './locales/fr/core.json';
import frThemeTranslations from './locales/fr/theme.json';

const resources = {
    en: {
        core: enCoreTranslations,
        theme: enThemeTranslations
    },
    fr: {
        core: frCoreTranslations,
        theme: frThemeTranslations
    }
};

i18n
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next
    .use(initReactI18next)
    // init i18next
    .init({
        resources,
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',

        // Default namespace
        defaultNS: 'core',

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: true,
        }
    });

export default i18n;