// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {
    SUPPORTED_LANGUAGES,
    LANGUAGE_CODES,
    DEFAULT_LANGUAGE,
    NAMESPACES,
    detectBrowserLanguage
} from './config/languages';

// Using webpack's require.context for dynamic imports
const translationContext = import.meta.glob('./locales/**/*.json', { eager: true });

// Build resources object from the language configuration
const resources: Record<string, Record<string, any>> = {};

// Initialize resources object for all languages
LANGUAGE_CODES.forEach(langCode => {
    resources[langCode] = {};

    // Get namespaces for this language
    const langConfig = SUPPORTED_LANGUAGES.find(lang => lang.code === langCode);
    const namespacesToLoad = langConfig?.namespaces || NAMESPACES;

    // Load translations for each namespace
    namespacesToLoad.forEach(namespace => {
        try {
            const path = `./locales/${langCode}/${namespace}.json`;
            // Check if translation file exists
            if (translationContext[path]) {
                resources[langCode][namespace] = translationContext[path];
            } else {
                console.warn(`Missing translation file: ${path}`);
                resources[langCode][namespace] = {};
            }
        } catch (error) {
            console.warn(`Error loading translation: ./locales/${langCode}/${namespace}.json`);
            resources[langCode][namespace] = {};
        }
    });
});

// Initialize i18next
i18n
    // Load language detector
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize
    .init({
        resources,
        fallbackLng: DEFAULT_LANGUAGE,
        debug: process.env.NODE_ENV === 'development',

        // Default namespace
        defaultNS: 'core',

        // Detect from localStorage, browser, etc.
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'preferredLanguage',
            caches: ['localStorage'],
        },

        interpolation: {
            escapeValue: false,
        },

        react: {
            useSuspense: true,
        }
    });

// Set document direction based on language RTL property
const setupLanguageDirection = (lng: string) => {
    const language = SUPPORTED_LANGUAGES.find(lang => lang.code === lng);
    if (language) {
        document.documentElement.dir = language.isRTL ? 'rtl' : 'ltr';

        // Apply language-specific font if configured
        if (language.fontFamily) {
            document.documentElement.style.fontFamily = language.fontFamily;
        }
    }
};

// Set up direction for initial language
setupLanguageDirection(i18n.language);

// Update direction when language changes
i18n.on('languageChanged', (lng) => {
    setupLanguageDirection(lng);
});

export default i18n;