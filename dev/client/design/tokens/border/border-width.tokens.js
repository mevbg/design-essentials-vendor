import { $600 } from '../../constants/breakpoint.constants.js';
import { PREFIX } from '../../../constants.js';

export default {
  $type: 'borderWidth',
  
   base: { $value: 'min(1PX, 0.1rem)' },
  thick: { $value: `clamp(1px, calc(1px + (100vw - ${$600}px) / ${$600}), 2px)` },
  brand: { $value: `var(--${PREFIX}-size-050x075)` }
};
