# Design Essentials Vendor

> _Mev’s personal vendor of design system essentials._

## 🎯 Overview

Design Essentials Vendor is not just a design token generator — it’s a comprehensive factory for creating design system essentials. Built on top of Style Dictionary, it provides an opinionated, production-ready solution for generating design essentials with advanced features.

## 🚀 Features

### Core Capabilities

- **Fluid Typography & Scaling**: Responsive typography that scales smoothly between viewport breakpoints
- **Color Scheme Management**: Light/dark theme support with multiple implementation methods
- **Root Scaling System**: Complete layout scaling for different viewport sizes
- **Multi-Platform Output**: CSS, SCSS, JavaScript, and JSON formats
- **Advanced Token Processing**: Specialized handlers for different token types
- **Font Management**: Automatic font face generation and root font size configuration
- **Icons System**: Complete icon font system with CSS attribute selectors
- **Scrollbar System**: Custom scrollbar styling with WebKit support
- **Favicons Generation**: Automatic favicon generation for all platforms and devices

### Supported Platforms

- **CSS**: Production-ready CSS with custom properties and media queries
- **SCSS**: SCSS variables and mixins for advanced styling
- **JavaScript**: Static values and CSS custom property references
- **JSON**: Structured token data for programmatic use

## 📦 Installation

```bash
npm install @mevbg/dev
```

## 🛠️ Usage

### Basic Setup

```typescript
import { generateDesignEssentials } from '@mevbg/dev';

await generateDesignEssentials({
  buildPath: './dist',
  baseFontSize: 10,
  tokens: {
    sourcePath: './design/tokens/**/index.ts',
    prefix: 'dev',
    platforms: ['css', 'scss', 'js', 'json']
  },
  colorScheme: {
    default: 'light',
    method: 'combined'
  },
  fluidScaler: {
    minViewportW: 600,
    maxViewportW: 1200
  },
  rootScaler: {
    minViewportW: 300,
    maxViewportW: 2100
  },
  fonts: {
    path: './fonts'
  },
  icons: {
    fontFamily: 'DevIcons',
    color: 'var(--dev-color-content-gray-weak)',
    list: {
      main: 'E000',
      search: 'E002',
      close: 'E006'
      // ... more icons
    }
  },
  scrollbar: {
    areaWidth: 16,
    thumbSizeBase: 4,
    thumbSizeOver: 10,
    thumbMinSize: 80,
    scrollbarBackground: 'transparent',
    thumbColor: 'var(--dev-color-content-gray-weak)',
    thumbColorHover: 'var(--dev-color-content-gray-weak)',
    thumbColorActive: 'var(--dev-color-content-gray-weak)'
  },
  favicons: {
    id: 'https://mev.bg',
    sourcePath: './images/logo.svg',
    appName: 'Client Design Essentials',
    appShortName: 'CDE',
    appDescription: 'Client Design Essentials',
    version: '1.0.0'
  }
});
```

### Configuration Options

#### GeneratorConfig

The main configuration object that controls the entire generation process:

```typescript
type GeneratorConfig = {
  buildPath: string; // Output directory path
  tokens: {
    sourcePath: string; // Path to token source files
    prefix?: string; // CSS custom property prefix
    platforms?: PlatformType[]; // Output platforms
  };
  baseFontSize?: number; // Base font size (default: 10)
  colorScheme?: ColorSchemeConfig; // Color scheme configuration
  fluidScaler?: FluidScalerConfig; // Fluid scaling configuration
  rootScaler?: RootScalerConfig; // Root scaling configuration,
  fonts?: {
    path: string; // Path to font files
  };
  icons?: {
    fontFamily?: string; // Icon font family (default: 'Iconography')
    color?: string; // Icon color (default: 'currentColor')
    list: Record<string, string>; // Icon code mappings
  };
  scrollbar?: {
    areaWidth?: number; // Scrollbar area width
    thumbSizeBase?: number; // Base thumb size
    thumbSizeOver?: number; // Thumb size on hover
    thumbMinSize?: number; // Minimum thumb size
    scrollbarBackground?: string; // Scrollbar background color
    thumbColor?: string; // Thumb color
    thumbColorHover?: string; // Thumb color on hover
    thumbColorActive?: string; // Thumb color when active
  };
  favicons?: {
    id: string; // Unique identifier for the app
    sourcePath: string; // Path to source SVG/PNG image
    outputPath?: string; // Output directory for favicons (optional)
    appName: string; // Full application name
    appShortName: string; // Short application name
    appDescription: string; // Application description
    version: string; // Application version
  };
};
```

#### Color Scheme Configuration

```typescript
type ColorSchemeConfig = {
  default?: ColorSchemeType; // 'light' | 'dark'
  method?: ColorSchemeMethod; // 'media' | 'class' | 'combined'
};
```

**Color Scheme Methods:**

- `media`: Uses `prefers-color-scheme` media queries
- `class`: Uses HTML class-based switching
- `combined`: Uses both methods with class priority

#### Fluid Scaler Configuration

```typescript
type FluidScalerConfig = {
  minViewportW: number; // Minimum viewport width
  maxViewportW: number; // Maximum viewport width
};
```

#### Root Scaler Configuration

```typescript
type RootScalerConfig = {
  minViewportW: number; // Minimum viewport width
  maxViewportW: number; // Maximum viewport width
};
```

#### Icons Configuration

```typescript
type IconsConfig = {
  fontFamily?: string; // Icon font family (default: 'Iconography')
  color?: string; // Icon color (default: 'currentColor')
  list: Record<string, string>; // Icon code mappings
};
```

#### Scrollbar Configuration

```typescript
type ScrollbarConfig = {
  areaWidth?: number; // Scrollbar area width
  thumbSizeBase?: number; // Base thumb size
  thumbSizeOver?: number; // Thumb size on hover
  thumbMinSize?: number; // Minimum thumb size
  scrollbarBackground?: string; // Scrollbar background color
  thumbColor?: string; // Thumb color
  thumbColorHover?: string; // Thumb color on hover
  thumbColorActive?: string; // Thumb color when active
};
```

#### Favicons Configuration

```typescript
type FaviconsConfig = {
  id: string; // Unique identifier for the app
  sourcePath: string; // Path to source SVG/PNG image
  outputPath?: string; // Output directory for favicons (optional)
  appName: string; // Full application name
  appShortName: string; // Short application name
  appDescription: string; // Application description
  version: string; // Application version
  // Additional favicon options from favicons package
  developerName?: string;
  developerURL?: string;
  background?: string;
  theme_color?: string;
  display?: string;
  orientation?: string;
  scope?: string;
  start_url?: string;
  icons?: {
    android?: boolean | object;
    appleIcon?: boolean | object;
    appleStartup?: boolean | object;
    favicons?: boolean | object;
    windows?: boolean | object;
    yandex?: boolean | object;
  };
};
```

## 🏗️ Architecture

### Core Components

#### 1. Generator (`src/generator.ts`)

The main entry point that orchestrates the entire generation process:

```typescript
export async function generateDesignEssentials(config: GeneratorConfig): Promise<void>;
```

#### 2. Services (`src/services/`)

Service modules for different generation tasks:

- **Style Dictionary Service** (`style-dictionary.service.ts`): Handles design token generation
- **Favicons Service** (`favicons.service.ts`): Handles favicon generation for all platforms

#### 3. Platform System (`src/platforms/`)

Platform-specific configurations and formatters:

- **CSS Platform** (`src/platforms/css/`): CSS custom properties with media queries and custom parsers
  - **Formatters** (`formats.ts`): Standard token formatters for CSS output
  - **Parsers** (`parsers/`): Specialized parsers for custom CSS generation
    - `root-scale.ts`: Responsive root font size generation
    - `font-faces.ts`: Dynamic font face declarations
    - `icons.ts`: Icon font system generation
    - `scrollbar.ts`: WebKit scrollbar styling
- **SCSS Platform** (`src/platforms/scss/`): SCSS variables and mixins
- **JavaScript Platform** (`src/platforms/js/`): Static values and variable references
- **JSON Platform** (`src/platforms/json/`): Structured token data

#### 4. Token Handlers (`src/handlers/`)

Specialized processors for different token types:

- **Basic Handler** (`basic.handler.ts`): Standard token processing
- **Color Handler** (`color.handler.ts`): Color scheme and theme management
- **Fluid Handler** (`fluid.handler.ts`): Responsive value generation

#### 5. Token Types (`src/types/tokens.types.ts`)

Core token definitions:

```typescript
enum CoreToken {
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

  // Opacity
  OPACITY = 'opacity',

  // Transition
  TRANSITION = 'transition'
}
```

### Token Structure

#### Design Token Format

Tokens follow the Style Dictionary format with additional metadata:

```typescript
{
  $type: 'fontSize',
  $value: { min: '16px', max: '24px' },  // Fluid values
  $description: 'Body text size',
  attributes: {
    type: 'scheme',                       // For color schemes
    item: 'light'                         // Scheme variant
  }
}
```

#### Fluid Token Values

Fluid tokens use min/max value objects for responsive scaling:

```typescript
{
  display: { $value: { min: '32px', max: '40px' } },
     body: { $value: { min: '14px', max: '18px' } }
}
```

#### Color Scheme Tokens

Color tokens support light/dark schemes:

```typescript
{
  color: {
    scheme: {
      light: {
        background: { $value: '#ffffff' },
        content: { $value: '#000000' }
      },
      dark: {
        background: { $value: '#000000' },
        content: { $value: '#ffffff' }
      }
    }
  }
}
```

## 📁 File Structure

```text
design-essentials-vendor/
├── src/
│   ├── generator.ts                    # Main generator function
│   ├── configs.ts                      # Default configuration values
│   ├── formats.ts                      # Format registration
│   ├── services/                       # Service modules
│   │   ├── index.ts                    # Service exports
│   │   ├── favicons.service.ts         # Favicon generation service
│   │   └── style-dictionary.service.ts # Style Dictionary service
│   ├── types/                          # TypeScript type definitions
│   │   ├── generator.types.ts          # Generator configuration types
│   │   ├── design.types.ts             # Design-related types
│   │   ├── platform.types.ts           # Platform-specific types
│   │   ├── tokens.types.ts             # Token type definitions
│   │   ├── format.types.ts             # Format and handler types
│   │   └── utils.types.ts              # Utility type definitions
│   ├── platforms/                      # Platform-specific implementations
│   │   ├── css/                        # CSS platform
│   │   │   ├── index.ts                # Platform configuration
│   │   │   ├── formats.ts              # CSS formatters
│   │   │   ├── utils.ts                # CSS utility functions
│   │   │   └── parsers/                # CSS custom output parsers
│   │   │       ├── index.ts            # Parser exports
│   │   │       ├── root-scaler.ts      # Root scaler parser
│   │   │       ├── font-faces.ts       # Font faces parser
│   │   │       ├── icons.ts            # Icons parser
│   │   │       └── scrollbar.ts        # Scrollbar parser
│   │   ├── scss/                       # SCSS platform
│   │   ├── js/                         # JavaScript platform
│   │   └── json/                       # JSON platform
│   ├── handlers/                       # Token processing handlers
│   │   ├── basic.handler.ts            # Basic token processing
│   │   ├── color.handler.ts            # Color scheme processing
│   │   └── fluid.handler.ts            # Fluid value processing
│   └── utils/                          # Utility functions
│       ├── formats.utils.ts            # Format utility functions
│       ├── strings.utils.ts            # String manipulation utilities
│       └── tokens/                     # Token-specific utilities
│           ├── color-tokens.utils.ts
│           └── fluid-tokens.utils.ts
├── client/                             # Client-side configuration
│   ├── index.ts                        # Client entry point
│   ├── constants.ts                    # Client constants
│   └── design/                         # Design system definitions
│       ├── constants/                  # Design constants
│       ├── tokens/                     # Token definitions
│       ├── utils/                      # Design utilities
│       └── fonts/                      # Font files
└── package.json
```

## 🎨 Design System Integration

### Token Organization

The client-side design system is organized into logical categories:

```text
client/design/
├── constants/                    # Design constants
│   ├── breakpoint.constants.ts   # Breakpoint definitions
│   ├── colors/                   # Color definitions
│   │   ├── primitive-colors.constants.ts
│   │   └── contextual-colors.constants.ts
│   ├── sizes.constants.ts        # Size definitions
│   ├── typography.constants.ts   # Typography constants
│   └── opacities.constants.ts    # Opacity values
├── configs/                      # Configuration files
│   ├── fonts.config.ts           # Font configuration
│   ├── icons.config.ts           # Icons configuration
│   ├── scrollbar.config.ts       # Scrollbar configuration
│   ├── favicons.config.ts        # Favicons configuration
│   ├── color-scheme.config.ts    # Color scheme configuration
│   ├── fluid-scaler.config.ts    # Fluid scaler configuration
│   ├── root-scaler.config.ts     # Root scaler configuration
│   └── index.ts                  # Config exports
├── images/                       # Source images
│   └── logo.svg                  # Logo for favicon generation
├── tokens/                       # Token definitions
│   ├── color/                    # Color tokens
│   ├── typography/               # Typography tokens
│   ├── size/                     # Size tokens
│   ├── border/                   # Border tokens
│   ├── shadow/                   # Shadow tokens
│   ├── breakpoint/               # Breakpoint tokens
│   ├── dimensions/               # Dimension tokens
│   └── opacity/                  # Opacity tokens
└── utils/                        # Design utilities
    ├── colors.utils.ts           # Color transformation utilities
    ├── strings.utils.ts          # String manipulation utilities
    └── units.utils.ts            # Unit conversion utilities
```

### Configuration Management

The system now uses a modular configuration approach with separate TypeScript files for each aspect:

```typescript
// client/design/configs/index.ts
export * from './fonts.config.js';
export * from './icons.config.js';
export * from './scrollbar.config.js';
export * from './favicons.config.js';
export * from './color-scheme.config.js';
export * from './fluid-scaler.config.js';
export * from './root-scaler.config.js';
```

**Configuration Files:**

- `fonts.config.ts` - Font paths and settings
- `icons.config.ts` - Icon font family, colors, and icon mappings
- `scrollbar.config.ts` - Scrollbar dimensions and colors
- `favicons.config.ts` - Favicon generation configuration
- `color-scheme.config.ts` - Light/dark theme configuration
- `fluid-scale.config.ts` - Responsive scaling viewport ranges
- `root-scale.config.ts` - Root font scaling configuration

### CSS Platform Parsers

The CSS platform includes specialized parsers for generating custom output files:

**Parser System:**

- **Root Font Size Parser** (`root-scale.ts`) - Generates responsive root font size CSS with media queries for different viewport ranges
- **Font Faces Parser** (`font-faces.ts`) - Scans font directories and generates `@font-face` declarations for all available font weights and styles
- **Icons Parser** (`icons.ts`) - Generates CSS for icon font system using `data-i` attribute selectors
- **Scrollbar Parser** (`scrollbar.ts`) - Generates comprehensive WebKit scrollbar styling with hover and active states

**Parser Features:**

- **Modular Architecture**: Each parser is a separate module with focused responsibility
- **Dynamic Generation**: Font faces parser automatically scans directories for available fonts
- **Responsive Design**: Root font size parser creates media query breakpoints for different viewport sizes
- **Custom Styling**: Icons and scrollbar parsers generate complete CSS systems with multiple states

### Token Transformation

The system includes utilities for transforming design constants into Style Dictionary tokens:

```typescript
// Transform primitive colors to tokens
const [Brand, Green, Monochrome, Red] = transformToStyleDictionaryColors(
  Object.keys(PrimitiveColors).map((key) => PrimitiveColors[key])
);

// Transform contextual colors for light/dark schemes
const [LightBackground, LightContent] = transformToStyleDictionaryColors(
  Object.keys(ContextualColors).map((key) => ContextualColors[key]('light'))
);
```

## 🔧 Development

### Scripts

```bash
# Generate design essentials
npm run dev:generate

# Watch mode for development
npm run dev:watch

# Build the library
npm run build

# Lint code
npm run lint

# Format code
npm run format

# Clean build artifacts
npm run clean:all
```

### Development Workflow

1. **Token Definition**: Define tokens in `client/design/tokens/`
2. **Configuration**: Update configuration files in `client/design/configs/`
3. **Generation**: Run `npm run dev:generate` to generate outputs
4. **Integration**: Use generated files in your projects

### Watch Mode

The development watch mode automatically regenerates tokens when source files change:

```bash
npm run dev:watch
```

This monitors changes in:

- `src/` directory (core library)
- `client/` directory (design system)

## 📋 Output Structure

### CSS Platform Output

```text
dist/css/
├── tokens/
│   ├── all.css                   # All tokens combined
│   ├── color.css                 # Color tokens only
│   ├── typography.css            # Typography tokens only
│   ├── size.css                  # Size tokens only
│   ├── border.css                # Border tokens only
│   ├── shadow.css                # Shadow tokens only
│   ├── breakpoint.css            # Breakpoint tokens only
│   ├── dimensions.css            # Dimension tokens only
│   ├── icon.css                  # Icon tokens only
│   ├── opacity.css               # Opacity tokens only
│   └── others.css                # Other token types
├── root-scale.css                # Root font size configuration
├── font-faces.css                # Font face declarations
├── icons.css                     # Icons definitions
└── scrollbar.css                 # Scrollbar styles
```

### Favicons Output

```text
dist/favicons/
├── android-chrome-192x192.png    # Android Chrome icon
├── android-chrome-512x512.png    # Android Chrome icon (large)
├── apple-touch-icon.png          # Apple touch icon
├── favicon-16x16.png             # Standard favicon
├── favicon-32x32.png             # Standard favicon (large)
├── favicon.ico                   # ICO format favicon
├── manifest.webmanifest          # Web app manifest
└── site.webmanifest              # Alternative manifest
```

### SCSS Platform Output

```text
dist/scss/
├── tokens/
│   ├── all.scss                  # All tokens combined
│   ├── color.scss                # Color tokens only
│   ├── typography.scss           # Typography tokens only
│   ├── size.scss                 # Size tokens only
│   ├── border.scss               # Border tokens only
│   ├── shadow.scss               # Shadow tokens only
│   ├── breakpoint.scss           # Breakpoint tokens only
│   ├── dimensions.scss           # Dimension tokens only
│   ├── icon.scss                 # Icon tokens only
│   ├── opacity.scss              # Opacity tokens only
│   └── others.scss               # Other token types
```

### JavaScript Platform Output

```text
dist/js/
├── tokens/
│   ├── static.js                     # Static token values
│   └── variable.js                   # CSS custom property references
```

### JSON Platform Output

```text
dist/json/
└── tokens/
    └── all.json                  # All tokens in JSON format
```

## 🎯 Advanced Features

### Icons System

The system includes a comprehensive icons solution that generates CSS for icon fonts using attribute selectors:

```css
/* Generated CSS for icons */
[data-i] {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: var(--dev-color-content-gray-weak);
  font-family: DevIcons;
  font-weight: normal;
  font-style: normal;
  line-height: 1;
}

[data-i]::after {
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 1.25em;
  line-height: 0.6em;
}

[data-i='search']::after {
  content: '\E002';
}

[data-i='close']::after {
  content: '\E006';
}
```

**Usage in HTML:**

```html
<span data-i="search"></span> <span data-i="close"></span>
```

### Favicons System

The system includes a comprehensive favicon generation solution that creates favicons for all platforms and devices:

```typescript
// Favicon configuration
favicons: {
  id: 'https://mev.bg',
  sourcePath: './images/logo.svg',
  appName: 'Client Design Essentials',
  appShortName: 'CDE',
  appDescription: 'Client Design Essentials',
  version: '1.0.0'
}
```

**Generated Files:**

- **Android Icons**: `android-chrome-192x192.png`, `android-chrome-512x512.png`
- **Apple Icons**: `apple-touch-icon.png`
- **Standard Favicons**: `favicon-16x16.png`, `favicon-32x32.png`, `favicon.ico`
- **Web App Manifest**: `manifest.webmanifest`, `site.webmanifest`

**Features:**

- **Multi-Platform Support**: Generates icons for Android, iOS, Windows, and web browsers
- **Automatic Sizing**: Creates all required sizes automatically
- **Web App Manifest**: Generates PWA manifest with proper configuration
- **Maskable Icons**: Supports maskable icons for modern PWA features

### Scrollbar System

The system includes a comprehensive scrollbar styling solution that generates CSS for custom scrollbars:

```css
/* Generated CSS for scrollbar */
html:not(.isMacOs) {
  --scrollbar-area: 16px;
  --scrollbar-thumb-size-base: 4px;
  --scrollbar-thumb-size-over: 10px;
  --scrollbar-gap-size-base: calc((var(--scrollbar-area) - var(--scrollbar-thumb-size-base)) / 2);
  --scrollbar-gap-size-over: calc((var(--scrollbar-area) - var(--scrollbar-thumb-size-over)) / 2);
  --scrollbar-background: transparent;
  --scrollbar-thumb-color: var(--dev-color-content-gray-weak);
  --scrollbar-thumb-color-hover: var(--dev-color-content-gray-weak);
  --scrollbar-thumb-color-active: var(--dev-color-content-gray-weak);
  --scrollbar-thumb-min-size: 80px;

  /* Scrollbar area */
  ::-webkit-scrollbar:vertical {
    width: var(--scrollbar-area);
  }

  ::-webkit-scrollbar:horizontal {
    height: var(--scrollbar-area);
  }

  /* Track and thumb styling */
  ::-webkit-scrollbar-track-piece {
    border: var(--scrollbar-gap-size-base) solid transparent;
    border-radius: var(--scrollbar-thumb-size-base);
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border: var(--scrollbar-gap-size-base) solid transparent;
    border-radius: var(--scrollbar-area);
    background: var(--scrollbar-thumb-color);
    background-clip: padding-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    --scrollbar-thumb-color: var(--scrollbar-thumb-color-hover);
    border: var(--scrollbar-gap-size-over) solid transparent;
  }

  ::-webkit-scrollbar-thumb:active {
    --scrollbar-thumb-color: var(--scrollbar-thumb-color-active);
    border: var(--scrollbar-gap-size-over) solid transparent;
  }
}
```

### Fluid Typography

The system generates responsive typography using CSS `calc()` functions:

```css
/* Generated CSS for fluid typography */
@media all and (min-width: 600px) and (max-width: 1200px) {
  :root {
    --dev-font-size-display: calc(2.5rem + 1.25vw);
    --dev-font-size-body: calc(0.875rem + 0.125vw);
  }
}
```

### Color Scheme Management

Supports multiple color scheme implementation methods:

```css
/* Media query method */
@media (prefers-color-scheme: dark) {
  :root {
    --dev-color-background: #000000;
    --dev-color-content: #ffffff;
  }
}

/* Class-based method */
html.dark {
  --dev-color-background: #000000;
  --dev-color-content: #ffffff;
}
```

### Root Scaling System

Provides complete layout scaling for different viewport sizes:

```css
/* Root font size scaling */
@media (max-width: 299px) {
  html {
    font-size: 8px;
  }
}

@media (min-width: 300px) and (max-width: 2100px) {
  html {
    font-size: calc(0.625rem + 0.3125vw);
  }
}

@media (min-width: 2101px) {
  html {
    font-size: 12px;
  }
}
```

## 🤝🏻 Contributing

This is a personal vendor library, and no contributions are expected.
