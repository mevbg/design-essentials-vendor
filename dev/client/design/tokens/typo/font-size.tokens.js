import { BASE_FONT_SIZE } from '../../constants/typography.constants.js';
import { $150, $175, $200, $225, $250, $300, $400, $500 } from '../../constants/sizes.constants.js';

export default {
  $type: 'fontSize',
  
  base:           { $value: `${BASE_FONT_SIZE}PX` },
  basePercentage: { $value: '62.5%' },

   display: { $value: { min: $400, max: $500 } }, // 34x40
      head: { $value: { min: $300, max: $400 } }, // 24x32
     title: { $value: { min: $250, max: $300 } }, // 20x24
  subtitle: { $value: { min: $200, max: $250 } }, // 16x20
      body: { $value: { min: $175, max: $225 } }, // 14x18
    accent: { $value: { min: $175, max: $225 } }, // 14x18
     label: { $value: { min: $175, max: $200 } }, // 14x16
      note: { $value: { min: $175, max: $200 } }, // 14x16
    button: { $value: { min: $150, max: $175 } }, // 12x14
    script: { $value: { min: $150, max: $150 } }  // 12x12
};
