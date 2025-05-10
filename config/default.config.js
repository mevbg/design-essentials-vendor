import StyleDictionary from 'style-dictionary';

export default ({ sourcePath, buildPath, prefix, vpMin, vpMax, baseFontSize }) => {
  StyleDictionary.registerFormat({
    name: 'css/css-vars',
    format: function ({ dictionary }) {
      // Find all tokens with min/max variants and group them by their category
      const responsiveTokens = {};
      const tokenCategories = new Set();

      // First pass: collect all categories and responsive tokens
      dictionary.allTokens.forEach((token) => {
        // Extract category from token name (e.g., 'typo' from 'typo-size-title-xl-min')
        const category = token.name.split('-')[0];
        tokenCategories.add(category);

        // Check for min/max variants
        const match = token.name.match(/(.+)-(min|max)$/i);
        if (match) {
          const [, baseName, variant] = match;
          if (!responsiveTokens[baseName]) {
            responsiveTokens[baseName] = {};
          }
          responsiveTokens[baseName][variant] = token.name;
        }
      });

      // Group all tokens by their category
      const groupedTokens = {};
      tokenCategories.forEach((category) => {
        groupedTokens[category] = [];
      });

      // Second pass: sort tokens into their categories
      dictionary.allTokens.forEach((token) => {
        const category = token.name.split('-')[0];
        groupedTokens[category].push(token);
      });

      // Generate consolidated media queries for responsive tokens
      const generateMediaQueries = () => {
        // Create dynamic query objects based on found categories
        const minQueries = {};
        const fluidQueries = {};
        const maxQueries = {};

        // Initialize arrays for each category
        tokenCategories.forEach((category) => {
          minQueries[category] = [];
          fluidQueries[category] = [];
          maxQueries[category] = [];
        });

        for (const baseName in responsiveTokens) {
          const { min, max } = responsiveTokens[baseName];
          if (min && max) {
            const varName = baseName.replace(/-min$/, '');
            const category = baseName.split('-')[0];

            // Find the min and max tokens in allTokens
            const minToken = dictionary.allTokens.find((token) => token.name === min);
            const maxToken = dictionary.allTokens.find((token) => token.name === max);

            if (!minToken || !maxToken) {
              console.warn(`Could not find tokens for ${min} or ${max}`);
              continue;
            }

            // Convert min and max values to numbers (removing 'px' if present)
            const minValue = parseFloat(minToken.value.replace('px', ''));
            const maxValue = parseFloat(maxToken.value.replace('px', ''));

            // Calculate the slope (rate of change) in vw units
            // We want the font size to change by (maxValue - minValue) over (vpMax - vpMin) viewport width
            const slope = ((maxValue - minValue) / (vpMax - vpMin)) * 100; // Multiply by 100 to convert to vw units

            // Calculate the y-intercept in rem units (base font size is 1px = 1rem)
            // We want the font size to be minValue when viewport is vpMin
            // So: minValue = yIntercept + (slope * vpMin/100)
            // Therefore: yIntercept = minValue - (slope * vpMin/100)
            const yIntercept = minValue - (slope * vpMin) / 100;
            const yInterceptRem = yIntercept / baseFontSize; // Convert to rem

            // Format the final calc expression
            const fluidQuery = `    --${prefix}-${varName}: calc(${yInterceptRem.toFixed(5)}rem + ${slope.toFixed(5)}vw);`;

            const query = `    --${prefix}-${varName}: var(--${prefix}-${min});`;
            const maxQuery = `    --${prefix}-${varName}: var(--${prefix}-${max});`;

            minQueries[category].push(query);
            fluidQueries[category].push(fluidQuery);
            maxQueries[category].push(maxQuery);
          }
        }

        const formatQueries = (queries) => {
          const sections = [];

          // Sort categories to maintain consistent order
          const sortedCategories = Array.from(tokenCategories).sort();

          sortedCategories.forEach((category) => {
            if (queries[category] && queries[category].length > 0) {
              const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
              sections.push('', `    /* ${categoryName} tokens */`, ...queries[category]);
            }
          });

          // Remove leading empty line if it exists
          if (sections[0] === '') {
            sections.shift();
          }

          return sections.join('\n');
        };

        // Check if any category has responsive tokens
        const hasResponsiveTokens = Array.from(tokenCategories).some(
          (category) => minQueries[category] && minQueries[category].length > 0
        );

        if (!hasResponsiveTokens) {
          return '';
        }

        return `  @media all and (max-width: ${vpMin - 1}px) {
${formatQueries(minQueries)}
  }

  @media all and (min-width: ${vpMin}px) and (max-width: ${vpMax}px) {
${formatQueries(fluidQueries)}
  }

  @media all and (min-width: ${vpMax + 1}px) {
${formatQueries(maxQueries)}
  }`;
      };

      // Generate CSS variables for each group
      const generateGroupVariables = (tokens, groupName) => {
        if (tokens.length === 0) return '';
        const groupContent = tokens
          .map((token) => `  --${prefix}-${token.name}: ${token.value};`)
          .join('\n');
        return `  /* ${groupName} tokens */\n${groupContent}`;
      };

      // Get all tokens as CSS variables with grouping
      const groups = Array.from(tokenCategories)
        .sort()
        .map((category) => {
          const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
          return generateGroupVariables(groupedTokens[category], categoryName);
        })
        .filter(Boolean);

      // Join groups with newlines, but don't add trailing newline
      const standardVariables = groups.join('\n\n');

      // Generate media queries
      const mediaQueries = generateMediaQueries();

      // Combine standard and responsive variables
      return `:root {\n${standardVariables}\n\n${mediaQueries}\n}`;
    }
  });

  StyleDictionary.registerFormat({
    name: 'javascript/js-objects',
    format: function ({ dictionary }) {
      // Group tokens by their category
      const groupedTokens = {};

      dictionary.allTokens.forEach((token) => {
        // Extract category from token name (e.g., 'Color' from 'ColorPrimitivesMain')
        const category = token.name.split(/(?=[A-Z])/)[0];
        if (!groupedTokens[category]) {
          groupedTokens[category] = {};
        }

        // Convert token name to camelCase and remove category prefix
        const propertyName = token.name
          .replace(category, '')
          .replace(/^[A-Z]/, (match) => match.toLowerCase());

        groupedTokens[category][propertyName] = token.value;
      });

      // Generate the export statements
      const exports = Object.entries(groupedTokens)
        .map(([category, tokens]) => {
          const tokenEntries = Object.entries(tokens)
            .map(([key, value]) => `  ${key}: ${JSON.stringify(value)}`)
            .join(',\n');

          return `export const ${category} = {\n${tokenEntries}\n};`;
        })
        .join('\n\n');

      return exports;
    }
  });

  StyleDictionary.registerFormat({
    name: 'javascript/tailwindcss',
    format: function ({ dictionary }) {
      // Helper function to convert camelCase to kebab-case
      const toKebabCase = (str) => {
        return str
          .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert camelCase to kebab-case
          .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // Handle consecutive capitals
          .toLowerCase(); // Convert to lowercase
      };

      // Create a structure that matches the source tokens
      const tokenStructure = {
        color: {},
        typo: {},
        space: {},
        border: {},
        breakpoint: {}
      };

      // Helper function to set nested value
      const setNestedValue = (obj, path, value) => {
        const parts = path.split('.');
        let current = obj;

        for (let i = 0; i < parts.length - 1; i++) {
          const part = parts[i];
          if (!current[part]) {
            current[part] = {};
          }
          current = current[part];
        }

        // Convert the token path to kebab-case and remove $ prefix from numbers
        const cssVarName = value.path.map((part) => toKebabCase(part.replace(/^\$/, ''))).join('-');

        current[parts[parts.length - 1]] = `var(--${prefix}-${cssVarName})`;
      };

      // Process each token
      dictionary.allTokens.forEach((token) => {
        // Get the category from the token path
        const category = token.path[0];
        if (tokenStructure[category]) {
          // Remove the category from the path and join the rest
          const remainingPath = token.path.slice(1).join('.');
          setNestedValue(tokenStructure[category], remainingPath, token);
        }
      });

      // Add scaled properties for min/max tokens
      const addScaledProperties = (obj) => {
        for (const key in obj) {
          if (typeof obj[key] === 'object') {
            addScaledProperties(obj[key]);
          }
        }

        // Check if this object has both min and max properties
        if (obj.min && obj.max) {
          // Extract the base name from either min or max property
          const minVar = obj.min.match(new RegExp(`var\\(--${prefix}-(.+)-min\\)`));
          if (minVar) {
            const baseName = minVar[1];
            obj.scaled = `var(--${prefix}-${baseName})`;
          }
        }
      };

      // Add scaled properties to the entire structure
      addScaledProperties(tokenStructure);

      // Special handling for space tokens to flatten the structure
      const flattenedSpace = {};
      for (const key in tokenStructure.space) {
        const value = tokenStructure.space[key];
        if (typeof value === 'object' && value.min && value.max && value.scaled) {
          flattenedSpace[`${key}-min`] = value.min;
          flattenedSpace[`${key}-max`] = value.max;
          flattenedSpace[`${key}-scaled`] = value.scaled;
        } else {
          flattenedSpace[key] = value;
        }
      }
      tokenStructure.space = flattenedSpace;

      // Special handling for typography fontSize tokens to flatten the structure
      const flattenedFontSize = {};
      for (const key in tokenStructure.typo.fontSize) {
        const value = tokenStructure.typo.fontSize[key];
        if (typeof value === 'object' && value.min && value.max && value.scaled) {
          flattenedFontSize[`${key}-min`] = value.min;
          flattenedFontSize[`${key}-max`] = value.max;
          flattenedFontSize[`${key}-scaled`] = value.scaled;
        } else {
          flattenedFontSize[key] = value;
        }
      }
      tokenStructure.typo.fontSize = flattenedFontSize;

      // Convert the nested object to a string representation
      const stringifyNested = (obj, indent = 0, category = '') => {
        const spaces = '  '.repeat(indent);
        const entries = Object.entries(obj);

        if (entries.length === 0) return '{}';

        return `{\n${entries
          .map(([key, value]) => {
            // Remove $ prefix and wrap in quotes for space, typo, and breakpoint primitive tokens
            // Also wrap any key containing hyphens in quotes
            const formattedKey =
              category === 'space' ||
              category === 'typo' ||
              (category === 'breakpoint' && key.startsWith('$')) ||
              key.includes('-')
                ? `"${key.replace(/^\$/, '')}"`
                : key;

            if (typeof value === 'object' && value !== null) {
              return `${spaces}  ${formattedKey}: ${stringifyNested(value, indent + 1, category)}`;
            }
            return `${spaces}  ${formattedKey}: ${JSON.stringify(value)}`;
          })
          .join(',\n')}\n${spaces}}`;
      };

      // Generate separate exports for each category
      const exports = Object.entries(tokenStructure)
        .map(([category, value]) => {
          return `export const ${category} = ${stringifyNested(value, 0, category)};`;
        })
        .join('\n\n');

      return exports;
    }
  });

  return {
    source: [`${sourcePath}/index.js`],

    platforms: {
      css: {
        transformGroup: 'scss',
        buildPath: buildPath,
        files: [
          {
            destination: 'css-vars.tokens.scss',
            format: 'css/css-vars'
          }
        ]
      },

      scss: {
        transformGroup: 'scss',
        buildPath: buildPath,
        files: [
          {
            destination: 'sass.tokens.scss',
            format: 'scss/map-deep'
          }
        ]
      },

      js: {
        transformGroup: 'js',
        buildPath: buildPath,
        files: [
          {
            destination: 'js-objects.tokens.js',
            format: 'javascript/js-objects'
          },
          {
            destination: 'tailwind.tokens.js',
            format: 'javascript/tailwindcss'
          },
          {
            destination: 'js-constants.tokens.js',
            format: 'javascript/es6'
          }
        ]
      }
    }
  }
};
