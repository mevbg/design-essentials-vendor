import { PREFIX } from '../../../constants';

export default {
  $type: 'borderColor',
  
    'gray-weak': { $value: `var(--${PREFIX}-color-content-gray-weak)` },
  'gray-medium': { $value: `var(--${PREFIX}-color-content-gray-medium)` },
          'red': { $value: `var(--${PREFIX}-color-primitive-red50)` },
  'transparent': { $value: 'transparent' }
};