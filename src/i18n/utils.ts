import { ui, type UIKey } from './ui';
import { defaultLang, type Language } from './languages';

// Get base URL for links (handles GitHub Pages base path)
export function getBaseUrl(): string {
  return import.meta.env.BASE_URL || '/';
}

// Create a proper URL with base path
export function url(path: string): string {
  const base = getBaseUrl().replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function getLangFromUrl(astroUrl: URL): Language {
  // Remove base path before parsing language
  const basePath = import.meta.env.BASE_URL || '/';
  let pathname = astroUrl.pathname;

  // Strip base path prefix if present
  if (basePath !== '/' && pathname.startsWith(basePath)) {
    pathname = pathname.slice(basePath.length - 1); // Keep leading slash
  }

  const [, lang] = pathname.split('/');
  if (lang in ui) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: UIKey, params?: Record<string, string | number>): string {
    let translation: string = ui[lang][key] || ui[defaultLang][key] || key;

    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, String(value));
      });
    }

    return translation;
  };
}

export function getLocalizedPath(path: string, lang: Language): string {
  // Remove leading slash and any existing language prefix
  const cleanPath = path.replace(/^\/?(de|en)\//, '').replace(/^\//, '');
  return `/${lang}/${cleanPath}`;
}

export function getAlternateLanguage(lang: Language): Language {
  return lang === 'de' ? 'en' : 'de';
}

// Route mappings between languages
const routeMappings: Record<string, Record<Language, string>> = {
  // German to English route mappings
  'kontakt': { de: 'kontakt', en: 'contact' },
  'contact': { de: 'kontakt', en: 'contact' },
  'karriere': { de: 'karriere', en: 'careers' },
  'careers': { de: 'karriere', en: 'careers' },
  'bewerbung': { de: 'bewerbung', en: 'application' },
  'application': { de: 'bewerbung', en: 'application' },
  'impressum': { de: 'impressum', en: 'imprint' },
  'imprint': { de: 'impressum', en: 'imprint' },
  'datenschutz': { de: 'datenschutz', en: 'privacy' },
  'privacy': { de: 'datenschutz', en: 'privacy' },
  'tutorials-hilfe': { de: 'tutorials-hilfe', en: 'tutorials-help' },
  'tutorials-help': { de: 'tutorials-hilfe', en: 'tutorials-help' },
  'dokumentation': { de: 'dokumentation', en: 'documentation' },
  'documentation': { de: 'dokumentation', en: 'documentation' },
};

export function getTranslatedPath(currentPath: string, targetLang: Language): string {
  // Remove leading/trailing slashes and split
  const pathParts = currentPath.replace(/^\/|\/$/g, '').split('/');

  // Skip the language prefix if present
  const startIndex = (pathParts[0] === 'de' || pathParts[0] === 'en') ? 1 : 0;

  // Translate each path segment
  const translatedParts = pathParts.slice(startIndex).map(segment => {
    const mapping = routeMappings[segment];
    return mapping ? mapping[targetLang] : segment;
  });

  return `/${targetLang}/${translatedParts.join('/')}`.replace(/\/$/, '') || `/${targetLang}`;
}
