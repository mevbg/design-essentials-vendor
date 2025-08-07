/* =================================================== */
/* TOKENS → TYPES → UTOPIA SCHEME */
/* =================================================== */

//
// ---------------------------------------------------
// UTOPIA SCHEME PARAMS

// The Utopia Scheme is the one that takes care of the gradual scaling of typography
// and other given elements, by applying dynamic calc()-based formula as a value,
// when in between the minViewportW and maxViewportW breakpoints.
export type UtopiaSchemeParams = {
  // This is the minimum viewport width above which the utopia scheme is applied.
  // Below that breakpoint, the min given value is fixed.
  minViewportW: number;

  // This is the maximum viewport width below which the utopia scheme is applied.
  // Above that breakpoint, the max given value is fixed.
  maxViewportW: number;
};
