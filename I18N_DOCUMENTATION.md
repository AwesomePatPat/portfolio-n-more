# i18n (Internationalization) Documentation

## Overview
This project now supports three languages:
- 🇩🇪 **German (de)** - Default language
- 🇬🇧 **English (en)**
- 🇫🇷 **French (fr)**

The implementation uses **vue-i18n v9** for internationalization support.

## Features

### 1. Automatic Language Detection
- Detects browser language on first visit
- Falls back to German if unsupported language detected
- Saves selected language to localStorage

### 2. Language Switcher
A floating language switcher is displayed in the navigation bar with:
- Flag emojis for visual identification
- Language code (DE, EN, FR)
- Blue accent styling matching the site theme
- Active state highlighting
- Smooth transitions and hover effects

### 3. Translated Content
All user-facing text is translated including:
- Navigation menu items
- Section headings and badges
- Button text (CTAs)
- Descriptions and paragraphs
- Modal content
- Status indicators

## File Structure

```
src/
├── i18n.ts                    # i18n configuration
├── locales/                   # Translation files
│   ├── de.json               # German translations
│   ├── en.json               # English translations
│   └── fr.json               # French translations
└── components/
    └── LanguageSwitcher.vue  # Language switcher component
```

## Configuration

### i18n.ts
```typescript
import { createI18n } from 'vue-i18n'
import de from './locales/de.json'
import en from './locales/en.json'
import fr from './locales/fr.json'

const i18n = createI18n({
  legacy: false,           // Use Composition API mode
  locale: 'de',           // Default locale
  fallbackLocale: 'de',   // Fallback if translation missing
  messages: { de, en, fr },
  globalInjection: true   // Enable $t() globally
})
```

## Translation Files Structure

Each locale file (de.json, en.json, fr.json) contains:

```json
{
  "nav": {
    "intro": "...",
    "about": "...",
    "skills": "...",
    "languages": "...",
    "projects": "..."
  },
  "intro": {
    "badge": "...",
    "greeting": "...",
    "name": "...",
    "description": "...",
    "cta": "...",
    "scroll": "..."
  },
  "about": {
    "badge": "...",
    "title": "...",
    "titleHighlight": "...",
    "paragraph1": "...",
    "paragraph2": "...",
    "paragraph3": "...",
    "cta": "..."
  },
  "skills": {
    "badge": "...",
    "title": "...",
    "titleHighlight": "..."
  },
  "languages": {
    "badge": "...",
    "title": "...",
    "titleHighlight": "...",
    "levels": {
      "native": "...",
      "fluent": "...",
      "basic": "..."
    }
  },
  "projects": {
    "badge": "...",
    "title": "...",
    "titleHighlight": "...",
    "button": "...",
    "modal": {
      "technologies": "...",
      "description": "...",
      "close": "...",
      "provider": "...",
      "period": "..."
    }
  }
}
```

## Usage in Components

### Options API
```vue
<template>
  <h1>{{ $t('intro.greeting') }}</h1>
</template>
```

### Composition API
```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// Use in template
const greeting = t('intro.greeting')

// Change language
locale.value = 'en'
</script>
```

### With Interpolation
```vue
<template>
  <p>{{ $t('about.paragraph1', { vue: 'Vue.js', express: 'Express.js' }) }}</p>
</template>
```

Translation file:
```json
{
  "about": {
    "paragraph1": "...frameworks like {vue} and {express}."
  }
}
```

## Adding a New Language

1. Create a new JSON file in `src/locales/`:
   ```bash
   src/locales/es.json  # For Spanish
   ```

2. Copy the structure from an existing locale file and translate

3. Import and add to i18n configuration in `src/i18n.ts`:
   ```typescript
   import es from './locales/es.json'
   
   const i18n = createI18n({
     // ...
     messages: {
       de,
       en,
       fr,
       es  // Add new language
     }
   })
   ```

4. Add to language switcher in `src/components/LanguageSwitcher.vue`:
   ```typescript
   const languages = [
     { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
     { code: 'en', name: 'English', flag: '🇬🇧' },
     { code: 'fr', name: 'Français', flag: '🇫🇷' },
     { code: 'es', name: 'Español', flag: '🇪🇸' }  // Add here
   ]
   ```

5. Update browser locale detection in `src/i18n.ts`:
   ```typescript
   const supportedLocales = ['de', 'en', 'fr', 'es']
   ```

## Adding New Translation Keys

1. Add the key to all locale files (de.json, en.json, fr.json)
2. Use the key in your component with `$t('key.path')`

Example:
```json
// In all locale files
{
  "footer": {
    "copyright": "© 2025 Patrick. All rights reserved."
  }
}
```

```vue
<!-- In component -->
<template>
  <footer>{{ $t('footer.copyright') }}</footer>
</template>
```

## Language Persistence

The selected language is automatically saved to `localStorage`:
```javascript
localStorage.setItem('locale', 'en')
```

On app load, the saved preference is retrieved:
```javascript
const savedLocale = localStorage.getItem('locale')
```

## Best Practices

1. **Keep keys organized**: Group related translations together
2. **Use descriptive keys**: `intro.greeting` not `text1`
3. **Consistent structure**: Maintain same structure across all locale files
4. **Pluralization**: Use vue-i18n's pluralization features for countable items
5. **Context**: Add comments in JSON for translators if needed
6. **Testing**: Always test with all languages after adding new keys

## Troubleshooting

### Translation not showing
- Check if key exists in ALL locale files
- Verify JSON syntax (no trailing commas)
- Check browser console for i18n warnings

### Language not switching
- Verify localStorage permissions
- Check if locale code matches in all places
- Ensure component is reactive to locale changes

### Missing translations
- vue-i18n will show the key path if translation is missing
- Check fallbackLocale is set correctly
- Verify import paths in i18n.ts

## Dependencies

```json
{
  "vue-i18n": "^9.x.x"
}
```

Install with:
```bash
npm install vue-i18n@9
```

## Resources

- [vue-i18n Documentation](https://vue-i18n.intlify.dev/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Intl API (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)