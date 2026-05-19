import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',

  localePrefix: 'as-needed',
  // 'as-needed' = /fr absent (langue par défaut), /en présent
  // Résultat :
  //   bahorvoyage.com/circuits       → français
  //   bahorvoyage.com/en/circuits    → anglais

  // Désactive la détection automatique via Accept-Language.
  // Sans cela, un navigateur en anglais est redirigé vers /en au lieu de /
  localeDetection: false,
});
