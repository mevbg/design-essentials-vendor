import { $050, $075, $100, $125, $150, $175, $200, $225, $250, $300, $400, $500, $600, $800 } from '../../constants/sizes.constants.js';

export default {
  size: {
    $type: 'size',
    
    $050x050: { $value: { min: $050, max: $050 } }, // 4x4
    $050x075: { $value: { min: $050, max: $075 } }, // 4x6
    $075x100: { $value: { min: $075, max: $100 } }, // 6x8
    $075x125: { $value: { min: $075, max: $125 } }, // 6x10
    $100x150: { $value: { min: $100, max: $150 } }, // 8x12
    $125x175: { $value: { min: $125, max: $175 } }, // 10x14
    $150x200: { $value: { min: $150, max: $200 } }, // 12x16
    $175x225: { $value: { min: $175, max: $225 } }, // 14x18
    $200x250: { $value: { min: $200, max: $250 } }, // 16x20
    $250x300: { $value: { min: $250, max: $300 } }, // 20x24
    $300x400: { $value: { min: $300, max: $400 } }, // 24x32
    $400x500: { $value: { min: $400, max: $500 } }, // 32x40
    $500x600: { $value: { min: $500, max: $600 } }, // 40x48
    $200x600: { $value: { min: $200, max: $600 } }, // 16x48
    $600x800: { $value: { min: $600, max: $800 } }, // 48x64
  }
};
