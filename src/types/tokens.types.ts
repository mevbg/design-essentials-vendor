import type { Kebab } from './utils.types.js';

//
// ------------------------------------------------------------
// CORE TOKENS

// Core tokens are those tokens that are most often the subject of definitions
// and almost certainly expect values to be passed for them,
// for which output is expected to be generated.

// Therefore, they are registered as reserved, with some of them having key names
// to which specific logic is attached and a specific structure is expected.
// Such a type is "color", to which logic for defining color schemes is attached.

export enum CoreToken {
  // Typography
  FONT_FAMILY = 'fontFamily',
  FONT_SIZE = 'fontSize',
  FONT_WEIGHT = 'fontWeight',
  LETTER_SPACING = 'letterSpacing',
  LINE_HEIGHT = 'lineHeight',

  // Color
  COLOR = 'color',

  // Size
  SIZE = 'size',

  // Border
  BORDER_COLOR = 'borderColor',
  BORDER_RADIUS = 'borderRadius',
  BORDER_STYLE = 'borderStyle',
  BORDER_WIDTH = 'borderWidth',

  // Box Shadow
  BOX_SHADOW = 'boxShadow',

  // Breakpoint
  BREAKPOINT = 'breakpoint',

  // Dimensions
  DIMENSIONS = 'dimensions',

  // Opacity
  OPACITY = 'opacity',

  // Transition
  TRANSITION = 'transition'
}

// This type contains the camelCase values for the core tokens.
export type CoreTokenCamelValues = `${CoreToken}`;

// This type contains the kebab-case values for the core tokens.
export type CoreTokenKebabValues = `${Kebab<CoreToken>}`;
