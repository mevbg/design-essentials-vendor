# Design Essentials Vendor

> _Mev’s personal vendor of design system essentials._

## 🎯 Overview

Design Essentials Vendor is not just a design token generator — it’s a comprehensive factory for creating design system essentials. Built on top of Style Dictionary, it provides an opinionated, production-ready solution for generating design essentials with advanced features.

## 🚀 Features

### Core Capabilities

- **Fluid Typography & Scaling**: Responsive typography that scales smoothly between viewport breakpoints
- **Color Scheme Management**: Light/dark theme support with multiple implementation methods
- **Root Scale System**: Complete layout scaling for different viewport sizes
- **Multi-Platform Output**: CSS, SCSS, JavaScript, and JSON formats
- **Advanced Token Processing**: Specialized handlers for different token types
- **Font Management**: Automatic font face generation and root font size configuration

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
  fontsPath: './fonts',
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
  fluidScaleScheme: {
    minViewportW: 600,
    maxViewportW: 1200
  },
  rootScaleScheme: {
    minViewportW: 300,
    maxViewportW: 2100
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
  fontsPath?: string; // Path to font files
  colorScheme?: ColorSchemeConfig; // Color scheme configuration
  fluidScaleScheme?: FluidScaleSchemeConfig; // Fluid scaling configuration
  rootScaleScheme?: RootScaleSchemeConfig; // Root scaling configuration
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

#### Fluid Scale Configuration

```typescript
type FluidScaleSchemeConfig = {
  minViewportW: number; // Minimum viewport width
  maxViewportW: number; // Maximum viewport width
};
```

#### Root Scale Configuration

```typescript
type RootScaleSchemeConfig = {
  minViewportW: number; // Minimum viewport width
  maxViewportW: number; // Maximum viewport width
};
```

## 🏗️ Architecture

### Core Components

#### 1. Generator (`src/generator.ts`)

The main entry point that orchestrates the entire generation process:

```typescript
export async function generateDesignEssentials(config: GeneratorConfig): Promise<StyleDictionary>;
```

#### 2. Platform System (`src/platforms/`)

Platform-specific configurations and formatters:

- **CSS Platform** (`src/platforms/css/`): CSS custom properties with media queries
- **SCSS Platform** (`src/platforms/scss/`): SCSS variables and mixins
- **JavaScript Platform** (`src/platforms/js/`): Static values and variable references
- **JSON Platform** (`src/platforms/json/`): Structured token data

#### 3. Token Handlers (`src/handlers/`)

Specialized processors for different token types:

- **Basic Handler** (`basic.handler.ts`): Standard token processing
- **Color Handler** (`color.handler.ts`): Color scheme and theme management
- **Fluid Handler** (`fluid.handler.ts`): Responsive value generation

#### 4. Token Types (`src/types/tokens.types.ts`)

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

  // Size & Layout
  SIZE = 'size',
  DIMENSIONS = 'dimensions',

  // Border
  BORDER_COLOR = 'borderColor',
  BORDER_RADIUS = 'borderRadius',
  BORDER_STYLE = 'borderStyle',
  BORDER_WIDTH = 'borderWidth',

  // Effects
  BOX_SHADOW = 'boxShadow',
  OPACITY = 'opacity',

  // Layout
  BREAKPOINT = 'breakpoint',
  ICON = 'icon',
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
│   ├── generator.ts              # Main generator function
│   ├── platforms.ts              # Platform configuration management
│   ├── constants.ts              # Default configuration values
│   ├── formats.ts                # Format registration
│   ├── types/                    # TypeScript type definitions
│   │   ├── generator.types.ts    # Generator configuration types
│   │   ├── scheme.types.ts       # Color and scale scheme types
│   │   ├── platform.types.ts     # Platform-specific types
│   │   ├── tokens.types.ts       # Token type definitions
│   │   ├── format.types.ts       # Format and handler types
│   │   └── utils.types.ts        # Utility type definitions
│   ├── platforms/                # Platform-specific implementations
│   │   ├── css/                  # CSS platform
│   │   ├── scss/                 # SCSS platform
│   │   ├── js/                   # JavaScript platform
│   │   └── json/                 # JSON platform
│   ├── handlers/                 # Token processing handlers
│   │   ├── basic.handler.ts      # Basic token processing
│   │   ├── color.handler.ts      # Color scheme processing
│   │   └── fluid.handler.ts      # Fluid value processing
│   └── utils/                    # Utility functions
│       ├── formats.utils.ts      # Format utility functions
│       ├── strings.utils.ts      # String manipulation utilities
│       └── tokens/               # Token-specific utilities
│           ├── color-tokens.utils.ts
│           └── fluid-tokens.utils.ts
├── client/                       # Client-side configuration
│   ├── index.ts                  # Client entry point
│   ├── constants.ts              # Client constants
│   └── design/                   # Design system definitions
│       ├── constants/            # Design constants
│       ├── tokens/               # Token definitions
│       ├── utils/                # Design utilities
│       └── fonts/                # Font files
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
├── tokens/                       # Token definitions
│   ├── color/                    # Color tokens
│   ├── typography/               # Typography tokens
│   ├── size/                     # Size tokens
│   ├── border/                   # Border tokens
│   ├── shadow/                   # Shadow tokens
│   ├── breakpoint/               # Breakpoint tokens
│   ├── dimensions/               # Dimension tokens
│   ├── icon/                     # Icon tokens
│   └── opacity/                  # Opacity tokens
└── utils/                        # Design utilities
    ├── colors.utils.ts           # Color transformation utilities
    ├── strings.utils.ts          # String manipulation utilities
    └── units.utils.ts            # Unit conversion utilities
```

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
2. **Configuration**: Update constants in `client/constants.ts`
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
├── root-font-size.css            # Root font size configuration
└── font-faces.css                # Font face declarations
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

### Root Scale System

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
