import path from 'path';
import StyleDictionary, { TransformedToken } from 'style-dictionary';
import { defaultColorSchemeConfig as colorScheme } from './configs/color-scheme.config';
import { defaultFluidScaleSchemeConfig as fluidScaleScheme } from './configs/fluid-scale-scheme.config';
import { defaultRootScaleSchemeConfig as rootScaleScheme } from './configs/root-scale-scheme.config';
import { CORE_TOKENS, DEFAULT_BASE_FONT_SIZE } from './constants';
import * as formats from './formats';
import type { GeneratorConfig } from './types/index';
import { toKebabCase } from './utils';

export async function generateDesignTokens({
  sourcePath,
  buildPath,
  prefix = 'tk', // "tk" stands for tokens
  options = {
    baseFontSize: DEFAULT_BASE_FONT_SIZE,
    colorScheme,
    rootScaleScheme,
    fluidScaleScheme
  }
}: GeneratorConfig): Promise<StyleDictionary> {
  // Register custom formats
  Object.values(formats).forEach((formatFn) => {
    if (typeof formatFn === 'function') {
      StyleDictionary.registerFormat(formatFn());
    }
  });

  return new StyleDictionary({
    source: [path.resolve(sourcePath)],

    platforms: {
      css: {
        prefix,
        options,
        transformGroup: 'css',
        buildPath: `${path.resolve(buildPath)}/css`,
        files: [
          {
            destination: 'all.design-tokens.css',
            format: 'mev/css/all'
          },
          {
            destination: 'root-font-size.design-tokens.css',
            format: 'mev/css/root-font-size'
          },
          ...CORE_TOKENS.filter((key) => key !== 'default').map((key) => ({
            destination: `${toKebabCase(key)}.design-tokens.css`,
            format: `mev/css/dedicated`,
            filter: (token: TransformedToken) => token.$type === key
          }))
        ]
      },

      js: {
        options: {
          ...options,
          prefix
        },
        transformGroup: 'js',
        buildPath: `${path.resolve(buildPath)}/js`,
        files: [
          {
            destination: 'static.design-tokens.js',
            format: 'mev/js/static'
          },
          {
            destination: 'variable.design-tokens.js',
            format: 'mev/js/variable'
          }
        ]
      },

      json: {
        transformGroup: 'js',
        buildPath: `${path.resolve(buildPath)}/json`,
        options: {
          ...options,
          showFileHeader: false
        },
        files: [
          {
            destination: 'design-tokens.json',
            format: 'json/nested'
          }
        ]
      },

      scss: {
        transformGroup: 'scss',
        buildPath: `${path.resolve(buildPath)}/scss`,
        options: {
          ...options,
          showFileHeader: false
        },
        files: [
          {
            destination: 'all.design-tokens.scss',
            format: 'mev/scss/all'
          },
          ...CORE_TOKENS.filter((key) => key !== 'default').map((key) => ({
            destination: `${toKebabCase(key)}.design-tokens.scss`,
            format: `mev/scss/dedicated`,
            filter: (token: TransformedToken) => token.$type === key
          }))
        ]
      }
    }
  }).buildAllPlatforms();
}
