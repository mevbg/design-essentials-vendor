import { PlatformConfigProvider } from '../../types/index.js';

export const scss: PlatformConfigProvider = ({ designData }) => ({
  config: {
    options: { designData }
  },
  allTokensFile: true,
  tokenTypeFiles: true
});
