import { PlatformConfigProvider } from '../types/index.js';

export const scss: PlatformConfigProvider = ({ prefix, options }) => ({
  config: { prefix, options },
  coreFiles: true,
  files: ['all']
});
