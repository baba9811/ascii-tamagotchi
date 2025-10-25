/**
 * i18n Configuration
 * Multi-language support using react-i18next
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import ko from '../locales/ko.json';
import zh from '../locales/zh.json';

const LANGUAGE_KEY = '@chaotic_pet:language';

// Language detector for AsyncStorage
const languageDetector = {
  type: 'languageDetector' as const,
  async: true,
  detect: async (callback: (lang: string) => void) => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (savedLanguage) {
        callback(savedLanguage);
      } else {
        callback('en'); // Default language
      }
    } catch (error) {
      console.error('[i18n] Error detecting language:', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.error('[i18n] Error caching language:', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: { translation: en },
      ko: { translation: ko },
      zh: { translation: zh },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

/**
 * Helper function to change language
 */
export const changeLanguage = async (lang: string) => {
  try {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    console.log('[i18n] Language changed to:', lang);
  } catch (error) {
    console.error('[i18n] Error changing language:', error);
  }
};

/**
 * Get current language
 */
export const getCurrentLanguage = () => i18n.language;

/**
 * Get available languages
 */
export const getAvailableLanguages = () => ['en', 'ko', 'zh'];
