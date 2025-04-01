// import type { LocalePrefix } from 'node_modules/next-intl/dist/types/src/shared/types';

import type { LocalePrefix } from '@/types/global';

const localePrefix: LocalePrefix = 'as-needed';

// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: 'MyPhoto',
  locales: ['vi'],
  defaultLocale: 'vi',
  localePrefix,
};
