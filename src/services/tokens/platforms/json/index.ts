import {
  CommonPlatformFileType,
  PlatformContextGetter,
  PlatformType
} from '../../types/platform.types.js';
import { getDestinationFileName } from '../../utils/formats.utils.js';

// This is the platform context getter for the JSON platform.
// It returns only the native PlatformConfig as a "config" property,
// because it doesn't use custom formatters that require any other info.
export const json: PlatformContextGetter = ({ prefix }) => ({
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
