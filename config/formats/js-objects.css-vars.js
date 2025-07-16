export const tailwind = ({ prefix }) => ({
  name: 'javascript/css-vars',
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
      border: {},
      boxShadow: {},
      breakpoint: {},
      color: {},
      dimensions: {},
      icon: {},
      opacity: {},
      space: {},
      typo: {}
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
        // For color tokens, we want to use the light scheme values and primitives
        if (category === 'color' && token.path[1] === 'light') {
          // Remove 'light' from the path and use the rest
          const remainingPath = token.path.slice(2).join('.');
          setNestedValue(tokenStructure[category], remainingPath, {
            ...token,
            path: ['color', ...token.path.slice(2)]
          });
        }
        // Also handle primitive color tokens
        else if (category === 'color' && token.path[1] === 'primitive') {
          // Keep 'primitives' in the path
          const remainingPath = token.path.slice(1).join('.');
          setNestedValue(tokenStructure[category], remainingPath, token);
        }
        // For non-color tokens, process normally
        else if (category !== 'color') {
          const remainingPath = token.path.slice(1).join('.');
          setNestedValue(tokenStructure[category], remainingPath, token);
        }
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
        flattenedSpace[key] = value.scaled;
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
        flattenedFontSize[key] = value.scaled;
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
