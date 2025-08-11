# Mev’s Design Essentials Vendor

> A simple vendor of design system essentials

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![Style Dictionary][style-dictionary-src]][style-dictionary-href]

## 🎯 Overview

_[Mev](https://mev.bg)’s Design Essentials Vendor_ (**mDEV**) is a full-fledged factory for generating essential assets used to scaffold a robust Design System. Built on top of [Style Dictionary](https://styledictionary.com/) and [Favicons](https://www.npmjs.com/package/favicons), it delivers a strongly opinionated and production-ready foundation of assets, tokens and utilities — aligned with Mev’s principle for creating resilient and stable UIs.

The existence of this module is justified by the need for a single source of assets and pre-programmed models that define a proven-effective look and feel, while embodying shared values and concepts in the development of web interfaces.

## 📚 Core Philosophies

**mDEV** is built upon several core philosophies in modern web interface development — philosophies that have proven themselves as effective, proven concepts, evolving into long-term, foundational principles applied unconditionally across projects.

This section explores the essence of those philosophies in detail.

### Color Scheme Philosophy

The **Color Scheme Philosophy** represents a fundamental belief that has evolved into an unconditional principle: **providing support for light/dark color schemes is now a critical requirement for every web environment, without exception**.

This philosophy is built upon the recognition that modern users expect seamless adaptation to their visual preferences and environmental conditions. Whether working in bright daylight or low-light environments, users deserve interfaces that respect their comfort and accessibility needs.

However, this philosophy extends beyond mere system synchronization. While automatic detection and adaptation to system preferences is essential, **it is equally crucial to recognize the user’s absolute right to override and lock their preferred color scheme, even when it conflicts with their system settings**.

This dual approach — system-aware yet user-empowering — ensures that:

- **Accessibility is prioritized**: Users with visual impairments or specific needs can maintain their preferred contrast settings
- **User autonomy is respected**: Personal preferences take precedence over automated decisions
- **Consistency is maintained**: Once a user makes a choice, it should persist across sessions until explicitly changed
- **System integration remains intact**: Default behavior still honors system preferences for users who haven’t made explicit choices

This philosophy has been field-tested across numerous projects and has proven to be not just a feature, but a **fundamental right** that every web interface must provide. It’s a principle that transcends technical implementation — it’s about respecting user agency and ensuring digital environments adapt to humans, not the other way around.

This is precisely why **mDEV** includes a specially crafted and embedded system for processing color-related design tokens, ensuring that the generated CSS output is fully equipped to cover all the principles described above.

### Utopia Scheme Philosophy

The **Utopia Scheme Philosophy** represents a collaborative approach that begins with designers’ perceptions but evolves into a mutual effort and shared success. This philosophy addresses a fundamental challenge in modern web design: **creating truly responsive typography and spacing that adapts intelligently across different device sizes and viewing distances**.

This philosophy is deeply inspired by and aligned to some degree with the [Utopia.fyi](https://utopia.fyi) concept — a testament to the fact that this approach resonates with the broader design community and represents a shared vision for better responsive design practices.

The fundamental challenge this philosophy addresses is the inadequacy of traditional responsive design approaches when it comes to typography and spacing. The old-fashioned approach of jumping from breakpoint to breakpoint, with static values remaining unchanged in the range between two breakpoints, creates jarring and inconsistent user experiences.

True responsiveness is not about discrete jumps from point to point, but about **smooth scaling of typography and spacing** that adapts fluidly across the entire viewport spectrum. This philosophy recognizes that **typography and spacing must scale proportionally to viewing distance, not just screen size**, accounting for the fundamental differences in how users interact with different devices:

- **Mobile devices** are typically held closer to the eyes (30-40cm)
- **Tablets** are viewed at medium distances (40-60cm)
- **Desktop screens** are positioned further away (60-80cm or more)

These varying distances create different visual experiences and readability requirements that simple breakpoint-based scaling cannot adequately address.

This philosophy has become a **foundational principle** when defining design tokens related to typography, spacing, and other dimensional elements. It’s a conviction that has been validated across numerous projects and has proven to be essential for creating truly accessible and comfortable reading experiences across all devices.

The implementation of this philosophy ensures that:

- **Reading comfort is optimized**: Text scales appropriately for each device’s typical viewing distance
- **Visual hierarchy is maintained**: Proportional relationships between elements remain consistent
- **Accessibility is enhanced**: Text remains readable regardless of device or viewing conditions
- **Design consistency is preserved**: The same design principles apply across all screen sizes

This is why **mDEV** features a sophisticated token processing engine that generates fluid, responsive CSS with mathematical precision, delivering the smooth scaling capabilities needed to implement these principles effectively.

### Viewport Scale Philosophy

The **Viewport Scale Philosophy** represents a fundamental belief that has evolved into an unconditional principle: **every web interface must scale gracefully from near-zero widths to beyond 4K screens, without artificial limits or hard edges**.

This philosophy stems from the recognition that **even invisible details matter** — like the craftsmanship on the back of a handmade wardrobe or the smooth underside of a sculptor’s marble base. In web development, this translates to treating the outer edges of responsiveness with the same care as the visible content.

The primary issue this philosophy tackles is the inadequacy of traditional responsive design approaches that enforce strict minimums and maximums. Most developers define responsive systems between breakpoints like `320px` and `1920px`, treating anything outside that range as an afterthought. This creates two critical issues:

- **On tiny screens** (below `320px`), horizontal scrollbars appear, buttons overflow, and layouts break, reducing elegant compositions to chaos
- **On ultrawide monitors or presentation screens**, designs feel artificially constrained, with oceans of empty space or rigid boxes that look tiny from across a room

Both scenarios break user immersion and communicate: _"This website wasn’t made for your screen"_.

The **"responsive from zero to infinity"** approach ensures **full proportional coverage** regardless of screen size, embracing elegance where many choose compromise. The key lies in dynamically adjusting the root `font-size`, which cascades through all rem-based spacing, typography, and layout.

This philosophy has matured into an **unconditional principle** when defining viewport scaling strategies. It’s a conviction that has been validated across numerous projects and has proven essential for creating truly timeless and screen-proof interfaces.

The implementation of this philosophy ensures these:

- **Full proportional coverage**: No screen size is left behind
- **Zero layout breakage**: Graceful scaling in both directions
- **Elegant scaling**: Mathematical precision without compromise
- **Optional presentation support**: Fluid scaling for big displays when needed

**mDEV** tackles this challenge through its dedicated viewport scaler feature, which generates mathematically precise CSS that delivers the fluid scaling capabilities needed to implement these principles effectively.

### Icons System Philosophy

The **Icons System Philosophy** represents a fundamental belief that has evolved into an unconditional principle: **icon font systems should be preferred over individual SVG files for comprehensive icon management in web interfaces**.

This philosophy stems from two core convictions that have proven themselves across numerous projects:

**1. Baseline alignment control remains in designers’ hands**: Icon fonts provide precise control over vertical alignment, ensuring consistent positioning across different contexts and screen sizes. Unlike SVG files that require manual adjustment for each implementation, icon fonts maintain baseline consistency automatically, allowing designers to focus on visual hierarchy rather than technical alignment issues.

**2. Variable fonts revolutionize the game**: The emergence of variable font technology has fundamentally transformed icon system capabilities. Modern icon fonts now support dynamic switching between multiple visual styles — outlined, rounded, sharp, filled — as well as weight variations, grade adjustments, and optical size optimization. This level of flexibility was previously impossible with static SVG files and represents a paradigm shift in icon system design.

The central challenge this philosophy confronts is the fragmentation and inconsistency that often results from managing individual SVG icon files. Traditional approaches require separate files for each icon variant, leading to maintenance overhead, inconsistent sizing, and alignment challenges across different contexts.

This philosophy has solidified as an **unconditional principle** when defining icon system strategies. It’s a conviction that has been validated across numerous projects and has proven essential for creating truly scalable and maintainable icon systems.

The implementation of this philosophy ensures that:

- **Consistent alignment**: Automatic baseline consistency across all contexts
- **Scalable management**: Single font file instead of hundreds of individual SVGs
- **Dynamic flexibility**: Variable font capabilities for multiple visual styles
- **Performance optimization**: Reduced HTTP requests and better caching
- **Designer empowerment**: Focus on visual design rather than technical implementation

**mDEV** confronts this challenge through its dedicated icon font generator, which produces CSS with selectors for a complete icon matrix from a given font, delivering the comprehensive icon system capabilities needed to implement these principles effectively.

### Design Tokens Philosophy

The **Design Tokens Philosophy** represents a widely accepted and long-established principle in modern web development: **all design values should be defined as named tokens rather than hardcoded values in CSS**.

This philosophy has been embraced by the design and development community for years, which is why tools like [Style Dictionary](https://styledictionary.com/) have emerged to support this approach. The motivation for quality code and easy maintenance is just one of the arguments for defining tokens with values.

The fundamental principle is that **when writing CSS, static values should never be assigned directly**. In an ideal world, all values should come from a predefined collection of values with meaningful names that reflect their purpose and context. This approach ensures consistency, maintainability, and semantic clarity across the entire design system.

Another vital criterion is **cross-platform support**, which guarantees the use of the same values across different programming environments, regardless of whether it’s CSS, JavaScript, Sass, or any other platform. This unified approach eliminates inconsistencies and ensures that design decisions are consistently applied across all implementation contexts.

The fundamental issue this philosophy resolves is the chaos and inconsistency that results from scattered hardcoded values throughout codebases. Traditional approaches lead to maintenance nightmares, inconsistent implementations, and design drift that makes systems increasingly difficult to manage over time.

This philosophy has crystallized as an **unconditional principle** when defining design system architecture. It’s a conviction that has been validated across numerous projects and has proven essential for creating truly maintainable and scalable design systems.

The implementation of this philosophy ensures that:

- **Consistency is guaranteed**: Same values used across all platforms and contexts
- **Maintainability is enhanced**: Changes in one place propagate everywhere
- **Semantic clarity is achieved**: Values have meaningful names that reflect their purpose
- **Cross-platform harmony**: Unified design language across all implementation environments
- **Future-proof architecture**: Systems that can evolve without breaking existing implementations

**mDEV** resolves this challenge through its dedicated tokens generator, which produces tokens for specific platforms, ensuring the origin and consistency of all design values across the entire system.

## 🚀 Features

Currently, **mDEV** provides the ability to produce 6️⃣ established essentials, each of which is described as a feature in this section. Every feature has its own (so called) _Generator_ and the list of these will most likely continue to grow as new needs and capabilities emerge.

> The technical specifications of the generators and the ways they can be utilized are described further down in [Usage of Generators](#️-usage-of-generators) section.

### Design Tokens Feature

This feature represents one of the core and primary functionalities of the **mDEV** module — the ability to generate specially formatted design tokens output using Style Dictionary, covering all the principles described in the Core Philosophies section. This feature enables the creation of a unified design system foundation that ensures consistency, maintainability, and cross-platform harmony across all implementation environments.

> Examples of partial output with design tokens for CSS and JS can be seen in the [Design Tokens Output Example](#design-tokens-output-example) section.

### Viewport Scaler Feature

This feature provides a ready-made CSS file with dynamic root font size, defined as a CSS custom property that changes its value based on specified parameters. It also provides a presentation mode class, ensuring full proportional coverage across all screen sizes with zero layout breakage and elegant mathematical scaling, which embodies the principles of the Viewport Scale philosophy.

> An example of the CSS output can be seen in the [Viewport Scaler Output Example](#viewport-scaler-output-example) section.

### Scrollbar Feature

This feature deals with the creation of a CSS file with styles for styling native scrollbar elements in a given web environment, transforming them into elegant-looking indicators. It implements refined, context-aware styling that treats scrollbars as first-class UI elements, ensuring they blend seamlessly with the overall design while providing essential visual feedback for content length and scroll progress.

> An example of the CSS output can be seen in the [Scrollbar Output Example](#scrollbar-output-example) section.

### Font Faces Feature

This feature handles the generation of `@font-face` declarations in CSS when attaching self-hosted local fonts. The functionality is designed to work by scanning a provided directory containing fonts and matching them with a provided brief description of the names of different styles and which name corresponds to which font-weight. The system scans the provided directory, discovers what styles are available, maps them to the provided configuration, and generates a CSS file with all necessary `@font-face` declarations. The system recognizes the availability of Italic styles for given weights and works only with `woff2` file format.

> An example of the CSS output can be seen in the [Font Faces Output Example](#font-faces-output-example) section.

### Icons Feature

This feature generates comprehensive CSS selectors for a given icon font based on provided name-to-unicode mappings. It creates individual `::after` pseudo-selectors for each glyph in the font, enabling precise targeting and visualization of specific icons. This approach delivers a complete, ready-to-use icon system that simplifies icon implementation across projects.

> An example of the CSS output can be seen in the [Icons Output Example](#icons-output-example) section.

### Favicons Feature

This feature leverages the [favicons](https://www.npmjs.com/package/favicons) module to generate a comprehensive suite of icons for all platforms, devices, and web services based on specified parameters. Beyond traditional favicons, it produces startup splash screens and a web app manifest, effectively delivering production-ready assets for authentic Progressive Web Applications (PWAs). This comprehensive approach ensures complete platform coverage and professional-grade icon implementation across all target environments.

> An example of the generated files list can be seen in the [Favicons Output Example](#favicons-output-example) section.

## 📦 Installation

### npm

```bash
npm install @mevbg/design-essentials-vendor --save-dev
```

### pnpm

```bash
pnpm add @mevbg/design-essentials-vendor --save-dev
```

### yarn

```bash
yarn add @mevbg/design-essentials-vendor --ds
```

## ⚙️ Usage of Generators

As outlined in the [Features](#-features) section, each feature is implemented through a dedicated function responsible for producing its corresponding output. These functions are referred to as _Generators_.

The defined type for a _Generator_ function is as follows:

```ts
type GeneratorFn<T, Response = StyleDictionary> = (params: T) => Promise<Response>;
```

• `T` represents the type of parameters expected by the specific generator;
• `Response` represents the return type of the Promise that the generator resolves to. By default, this is a `StyleDictionary` object, as it is the most commonly returned type.

---

**mDEV**’s API exposes all individual generators, enabling selective usage when only a subset of features is required — although such scenarios are considered unlikely.

In addition to the six generators currently available, **mDEV** also provides a **Master Generator**, exposed as `generateDesignEssentials`. This central utility allows all features to be executed at once by triggering all six feature-based generators in a single operation.

### Master Generator

(_exposed as_ `generateDesignEssentials`)

```ts
generateDesignEssentials: GeneratorFn<MasterGeneratorParams, void>;
```

The _Master Generator_ is the primary (and preferred) way to use this vendor. As mentioned above, it utilizes the full capabilities of the module and can produce output from all developed and supported features.

The _Master Generator_ itself does not generate any output. Its role is to trigger all content-producing generators — or more precisely, only those specified in its input parameters, since selective execution is supported.

#### Master Generator Parameters

At the root level, the Master Generator accepts four parameters:
`buildPath` | `prefix` | `baseFontSize` | `generators`

Here is the type definition for the parameters:

```ts
type MasterGeneratorParams = {
  buildPath?: string;
  prefix?: string;
  baseFontSize?: number;
  generators: {
    tokens?: TokensGeneratorParams;
    viewportScaler?: ViewportScalerGeneratorParams;
    fontFaces?: FontFacesGeneratorParams;
    icons?: IconsGeneratorParams;
    scrollbar?: ScrollbarGeneratorParams;
    favicons?: FaviconsGeneratorParams;
  };
};
```

Of all four parameters, only the `generators` object is **required**, as it must explicitly specify which generators will be used, along with the corresponding parameters for each. Default values are provided for the remaining three. Here are more details:

##### **`buildPath`**

- **Type**: `string` _(optional)_
- **Default**: `'dist'`
- **Description**: This field specifies the path to the directory where the generated output should be placed. If no path is provided, a `dist` directory will be created at the root of the project from which the process is executed.

##### **`prefix`**

- **Type**: `string` _(optional)_
- **Default**: `'ds'` _(stands for "Design System")_
- **Description**: This prefix is used exclusively by Style Dictionary when generating CSS Custom Properties.
It is primarily utilized by the Viewport Scaler Generator and Tokens Generator, as both produce CSS output containing custom properties whose names are structured using this prefix.

##### **`baseFontSize`**

- **Type**: `number` _(optional)_
- **Default**: `10`
- **Description**: This value defines the base font size of the web document, from which all relative `rem` units are derived. It also serves as the foundation for the CSS formulas that are integral to both Scaling Layout logic and Content Scaling logic. More details about these two strategies can be found further down in this documentation.

##### **`generators`**

- **Type**: `object` **_(required)_**
- **Description**: This object accepts optional properties corresponding to the available feature-based generators. Each property represents a configuration object that contains the necessary parameters for the respective feature. Only the generators with a configuration object provided will produce output. If an empty object `{}` is passed to `generators`, no output will be generated at all. Some generators require mandatory configuration fields, and their usage depends on providing those parameters. Others have default values for all parameters, in which case passing an empty object `{}` is sufficient to trigger production. Detailed information about the required and optional parameters for each generator is provided further down in this documentation.

#### Usage of Master Generator

```ts
import { generateDesignEssentials } from '@mevbg/design-essentials-vendor';

try {
  await generateDesignEssentials({
    buildPath: './dist',
    prefix: 'mev',
    baseFontSize: 16,
    generators: {
      favicons: {
        id: 'https://mev.bg',
        sourcePath: 'assets/images/logo.svg',
        appName: 'Mev.bg',
        appShortName: 'Mev',
        appDescription: 'Personal webpage',
        version: '1.0.0'
      },
      fontFaces: {
        sourcePath: 'assets/client/fonts',
        fonts: {
          Helvetica: {
            Regular: 400,
            Bold: 700
          }
        }
      },
      icons: {
        fontFamily: 'MevIcons',
        color: 'var(--mev-color-content-gray)',
        list: {
          main: 'E000',
          nav: 'E001',
          search: 'E002',
          profile: 'E003'
          // ...
        },
        viewportScaler: {},
        scrollbar: {},
        tokens: {
          sourcePath: './design/tokens/**/index.js',
          platforms: ['css', 'js', 'scss'],
          contentScaling: {
            minViewportW: 600,
            maxViewportW: 1200
          },
          colorScheme: {
            default: 'light',
            method: 'combined'
          }
        }
      }
    }
  });
  console.info('Design essentials generated successfully!');
} catch (err) {
  console.error('Failed to generate design essentials:', err.message);
}
```

The configuration for each of the generators shown in the example above will make more sense after reading the documentation for their purpose in the following sections.

### Tokens Generator

(_exposed as_ `generateTokens`)

```ts
generateTokens: GeneratorFn<TokensGeneratorParams, void>;
```

The _Tokens Generator_ is one of the most complex and feature-rich generators in this vendor. It leverages the power of Style Dictionary to transform design tokens from source files into multiple output formats. The generator supports various platforms (CSS, SCSS, JavaScript, JSON), implements color scheme management, and includes Utopia fluid typography scaling.

The _Tokens Generator_ processes design tokens from specified source files and generates platform-specific output files based on the configuration provided. It supports advanced features like color scheme switching, fluid typography scaling, and multiple output formats simultaneously.

#### Tokens Generator Parameters

The Tokens Generator accepts several parameters that control its behavior and output:

```ts
type TokensGeneratorParams = {
  sourcePath: string;
  platforms?: PlatformType[];
  prefix?: string;
  baseFontSize?: number;
  colorScheme?: ColorSchemeParams;
  utopiaScheme?: UtopiaSchemeParams;
  buildPath?: string;
};
```

Of all parameters, only `sourcePath` is **required** as it specifies where the design token source files are located. All other parameters have sensible defaults. Here are more details:

##### **`sourcePath`**

- **Type**: `string` **_(required)_**
- **Description**: This field specifies the path to the directory or glob pattern where the design token source files are located. These files should contain the raw design tokens that will be processed and transformed into the specified output formats.

##### **`platforms`**

- **Type**: `PlatformType[]` _(optional)_
- **Default**: `['css', 'scss', 'js', 'json']`
- **Description**: This array specifies which output platforms should be generated. Available options are:
  - `'css'` - Generates CSS files with CSS Custom Properties
  - `'scss'` - Generates SCSS files with SCSS variables
  - `'js'` - Generates JavaScript files with static values and CSS custom properties
  - `'json'` - Generates JSON files with all tokens

<!-- markdownlint-disable-next-line MD024 -->
##### **`prefix`**

- **Type**: `string` _(optional)_
- **Default**: `'ds'` _(stands for "Design System")_
- **Description**: This prefix is used by Style Dictionary when generating CSS Custom Properties and other prefixed outputs. It helps namespace the generated tokens to avoid conflicts.

<!-- markdownlint-disable-next-line MD024 -->
##### **`baseFontSize`**

- **Type**: `number` _(optional)_
- **Default**: `10`
- **Description**: This value defines the base font size used for calculating relative units and fluid typography scaling. It serves as the foundation for Utopia scheme calculations.

##### **`colorScheme`**

- **Type**: `ColorSchemeParams` _(optional)_
- **Default**: `{ default: 'light', method: 'combined' }`
- **Description**: This object configures color scheme behavior. It contains:
  - `default` - The default color scheme (`'light'` or `'dark'`)
  - `method` - The method for applying color schemes:
    - `'media'` - Uses `prefers-color-scheme` media query
    - `'class'` - Uses CSS classes on the root element
    - `'combined'` - Uses both methods with class priority

##### **`utopiaScheme`**

- **Type**: `UtopiaSchemeParams` _(optional)_
- **Default**: `{ minViewportW: 600, maxViewportW: 1200 }`
- **Description**: This object configures Utopia fluid typography scaling. It contains:
  - `minViewportW` - Minimum viewport width for scaling _(in pixels)_
  - `maxViewportW` - Maximum viewport width for scaling _(in pixels)_

<!-- markdownlint-disable-next-line MD024 -->
##### **`buildPath`**

- **Type**: `string` _(optional)_
- **Default**: `'dist'`
- **Description**: This field specifies the path to the directory where the generated output files should be placed.

#### Usage of Tokens Generator

```ts
import { generateTokens } from '@mevbg/design-essentials-vendor';

try {
  await generateTokens({
    sourcePath: './design/tokens/**/index.js',
    platforms: ['css', 'scss', 'js', 'json'],
    prefix: 'mev',
    baseFontSize: 16,
    colorScheme: {
      default: 'light',
      method: 'combined'
    },
    utopiaScheme: {
      minViewportW: 600,
      maxViewportW: 1200
    },
    buildPath: './dist/tokens'
  });
  console.info('Design tokens generated successfully!');
} catch (err) {
  console.error('Failed to generate design tokens:', err.message);
}
```

The configuration above will:

- Process design tokens from files matching the glob pattern `./design/tokens/**/index.js`
- Generate output for CSS, SCSS, and JavaScript platforms
- Use the prefix `mev` for all generated CSS custom properties
- Set up a base font size of 16px for calculations
- Configure a light-first color scheme with combined media query and class support
- Enable Utopia fluid typography scaling between 600px and 1200px viewport widths
- Output all files to the `./dist/tokens` directory

#### Tokens Generated Output

The generator produces platform-specific output files based on the configured platforms:

**CSS Platform**:

- `all.css` - Complete CSS file with all tokens as CSS custom properties
- `color.css` - Color tokens only
- `typography.css` - Typography tokens only
- `spacing.css` - Spacing and sizing tokens
- `border.css` - Border and shadow tokens
- `others.css` - Any additional token categories

**SCSS Platform**:

- `all.scss` - Complete SCSS file with all tokens as SCSS variables
- Individual token type files (same structure as CSS)

**JavaScript Platform**:

- `static.js` - JavaScript object with static token values
- `variable.js` - JavaScript object with CSS custom property references

**JSON Platform**:

- `all.json` - Complete JSON file with all tokens and their values

### Viewport Scaler Generator

(_exposed as_ `generateViewportScaler`)

```ts
generateViewportScaler: GeneratorFn<ViewportScalerGeneratorParams, void>;
```

The _Viewport Scaler Generator_ is responsible for creating responsive layout scaling by dynamically adjusting the root font size based on viewport width. This approach enables true fluid scaling of all elements that use `rem` or `em` units, creating a more responsive and adaptive design system.

The _Viewport Scaler Generator_ generates CSS media queries that set the `--root-font-size` CSS custom property on the `:root` element. This property is then used as the foundation for all relative unit calculations, allowing the entire layout to scale proportionally with the viewport size.

#### Viewport Scaler Generator Parameters

The Viewport Scaler Generator accepts several parameters that control the scaling behavior:

```ts
type ViewportScalerGeneratorParams = {
  prefix?: string;
  baseFontSize?: number;
  minViewportW?: number;
  maxViewportW?: number;
  buildPath?: string;
};
```

All parameters are **optional** and have sensible defaults. Here are more details:

<!-- markdownlint-disable-next-line MD024 -->
##### **`prefix`**

- **Type**: `string` _(optional)_
- **Default**: `'ds'` _(stands for "Design System")_
- **Description**: This prefix is used for the CSS custom property name to avoid conflicts with other custom properties. The generated property will be named `--{prefix}-root-font-size`.

<!-- markdownlint-disable-next-line MD024 -->
##### **`baseFontSize`**

- **Type**: `number` _(optional)_
- **Default**: `10`
- **Description**: This value defines the base font size used for calculating the scaling formula. It serves as the foundation for all viewport-based calculations.

##### **`minViewportW`**

- **Type**: `number` _(optional)_
- **Default**: `300`
- **Description**: This is the minimum viewport width _(in pixels)_ below which the viewport scaler is applied. Below this breakpoint, the root font size scales proportionally with the viewport width.

##### **`maxViewportW`**

- **Type**: `number` _(optional)_
- **Default**: `2100`
- **Description**: This is the maximum viewport width _(in pixels)_ above which the viewport scaler is applied in presentation mode. Above this breakpoint, the root font size scales proportionally with the viewport width when the `html.presentation-mode` class is present.

<!-- markdownlint-disable-next-line MD024 -->
##### **`buildPath`**

- **Type**: `string` _(optional)_
- **Default**: `'dist'`
- **Description**: This field specifies the path to the directory where the generated CSS file should be placed.

#### Usage of Viewport Scaler Generator

```ts
import { generateViewportScaler } from '@mevbg/design-essentials-vendor';

try {
  await generateViewportScaler({
    prefix: 'mev',
    baseFontSize: 16,
    minViewportW: 320,
    maxViewportW: 1920,
    buildPath: './dist/css'
  });
  console.info('Viewport scaler generated successfully!');
} catch (err) {
  console.error('Failed to generate viewport scaler:', err.message);
}
```

The configuration above will:

- Use the prefix `mev` for the CSS custom property `--mev-root-font-size`
- Set up a base font size of 16px for calculations
- Apply viewport scaling below 320px viewport width
- Apply viewport scaling above 1920px viewport width in presentation mode
- Output the CSS file to the `./dist/css` directory

#### Viewport Scaler Generated Output

The generator produces CSS media queries that create three distinct scaling zones:

1. **Below minimum viewport width**: Fluid scaling using `calc((baseFontSize * 100vw) / minViewportW)`
2. **Between min and max viewport width**: Fixed scaling using the base font size percentage
3. **Above maximum viewport width**: Fixed scaling with optional presentation mode fluid scaling

### Scrollbar Generator

(_exposed as_ `generateScrollbar`)

```ts
generateScrollbar: GeneratorFn<ScrollbarGeneratorParams, void>;
```

The _Scrollbar Generator_ creates custom scrollbar styles for web applications, providing a consistent and branded scrolling experience across different browsers. It generates CSS that customizes the appearance of scrollbars using WebKit-specific pseudo-elements and CSS custom properties.

The _Scrollbar Generator_ produces CSS that targets WebKit-based browsers (Chrome, Safari, Edge) and applies custom styling to scrollbar elements. It uses CSS custom properties to make the styling configurable and maintainable, while providing hover and active states for better user interaction.

#### Scrollbar Generator Parameters

The Scrollbar Generator accepts several parameters that control the scrollbar appearance:

```ts
type ScrollbarGeneratorParams = {
  areaWidth?: number;
  thumbSizeBase?: number;
  thumbSizeOver?: number;
  thumbMinSize?: number;
  scrollbarBackground?: string;
  thumbColor?: string;
  thumbColorHover?: string;
  thumbColorActive?: string;
  buildPath?: string;
};
```

All parameters are **optional** and have sensible defaults. Here are more details:

##### **`areaWidth`**

- **Type**: `number` _(optional)_
- **Default**: `16`
- **Description**: This value defines the total width _(in pixels)_ of the scrollbar area for vertical scrollbars and the height for horizontal scrollbars.

##### **`thumbSizeBase`**

- **Type**: `number` _(optional)_
- **Default**: `4`
- **Description**: This value defines the base width _(in pixels)_ of the scrollbar thumb in its normal state.

##### **`thumbSizeOver`**

- **Type**: `number` _(optional)_
- **Default**: `10`
- **Description**: This value defines the width _(in pixels)_ of the scrollbar thumb when hovered or active, providing visual feedback to users.

##### **`thumbMinSize`**

- **Type**: `number` _(optional)_
- **Default**: `80`
- **Description**: This value defines the minimum size _(in pixels)_ that the scrollbar thumb can have, ensuring it remains usable even on very long content.

##### **`scrollbarBackground`**

- **Type**: `string` _(optional)_
- **Default**: `'transparent'`
- **Description**: This value defines the background color of the scrollbar track area. Can be any valid CSS color value.

##### **`thumbColor`**

- **Type**: `string` _(optional)_
- **Default**: `'#ccc'`
- **Description**: This value defines the color of the scrollbar thumb in its normal state. Can be any valid CSS color value.

##### **`thumbColorHover`**

- **Type**: `string` _(optional)_
- **Default**: `'#ccc'`
- **Description**: This value defines the color of the scrollbar thumb when hovered. Can be any valid CSS color value.

##### **`thumbColorActive`**

- **Type**: `string` _(optional)_
- **Default**: `'#999'`
- **Description**: This value defines the color of the scrollbar thumb when active (being dragged). Can be any valid CSS color value.

<!-- markdownlint-disable-next-line MD024 -->
##### **`buildPath`**

- **Type**: `string` _(optional)_
- **Default**: `'dist'`
- **Description**: This field specifies the path to the directory where the generated CSS file should be placed.

#### Usage of Scrollbar Generator

```ts
import { generateScrollbar } from '@mevbg/design-essentials-vendor';

try {
  await generateScrollbar({
    areaWidth: 12,
    thumbSizeBase: 6,
    thumbSizeOver: 8,
    thumbMinSize: 60,
    scrollbarBackground: 'rgba(0, 0, 0, 0.1)',
    thumbColor: '#666',
    thumbColorHover: '#888',
    thumbColorActive: '#444',
    buildPath: './dist/css'
  });
  console.info('Scrollbar styles generated successfully!');
} catch (err) {
  console.error('Failed to generate scrollbar styles:', err.message);
}
```

The configuration above will:

- Create a 12px wide scrollbar area
- Use a 6px base thumb size that expands to 8px on hover
- Set a minimum thumb size of 60px
- Use a semi-transparent dark background for the track
- Apply a gray color scheme with darker shades for hover and active states
- Output the CSS file to the `./dist/css` directory

#### Scrollbar Generated Output

The generator produces CSS that includes:

- CSS custom properties for all configurable values
- WebKit-specific scrollbar styling for vertical and horizontal scrollbars
- Hover and active states for the scrollbar thumb
- Proper cursor styling for different scrollbar elements
- Hidden scrollbar buttons for a cleaner appearance
- Automatic calculation of gap sizes based on area and thumb dimensions

### Font Faces Generator

(_exposed as_ `generateFontFaces`)

```ts
generateFontFaces: GeneratorFn<FontFacesGeneratorParams, void>;
```

The _Font Faces Generator_ automatically scans a directory of font files and generates CSS `@font-face` declarations for web applications. It supports WOFF2 font files and automatically detects font weights and styles based on file naming conventions.

The _Font Faces Generator_ processes font files from a specified source directory and creates CSS that defines custom font families with proper font-weight and font-style declarations. It automatically handles both regular and italic variants, and maps font file names to appropriate CSS font-weight values.

#### Font Faces Generator Parameters

The Font Faces Generator accepts several parameters that control the font processing:

```ts
type FontFacesGeneratorParams = {
  sourcePath: string;
  fonts: Record<string, Record<string, number>>;
  buildPath?: string;
};
```

Two parameters are **required** and one is optional. Here are more details:

<!-- markdownlint-disable-next-line MD024 -->
##### **`sourcePath`**

- **Type**: `string` **_(required)_**
- **Description**: This field specifies the path to the directory containing font files. The generator expects a specific directory structure where each font family has its own subdirectory containing the font files.

##### **`fonts`**

- **Type**: `Record<string, Record<string, number>>` **_(required)_**
- **Description**: This object maps font family names to their weight configurations. The structure is:
  - **Outer key**: Font family name _(must match the directory name)_
  - **Inner key**: Weight name _(must match the filename pattern)_
  - **Value**: CSS font-weight number _(e.g., 400 for normal, 700 for bold)_

Example:

```ts
{
  'Helvetica': {
    'Regular': 400,
    'Bold': 700
  }
}
```

<!-- markdownlint-disable-next-line MD024 -->
##### **`buildPath`**

- **Type**: `string` _(optional)_
- **Default**: `'dist'`
- **Description**: This field specifies the path to the directory where the generated CSS file should be placed.

#### Usage of Fonts Faces Generator

```ts
import { generateFontFaces } from '@mevbg/design-essentials-vendor';

try {
  await generateFontFaces({
    sourcePath: './assets/fonts',
    fonts: {
      Helvetica: {
        Regular: 400,
        Bold: 700
      }
    },
    buildPath: './dist/css'
  });
  console.info('Font faces generated successfully!');
} catch (err) {
  console.error('Failed to generate font faces:', err.message);
}
```

The configuration above will:

- Scan the `./assets/fonts` directory for font files
- Process Helvetica font family
- Map font weights according to the provided configuration
- Generate CSS `@font-face` declarations for all detected fonts
- Output the CSS file to the `./dist/css` directory

#### Directory Structure Requirements

The generator expects the following directory structure:

```text
assets/fonts/
└── Helvetica/
    ├── Helvetica-Regular.woff2
    ├── Helvetica-RegularItalic.woff2
    ├── Helvetica-Bold.woff2
    └── Helvetica-BoldItalic.woff2
```

#### Font Faces Generated Output

The generator produces CSS `@font-face` declarations that include:

- Proper font-family names matching the directory structure
- Font-weight values mapped from the configuration
- Font-style detection (normal/italic) based on filename patterns
- WOFF2 format declarations with relative URLs
- Automatic handling of both regular and italic variants

### Icons Generator

(_exposed as_ `generateIcons`)

```ts
generateIcons: GeneratorFn<IconsGeneratorParams, void>;
```

The _Icons Generator_ creates CSS-based icon system using font icons and CSS custom properties. It generates CSS that allows you to use icons through HTML data attributes, providing a flexible and scalable icon solution for web applications.

The _Icons Generator_ produces CSS that defines icon styles using the `data-i` attribute selector. It creates a system where icons can be easily used in HTML by simply adding a data attribute, and the corresponding icon will be displayed using CSS pseudo-elements and Unicode characters.

#### Icons Generator Parameters

The Icons Generator accepts several parameters that control the icon system:

```ts
type IconsGeneratorParams = {
  fontFamily?: string;
  color?: string;
  list: Record<string, string>;
  buildPath?: string;
};
```

One parameter is **required** and three are optional. Here are more details:

##### **`list`**

- **Type**: `Record<string, string>` **_(required)_**
- **Description**: This object maps icon names to their Unicode character codes. The structure is:
  - **Key**: Icon name (used in the HTML `data-i` attribute)
  - **Value**: Unicode character code (without the `\u` prefix)

Example:

```ts
{
  'home': 'e900',
  'search': 'e901',
  'user': 'e902',
  'settings': 'e903'
}
```

##### **`fontFamily`**

- **Type**: `string` _(optional)_
- **Default**: `'Iconography'`
- **Description**: This value defines the font family that will be used for displaying the icons. It should match the font family name of your icon font (e.g., Font Awesome, Material Icons, or a custom icon font).

##### **`color`**

- **Type**: `string` _(optional)_
- **Default**: `'currentColor'`
- **Description**: This value defines the default color for all icons. Using `currentColor` allows icons to inherit the text color from their parent element, making them flexible and themeable.

<!-- markdownlint-disable-next-line MD024 -->
##### **`buildPath`**

- **Type**: `string` _(optional)_
- **Default**: `'dist'`
- **Description**: This field specifies the path to the directory where the generated CSS file should be placed.

#### Usage of Icons Generator

```ts
import { generateIcons } from '@mevbg/design-essentials-vendor';

try {
  await generateIcons({
    fontFamily: 'MyIcons',
    color: 'var(--mev-color-primary)',
    list: {
      home: 'e900',
      search: 'e901',
      user: 'e902',
      settings: 'e903',
      menu: 'e904',
      close: 'e905'
    },
    buildPath: './dist/css'
  });
  console.info('Icons generated successfully!');
} catch (err) {
  console.error('Failed to generate icons:', err.message);
}
```

The configuration above will:

- Use the `MyIcons` font family for displaying icons
- Set the default icon color to use a CSS custom property
- Define six icons with their respective Unicode codes
- Output the CSS file to the `./dist/css` directory

#### HTML Usage

After generating the CSS, you can use icons in your HTML like this:

```html
<!-- <span> as an icon -->
<span data-i="home"></span>

<!-- <i> as an icon -->
<i data-i="user"></i>
```

#### Icons Generated Output

The generator produces CSS that includes:

- Base styles for all icon elements using the `[data-i]` selector
- Proper sizing and positioning for consistent icon display
- Font family and color configuration
- Individual icon definitions using `::after` pseudo-elements
- Unicode character content for each defined icon
- Responsive sizing using `em` units for scalability

### Favicons Generator

(_exposed as_ `generateFavicons`)

```ts
generateFavicons: GeneratorFn<FaviconsGeneratorParams, FaviconResponse>;
```

The _Favicons Generator_ creates comprehensive favicon sets and web app manifests for modern web applications. It leverages the popular `favicons` npm package to generate icons for various platforms and devices, including browsers, mobile devices, and PWA installations.

The _Favicons Generator_ processes a source image and generates a complete set of favicons, touch icons, and web app manifest files. It supports multiple platforms including Android, iOS, Windows, and various browsers, ensuring your web application has proper branding across all devices and platforms.

#### Favicons Generator Parameters

The Favicons Generator accepts several parameters that control the favicon generation:

```ts
type FaviconsGeneratorParams = {
  id: string;
  sourcePath: string;
  appName: string;
  appShortName: string;
  appDescription: string;
  version: string;
  developerName?: string;
  developerURL?: string;
  dir?: string;
  lang?: string;
  background?: string;
  theme_color?: string;
  appleStatusBarStyle?: string;
  display?: string;
  orientation?: string;
  scope?: string;
  start_url?: string;
  preferRelatedApplications?: boolean;
  relatedApplications?: Array<{ id: string; url: string; platform: string }>;
  manifestMaskable?: boolean | string;
  loadManifestWithCredentials?: boolean;
  icons?: Record<string, any>;
  buildPath?: string;
};
```

Six parameters are **required** and the rest are optional. Here are more details:

##### **`id`**

- **Type**: `string` **_(required)_**
- **Description**: This field specifies the unique identifier for the web application. It is used in the generated manifest file and helps identify the app across different platforms.

<!-- markdownlint-disable-next-line MD024 -->
##### **`sourcePath`**

- **Type**: `string` **_(required)_**
- **Description**: This field specifies the path to the source image file that will be used to generate all favicon variants. The image should be high quality (at least 1024x1024 pixels) and square.

##### **`appName`**

- **Type**: `string` **_(required)_**
- **Description**: This field specifies the full name of the web application as it will appear in app stores and device home screens.

##### **`appShortName`**

- **Type**: `string` **_(required)_**
- **Description**: This field specifies the short name of the web application, typically used when space is limited _(e.g., on home screens)_.

##### **`appDescription`**

- **Type**: `string` **_(required)_**
- **Description**: This field provides a brief description of the web application for app stores and device listings.

##### **`version`**

- **Type**: `string` **_(required)_**
- **Description**: This field specifies the version number of the web application _(e.g., "1.0.0")_.

##### **`developerName`**

- **Type**: `string` _(optional)_
- **Default**: `'Martin Metodiev'`
- **Description**: This field specifies the name of the developer or organization that created the web application.

##### **`developerURL`**

- **Type**: `string` _(optional)_
- **Default**: `'https://mev.bg'`
- **Description**: This field specifies the URL of the developer or organization website.

##### **`background`**

- **Type**: `string` _(optional)_
- **Default**: `'#fff'`
- **Description**: This field specifies the background color for flattened icons and splash screens.

##### **`theme_color`**

- **Type**: `string` _(optional)_
- **Default**: `'#fff'`
- **Description**: This field specifies the theme color used in browser UI elements and Android task switcher.

##### **`display`**

- **Type**: `string` _(optional)_
- **Default**: `'standalone'`
- **Description**: This field specifies the preferred display mode for the web application. Options include: `'fullscreen'`, `'standalone'`, `'minimal-ui'`, or `'browser'`.

<!-- markdownlint-disable-next-line MD024 -->
##### **`buildPath`**

- **Type**: `string` _(optional)_
- **Default**: `'dist'`
- **Description**: This field specifies the path to the directory where the generated favicon files should be placed.

#### Usage of Favicons Generator

```ts
import { generateFavicons } from '@mevbg/design-essentials-vendor';

try {
  await generateFavicons({
    id: 'https://mev.bg',
    sourcePath: './assets/images/logo.svg',
    appName: 'Mev.bg - Personal Website',
    appShortName: 'Mev.bg',
    appDescription: 'Personal website and portfolio of Martin Metodiev',
    version: '1.0.0',
    developerName: 'Martin Metodiev',
    developerURL: 'https://mev.bg',
    background: '#ffffff',
    theme_color: '#3b82f6',
    display: 'standalone',
    buildPath: './dist/favicons'
  });
  console.info('Favicons generated successfully!');
} catch (err) {
  console.error('Failed to generate favicons:', err.message);
}
```

The configuration above will:

- Use the logo.svg file as the source image for all favicon variants
- Set up a complete web app manifest with proper branding
- Generate favicons for all major platforms and browsers
- Create a standalone web app experience
- Output all files to the `./dist/favicons` directory

#### Generated Output

The generator produces a comprehensive set of files including:

- **Favicon files**: Various sizes for different browsers and devices
- **Touch icons**: Apple touch icons for iOS devices
- **Android icons**: Home screen and app store icons
- **Windows tiles**: Windows 8/10 tile icons
- **Web app manifest**: JSON manifest file for PWA functionality
- **HTML snippets**: Ready-to-use HTML tags for favicon integration
- **Splash screens**: Apple startup images for iOS devices

#### HTML Integration

After generation, you can integrate the favicons into your HTML:

```html
<!-- Include the generated HTML snippets in your <head> section -->
<link rel="icon" type="image/x-icon" href="/favicons/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
<link rel="manifest" href="/favicons/manifest.webmanifest" />
```

## 🔧 Development

This section provides comprehensive technical documentation regarding **mDEV** module. It covers the internal architecture, source code structure, and implementation details that are essential for understanding, maintaining, and extending the codebase. The documentation is written from a developer’s perspective, focusing on code organization, dependencies, and the technical implementation of each component.

### Source File Structure

The following represents the complete file structure of the `src` directory that contains the source code of the **mDEV** module:

```text
src/
├── index.ts                             # Main entry point - exports all generators and types
├── defaults.ts                          # Default configuration parameters for all generators
├── generators/                          # Core generators implementation
│   ├── index.ts                         # Exports all generators
│   ├── master/                          # Master generator - orchestrates all other generators
│   │   ├── master.generator.ts          # Main orchestration logic
│   │   └── master.types.ts              # Master generator parameter types
│   ├── tokens/                          # Design tokens generator - most complex generator
│   │   ├── tokens.generator.ts          # Main tokens generation logic
│   │   ├── tokens.types.ts              # Tokens generator parameter types
│   │   ├── handlers/                    # Token processing handlers
│   │   │   ├── index.ts                 # Exports all handlers
│   │   │   ├── basic.handler.ts         # Basic token processing logic
│   │   │   ├── color.handler.ts         # Color-specific token processing
│   │   │   └── utopia.handler.ts        # Utopia fluid typography processing
│   │   ├── platforms/                   # Output format platforms
│   │   │   ├── index.ts                 # Platform registry and management
│   │   │   ├── formats.ts               # Platform format definitions
│   │   │   ├── css/                     # CSS platform implementation
│   │   │   │   ├── index.ts             # CSS platform entry point
│   │   │   │   ├── formats.ts           # CSS-specific format definitions
│   │   │   │   └── utils.ts             # CSS platform utilities
│   │   │   ├── js/                      # JavaScript platform implementation
│   │   │   │   ├── index.ts             # JS platform entry point
│   │   │   │   ├── formats.ts           # JS-specific format definitions
│   │   │   │   └── utils.ts             # JS platform utilities
│   │   │   ├── scss/                    # SCSS platform implementation
│   │   │   │   ├── index.ts             # SCSS platform entry point
│   │   │   │   ├── formats.ts           # SCSS-specific format definitions
│   │   │   │   └── utils.ts             # SCSS platform utilities
│   │   │   └── json/                    # JSON platform implementation
│   │   │       └── index.ts             # JSON platform entry point
│   │   ├── types/                       # Tokens-specific type definitions
│   │   │   ├── tokens.types.ts          # Core tokens type definitions
│   │   │   ├── platform.types.ts        # Platform-related types
│   │   │   ├── format.types.ts          # Format-related types
│   │   │   ├── color-scheme.types.ts    # Color scheme types
│   │   │   └── utopia-scheme.types.ts   # Utopia scheme types
│   │   └── utils/                       # Tokens-specific utilities
│   │       ├── formats.utils.ts         # Format processing utilities
│   │       ├── color-tokens.utils.ts    # Color token utilities
│   │       └── utopia-tokens.utils.ts   # Utopia token utilities
│   ├── viewport-scaler/                 # Viewport scaler generator
│   │   ├── viewport-scaler.generator.ts # Main viewport scaler logic
│   │   └── viewport-scaler.types.ts     # Viewport scaler parameter types
│   ├── scrollbar/                       # Scrollbar styling generator
│   │   ├── scrollbar.generator.ts       # Main scrollbar generation logic
│   │   └── scrollbar.types.ts           # Scrollbar parameter types
│   ├── font-faces/                      # Font faces generator
│   │   ├── font-faces.generator.ts      # Main font faces generation logic
│   │   └── font-faces.types.ts          # Font faces parameter types
│   ├── icons/                           # Icons generator
│   │   ├── icons.generator.ts           # Main icons generation logic
│   │   └── icons.types.ts               # Icons parameter types
│   └── favicons/                        # Favicons generator
│       ├── favicons.generator.ts        # Main favicons generation logic
│       └── favicons.types.ts            # Favicons parameter types
├── types/                               # Global type definitions
│   ├── index.ts                         # Exports all types
│   ├── generator.types.ts               # Base generator type definitions
│   └── utils.types.ts                   # Utility type definitions
└── utils/                               # Global utility functions
    ├── generators.utils.ts              # Generator-related utilities
    ├── formats.utils.ts                 # Format processing utilities
    └── strings.utils.ts                 # String manipulation utilities
```

### Source Architecture

The **mDEV** module follows a well-structured, modular architecture that separates concerns and promotes maintainability. The architecture is built around the concept of **Generators** - specialized functions that produce specific outputs based on design system principles.

#### Core Architecture Components

**Generator Function Type (`GeneratorFn<T, Response>`)**
`src/types/generator.types.ts`

- **Purpose**: Defines the standard interface for all generators
- **Signature**: `(params: T) => Promise<Response>`
- **Default Response**: `StyleDictionary` object (most common return type)
- **Role**: Ensures consistency across all generators and provides type safety

**Utility Types**
`src/types/utils.types.ts`

- **`Kebab<T>`**: Converts camelCase strings to kebab-case (e.g., `fontFamily` → `font-family`)
- **`EnforceRequired<T, K>`**: Utility type that enforces required properties on a type

#### Individual Generators

##### I. TOKENS GENERATOR `src/generators/tokens/`

This generator is the most complex component, implementing a sophisticated multi-platform design tokens system.

**Token Types**
`src/generators/tokens/types/tokens.types.ts`

- `enum CoreToken`: Defines the fundamental token categories that the system recognizes:
  - _Typography_: `fontFamily`, `fontSize`, `fontWeight`, `letterSpacing`, `lineHeight`
  - _Color_: `color` (with special color scheme logic)
  - _Size_: `size` (with Utopia fluid typography support)
  - _Border_: `borderColor`, `borderRadius`, `borderStyle`, `borderWidth`
  - _Effects_: `boxShadow`
  - _Layout_: `breakpoint`, `dimensions`
  - _Visual_: `opacity`, `transition`
- `type CoreTokenCamelValues`: camelCase representation of core tokens
- `type CoreTokenKebabValues`: kebab-case representation for CSS custom properties
- `type TokensDesignData`: Contains design context (baseFontSize, colorScheme, utopiaScheme)

**Platform System Types**
`src/generators/tokens/types/platform.types.ts`

- Platform Type _(Defines supported output formats)_:
  - `CSS`: CSS custom properties format
  - `SCSS`: SCSS variables format
  - `JS`: JavaScript objects format
  - `JSON`: JSON structure format

- Platform Context _(Defines platform configuration)_:
  - `config`: Style Dictionary platform configuration
  - `allTokensFile`: Whether to generate a single file with all tokens
  - `tokenTypeFiles`: Whether to generate separate files for each token type
  - `customFiles`: Additional custom file names

- File Type System:
  - `CommonPlatformFileType`: Shared file types for CSS/SCSS (`ALL`, `CORE`, `OTHERS`)
  - `JsCustomPlatformFileType`: JS-specific file types (`STATIC`, `VARIABLE`)
  - `PlatformFilename`: Union type of all possible output file names

**Format System**
`src/generators/tokens/types/format.types.ts`

- Custom Formatter Categories:
  - `CustomFormatterCategory`: CSS, SCSS, JS formatter categories
  - `CustomFormatterType`: Specific formatter types for each category

- Handler System:
  - `HandlerResolver`: Function type for token processing handlers
  - `CoreTokensHandlerResolvers`: Record mapping core tokens to their handlers
  - `CommonHandlerParams`: Shared parameters for all handlers

- Output Configuration:
  - `OutputConfig`: Controls output formatting _(noChapterTitle, prefix)_
  - `WrapperParams`: Parameters for code block wrapping
  - `DefinerParams`: Parameters for code block content definition

**Token Processing Handlers**
`src/generators/tokens/handlers/`

- `basic.handler.ts`
  - **Purpose**: Processes standard tokens without special logic
  - **Functionality**:
    - Renders tokens in the appropriate format for each platform
    - Handles "Other" tokens by grouping them by type
    - Applies different formatting for CSS vs JS/SCSS platforms
  - **Dependencies**: Uses `getFileOutput` utility and string formatting functions

- `color.handler.ts`
  - **Purpose**: Processes color tokens with color scheme support
  - **Functionality**:
    - Supports multiple color scheme methods: `media`, `class`, `combined`
    - Generates CSS media queries for `prefers-color-scheme`
    - Creates CSS classes for manual color scheme switching
    - Handles different output formats (CSS, SCSS, JS)
  - **Dependencies**: Uses `getColorScheme` utility for color scheme processing

- `utopia.handler.ts`
  - **Purpose**: Processes fluid typography tokens using Utopia methodology
  - **Functionality**:
    - Separates Utopia tokens from basic tokens
    - Generates three responsive variants: Min, Utopia (fluid), Max
    - Creates CSS media queries for responsive breakpoints
    - Maps token values to different viewport ranges
  - **Dependencies**: Uses Utopia utilities for token value mapping and separation

**Platform Implementation System**
`src/generators/tokens/platforms/`

Platform Registry (`index.ts`)

- **Purpose**: Central registry for all platform configurations
- **Functionality**:
  - Dynamically imports platform context getters
  - Generates Style Dictionary platform configurations
  - Creates file definitions based on platform context
  - Handles formatter assignment and filtering

Platform-Specific Implementations
_Each platform (except for JSON) contains:_

- `index.ts`: Platform context getter function
- `formats.ts`: Platform-specific format definitions
- `utils.ts`: Platform-specific utility functions

Platforms

- CSS:
  - Generates CSS custom properties
  - Supports media queries and color schemes
  - Creates responsive typography with Utopia

- JS:
  - Generates JavaScript objects
  - Supports both static values and CSS custom property references
  - Creates modular exports for each token type

- SCSS:
  - Generates SCSS variables
  - Supports nested color schemes
  - Creates mixins and functions

- JSON:
  - Generates JSON structure
  - Provides raw token data
  - Supports external tool integration

**Utility Systems**
`src/generators/tokens/utils/`

- `formats.utils.ts`
  - **Purpose**: Handles file output generation and formatting
  - **Key Functions**:
    - `getFileOutput`: Main file generation orchestrator
    - `getCategoryFormatterName`: Generates formatter names
    - `getDestinationFileName`: Generates output file names

- `color-tokens.utils.ts`
  - **Purpose**: Processes color scheme logic
  - **Key Functions**:
    - `getColorScheme`: Organizes tokens by color scheme
    - Color value transformations and validations

- `utopia-tokens.utils.ts`
  - **Purpose**: Handles fluid typography calculations
  - **Key Functions**:
    - `mapUtopiaTokenValuesToMin/Max/Responsive`: Maps tokens to viewport ranges
    - `separateUtopiaAndBasicTokens`: Separates fluid from static tokens

---

##### II. VIEWPORT SCALER GENERATOR `src/generators/viewport-scaler/`

This generator implements the Viewport Scale philosophy by creating dynamic root font size CSS that scales the entire layout proportionally.

**Core Functionality**:

- **Dynamic Root Font Size**: Sets `--ds-root-font-size` CSS custom property
- **Responsive Scaling**: Applies scaling below `minViewportW` and above `maxViewportW` (in presentation mode)
- **Mathematical Scaling**: Uses `calc((baseFontSize * 100vw) / viewportWidth)` formula
- **Presentation Mode**: Special class for continuous scaling above max viewport

**Implementation Details**:

`viewportScalerGenerator(params)`

- **Called by**: Master generator or directly by user
- **Purpose**: Main generator function that implements the Viewport Scale philosophy by creating dynamic root font size CSS
- **Process**:
  1. Receives viewport scaler configuration parameters (`minViewportW`, `maxViewportW`, `baseFontSize`, `prefix`)
  2. Uses `cssGenerator()` utility to handle the CSS generation process
  3. Extracts required parameters and creates prefix string (e.g., `'ds-'` if prefix is `'ds'`)
  4. Defines three viewport range variants as an array of objects:
     - **Below min breakpoint** (`max-width: ${minViewportW - 1}px`):
       - Uses fluid scaling formula: `calc((${baseFontSize} * 100vw) / ${minViewportW})`
       - Scales proportionally from 0 to min viewport width
     - **Normal range** (`min-width: ${minViewportW}px and max-width: ${maxViewportW}px`):
       - Uses fixed base font size: `var(--${prefix}font-size-base-percentage)`
       - Maintains consistent sizing in the design system’s intended range
     - **Above max breakpoint** (`min-width: ${maxViewportW + 1}px`):
       - Default: Fixed base font size (same as normal range)
       - Presentation mode: Fluid scaling formula: `calc((${baseFontSize} * 100vw) / ${maxViewportW})`
       - Allows continuous scaling above max viewport when presentation mode is active
  5. Iterates through each variant using `forEach()`:
     - Generates CSS media query: `@media all and ${media} {`
     - For each wrapper in the variant:
       - Uses `cssSelectorBlock()` to format CSS selectors (`:root` or `html.presentation-mode`)
       - Adds proper indentation using `tab()` function
       - Handles spacing between multiple wrappers in the same media query
     - Closes media query with `}`
  6. Joins all CSS output into a single string with proper formatting
- **Returns**: Complete CSS string with responsive root font size definitions for all viewport ranges

**Parameters**
`viewport-scaler.types.ts`:

- `prefix`: CSS custom property prefix (default: 'ds')
- `baseFontSize`: Base font size for calculations (default: 10)
- `minViewportW`: Minimum viewport width for scaling (default: 300)
- `maxViewportW`: Maximum viewport width for scaling (default: 2100)
- `buildPath`: Output directory path

---

##### III. SCROLLBAR GENERATOR `src/generators/scrollbar/`

This generator creates sophisticated custom scrollbar styling that treats scrollbars as first-class UI elements.

**Core Functionality**:

- **WebKit Scrollbar Styling**: Comprehensive `::-webkit-scrollbar` selectors
- **Context-Aware Design**: Blends seamlessly with overall design system
- **Interactive States**: Hover and active states for thumb elements
- **Cross-Platform**: Excludes macOS (uses native scrollbars)
- **Mathematical Precision**: Calculated gap sizes and proportions

**Implementation Details**:

`scrollbarGenerator(params)`

- **Called by**: Master generator or directly by user
- **Purpose**: Main generator function that creates comprehensive custom scrollbar styling CSS
- **Process**:
  1. Receives scrollbar configuration parameters (colors, sizes, etc.)
  2. Uses `cssGenerator()` utility to handle the CSS generation process
  3. Creates a single CSS selector block for `html:not(.isMacOs)` to exclude macOS
  4. Generates CSS custom properties for all scrollbar dimensions and colors:
     - `--scrollbar-area`: Overall scrollbar width/height
     - `--scrollbar-thumb-size-base/over`: Thumb sizes for different states
     - `--scrollbar-gap-size-base/over`: Calculated gap sizes using CSS calc()
     - `--scrollbar-background`: Track background color
     - `--scrollbar-thumb-color*`: Thumb colors for different states
     - `--scrollbar-thumb-min-size`: Minimum thumb size
  5. Generates comprehensive `::-webkit-scrollbar` selectors:
     - **Area selectors**: `::-webkit-scrollbar:vertical/horizontal` for dimensions
     - **Base selector**: `::-webkit-scrollbar` for background and scroll-margin
     - **Track selector**: `::-webkit-scrollbar-track-piece` with transparent styling
     - **Thumb selectors**: `::-webkit-scrollbar-thumb` with hover/active states
     - **Cursor selectors**: Appropriate cursor types (ns-resize, ew-resize, default)
     - **Button selector**: `::-webkit-scrollbar-button` hidden by default
  6. Implements interactive states with hover and active pseudo-classes
  7. Uses `background-clip: padding-box` for proper visual appearance
  8. Joins all CSS into a single string with proper formatting
- **Returns**: Complete CSS string with comprehensive scrollbar styling system

**Parameters:**
`scrollbar.types.ts`

- `areaWidth`: Overall scrollbar width/height (default: 16px)
- `thumbSizeBase`: Base thumb size (default: 4px)
- `thumbSizeOver`: Hover/active thumb size (default: 10px)
- `thumbMinSize`: Minimum thumb size (default: 80px)
- `scrollbarBackground`: Track background color
- `thumbColor`: Base thumb color
- `thumbColorHover`: Hover state color
- `thumbColorActive`: Active state color
- `buildPath`: Output directory path

---

##### IV. FONT FACES GENERATOR `src/generators/font-faces/`

This generator automatically scans font directories and generates comprehensive `@font-face` declarations for self-hosted fonts.

**Core Functionality**:

- **Directory Scanning**: Automatically discovers available font files
- **Font Weight Mapping**: Maps font files to CSS font-weight values
- **Style Detection**: Automatically detects italic and regular styles
- **WOFF2 Support**: Works exclusively with WOFF2 format for optimal performance
- **Error Handling**: Graceful handling of missing directories or files

**Implementation Details**:

`getTypefaces(dir: string)`

- **Called by**: `getFontFaces()` function
- **Purpose**: Scans the fonts directory and discovers all available font families and their files
- **Process**:
  1. Reads all subdirectories in the fonts folder using `fs.readdirSync()`
  2. For each subdirectory (font family), reads all `.woff2` files
  3. Parses each filename to extract the weight/style information
  4. Handles naming patterns like "Helvetica-Regular.woff2" or "Helvetica-Bold.woff2"
  5. Groups files by weight, separating italic variants
  6. Returns an array of typefaces with their weights and file lists
- **Returns**: Array of `{ name: string; weights: Record<string, string[]> }[]`

`getFontFaces({ fonts, sourcePath })`

- **Called by**: `fontFacesGenerator()` function
- **Purpose**: Processes the discovered typefaces and creates FontFace objects for CSS generation
- **Process**:
  1. Calls `getTypefaces(sourcePath)` to discover available fonts
  2. For each typeface, checks if there’s a predefined weight mapping in the `fonts` config
  3. If no mapping exists and multiple weights are detected, skips the typeface (can’t determine weights)
  4. Sorts weights by their numeric values if mapping exists
  5. Filters files to ensure only `.woff2` files are processed
  6. Creates FontFace objects with:
     - `font-family`: Typeface name
     - `font-style`: 'normal' or 'italic' (detected from filename)
     - `font-weight`: Numeric weight from mapping or default 400
     - `src`: Relative path to font file with format specification
- **Returns**: Array of `FontFace[]` objects ready for CSS generation

`fontFacesGenerator(params)`

- **Called by**: Master generator or directly by user
- **Purpose**: Main generator function that orchestrates the entire font face generation process
- **Process**:
  1. Receives parameters including `fonts` mapping and `sourcePath`
  2. Calls `getFontFaces(config)` to get all FontFace objects
  3. Iterates through each FontFace object
  4. For each FontFace, generates a CSS `@font-face` declaration using `cssSelectorBlock()`
  5. Formats each property (font-family, font-style, font-weight, src) with proper indentation
  6. Joins all declarations into a single CSS string
- **Returns**: Complete CSS string with all `@font-face` declarations

**Parameters:**
`font-faces.types.ts`

- `sourcePath`: Path to fonts directory (required)
- `fonts`: Font weight mapping configuration
- `buildPath`: Output directory path

---

##### V. ICONS GENERATOR `src/generators/icons/`

This generator creates a complete icon system using CSS selectors and icon fonts with precise glyph targeting.

**Core Functionality**:

- **Icon Font Integration**: Works with any icon font (Iconography, DevIcons, etc.)
- **CSS Selector System**: Uses `data-i` attribute for icon targeting
- **Pseudo-Element Rendering**: `::after` pseudo-elements for glyph display
- **Unicode Mapping**: Maps icon names to unicode values
- **Responsive Design**: Scalable icons using em units

**Implementation Details**:

`iconsGenerator(params)`

- **Called by**: Master generator or directly by user
- **Purpose**: Main generator function that creates a complete CSS icon system using attribute selectors and pseudo-elements
- **Process**:
  1. Receives icon configuration parameters (`fontFamily`, `color`, `list`)
  2. Uses `cssGenerator()` utility to handle the CSS generation process
  3. Defines the attribute name as `'data-i'` for icon targeting
  4. Generates base icon styles using `[data-i]` selector:
     - Creates CSS object with common icon properties (display, width, height, color, font-family, etc.)
     - Converts object to CSS properties using `Object.entries()` and `map()`
     - Formats each property with proper indentation using `tab()`
     - Joins properties with newlines
  5. Generates pseudo-element styles using `[data-i]::after` selector:
     - Creates CSS object for `::after` pseudo-element properties
     - Sets `font-size: 1.25em` and `line-height: 0.6em` for proper glyph rendering
     - Formats and joins properties similar to base styles
  6. Iterates through the icon list (`Object.entries(list)`):
     - For each icon name and unicode code pair
     - Generates specific icon selector `[data-i="iconName"]::after`
     - Sets the `content` property with escaped unicode value (`"\\${code}"`)
     - Each icon gets its own CSS rule for precise targeting
  7. Joins all CSS rules into a single string with proper formatting
- **Returns**: Complete CSS string with comprehensive icon system including base styles, pseudo-elements, and individual icon definitions

**Parameters:**
`icons.types.ts`

- `fontFamily`: Icon font family name (default: 'Iconography')
- `color`: Icon color (default: 'currentColor')
- `list`: Icon name to unicode mapping (required)
- `buildPath`: Output directory path

---

##### VI. FAVICONS GENERATOR `src/generators/favicons/`

This generator leverages the `favicons` npm package to create comprehensive favicon and PWA assets for all platforms and devices.

**Core Functionality**:

- **Multi-Platform Support**: iOS, Android, Windows, macOS, Linux
- **PWA Assets**: Web app manifest and startup screens
- **Responsive Icons**: Various sizes for different devices
- **Maskable Icons**: Android adaptive icons
- **Startup Screens**: iOS splash screens for all device sizes

**Implementation Details**:

`faviconsGenerator(params)`

- **Called by**: Master generator or directly by user
- **Purpose**: Main generator function that leverages the `favicons` npm package to create comprehensive favicon and PWA assets
- **Process**:
  1. Receives favicon configuration parameters (`id`, `sourcePath`, and other favicon options)
  2. Merges default parameters with provided parameters using spread operator
  3. Sets `manifestMaskable` to `sourcePath` if not provided (uses same image for maskable icons)
  4. Resolves the build path using `path.resolve()` for absolute path
  5. Creates the output directory if it doesn’t exist using `fs.mkdir()` with `recursive: true`
  6. Calls the `favicons()` function from the favicons package with `sourcePath` and `config`
  7. Uses `Promise.all()` to handle concurrent file writing operations:
     - **Image files**: Maps through `faviconsResult.images` array
       - For each image, writes the file using `fs.writeFile()`
       - Uses `path.join()` to create proper file paths
     - **Manifest and other files**: Maps through `faviconsResult.files` array
       - For each file, prepares the content
       - **Special handling for manifest.webmanifest**:
         - Parses the JSON manifest using `JSON.parse()`
         - Adds custom `id` property to the manifest
         - Adds `developer_name` and `developer_url` from config
         - Updates icon paths by removing leading slash from `src` properties
         - Stringifies the updated manifest with proper formatting
       - Writes the file using `fs.writeFile()`
  8. Logs success information with file counts
  9. Returns the complete `FaviconResponse` object from the favicons package
- **Returns**: `FaviconResponse` object containing all generated assets and metadata

**Generated Assets**:

- **Traditional Favicons**: `.ico`, `.png` files in various sizes
- **Apple Touch Icons**: iOS home screen and app icons
- **Android Chrome Icons**: Android browser and app icons
- **Microsoft Tiles**: Windows tile icons
- **Startup Screens**: iOS splash screens for all orientations
- **PWA Manifest**: Web app manifest with proper configuration
- **Browser Configs**: Platform-specific configuration files

**Parameters:**
`favicons.types.ts`

- **`id`**: Unique identifier for the web app (required)
- **`sourcePath`**: Path to source image (required)
- **`buildPath`**: Output directory path
- **`appName`**: Full application name (required)
- **`appShortName`**: Short application name (required)
- **`appDescription`**: Application description (required)
- **`version`**: Application version (required)
- **Additional Options**: All favicons package options supported

---

#### Generator Orchestration

##### MASTER GENERATOR `src/generators/master/master.generator.ts`

- **Purpose**: Orchestrates all individual generators
- **Functionality**:
  - Accepts configuration for all generators
  - Executes generators selectively based on configuration
  - Manages build paths and shared parameters
  - Provides unified interface for the entire system

**Individual Generators**:
Each generator follows the same pattern:

- **`*.generator.ts`**: Main generation logic
- **`*.types.ts`**: Generator-specific parameter types
- **Dependencies**: Use shared utilities and types

#### Dependencies and Data Flow

**1. Type Dependencies**:

```text
All generators → generator.types.ts
Tokens generator → utils.types.ts (Kebab type)
Platform types, format types → tokens.types.ts
Format types → platform.types.ts
Handler implementations → format.types.ts
```

**2. Handler Dependencies**:

```text
basic.handler.ts → formats.utils.ts, strings.utils.ts
color.handler.ts → color-tokens.utils.ts, formats.utils.ts
utopia.handler.ts → utopia-tokens.utils.ts, formats.utils.ts
```

**3. Platform Dependencies**:

```text
platforms/index.ts → All platform implementations
platforms/*/index.ts → formats.utils.ts, strings.utils.ts
platforms/*/formats.ts → format.types.ts
platforms/*/utils.ts → Platform-specific utilities
```

**4. Generator Dependencies**:

```text
tokens.generator.ts → platforms/index.ts, platforms/formats.ts
master.generator.ts → All individual generators
All generators → defaults.ts, types/index.ts
```

**5. Utility Dependencies**:

```text
formats.utils.ts → strings.utils.ts
color-tokens.utils.ts → strings.utils.ts
utopia-tokens.utils.ts → strings.utils.ts
generators.utils.ts → strings.utils.ts
```

This architecture ensures:

- **Modularity**: Each component has a single responsibility
- **Extensibility**: New platforms and token types can be easily added
- **Type Safety**: Comprehensive TypeScript types prevent runtime errors
- **Maintainability**: Clear separation of concerns and dependencies
- **Performance**: Efficient token processing and file generation

## 📋 Output Examples

### Output File Structure

The following represents the complete file structure of the `dist` directory that can be generated by the **mDEV** module:

```text
dist/
├── css/
│   ├── font-faces.css
│   ├── icons.css
│   ├── scrollbar.css
│   └── viewport-scaler.css
├── tokens/
│   ├── css/
│   │   ├── all.css
│   │   ├── border-color.css
│   │   ├── border-radius.css
│   │   ├── border-style.css
│   │   ├── border-width.css
│   │   ├── box-shadow.css
│   │   ├── breakpoint.css
│   │   ├── color.css
│   │   ├── dimensions.css
│   │   ├── font-family.css
│   │   ├── font-size.css
│   │   ├── font-weight.css
│   │   ├── letter-spacing.css
│   │   ├── line-height.css
│   │   ├── opacity.css
│   │   └── size.css
│   ├── js/
│   │   ├── static.js
│   │   └── variable.js
│   ├── scss/
│   │   ├── all.scss
│   │   ├── border-color.scss
│   │   ├── border-radius.scss
│   │   ├── border-style.scss
│   │   ├── border-width.scss
│   │   ├── box-shadow.scss
│   │   ├── breakpoint.scss
│   │   ├── color.scss
│   │   ├── dimensions.scss
│   │   ├── font-family.scss
│   │   ├── font-size.scss
│   │   ├── font-weight.scss
│   │   ├── letter-spacing.scss
│   │   ├── line-height.scss
│   │   ├── opacity.scss
│   │   └── size.scss
│   └── json/
│       └── all.json
└── favicons/
    ├── android-chrome-36x36.png
    ├── android-chrome-48x48.png
    ├── android-chrome-72x72.png
    ├── android-chrome-96x96.png
    ├── android-chrome-144x144.png
    ├── android-chrome-192x192.png
    ├── android-chrome-256x256.png
    ├── android-chrome-384x384.png
    ├── android-chrome-512x512.png
    ├── android-chrome-maskable-36x36.png
    ├── android-chrome-maskable-48x48.png
    ├── android-chrome-maskable-72x72.png
    ├── android-chrome-maskable-96x96.png
    ├── android-chrome-maskable-144x144.png
    ├── android-chrome-maskable-192x192.png
    ├── android-chrome-maskable-256x256.png
    ├── android-chrome-maskable-384x384.png
    ├── android-chrome-maskable-512x512.png
    ├── apple-touch-icon.png
    ├── apple-touch-icon-57x57.png
    ├── apple-touch-icon-60x60.png
    ├── apple-touch-icon-72x72.png
    ├── apple-touch-icon-76x76.png
    ├── apple-touch-icon-114x114.png
    ├── apple-touch-icon-120x120.png
    ├── apple-touch-icon-144x144.png
    ├── apple-touch-icon-152x152.png
    ├── apple-touch-icon-167x167.png
    ├── apple-touch-icon-180x180.png
    ├── apple-touch-icon-1024x1024.png
    ├── apple-touch-icon-precomposed.png
    ├── apple-touch-startup-image-640x1136.png
    ├── apple-touch-startup-image-750x1334.png
    ├── apple-touch-startup-image-828x1792.png
    ├── apple-touch-startup-image-1125x2436.png
    ├── apple-touch-startup-image-1136x640.png
    ├── apple-touch-startup-image-1170x2532.png
    ├── apple-touch-startup-image-1179x2556.png
    ├── apple-touch-startup-image-1242x2208.png
    ├── apple-touch-startup-image-1242x2688.png
    ├── apple-touch-startup-image-1284x2778.png
    ├── apple-touch-startup-image-1290x2796.png
    ├── apple-touch-startup-image-1334x750.png
    ├── apple-touch-startup-image-1488x2266.png
    ├── apple-touch-startup-image-1536x2048.png
    ├── apple-touch-startup-image-1620x2160.png
    ├── apple-touch-startup-image-1640x2160.png
    ├── apple-touch-startup-image-1668x2224.png
    ├── apple-touch-startup-image-1668x2388.png
    ├── apple-touch-startup-image-1792x828.png
    ├── apple-touch-startup-image-2048x1536.png
    ├── apple-touch-startup-image-2048x2732.png
    ├── apple-touch-startup-image-2160x1620.png
    ├── apple-touch-startup-image-2160x1640.png
    ├── apple-touch-startup-image-2208x1242.png
    ├── apple-touch-startup-image-2224x1668.png
    ├── apple-touch-startup-image-2266x1488.png
    ├── apple-touch-startup-image-2388x1668.png
    ├── apple-touch-startup-image-2436x1125.png
    ├── apple-touch-startup-image-2532x1170.png
    ├── apple-touch-startup-image-2556x1179.png
    ├── apple-touch-startup-image-2688x1242.png
    ├── apple-touch-startup-image-2732x2048.png
    ├── apple-touch-startup-image-2778x1284.png
    ├── apple-touch-startup-image-2796x1290.png
    ├── favicon.ico
    ├── favicon-16x16.png
    ├── favicon-32x32.png
    ├── favicon-48x48.png
    ├── mstile-70x70.png
    ├── mstile-144x144.png
    ├── mstile-150x150.png
    ├── mstile-310x150.png
    ├── mstile-310x310.png
    ├── yandex-browser-50x50.png
    ├── yandex-browser-manifest.json
    ├── browserconfig.xml
    └── manifest.webmanifest
```

### Output Files Content

The following examples illustrate what the outputs produced by the available generators look like.

#### Design Tokens Output Example

Details on how such an output can be generated are provided in the [Design Tokens Feature](#design-tokens-feature) section.

##### CSS CUSTOM PROPERTIES OUTPUT

```css
/* =================================================== */
/* CSS TOKENS */
/* =================================================== */

/* FONT FAMILY */

:root {
  --ds-font-family-sans: Helvetica, system-ui, sans-serif;
  --ds-font-family-monospace: ui-monospace, monospace;
  --ds-font-family-icon: Iconography;
}

/* FONT SIZE */

@media all and (max-width: 599px) {
  :root {
    --ds-font-size-display: 32px;
    --ds-font-size-head: 24px;
    --ds-font-size-title: 20px;
    --ds-font-size-subtitle: 16px;
    --ds-font-size-body: 14px;
  }
}

@media all and (min-width: 600px) and (max-width: 1200px) {
  :root {
    --ds-font-size-display: calc(2.4rem + 1.33333vw);
    --ds-font-size-head: calc(1.6rem + 1.33333vw);
    --ds-font-size-title: calc(1.6rem + 0.66667vw);
    --ds-font-size-subtitle: calc(1.2rem + 0.66667vw);
    --ds-font-size-body: calc(1rem + 0.66667vw);
  }
}

@media all and (min-width: 1201px) {
  :root {
    --ds-font-size-display: 40px;
    --ds-font-size-head: 32px;
    --ds-font-size-title: 24px;
    --ds-font-size-subtitle: 20px;
    --ds-font-size-body: 18px;
  }
}

:root {
  --ds-font-size-base: 10px;
  --ds-font-size-base-percentage: 62.5%;
}

/* FONT WEIGHT */

:root {
  --ds-font-weight-helvetica-regular: 400;
  --ds-font-weight-helvetica-bold: 700;
}

/* LETTER SPACING */

:root {
  --ds-letter-spacing-base: 0;
  --ds-letter-spacing-bit: 0.08em;
}

/* LINE HEIGHT */

:root {
  --ds-line-height-none: 0;
  --ds-line-height-100: 1;
  --ds-line-height-120: 1.2;
  --ds-line-height-140: 1.4;
}
```

---

##### JS OBJECTS OUTPUT

```js
/* =================================================== */
/* JS TOKENS (VARIABLE) */
/* =================================================== */

/* FONT FAMILY */

export const fontFamily = {
  sans: 'var(--ds-font-family-sans)',
  monospace: 'var(--ds-font-family-monospace)',
  icon: 'var(--ds-font-family-icon)'
};

/* FONT SIZE */

export const fontSize = {
  base: 'var(--ds-font-size-base)',
  'base-percentage': 'var(--ds-font-size-base-percentage)',
  display: 'var(--ds-font-size-display)',
  head: 'var(--ds-font-size-head)',
  title: 'var(--ds-font-size-title)',
  subtitle: 'var(--ds-font-size-subtitle)',
  body: 'var(--ds-font-size-body)'
};

/* FONT WEIGHT */

export const fontWeight = {
  'helvetica-regular': 'var(--ds-font-weight-helvetica-regular)',
  'helvetica-bold': 'var(--ds-font-weight-helvetica-bold)'
};

/* LETTER SPACING */

export const letterSpacing = {
  base: 'var(--ds-letter-spacing-base)',
  bit: 'var(--ds-letter-spacing-bit)'
};

/* LINE HEIGHT */

export const lineHeight = {
  none: 'var(--ds-line-height-none)',
  100: 'var(--ds-line-height-100)',
  120: 'var(--ds-line-height-120)',
  140: 'var(--ds-line-height-140)'
};
```

#### Viewport Scaler Output Example

Details on how such an output can be generated are provided in the [Viewport Scaler Feature](#viewport-scaler-feature) section.

```css
/* =================================================== */
/* VIEWPORT SCALER */
/* =================================================== */

@media all and (max-width: 299px) {
  :root {
    --ds-root-font-size: calc((10 * 100vw) / 300);
  }
}

@media all and (min-width: 300px) and (max-width: 2100px) {
  :root {
    --ds-root-font-size: var(--ds-font-size-base-percentage);
  }
}

@media all and (min-width: 2101px) {
  :root {
    --ds-root-font-size: var(--ds-font-size-base-percentage);
  }

  html.presentation-mode {
    --ds-root-font-size: calc((10 * 100vw) / 2100);
  }
}
```

#### Scrollbar Output Example

Details on how such an output can be generated are provided in the [Scrollbar Feature](#scrollbar-feature) section.

```css
/* =================================================== */
/* SCROLLBAR */
/* =================================================== */

html:not(.isMacOs) {
  --scrollbar-area: 16px;
  --scrollbar-thumb-size-base: 4px;
  --scrollbar-thumb-size-over: 10px;
  --scrollbar-gap-size-base: calc(
    (var(--scrollbar-area) - var(--scrollbar-thumb-size-base)) / 2
  ); /* 6px */
  --scrollbar-gap-size-over: calc(
    (var(--scrollbar-area) - var(--scrollbar-thumb-size-over)) / 2
  ); /* 3px */
  --scrollbar-background: transparent;
  --scrollbar-thumb-color: var(--ds-color-content-gray-weak);
  --scrollbar-thumb-color-hover: var(--ds-color-content-gray-weak);
  --scrollbar-thumb-color-active: var(--ds-color-content-gray-medium);
  --scrollbar-thumb-min-size: 80px;

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
  }
}
```

#### Font Faces Output Example

Details on how such an output can be generated are provided in the [Font Faces Feature](#font-faces-feature) section.

```css
/* =================================================== */
/* FONT FACES */
/* =================================================== */

@font-face {
  font-family: Iconography;
  font-style: normal;
  font-weight: 400;
  src: url('fonts/Iconography/Iconography-Regular.woff2') format('woff2');
}

@font-face {
  font-family: Helvetica;
  font-style: normal;
  font-weight: 400;
  src: url('fonts/Helvetica/Helvetica-Regular.woff2') format('woff2');
}

@font-face {
  font-family: Helvetica;
  font-style: italic;
  font-weight: 400;
  src: url('fonts/Helvetica/Helvetica-Italic.woff2') format('woff2');
}

@font-face {
  font-family: Helvetica;
  font-style: normal;
  font-weight: 700;
  src: url('fonts/Helvetica/Helvetica-Bold.woff2') format('woff2');
}

@font-face {
  font-family: Helvetica;
  font-style: italic;
  font-weight: 700;
  src: url('fonts/Helvetica/Helvetica-BoldItalic.woff2') format('woff2');
}
```

#### Icons Output Example

Details on how such an output can be generated are provided in the [Icons Feature](#icons-feature) section.

```css
/* =================================================== */
/* ICONS */
/* =================================================== */

[data-i] {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: var(--ds-color-content-gray-weak);
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

[data-i='main']::after {
  content: '\E000';
}

[data-i='nav']::after {
  content: '\E001';
}

[data-i='search']::after {
  content: '\E002';
}

[data-i='profile']::after {
  content: '\E003';
}

[data-i='play']::after {
  content: '\E004';
}

[data-i='publication']::after {
  content: '\E005';
}

[data-i='close']::after {
  content: '\E006';
}

[data-i='clear']::after {
  content: '\E007';
}
```

#### Favicons Output Example

Details on how such an output can be generated are provided in the [Favicons Feature](#favicons-feature) section.

```text
favicons/
├── android-chrome-36x36.png
├── android-chrome-48x48.png
├── android-chrome-72x72.png
├── android-chrome-96x96.png
├── android-chrome-144x144.png
├── android-chrome-192x192.png
├── android-chrome-256x256.png
├── android-chrome-384x384.png
├── android-chrome-512x512.png
├── android-chrome-maskable-36x36.png
├── android-chrome-maskable-48x48.png
├── android-chrome-maskable-72x72.png
├── android-chrome-maskable-96x96.png
├── android-chrome-maskable-144x144.png
├── android-chrome-maskable-192x192.png
├── android-chrome-maskable-256x256.png
├── android-chrome-maskable-384x384.png
├── android-chrome-maskable-512x512.png
├── apple-touch-icon.png
├── apple-touch-icon-57x57.png
├── apple-touch-icon-60x60.png
├── apple-touch-icon-72x72.png
├── apple-touch-icon-76x76.png
├── apple-touch-icon-114x114.png
├── apple-touch-icon-120x120.png
├── apple-touch-icon-144x144.png
├── apple-touch-icon-152x152.png
├── apple-touch-icon-167x167.png
├── apple-touch-icon-180x180.png
├── apple-touch-icon-1024x1024.png
├── apple-touch-icon-precomposed.png
├── apple-touch-startup-image-640x1136.png
├── apple-touch-startup-image-750x1334.png
├── apple-touch-startup-image-828x1792.png
├── apple-touch-startup-image-1125x2436.png
├── apple-touch-startup-image-1136x640.png
├── apple-touch-startup-image-1170x2532.png
├── apple-touch-startup-image-1179x2556.png
├── apple-touch-startup-image-1242x2208.png
├── apple-touch-startup-image-1242x2688.png
├── apple-touch-startup-image-1284x2778.png
├── apple-touch-startup-image-1290x2796.png
├── apple-touch-startup-image-1334x750.png
├── apple-touch-startup-image-1488x2266.png
├── apple-touch-startup-image-1536x2048.png
├── apple-touch-startup-image-1620x2160.png
├── apple-touch-startup-image-1640x2160.png
├── apple-touch-startup-image-1668x2224.png
├── apple-touch-startup-image-1668x2388.png
├── apple-touch-startup-image-1792x828.png
├── apple-touch-startup-image-2048x1536.png
├── apple-touch-startup-image-2048x2732.png
├── apple-touch-startup-image-2160x1620.png
├── apple-touch-startup-image-2160x1640.png
├── apple-touch-startup-image-2208x1242.png
├── apple-touch-startup-image-2224x1668.png
├── apple-touch-startup-image-2266x1488.png
├── apple-touch-startup-image-2388x1668.png
├── apple-touch-startup-image-2436x1125.png
├── apple-touch-startup-image-2532x1170.png
├── apple-touch-startup-image-2556x1179.png
├── apple-touch-startup-image-2688x1242.png
├── apple-touch-startup-image-2732x2048.png
├── apple-touch-startup-image-2778x1284.png
├── apple-touch-startup-image-2796x1290.png
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-48x48.png
├── mstile-70x70.png
├── mstile-144x144.png
├── mstile-150x150.png
├── mstile-310x150.png
├── mstile-310x310.png
├── yandex-browser-50x50.png
├── yandex-browser-manifest.json
├── browserconfig.xml
└── manifest.webmanifest
```

## 🤝🏻 Contributing

This is a personal tool and no contributions are expected.
At least for now. 😋


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/%40mevbg%2Fdesign-essentials-vendor/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@mevbg/design-essentials-vendor

[license-src]: https://img.shields.io/npm/l/%40mevbg%2Fdesign-essentials-vendor.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://github.com/mevbg/design-essentials-vendor/blob/main/LICENSE

[style-dictionary-src]: https://img.shields.io/badge/Style%20Dictionary-%5E5.0.1-3fc6c0?colorA=020420
[style-dictionary-href]: https://styledictionary.com
