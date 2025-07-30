type Kebab<T extends string> = T extends `${infer F}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Lowercase<F>}${Kebab<R>}`
    : `${Lowercase<F>}-${Kebab<Uncapitalize<R>>}`
  : T;

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

  // Icon
  ICON = 'icon',

  // Opacity
  OPACITY = 'opacity',

  // Transition
  TRANSITION = 'transition'
}

export type CoreTokenCamelValues = `${CoreToken}`;

export type CoreTokenKebabValues = `${Kebab<CoreToken>}`;
