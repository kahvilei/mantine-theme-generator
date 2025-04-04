import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files directly
import enCoreTranslations from './locales/en/core.json';
import enThemeTranslations from './locales/en/theme.json';
import enDashboardTranslations from './locales/en/dashboard.json';
import enTypographyTranslations from './locales/en/typography.json';

import frCoreTranslations from './locales/fr/core.json';
import frThemeTranslations from './locales/fr/theme.json';
import frDashboardTranslations from './locales/fr/dashboard.json';
import frTypographyTranslations from './locales/fr/typography.json';

import esCoreTranslations from './locales/es/core.json';
import esThemeTranslations from './locales/es/theme.json';
import esDashboardTranslations from './locales/es/dashboard.json';

import zhCoreTranslations from './locales/zh/core.json';
import zhThemeTranslations from './locales/zh/theme.json';
import zhDashboardTranslations from './locales/zh/dashboard.json';
import zhTypographyTranslations from './locales/zh/typography.json';

import jaCoreTranslations from './locales/ja/core.json';
import jaThemeTranslations from './locales/ja/theme.json';
import jaDashboardTranslations from './locales/ja/dashboard.json';
import jaTypographyTranslations from './locales/ja/typography.json';

const resources = {
    en: {
        core: enCoreTranslations,
        theme: enThemeTranslations,
        dashboard: enDashboardTranslations,
        typography: enTypographyTranslations
    },
    fr: {
        core: frCoreTranslations,
        theme: frThemeTranslations,
        dashboard: frDashboardTranslations,
        typography: frTypographyTranslations
    },
    es: {
        core: esCoreTranslations,
        theme: esThemeTranslations,
        dashboard: esDashboardTranslations
    },
    zh: {
        core: zhCoreTranslations,
        theme: zhThemeTranslations,
        dashboard: zhDashboardTranslations,
        typography: zhTypographyTranslations
    },
    ja: {
        core: jaCoreTranslations,
        theme: jaThemeTranslations,
        dashboard: jaDashboardTranslations,
        typography: jaTypographyTranslations
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