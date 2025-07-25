import { JsFormatterType } from '../../types/format.types.js';
import { PlatformConfigProvider } from '../../types/index.js';

export const js: PlatformConfigProvider = ({ prefix, options }) => ({
  config: {
    options: {
      ...options,
      prefix
    }
  },
  files: Object.values(JsFormatterType)
});
