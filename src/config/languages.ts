// src/config/languages.ts

/**
 * Language configuration for the application.
 * This is a single source of truth for language settings used by:
 * - i18n initialization
 * - Language selector UI
 * - RTL/LTR switching logic
 */

export interface LanguageConfig {
    // ISO code (e.g., 'en', 'fr')
    code: string;

    // Native name (e.g., 'English', 'Français')
    nativeName: string;

    // English name (optional)
    englishName?: string;

    // Flag emoji or code (optional)
    flag?: string;

    // Is right-to-left language (optional)
    isRTL?: boolean;

    // Font settings (optional)
    fontFamily?: string;

    // Namespaces to load for this language (optional)
    // If not specified, all namespaces will be loaded
    namespaces?: string[];
}

/**
 * List of all supported languages in the application.
 * Add new languages here when expanding language support.
 */
export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
    {
        code: 'en',
        nativeName: 'English',
        englishName: 'English',
        flag: '🇺🇸',
        isRTL: false,
    },
    {
        code: 'fr',
        nativeName: 'Français',
        englishName: 'French',
        flag: '🇫🇷',
        isRTL: false,
    },
    {
        code: 'es',
        nativeName: 'Español',
        englishName: 'Spanish',
        flag: '🇪🇸',
        isRTL: false,
    },
    {
        code: 'de',
        nativeName: 'Deutsch',
        englishName: 'German',
        flag: '🇩🇪',
        isRTL: false,
    },
    {
        code: 'zh',
        nativeName: '中文',
        englishName: 'Chinese',
        flag: '🇨🇳',
        isRTL: false,
        fontFamily: "'Noto Sans SC', sans-serif",
    },
    {
        code: 'ja',
        nativeName: '日本語',
        englishName: 'Japanese',
        flag: '🇯🇵',
        isRTL: false,
        fontFamily: "'Noto Sans JP', sans-serif",
    },
    {
        code: 'pt',
        nativeName: 'Português',
        englishName: 'Portuguese',
        flag: '🇵🇹',
        isRTL: false,
    },
    {
        code: 'ru',
        nativeName: 'Русский',
        englishName: 'Russian',
        flag: '🇷🇺',
        isRTL: false,
        fontFamily: "'Noto Sans', 'Noto Sans Cyrillic', sans-serif",
    },
    {
        code: 'hi',
        nativeName: 'हिन्दी',
        englishName: 'Hindi',
        flag: '🇮🇳',
        isRTL: false,
        fontFamily: "'Noto Sans Devanagari', sans-serif",
    },
    {
        code: 'ko',
        nativeName: '한국어',
        englishName: 'Korean',
        flag: '🇰🇷',
        isRTL: false,
        fontFamily: "'Noto Sans KR', sans-serif",
    },
    {
        code: 'ar',
        nativeName: 'العربية',
        englishName: 'Arabic',
        flag: '🇸🇦',
        isRTL: true,
        fontFamily: "'Noto Sans Arabic', sans-serif",
    },
];

/**
 * Array of language codes for easier access
 */
export const LANGUAGE_CODES = SUPPORTED_LANGUAGES.map(lang => lang.code);

/**
 * Default language code
 */
export const DEFAULT_LANGUAGE = 'en';

/**
 * All namespaces used in the application
 */
export const NAMESPACES = [
    'core',
    'theme',
    'dashboard',
    'typography',
    'components',
    'forms',
    'blocks'
    // Add more namespaces here
];

/**
 * Get language config by code
 */
export const getLanguageByCode = (code: string): LanguageConfig | undefined => {
    return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
};

/**
 * Detect browser language and return the closest match from supported languages
 */
export const detectBrowserLanguage = (): string => {
    // Get browser language (e.g., 'en-US', 'fr', 'de-DE')
    const browserLang = navigator.language || (navigator as any).userLanguage;

    // Try exact match first
    if (LANGUAGE_CODES.includes(browserLang)) {
        return browserLang;
    }

    // Try matching just the language part (e.g., 'en' from 'en-US')
    const langPrefix = browserLang.split('-')[0];
    if (LANGUAGE_CODES.includes(langPrefix)) {
        return langPrefix;
    }

    // Fallback to default language
    return DEFAULT_LANGUAGE;
};

export default SUPPORTED_LANGUAGES;