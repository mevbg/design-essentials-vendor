import { JsPlatformFileType, PlatformConfigProvider } from '../../types/index.js';

export const js: PlatformConfigProvider = ({ prefix, designData }) => ({
  config: {
    options: {
      prefix,
      designData
    }
  },
  customFiles: Object.values(JsPlatformFileType)
});
