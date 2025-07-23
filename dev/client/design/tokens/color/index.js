import { transformToStyleDictionaryColors } from '../../utils/colors.utils.js'

import * as PrimitiveColors from '../../constants/colors/primitive-colors.constants.js';
import * as ContextualColors from '../../constants/colors/contextual-colors.constants.js';

const [Brand, Green, Monochrome, Red] = transformToStyleDictionaryColors(Object.keys(PrimitiveColors).map((key) => PrimitiveColors[key]));
const [LightBackground, LightContent] = transformToStyleDictionaryColors(Object.keys(ContextualColors).map((key) => ContextualColors[key]('light')));
const [DarkBackground, DarkContent] = transformToStyleDictionaryColors(Object.keys(ContextualColors).map((key) => ContextualColors[key]('dark')));

export default {
  color: {
    $type: 'color',
    
    // Primitive color tokens
    primitive: {
      ...Monochrome,
      ...Red,
      ...Green, 
      ...Brand
    },

    // Contextual color tokens
    scheme: {
      light: {
        content: LightContent,
        background: LightBackground
      },
      dark: {
        content: DarkContent,
        background: DarkBackground
      }
    }
  }
};
