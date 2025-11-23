import { createI18n } from 'vue-i18n'
import de from './locales/de.json'
import en from './locales/en.json'
import fr from './locales/fr.json'

// Get browser language or default to German
const getBrowserLocale = (): string => {
  const browserLang = navigator.language.split('-')[0]
  const supportedLocales = ['de', 'en', 'fr']
  return supportedLocales.includes(browserLang) ? browserLang : 'de'
}

// Get saved locale from localStorage or use browser locale
const getSavedLocale = (): string => {
  const saved = localStorage.getItem('locale')
  return saved || getBrowserLocale()
}

const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'de',
  messages: {
    de,
    en,
    fr
  },
  globalInjection: true
})

export default i18n
