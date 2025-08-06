/* =================================================== */
/* ROOT SCALER → TYPES */
/* =================================================== */

//
// ---------------------------------------------------
// CONFIG

// The Root Scaler is the one that takes care of the entire layout scaling,
// below the minViewportW and (if in presentation mode) above the maxViewportW.
// It sets the font-size of the root element to be relative to the viewport width,
// which leads to a total scaling of everything based on rem/em units.
export type RootScalerGeneratorParams = {
  // This is the prefix for the CSS custom properties.
  // It is used to avoid conflicts with other CSS custom properties.
  prefix?: string;

  // This is the base font size for the design system.
  // It is used to calculate the rem/em units.
  baseFontSize?: number;

  // This is the minimum viewport width below which
  // the root scaler is applied.
  minViewportW?: number;

  // This is the maximum viewport width above which
  // the root scaler is applied. (if in presentation mode)
  maxViewportW?: number;

  // This is the path to the build directory.
  // It is used to output the generated files.
  buildPath?: string;
};
