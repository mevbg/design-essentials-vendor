import { prefix } from '../../configs/index.js';

export default {
  $type: 'boxShadow',
  
  eight: {
    $value: `0px 2px 8px 0px color-mix(in srgb, var(--${prefix}-color-content-primary-base) calc(var(--${prefix}-opacity-25) * 100%), transparent calc(100% - calc(var(--${prefix}-opacity-25) * 100%)))`
  },
  twelve: {
    $value: `0px 4px 12px 0px color-mix(in srgb, var(--${prefix}-color-content-primary-base) calc(var(--${prefix}-opacity-25) * 100%), transparent calc(100% - calc(var(--${prefix}-opacity-25) * 100%)))`
  }
};
