import {
  ColorSchemeConfig,
  ColorSchemeMethod,
  ColorSchemeType,
  FaviconsConfig,
  FluidScalerConfig,
  IconsConfig,
  PlatformType,
  RootScalerConfig,
  ScrollbarConfig,
  TokensConfig
} from './types/index.js';

//
// ---------------------------------------------------
// BASE FONT SIZE

export const DEFAULT_BASE_FONT_SIZE: number = 10;

//
// ---------------------------------------------------
// PREFIX

export const DEFAULT_PREFIX: string = 'tk'; // "tk" stands for tokens

//
// ---------------------------------------------------
// PLATFORMS

export const DEFAULT_PLATFORMS = [
  PlatformType.CSS,
  PlatformType.SCSS,
  PlatformType.JS,
  PlatformType.JSON
] as const;

//
// ---------------------------------------------------
// COLOR SCHEME

const DEFAULT_COLOR_SCHEME: ColorSchemeConfig = {
  default: ColorSchemeType.LIGHT,
  method: ColorSchemeMethod.COMBINED
};

//
// ---------------------------------------------------
// FLUID SCALER

const DEFAULT_FLUID_SCALER_CONFIG: FluidScalerConfig = {
  minViewportW: 600,
  maxViewportW: 1200
};

//
// ---------------------------------------------------
// TOKENS

export const DEFAULT_TOKENS_CONFIG: Partial<TokensConfig> = {
  platforms: [...DEFAULT_PLATFORMS],
  colorScheme: DEFAULT_COLOR_SCHEME,
  fluidScaler: DEFAULT_FLUID_SCALER_CONFIG
};

//
// ---------------------------------------------------
// ROOT SCALER

export const DEFAULT_ROOT_SCALER_CONFIG: RootScalerConfig = {
  minViewportW: 300,
  maxViewportW: 2100
};

//
// ---------------------------------------------------
// ICONS

export const DEFAULT_ICONS_CONFIG: IconsConfig = {
  fontFamily: 'Iconography',
  color: 'currentColor',
  list: {}
};

//
// ---------------------------------------------------
// SCROLLBAR

export const DEFAULT_SCROLLBAR_CONFIG: ScrollbarConfig = {
  areaWidth: 16,
  thumbSizeBase: 4,
  thumbSizeOver: 10,
  thumbMinSize: 80,
  scrollbarBackground: 'transparent',
  thumbColor: '#ccc',
  thumbColorHover: '#ccc',
  thumbColorActive: '#999'
};

//
// ---------------------------------------------------
// FAVICONS

export const DEFAULT_FAVICONS_CONFIG: Partial<FaviconsConfig> = {
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
  }
};
