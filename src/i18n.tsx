import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files directly
import enCoreTranslations from './locales/en/core.json';
import enThemeTranslations from './locales/en/theme.json';
import enDashboardTranslations from './locales/en/dashboard.json';
import enTypographyTranslations from './locales/en/typography.json';
import enComponentsTranslations from './locales/en/components.json';
import enFormsTranslations from './locales/en/forms.json';

import frCoreTranslations from './locales/fr/core.json';
import frThemeTranslations from './locales/fr/theme.json';
import frDashboardTranslations from './locales/fr/dashboard.json';
import frTypographyTranslations from './locales/fr/typography.json';
import frComponentsTranslations from './locales/fr/components.json';
import frFormsTranslations from './locales/fr/forms.json';

import deCoreTranslations from './locales/de/core.json';
import deThemeTranslations from './locales/de/theme.json';
import deDashboardTranslations from './locales/de/dashboard.json';
import deTypographyTranslations from './locales/de/typography.json';
import deComponentsTranslations from './locales/de/components.json';
import deFormsTranslations from './locales/de/forms.json';


import esCoreTranslations from './locales/es/core.json';
import esThemeTranslations from './locales/es/theme.json';
import esDashboardTranslations from './locales/es/dashboard.json';
import esTypographyTranslations from './locales/es/typography.json';
import esComponentsTranslations from './locales/es/components.json';
import esFormsTranslations from './locales/es/forms.json';

import zhCoreTranslations from './locales/zh/core.json';
import zhThemeTranslations from './locales/zh/theme.json';
import zhDashboardTranslations from './locales/zh/dashboard.json';
import zhTypographyTranslations from './locales/zh/typography.json';
import zhComponentsTranslations from './locales/zh/components.json';
import zhFormsTranslations from './locales/zh/forms.json';

import jaCoreTranslations from './locales/ja/core.json';
import jaThemeTranslations from './locales/ja/theme.json';
import jaDashboardTranslations from './locales/ja/dashboard.json';
import jaTypographyTranslations from './locales/ja/typography.json';
import jaComponentsTranslations from './locales/ja/components.json';
import jaFormsTranslations from './locales/ja/forms.json';

const resources = {
    en: {
        core: enCoreTranslations,
        theme: enThemeTranslations,
        dashboard: enDashboardTranslations,
        typography: enTypographyTranslations,
        components: enComponentsTranslations,
        forms: enFormsTranslations,
    },
    de: {
        core: deCoreTranslations,
        theme: deThemeTranslations,
        dashboard: deDashboardTranslations,
        typography: deTypographyTranslations,
        components: deComponentsTranslations,
        forms: deFormsTranslations,
    },
    fr: {
        core: frCoreTranslations,
        theme: frThemeTranslations,
        dashboard: frDashboardTranslations,
        typography: frTypographyTranslations,
        components: frComponentsTranslations,
        forms: frFormsTranslations,
    },
    es: {
        core: esCoreTranslations,
        theme: esThemeTranslations,
        dashboard: esDashboardTranslations,
        typography: esTypographyTranslations,
        components: esComponentsTranslations,
        forms: esFormsTranslations,
    },
    zh: {
        core: zhCoreTranslations,
        theme: zhThemeTranslations,
        dashboard: zhDashboardTranslations,
        typography: zhTypographyTranslations,
        components: zhComponentsTranslations,
        forms: zhFormsTranslations,
    },
    ja: {
        core: jaCoreTranslations,
        theme: jaThemeTranslations,
        dashboard: jaDashboardTranslations,
        typography: jaTypographyTranslations,
        components: jaComponentsTranslations,
        forms: jaFormsTranslations,
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