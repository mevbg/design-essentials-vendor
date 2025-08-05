//
// ------------------------------------------------------------
// ROOT SCALER

// The Root Scaler is the one that takes care of the entire layout scaling,
// below the minViewportW and (if in presentation mode) above the maxViewportW.
// It sets the font-size of the root element to be relative to the viewport width,
// which leads to a total scaling of everything based on rem/em units.
export type RootScalerConfig = {
  // This is the minimum viewport width below which
  // the root scaler is applied.
  minViewportW: number;

  // This is the maximum viewport width above which
  // the root scaler is applied. (if in presentation mode)
  maxViewportW: number;
};
