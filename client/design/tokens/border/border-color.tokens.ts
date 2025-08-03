import { prefix } from '../../configs/index.js';

export default {
  $type: 'borderColor',
  
    'gray-weak': { $value: `var(--${prefix}-color-content-gray-weak)` },
  'gray-medium': { $value: `var(--${prefix}-color-content-gray-medium)` },
          'red': { $value: `var(--${prefix}-color-primitive-red50)` },
  'transparent': { $value: 'transparent' }
};