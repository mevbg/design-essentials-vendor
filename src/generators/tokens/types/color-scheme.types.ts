/* =================================================== */
/* TOKENS → TYPES → COLOR SCHEME */
/* =================================================== */

//
// ---------------------------------------------------
// COLOR SCHEME TYPE

// These are the only available native color schemes that can be used.
export enum ColorSchemeType {
  LIGHT = 'light',
  DARK = 'dark'
}

//
// ---------------------------------------------------
// COLOR SCHEME METHOD

// These are the methods that can be used to define the color scheme behavior.
export enum ColorSchemeMethod {
  // The color scheme is defined based on the "prefers-color-scheme" media query.
  // Using this method means only @media-related code will be generated in the CSS output.
  MEDIA = 'media',

  // The color scheme is defined based on a class name (light/dark) applied to the root element.
  // Using this method means only html.class-related code will be generated in the CSS output.
  CLASS = 'class',

  // The color scheme is defined based on the media query and class name where the class method has priority over the media query.
  // Using this method means both @media-related and html.class-related code will be generated in the CSS output.
  COMBINED = 'combined'
}

//
// ---------------------------------------------------
// COLOR SCHEME PARAMS

// This is the object that contains the key data
// necessary for defining the color scheme.
export type ColorSchemeParams = {
  // This property determines the default color scheme to be used initially
  // when no other logic is applied.
  default?: ColorSchemeType;

  // This property determines the method to be used
  // for defining the color scheme behavior.
  method?: ColorSchemeMethod;
};
