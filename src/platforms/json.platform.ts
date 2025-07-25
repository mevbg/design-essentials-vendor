import { PlatformConfigProvider } from '../types/index.js';
import { getDestinationFileName } from '../utils/format.utils.js';

export const json: PlatformConfigProvider = ({ options }) => ({
  config: {
    transformGroup: 'js',
    options: {
      ...options,
      showFileHeader: false
    },
    files: [
      {
        destination: getDestinationFileName('json', 'all'),
        format: 'json/nested'
      }
    ]
  }
});
