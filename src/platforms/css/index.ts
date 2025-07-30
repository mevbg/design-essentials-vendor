import { CssPlatformFileType, PlatformConfigProvider } from '../../types/index.js';

export const css: PlatformConfigProvider = ({ prefix, designData }) => ({
  config: {
    prefix,
    options: {
      prefix,
      designData
    }
  },
  allTokensFile: true,
  tokenTypeFiles: true,
  customFiles: [CssPlatformFileType.ROOT_FONT_SIZE]
});
