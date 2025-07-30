import { CommonPlatformFileType, PlatformConfigProvider, PlatformType } from '../../types/index.js';
import { getDestinationFileName } from '../../utils/formats.utils.js';

export const json: PlatformConfigProvider = ({ prefix }) => ({
  config: {
    transformGroup: PlatformType.JS,
    options: {
      prefix,
      showFileHeader: false
    },
    files: [
      {
        destination: getDestinationFileName(PlatformType.JSON, CommonPlatformFileType.ALL),
        format: 'json/nested'
      }
    ]
  }
});
