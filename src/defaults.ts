import path from 'path';
import { fileURLToPath } from 'url';

import {
  ColorSchemeMethod,
  ColorSchemeParams,
  ColorSchemeType,
  FaviconsGeneratorParams,
  FluidScalerParams,
  FontFacesGeneratorParams,
  IconsGeneratorParams,
  MainGeneratorParams,
  PlatformType,
  RootScalerGeneratorParams,
  ScrollbarGeneratorParams,
  TokensGeneratorParams
} from './types/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//
// ---------------------------------------------------
// BUILD PATH

const DEFAULT_BUILD_PATH: string = path.resolve(__dirname, '../dist');

//
// ---------------------------------------------------
// BASE FONT SIZE

const DEFAULT_BASE_FONT_SIZE: number = 10;

//
// ---------------------------------------------------
// PREFIX

const DEFAULT_PREFIX: string = 'tk'; // "tk" stands for tokens

//
// ---------------------------------------------------
// COLOR SCHEME

const DEFAULT_COLOR_SCHEME_PARAMS: ColorSchemeParams = {
  default: ColorSchemeType.LIGHT,
  method: ColorSchemeMethod.COMBINED
};

//
// ---------------------------------------------------
// FLUID SCALER

const DEFAULT_FLUID_SCALER_PARAMS: FluidScalerParams = {
  minViewportW: 600,
  maxViewportW: 1200
};

//
// ---------------------------------------------------
// TOKENS

export const tokensGeneratorDefaultParams: TokensGeneratorParams = {
  prefix: DEFAULT_PREFIX,
  baseFontSize: DEFAULT_BASE_FONT_SIZE,
  platforms: [PlatformType.CSS, PlatformType.SCSS, PlatformType.JS, PlatformType.JSON],
  colorScheme: DEFAULT_COLOR_SCHEME_PARAMS,
  fluidScaler: DEFAULT_FLUID_SCALER_PARAMS,
  buildPath: DEFAULT_BUILD_PATH + '/tokens'
};

//
// ---------------------------------------------------
// ROOT SCALER

export const rootScalerGeneratorDefaultParams: RootScalerGeneratorParams = {
  prefix: DEFAULT_PREFIX,
  baseFontSize: DEFAULT_BASE_FONT_SIZE,
  minViewportW: 300,
  maxViewportW: 2100,
  buildPath: DEFAULT_BUILD_PATH + '/css'
};

//
// ---------------------------------------------------
// ICONS

export const iconsGeneratorDefaultParams: IconsGeneratorParams = {
  fontFamily: 'Iconography',
  color: 'currentColor',
  list: {},
  buildPath: DEFAULT_BUILD_PATH + '/css'
};

//
// ---------------------------------------------------
// FONT FACES

export const fontFacesGeneratorDefaultParams: Partial<FontFacesGeneratorParams> = {
  buildPath: DEFAULT_BUILD_PATH + '/css'
};

//
// ---------------------------------------------------
// SCROLLBAR

export const scrollbarGeneratorDefaultParams: ScrollbarGeneratorParams = {
  areaWidth: 16,
  thumbSizeBase: 4,
  thumbSizeOver: 10,
  thumbMinSize: 80,
  scrollbarBackground: 'transparent',
  thumbColor: '#ccc',
  thumbColorHover: '#ccc',
  thumbColorActive: '#999',
  buildPath: DEFAULT_BUILD_PATH + '/css'
};

//
// ---------------------------------------------------
// FAVICONS

export const faviconsGeneratorDefaultParams: Partial<FaviconsGeneratorParams> = {
  developerName: 'Martin Metodiev', // Your (or your developer's) name. `string`
  developerURL: 'https://mev.bg', // Your (or your developer's) URL. `string`
  dir: 'auto', // Primary text direction for name, short_name, and description
  lang: 'bg', // Primary language for name and short_name
  background: '#fff', // Background color for flattened icons. `string`
  theme_color: '#fff', // Theme color user for example in Android's task switcher. `string`
  appleStatusBarStyle: 'default', // Style for Apple status bar: "black-translucent", "default", "black". `string`
  display: 'standalone', // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
  orientation: 'portrait', // Default orientation: "any", "natural", "portrait" or "landscape". `string`
  scope: '/', // set of URLs that the browser considers within your app
  start_url: '/?homescreen=1', // Start URL when launching the application from a device. `string`
  preferRelatedApplications: false, // Should the browser prompt the user to install the native companion app. `boolean`
  relatedApplications: undefined, // Information about the native companion apps. This will only be used if `preferRelatedApplications` is `true`. `Array<{ id: string, url: string, platform: string }>`
  manifestMaskable: true, // Maskable source image(s) for manifest.json. "true" to use default source. More information at https://web.dev/maskable-icon/. `boolean`, `string`, `buffer` or array of `string`
  loadManifestWithCredentials: true, // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
  icons: {
    // Platform Options:
    // - offset - offset in percentage
    // - background:
    //   * false - use default
    //   * true - force use default, e.g. set background for Android icons
    //   * color - set background for the specified icons
    //
    /* eslint-disable @typescript-eslint/no-explicit-any */
    // eslint is disabled because IconOption is not exported from "favicons"
    android: { offset: 10 } as any, // Create Android home screen icon. `boolean` or `{ offset, background }` or an array of sources
    appleIcon: { offset: 10 } as any, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
    appleStartup: { offset: 5 } as any, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
    favicons: { offset: 0 } as any, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
    windows: { offset: 10 } as any, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
    yandex: { offset: 10 } as any // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
    /* eslint-enable @typescript-eslint/no-explicit-any */
  },
  buildPath: DEFAULT_BUILD_PATH + '/favicons'
};

//
// ---------------------------------------------------
// MAIN GENERATOR

export const mainGeneratorDefaultParams: MainGeneratorParams = {
  prefix: DEFAULT_PREFIX,
  baseFontSize: DEFAULT_BASE_FONT_SIZE,
  generators: {
    tokens: tokensGeneratorDefaultParams,
    rootScaler: rootScalerGeneratorDefaultParams,
    icons: iconsGeneratorDefaultParams,
    fontFaces: fontFacesGeneratorDefaultParams as FontFacesGeneratorParams,
    scrollbar: scrollbarGeneratorDefaultParams,
    favicons: faviconsGeneratorDefaultParams as FaviconsGeneratorParams
  },
  buildPath: DEFAULT_BUILD_PATH
};
