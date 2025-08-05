import type { FormatFnArguments } from 'style-dictionary/types';
import {
  CssCustomPlatformFileType,
  CustomFormatterCategory,
  OutputConfig
} from '../../../types/index.js';
import { getFileOutput } from '../../../utils/formats.utils.js';
import { toCamelCase } from '../../../utils/strings.utils.js';

// This function outputs the scrollbar styles
export const outputScrollbar = async (
  output: string[],
  formatArgs: FormatFnArguments,
  config?: OutputConfig
): Promise<void> => {
  output.push(
    await getFileOutput({
      name: toCamelCase(CssCustomPlatformFileType.SCROLLBAR),
      category: CustomFormatterCategory.CSS,
      config,
      parser: (output, wrapper) => {
        const { scrollbar } = formatArgs.options.designData;

        output.push(
          wrapper({
            name: 'html:not(.isMacOs)',
            code: `  --scrollbar-area: ${scrollbar.areaWidth}px;
  --scrollbar-thumb-size-base: ${scrollbar.thumbSizeBase}px;
  --scrollbar-thumb-size-over: ${scrollbar.thumbSizeOver}px;
  --scrollbar-gap-size-base: calc(
    (var(--scrollbar-area) - var(--scrollbar-thumb-size-base)) / 2
  ); /* 6px */
  --scrollbar-gap-size-over: calc(
    (var(--scrollbar-area) - var(--scrollbar-thumb-size-over)) / 2
  ); /* 3px */
  --scrollbar-background: ${scrollbar.scrollbarBackground};
  --scrollbar-thumb-color: ${scrollbar.thumbColor};
  --scrollbar-thumb-color-hover: ${scrollbar.thumbColorHover};
  --scrollbar-thumb-color-active: ${scrollbar.thumbColorActive};
  --scrollbar-thumb-min-size: ${scrollbar.thumbMinSize}px;

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
          })
        );
      }
    })
  );
};
