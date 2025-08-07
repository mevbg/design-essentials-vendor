/* =================================================== */
/* SCROLLBAR → GENERATOR */
/* =================================================== */

import { GeneratorFn, ScrollbarGeneratorParams } from '../../types/index.js';
import { cssSelectorBlock } from '../../utils/formats.utils.js';
import { cssGenerator } from '../../utils/generators.utils.js';
//
// ---------------------------------------------------
// GENERATOR FUNCTION

// This function outputs the scrollbar styles
export const scrollbarGenerator: GeneratorFn<ScrollbarGeneratorParams> = (params) =>
  cssGenerator<ScrollbarGeneratorParams>('scrollbar', params, (output, config) => {
    output.push(
      cssSelectorBlock({
        name: 'html:not(.isMacOs)',
        code: `  --scrollbar-area: ${config.areaWidth}px;
  --scrollbar-thumb-size-base: ${config.thumbSizeBase}px;
  --scrollbar-thumb-size-over: ${config.thumbSizeOver}px;
  --scrollbar-gap-size-base: calc(
    (var(--scrollbar-area) - var(--scrollbar-thumb-size-base)) / 2
  ); /* 6px */
  --scrollbar-gap-size-over: calc(
    (var(--scrollbar-area) - var(--scrollbar-thumb-size-over)) / 2
  ); /* 3px */
  --scrollbar-background: ${config.scrollbarBackground};
  --scrollbar-thumb-color: ${config.thumbColor};
  --scrollbar-thumb-color-hover: ${config.thumbColorHover};
  --scrollbar-thumb-color-active: ${config.thumbColorActive};
  --scrollbar-thumb-min-size: ${config.thumbMinSize}px;

  /* Scrollbar area */
  ::-webkit-scrollbar:vertical {
    width: var(--scrollbar-area);
  }

  ::-webkit-scrollbar:horizontal {
    height: var(--scrollbar-area);
  }

  ::-webkit-scrollbar {
    scroll-margin: 0;
    background-color: var(--scrollbar-background);
  }

  /* Track */
  ::-webkit-scrollbar-track-piece {
    border: var(--scrollbar-gap-size-base) solid transparent;
    border-radius: var(--scrollbar-thumb-size-base);
    background-color: transparent;
  }

  /* Thumb */
  ::-webkit-scrollbar-thumb:vertical {
    min-height: var(--scrollbar-thumb-min-size);
  }

  ::-webkit-scrollbar-thumb:horizontal {
    min-width: var(--scrollbar-thumb-min-size);
  }

  ::-webkit-scrollbar-thumb {
    border: var(--scrollbar-gap-size-base) solid transparent;
    border-radius: var(--scrollbar-area);
    background: var(--scrollbar-thumb-color);
  }

  ::-webkit-scrollbar-thumb:hover {
    --scrollbar-thumb-color: var(--scrollbar-thumb-color-hover);
  }

  ::-webkit-scrollbar-thumb:active {
    --scrollbar-thumb-color: var(--scrollbar-thumb-color-active);
  }

  ::-webkit-scrollbar-thumb:hover,
  ::-webkit-scrollbar-thumb:active {
    border: var(--scrollbar-gap-size-over) solid transparent;
  }

  ::-webkit-scrollbar-thumb,
  ::-webkit-scrollbar-thumb:hover,
  ::-webkit-scrollbar-thumb:active {
    background-clip: padding-box;
  }

  /* Cursor */
  ::-webkit-scrollbar-track-piece,
  ::-webkit-scrollbar-track-piece:hover,
  ::-webkit-scrollbar-track-piece:active {
    cursor: default;
  }

  ::-webkit-scrollbar-thumb:vertical,
  ::-webkit-scrollbar-thumb:vertical:hover,
  ::-webkit-scrollbar-thumb:vertical:active {
    cursor: ns-resize;
  }

  ::-webkit-scrollbar-thumb:horizontal,
  ::-webkit-scrollbar-thumb:horizontal:hover,
  ::-webkit-scrollbar-thumb:horizontal:active {
    cursor: ew-resize;
  }

  /* Button */
  ::-webkit-scrollbar-button {
    display: none;
  }`
      }) + '\n'
    );

    return `${output.join('\n')}\n`;
  });
