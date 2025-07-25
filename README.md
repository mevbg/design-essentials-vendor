# Mev’s Design Tokens Generator

A personal design token builder created by Mev, built on top of [Style Dictionary](https://styledictionary.com). It centralizes configuration and automates the generation of design tokens for multiple platforms such as CSS, Sass and JavaScript.

Intended for use in his own projects, this tool simplifies token management with a predefined setup.

## Overview

The generator supports advanced features like:

- **Fluid/responsive tokens** with min/max viewport scaling using `calc()` functions
- **Color scheme management** (light/dark mode support) with multiple implementation methods
- **Multiple output formats** with specialized handlers for different token types
- **TypeScript-first development** with comprehensive type safety and ES modules
- **Modular platform architecture** with dynamic loading and extensible handlers
- **Flexible token organization** supporting complex hierarchies and references

## Installation

```bash
npm install @mevbg/design-tokens-generator -D
```

## Quick Start

```typescript
import { generateDesignTokens } from '@mevbg/design-tokens-generator';

await generateDesignTokens({
  sourcePath: './tokens/**/index.ts',
  buildPath: './dist',
  prefix: 'tk',
  platforms: ['css', 'scss', 'js', 'json'],
  options: {
    baseFontSize: 10,
    colorScheme: {
      default: 'light',
      method: 'combined'
    },
    fluidScaleScheme: {
      minViewportW: 600,
      maxViewportW: 1200
    },
    rootScaleScheme: {
      minViewportW: 300,
      maxViewportW: 2100
    }
  }
});
```

## Architecture Overview

The generator is built on a modular platform architecture where each platform (CSS, SCSS, JS, JSON) is self-contained with its own configuration, formats, and handlers. The system dynamically loads platform-specific modules and automatically detects the appropriate handler for each token type.

### Core Library (`src/`)

```
src/
├── index.ts                    # Main library export
├── generator.ts                # Core token generation engine
├── constants.ts                # Global configuration constants
├── configs.ts                  # Default configuration objects
├── formats.ts                  # Format re-exports from platforms
├── handlers.ts                 # Basic handler implementation
├── platforms.ts                # Platform configuration loader
├── platforms/                  # Platform-specific modules
│   ├── css/
│   │   ├── index.ts            # Platform configuration
│   │   ├── css.config.ts       # CSS-specific config
│   │   ├── css.formats.ts      # CSS formatters
│   │   ├── css.utils.ts        # CSS utility functions
│   │   └── handlers/           # Token type handlers
│   │       ├── color.handler.ts
│   │       ├── fluid.handler.ts
│   │       └── root.handler.ts
│   ├── scss/                   # SCSS platform modules
│   ├── js/                     # JavaScript platform modules
│   └── json/                   # JSON platform modules
├── types/                      # TypeScript type definitions
│   ├── format.types.ts         # Format and handler types
│   ├── generator.types.ts      # Generator configuration types
│   ├── platform.types.ts       # Platform-related types
│   └── scheme.types.ts         # Color and scaling scheme types
└── utils/                      # Utility functions
    ├── formats.utils.ts        # Format generation utilities
    ├── strings.utils.ts        # String transformation utilities
    └── tokens/                 # Token processing utilities
        ├── color-tokens.utils.ts
        └── fluid-tokens.utils.ts
```

### Development Example (`dev/`)

The `dev/` directory provides a complete real-world example showing best practices for structuring design tokens:

```
dev/
├── index.ts                    # Development build script
├── client/
│   ├── index.ts                # Client configuration
│   ├── constants.ts            # Project-specific constants
│   └── design/
│       ├── constants/          # Raw design values
│       │   ├── colors/         # Color definitions with colorjs.io
│       │   │   ├── primitive-colors.constants.ts
│       │   │   └── contextual-colors.constants.ts
│       │   ├── typography.constants.ts
│       │   ├── breakpoint.constants.ts
│       │   ├── sizes.constants.ts
│       │   └── opacities.constants.ts
│       ├── tokens/             # Structured token definitions
│       │   ├── color/          # Color tokens with scheme support
│       │   ├── typography/     # Typography tokens
│       │   ├── border/         # Border tokens
│       │   ├── shadow/         # Shadow tokens
│       │   ├── size/           # Size tokens
│       │   ├── opacity/        # Opacity tokens
│       │   ├── icon/           # Icon tokens
│       │   ├── dimensions/     # Dimension tokens
│       │   └── breakpoint/     # Breakpoint tokens
│       └── utils/              # Token processing utilities
└── dist/                       # Generated output files
```

## Core Concepts

### Design Tokens Structure

Tokens follow the W3C Design Token Community Group format specification with `$type` and `$value` properties:

```typescript
// Simple token
{
  $type: 'color',
  $value: '#FF0000'
}

// Fluid/responsive token
{
  $type: 'fontSize',
  $value: {
    min: '14px',
    max: '18px'
  }
}

// Token with references
{
  $type: 'color',
  $value: '{color.primitive.red}'
}

// Hierarchical structure
{
  color: {
    $type: 'color',
    primitive: {
      red: { $value: '#FF0000' },
      blue: { $value: '#0000FF' }
    },
    scheme: {
      light: {
        background: { $value: '{color.primitive.white}' },
        content: { $value: '{color.primitive.black}' }
      },
      dark: {
        background: { $value: '{color.primitive.black}' },
        content: { $value: '{color.primitive.white}' }
      }
    }
  }
}
```

### Supported Token Types

The generator supports these core token types (defined in `CORE_TOKENS`):

- **Typography**: `fontFamily`, `fontSize`, `fontWeight`, `letterSpacing`, `lineHeight`
- **Color**: `color` (with light/dark scheme support)
- **Sizing**: `size`
- **Border**: `borderColor`, `borderRadius`, `borderStyle`, `borderWidth`
- **Shadow**: `boxShadow`
- **Layout**: `breakpoint`, `dimensions`
- **Visual**: `icon`, `opacity`
- **Animation**: `transition`

### Token Handlers

The system automatically selects the appropriate handler based on token characteristics:

#### Basic Handler

Processes standard tokens with simple string values using platform-specific formatters.

#### Color Handler

- Supports multiple color scheme implementations (media queries, CSS classes, or combined)
- Generates separate rules for light/dark variants
- Handles scheme-specific and primitive color tokens

#### Fluid Handler

- Processes responsive tokens with `min`/`max` values
- Generates CSS `calc()` functions for smooth viewport scaling
- Creates media query breakpoints for min/max fallbacks

#### Root Handler (CSS only)

- Generates root font size variables for responsive typography
- Integrates with the root scale scheme configuration

## Platform Architecture

### CSS Platform

**Configuration**: Generates CSS custom properties with comprehensive color scheme and fluid token support.

**Generated Files**:

- `all.design-tokens.css` - All tokens in one file
- `root-font-size.design-tokens.css` - Root font size variables only
- `{token-type}.design-tokens.css` - Individual files per token type

**Features**:

- CSS custom properties with `:root` scope
- Color scheme switching via media queries and/or CSS classes
- Responsive fluid tokens with media query fallbacks
- Automatic `calc()` function generation for fluid scaling

**Example Output**:

```css
/* Color scheme with combined method */
:root {
  --tk-color-content: #000000;
}

@media (prefers-color-scheme: dark) {
  :root {
    --tk-color-content: #ffffff;
  }
}

html.dark {
  --tk-color-content: #ffffff;
}

/* Fluid typography with breakpoints */
@media all and (max-width: 599px) {
  :root {
    --tk-font-size-title: 20px;
  }
}

@media all and (min-width: 600px) and (max-width: 1200px) {
  :root {
    --tk-font-size-title: calc(1.33333rem + 0.66667vw);
  }
}

@media all and (min-width: 1201px) {
  :root {
    --tk-font-size-title: 24px;
  }
}
```

### SCSS Platform

**Configuration**: Generates SCSS maps for integration with Sass-based projects.

**Generated Files**:

- `all.design-tokens.scss` - All tokens as SCSS maps
- `{token-type}.design-tokens.scss` - Individual token type maps

**Features**:

- SCSS map syntax for easy integration
- Supports both static and fluid values
- Compatible with existing Sass workflows

### JavaScript Platform

**Configuration**: Generates JavaScript ES modules with both static values and CSS variable references.

**Generated Files**:

- `static.design-tokens.js` - Static token values for JavaScript usage
- `variable.design-tokens.js` - CSS custom property names for runtime usage

**Features**:

- ES6 module exports
- TypeScript-compatible output
- Dual static/variable value exports

### JSON Platform

**Configuration**: Generates raw JSON data for tooling integration.

**Generated Files**:

- `all.design-tokens.json` - Complete token structure in JSON format

**Features**:

- Raw token data for external tools
- Preserves original token structure
- Useful for documentation generation

## Configuration

### Generator Configuration

```typescript
type GeneratorConfig = {
  sourcePath: string; // Glob pattern for source files
  buildPath: string; // Output directory
  prefix?: string; // Token name prefix (default: 'tk')
  platforms?: PlatformName[]; // Platforms to generate
  options: GeneratorOptions; // Generation options
};
```

### Generator Options

```typescript
type GeneratorOptions = {
  baseFontSize: number; // Base font size for rem calculations
  colorScheme: ColorSchemeConfig; // Color scheme configuration
  fluidScaleScheme: FluidScaleSchemeConfig; // Responsive scaling viewport range
  rootScaleScheme: RootScaleSchemeConfig; // Root font scaling viewport range
};
```

### Color Scheme Configuration

```typescript
type ColorSchemeConfig = {
  default?: ColorSchemeType; // 'light' | 'dark'
  method?: ColorSchemeMethod; // Implementation method
};

enum ColorSchemeMethod {
  MEDIA = 'media', // CSS media queries only
  CLASS = 'class', // CSS classes only (html.light, html.dark)
  COMBINED = 'combined' // Both media queries and classes
}
```

**Implementation Methods**:

- **`MEDIA`**: Uses `@media (prefers-color-scheme: dark)` for automatic scheme detection
- **`CLASS`**: Uses CSS classes (`html.light`, `html.dark`) for manual switching
- **`COMBINED`**: Provides both methods for maximum flexibility

### Fluid Scale Configuration

```typescript
type FluidScaleSchemeConfig = {
  minViewportW: number; // Minimum viewport width (px) for fluid scaling
  maxViewportW: number; // Maximum viewport width (px) for fluid scaling
};
```

Controls responsive scaling for fluid tokens. Tokens with `min`/`max` values generate `calc()` functions that scale smoothly between these viewport widths.

### Root Scale Configuration

```typescript
type RootScaleSchemeConfig = {
  minViewportW: number; // Minimum viewport width for root font scaling
  maxViewportW: number; // Maximum viewport width for root font scaling
};
```

Defines viewport range for root font size scaling, used by the CSS platform's root handler.

## API Reference

### `generateDesignTokens(config: GeneratorConfig)`

Main function to generate design tokens across specified platforms.

**Parameters:**

- `config.sourcePath: string` - Glob pattern for token source files (e.g., `'./tokens/**/index.ts'`)
- `config.buildPath: string` - Output directory path for generated files
- `config.prefix?: string` - Token name prefix (default: `'tk'`)
- `config.platforms?: PlatformName[]` - Array of platforms to generate (default: `['css', 'scss', 'js', 'json']`)
- `config.options: GeneratorOptions` - Generation configuration options

**Returns:** `Promise<StyleDictionary>` - Style Dictionary instance after build completion

**Example:**

```typescript
const styleDictionary = await generateDesignTokens({
  sourcePath: './design/tokens/**/index.ts',
  buildPath: './dist/tokens',
  prefix: 'app',
  platforms: ['css', 'js'],
  options: {
    baseFontSize: 16,
    colorScheme: { default: 'light', method: 'combined' },
    fluidScaleScheme: { minViewportW: 768, maxViewportW: 1440 },
    rootScaleScheme: { minViewportW: 320, maxViewportW: 1920 }
  }
});
```

## Default Constants

All default values are defined in `src/constants.ts`:

```typescript
DEFAULT_BASE_FONT_SIZE = 10; // Base font size in pixels
DEFAULT_PREFIX = 'tk'; // Token prefix ("tk" = tokens)
DEFAULT_COLOR_SCHEME = 'light'; // Default color scheme
DEFAULT_COLOR_SCHEME_METHOD = 'class'; // Default scheme method
DEFAULT_FLUID_SCALE_MIN_VIEWPORT = 600; // Fluid scaling minimum viewport
DEFAULT_FLUID_SCALE_MAX_VIEWPORT = 1200; // Fluid scaling maximum viewport
DEFAULT_ROOT_SCALE_MIN_VIEWPORT = 300; // Root scaling minimum viewport
DEFAULT_ROOT_SCALE_MAX_VIEWPORT = 2100; // Root scaling maximum viewport
DEFAULT_PLATFORMS = ['css', 'scss', 'js', 'json']; // Default platforms

CORE_TOKENS = [
  'fontFamily',
  'fontSize',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'color',
  'size',
  'borderColor',
  'borderRadius',
  'borderStyle',
  'borderWidth',
  'boxShadow',
  'breakpoint',
  'dimensions',
  'icon',
  'opacity',
  'transition'
];
```

## Utility Functions

### Fluid Token Utilities (`src/utils/tokens/fluid-tokens.utils.ts`)

- `tokenIsFluid(token: TransformedToken): boolean` - Checks if token has min/max values
- `mapFluidTokenValuesToMin(tokens: TransformedToken[]): TransformedToken[]` - Maps fluid tokens to minimum values
- `mapFluidTokenValuesToMax(tokens: TransformedToken[]): TransformedToken[]` - Maps fluid tokens to maximum values
- `mapFluidTokenValuesToResponsive(tokens, baseFontSize, fluidScaleScheme): TransformedToken[]` - Generates responsive `calc()` values
- `separateFluidAndFixedTokens(tokens: TransformedToken[]): { fluidTokens, fixedTokens }` - Separates fluid from fixed tokens

### Color Token Utilities (`src/utils/tokens/color-tokens.utils.ts`)

- `getColorScheme(tokens: TransformedToken[], syntax: 'pascal' | 'kebab'): Record<string, TransformedToken[]>` - Extracts and groups color scheme tokens

### Format Utilities (`src/utils/formats.utils.ts`)

- `fileHeader(name: string): string` - Generates standardized file headers
- `wrapInFileChapter(name: string, code: string, noChapterTitle?: boolean): string` - Creates comment-separated sections
- `tab(count?: number): string` - Generates consistent indentation
- `getCoreTokenHandlers(format: CustomFormatter, type?: JsFormatterType): CoreTokenHandlers` - Returns appropriate handlers for token types
- `getDestinationFileName(platform: PlatformName, name: string): string` - Generates output file names
- `getFormatterName(platform: PlatformName, name: string): string` - Generates formatter names

### String Utilities (`src/utils/strings.utils.ts`)

- `toKebabCase(str: string): string` - Converts to kebab-case
- `capitalize(str: string): string` - Capitalizes first letter
- `toCamelCase(str: string): string` - Converts various formats to camelCase
- `toSpaceCase(str: string): string` - Converts to space-separated words
- `spaceCaseToCamelCase(str: string): string` - Converts space case to camelCase

## Development Workflow

### Build Scripts

```json
{
  "scripts": {
    "dev": "tsx dev/index.ts", // Generate tokens once
    "dev:watch": "nodemon --exec \"tsx dev/index.ts\" --ext ts,js --watch src --watch dev/client", // Watch mode
    "build": "tsc", // Build library
    "lint": "eslint .", // Lint codebase
    "lint:fix": "eslint . --fix", // Fix linting issues
    "format": "prettier --write .", // Format code
    "clean:all": "del-cli dist dev/dist", // Clean all output
    "clean:build": "del-cli dist", // Clean library build
    "clean:dev": "del-cli dev/dist" // Clean dev output
  }
}
```

### Development Example Structure

The development example demonstrates best practices:

```typescript
// dev/client/constants.ts - Project configuration
export const PREFIX = 'dev';
export const DEFAULT_COLOR_SCHEME = ColorSchemeType.LIGHT;
export const COLOR_SCHEME_METHOD = ColorSchemeMethod.COMBINED;
export const PLATFORMS = ['css', 'scss', 'js', 'json'];

// dev/client/design/tokens/typography/font-size.tokens.ts - Fluid tokens
export default {
  $type: 'fontSize',
  display: { $value: { min: '34px', max: '40px' } }, // Fluid token
  title: { $value: { min: '20px', max: '24px' } },
  body: { $value: '16px' } // Fixed token
};

// dev/client/design/tokens/color/index.ts - Color schemes
export default {
  color: {
    $type: 'color',
    primitive: {
      black: { $value: '#000000' },
      white: { $value: '#ffffff' }
    },
    scheme: {
      light: {
        background: { $value: '{color.primitive.white}' },
        content: { $value: '{color.primitive.black}' }
      },
      dark: {
        background: { $value: '{color.primitive.black}' },
        content: { $value: '{color.primitive.white}' }
      }
    }
  }
};
```

## TypeScript Support

The entire codebase uses TypeScript with strict configuration and ES modules. All APIs are fully typed with comprehensive type definitions.

### Key Type Definitions

```typescript
// Main configuration types
type GeneratorConfig = { sourcePath; buildPath; prefix?; platforms?; options };
type GeneratorOptions = { baseFontSize; colorScheme; fluidScaleScheme; rootScaleScheme };

// Platform types
type PlatformName = 'css' | 'scss' | 'js' | 'json';
type PlatformConfigProvider = (
  params: PlatformConfigsBuilderParams
) => PlatformConfigProviderResponse;

// Format types
enum CustomFormatter {
  CSS = 'css',
  SCSS = 'scss',
  JS = 'js'
}
enum JsFormatterType {
  STATIC = 'static',
  VARIABLE = 'variable'
}

// Scheme types
enum ColorSchemeType {
  LIGHT = 'light',
  DARK = 'dark'
}
enum ColorSchemeMethod {
  MEDIA = 'media',
  CLASS = 'class',
  COMBINED = 'combined'
}
```

## Advanced Features

### Dynamic Platform Loading

The system uses dynamic imports to load platform-specific modules, enabling:

- Lazy loading of platform configurations
- Extensible architecture for adding new platforms
- Memory-efficient builds with only required platforms loaded

### Intelligent Handler Selection

Handlers are automatically selected based on token characteristics:

```typescript
const handlerType =
  token.$type === 'color' ? 'color' : tokens.some(tokenIsFluid) ? 'fluid' : 'basic';
```

### Flexible Output Organization

Generated files follow a consistent structure:

```
dist/
├── css/
│   ├── all.design-tokens.css              # All tokens
│   ├── root-font-size.design-tokens.css   # Root font size only
│   ├── color.design-tokens.css            # Color tokens only
│   ├── font-size.design-tokens.css        # Font size tokens only
│   └── ...                                # Other token types
├── scss/
│   ├── all.design-tokens.scss
│   └── {token-type}.design-tokens.scss
├── js/
│   ├── static.design-tokens.js            # Static values
│   └── variable.design-tokens.js          # CSS variable references
└── json/
    └── all.design-tokens.json             # Raw JSON data
```

### Responsive Fluid Calculations

Fluid tokens automatically generate responsive CSS using mathematical calculations:

```typescript
// Input: { min: '16px', max: '24px' }
// Viewport: 600px - 1200px
// Base font size: 10px

// Generated calc() function:
// calc(0.73333rem + 1.33333vw)

const slope = ((max - min) / (maxViewport - minViewport)) * 100;
const yIntercept = min - (slope * minViewport) / 100;
const yInterceptRem = yIntercept / baseFontSize;
```

This creates smooth scaling between viewport breakpoints with pixel-perfect precision at the defined min/max points.
