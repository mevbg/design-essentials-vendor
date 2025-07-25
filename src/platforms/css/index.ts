import { PlatformConfigProvider } from '../../types/index.js';

export const css: PlatformConfigProvider = ({ prefix, options }) => ({
  config: { prefix, options },
  coreFiles: true,
  files: ['all', 'root-font-size']
});
