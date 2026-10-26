import apostrophe from 'eslint-config-apostrophe';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores([
    'public/apos-frontend',
    'data/temp',
    'apos-build',
    'modules/asset/ui/public'
  ]),
  apostrophe,
  {
    languageOptions: {
      globals: {
        apos: true
      }
    },
    rules: {
      'no-var': 'error',
      'no-console': 0
    }
  }
]);
