import { PlatformConfigProvider } from '../types/index.js';

export const scss: PlatformConfigProvider = ({ options }) => ({
  config: { options },
  coreFiles: true,
  files: ['all']
});
