# Mev’s Design Tokens Generator

A personal design token builder created by Mev, built on top of [Style Dictionary](https://styledictionary.com). It centralizes configuration and automates the generation of design tokens for multiple platforms such as CSS, Sass and JavaScript.

Intended for use in his own projects, this tool simplifies token management with a predefined setup.

## Overview

The generator supports advanced features like:

- **Fluid/responsive tokens** with min/max viewport scaling
- **Color scheme management** (light/dark mode support)
- **Multiple output formats** with customizable handlers
- **TypeScript-first development** with comprehensive type safety
- **Modular token organization** with support for complex token hierarchies

## Installation

```bash
npm install @mevbg/design-tokens-generator -D
```

## Quick Start

```typescript
import { generateDesignTokens } from '@mevbg/design-tokens-generator';

await generateDesignTokens({
  sourcePath: './tokens/**/index.js',
  buildPath: './dist',
  prefix: 'tk',
  platforms: ['css', 'scss', 'js', 'json'],
  options: {
    baseFontSize: 10,
    colorScheme: {
      default: 'light',
      method: 'class'
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

## File Structure

### Core Library (`src/`)

```
src/
├── index.ts                    # Main library export
├── generator.ts                # Core token generation engine
├── constants.ts                # Global configuration constants
├── configs/                    # Configuration schemas and defaults
│   ├── color-scheme.config.ts  # Light/dark mode configuration
│   ├── fluid-scale-scheme.config.ts # Responsive scaling settings
│   └── root-scale-scheme.config.ts  # Root font size scaling
├── formats/                    # Output format handlers
│   ├── css/                    # CSS custom properties
│   ├── scss/                   # SCSS maps
│   └── js/                     # JavaScript exports
├── platforms/                  # Platform-specific configurations
│   ├── css.platform.ts         # CSS output configuration
│   ├── scss.platform.ts        # SCSS output configuration
│   ├── js.platform.ts          # JavaScript output configuration
│   └── json.platform.ts        # JSON output configuration
├── types/                      # TypeScript type definitions
│   ├── generator.types.ts      # Generator-related types
│   ├── platform.types.ts       # Platform-related types
│   ├── token.types.ts          # Token-related types
│   └── format.types.ts         # Format-related types
└── utils/                      # Utility functions
    ├── formats.utils.ts        # Format utilities
    ├── strings.utils.ts        # String utilities
    ├── tokens.utils.ts         # Token utilities
    └── fluid-tokens.utils.ts   # Fluid-token utilities
```

### Development Example (`dev/`)

The `dev/` directory contains a complete example implementation showing how to structure and use the design tokens generator:

```
dev/
├── index.ts                    # Development build script with file watching
├── client/                     # Example token definitions
│   ├── index.ts                # Client generator configuration
│   ├── constants.ts            # Client-specific constants
│   ├── design/
│   │   ├── constants/          # Raw design values
│   │   │   ├── colors/         # Color definitions using colorjs.io
│   │   │   ├── typography.constants.ts
│   │   │   ├── breakpoint.constants.ts
│   │   │   ├── sizes.constants.ts
│   │   │   └── opacities.constants.ts
│   │   ├── tokens/             # Structured token definitions
│   │   │   ├── color/          # Color tokens with scheme support
│   │   │   ├── typography/     # Font tokens (family, size, weight, etc.)
│   │   │   ├── border/         # Border-related tokens
│   │   │   ├── shadow/         # Box shadow definitions
│   │   │   ├── size/           # Sizing tokens
│   │   │   └── breakpoint/     # Responsive breakpoints
│   │   └── utils/              # Token processing utilities
│   │       ├── colors.utils.ts # Color transformation helpers
│   │       ├── strings.utils.ts
│   │       └── units.utils.ts
│   └── dist/                   # Generated output files
```

## Core Concepts

### Design Tokens

Design tokens are structured data that represent design decisions. They're organized by type and support complex value structures:

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

// Hierarchical tokens
{
  color: {
    $type: 'color',
    primitive: {
      red: { $value: '#FF0000' },
      blue: { $value: '#0000FF' }
    },
    scheme: {
      light: {
        background: { $value: '{color.primitive.white}' }
      }
    }
  }
}
```

### Supported Token Types

The generator supports these core token types (defined in `CORE_TOKENS`):

- **Typography**: `fontFamily`, `fontSize`, `fontWeight`, `letterSpacing`, `lineHeight`
- **Color**: `color` (with scheme support)
- **Sizing**: `size`
- **Border**: `borderColor`, `borderRadius`, `borderStyle`, `borderWidth`
- **Shadow**: `boxShadow`
- **Layout**: `breakpoint`, `dimensions`
- **Visual**: `icon`, `opacity`
- **Animation**: `transition`

### Platforms

Each platform generates tokens in a specific format:

#### CSS Platform (`css.platform.ts`)

- **Output**: CSS custom properties
- **Files generated**:
  - `all.design-tokens.css` - All tokens in one file
  - `root-font-size.design-tokens.css` - Root font size only
  - `{token-type}.design-tokens.css` - Individual token type files
- **Features**: CSS custom properties with `:root` scope

#### SCSS Platform (`scss.platform.ts`)

- **Output**: SCSS maps
- **Files generated**:
  - `all.design-tokens.scss` - All tokens as SCSS maps
  - `{token-type}.design-tokens.scss` - Individual token type files
- **Features**: SCSS map syntax (`$variable-name`)

#### JavaScript Platform (`js.platform.ts`)

- **Output**: JavaScript modules
- **Files generated**:
  - `static.design-tokens.js` - Static value exports
  - `variable.design-tokens.js` - CSS custom property references
- **Features**: ES6 module exports

#### JSON Platform (`json.platform.ts`)

- **Output**: Raw JSON data
- **Features**: Structured token data for tooling integration

### Format Handlers

Each platform uses specialized handlers for different token types:

#### Basic Handler

Handles standard tokens with simple string values.

#### Color Handler

- Supports color scheme switching (light/dark)
- Handles color transformations
- Manages contextual color tokens

#### Fluid Handler

- Processes responsive tokens with min/max values
- Generates CSS `calc()` functions
- Calculates viewport-based scaling

## Configuration

### Generator Options

```typescript
type GeneratorOptions = {
  baseFontSize: number; // Base font size for rem calculations
  colorScheme: ColorSchemeConfig; // Color scheme configuration
  fluidScaleScheme: FluidScaleSchemeConfig; // Responsive scaling
  rootScaleScheme: RootScaleSchemeConfig; // Root font scaling
};
```

### Color Scheme Configuration

```typescript
type ColorSchemeConfig = {
  default?: 'light' | 'dark'; // Default color scheme
  method?: 'media' | 'class' | 'combined' | null; // Implementation method
};
```

- **`media`**: Uses CSS media queries (`@media (prefers-color-scheme: dark)`)
- **`class`**: Uses CSS classes (`html.light`, `html.dark`)
- **`combined`**: Uses both methods
- **`null`**: No scheme switching (default scheme taken in count only)

### Fluid Scale Configuration

```typescript
type FluidScaleSchemeConfig = {
  minViewportW: number; // Minimum viewport width (px)
  maxViewportW: number; // Maximum viewport width (px)
};
```

Controls responsive scaling for fluid tokens. Tokens with `min`/`max` values are converted to CSS `clamp()` functions.

### Root Scale Configuration

```typescript
type RootScaleSchemeConfig = {
  minViewportW: number; // Minimum viewport width for root scaling
  maxViewportW: number; // Maximum viewport width for root scaling
};
```

## API Reference

### `generateDesignTokens(config: GeneratorConfig)`

Main function to generate design tokens.

**Parameters:**

- `sourcePath: string` - Glob pattern for token source files
- `buildPath: string` - Output directory for generated files
- `prefix?: string` - Token name prefix (default: `'tk'`)
- `platforms?: PlatformName[]` - Platforms to generate (default: `['css', 'scss', 'js', 'json']`)
- `options: GeneratorOptions` - Generator configuration options

**Returns:** `Promise<StyleDictionary>` - Style Dictionary instance

## Constants

### Default Values (`src/constants.ts`)

```typescript
DEFAULT_BASE_FONT_SIZE = 10; // Base font size in pixels
DEFAULT_PREFIX = 'tk'; // Token prefix ("tk" = tokens)
DEFAULT_COLOR_SCHEME = 'light'; // Default color scheme
DEFAULT_COLOR_SCHEME_METHOD = 'class'; // Default scheme switching method
DEFAULT_FLUID_SCALE_MIN_VIEWPORT = 600; // Fluid scaling minimum viewport
DEFAULT_FLUID_SCALE_MAX_VIEWPORT = 1200; // Fluid scaling maximum viewport
DEFAULT_ROOT_SCALE_MIN_VIEWPORT = 300; // Root scaling minimum viewport
DEFAULT_ROOT_SCALE_MAX_VIEWPORT = 2100; // Root scaling maximum viewport
DEFAULT_PLATFORMS = ['css', 'scss', 'js', 'json']; // Default output platforms
```

## Utility Functions

### String Utilities (`src/utils/strings.utils.ts`)

- `toKebabCase(str: string)` - Converts to kebab-case
- `capitalize(str: string)` - Capitalizes first letter
- `toCamelCase(str: string)` - Converts to camelCase
- `toSpaceCase(str: string)` - Converts to space-separated words
- `spaceCaseToCamelCase(str: string)` - Converts space case to camelCase

### Fluid Token Utilities (`src/utils/fluid-tokens.utils.ts`)

- `tokenIsFluid(token: TransformedToken)` - Checks if token is fluid/responsive
- `mapFluidTokenValuesToMin(tokens: TransformedToken[])` - Maps to minimum values
- `mapFluidTokenValuesToMax(tokens: TransformedToken[])` - Maps to maximum values
- `mapFluidTokenValuesToResponsive(tokens, baseFontSize, fluidScaleScheme)` - Generates responsive CSS
- `separateFluidAndFixedTokens(tokens: TransformedToken[])` - Separates fluid from fixed tokens

### Format Utilities (`src/utils/formats.utils.ts`)

- `fileHeader(name: string)` - Generates file headers
- `wrapInFileChapter(name: string, code: string, noChapterTitle?: boolean)` - Creates file sections
- `tab(count?: number)` - Generates indentation
- `getCoreTokenHandlers(format: CustomFormatTypes, type?: 'static' | 'variable')` - Gets format handlers
- `allFormatterTemplate(config)` - Template for "all tokens" formatters
- `coreFormatterTemplate(config)` - Template for individual token type formatters

### Token Utilities (`src/utils/tokens.utils.ts`)

Provides token processing and validation utilities.

## Development Example

The `dev/` directory demonstrates a complete implementation:

### Color System Example

```typescript
// dev/client/design/constants/colors/colors.constants.ts
import Color from 'colorjs.io';

export const Monochrome = {
  BLACK: new Color('okhsl', [0, 0, 0]), // #000000
  GRAY_20: new Color('okhsl', [0, 0, 0.2]), // #333333
  WHITE: new Color('okhsl', [0, 0, 1]) // #FFFFFF
};

// dev/client/design/tokens/color/index.ts
export default {
  color: {
    $type: 'color',
    primitive: {
      ...Monochrome
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

### Typography System Example

```typescript
// dev/client/design/tokens/typography/font-size.tokens.ts
export default {
  fontSize: {
    $type: 'fontSize',
    xs: { $value: { min: '12px', max: '14px' } }, // Fluid token
    sm: { $value: '14px' }, // Fixed token
    base: { $value: { min: '16px', max: '18px' } },
    lg: { $value: { min: '18px', max: '20px' } }
  }
};
```

## Build Scripts

The project includes several npm scripts:

- `npm run dev` - Generate tokens once
- `npm run dev:watch` - Watch for changes and regenerate
- `npm run build` - Build the library
- `npm run lint` - Lint the codebase
- `npm run format` - Format code with Prettier

## TypeScript Support

The entire codebase is written in TypeScript with comprehensive type definitions. All public APIs are fully typed, providing excellent IDE support and compile-time validation.

### Key Types

- `GeneratorConfig` - Main configuration interface
- `GeneratorOptions` - Generator options
- `PlatformName` - Supported platform names
- `ColorSchemeConfig` - Color scheme configuration
- `FluidScaleSchemeConfig` - Responsive scaling configuration
- `TransformedToken` - Style Dictionary token structure

## Advanced Features

### Custom Format Registration

The generator automatically registers custom formats for each platform. Formats are dynamically loaded and support:

- Hierarchical token organization
- Responsive/fluid token handling
- Color scheme switching
- Customizable output templates

### File Organization

Generated files are organized by platform and token type:

```
dist/
├── css/
│   ├── all.design-tokens.css
│   ├── root-font-size.design-tokens.css
│   ├── color.design-tokens.css
│   └── font-size.design-tokens.css
├── scss/
│   ├── all.design-tokens.scss
│   └── color.design-tokens.scss
├── js/
│   ├── static.design-tokens.js
│   └── variable.design-tokens.js
└── json/
    └── tokens.json
```

### Responsive Token Generation

Fluid tokens with min/max values are automatically converted to responsive CSS:

```css
/* Input token: { min: '20px', max: '24px' } */
--tk-font-size-title: calc(1.6rem + 0.66667vw);
```

This calculation uses the configured viewport ranges and base font size to create smooth scaling between breakpoints.
