import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { writable } from 'svelte/store';

export interface Language {
  code: string;
  name: string;
  isRTL?: boolean;
}

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ar', name: 'العربية', isRTL: true },
  { code: 'he', name: 'עברית', isRTL: true },
];

// Create stores for language state
export const currentLanguage = writable('en');
export const isRTL = writable(false);

// Initialize i18next
i18next.use(LanguageDetector).init({
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        // English translations
      },
    },
  },
});

// Translation helper function
export const t = (key: string) => i18next.t(key);

// Language loading function
export async function loadLanguage(lang: string) {
  try {
    await i18next.changeLanguage(lang);
    currentLanguage.set(lang);
    isRTL.set(['ar', 'he', 'fa'].includes(lang));
  } catch (error) {
    console.error('Failed to load language:', error);
  }
}

export default i18next;
