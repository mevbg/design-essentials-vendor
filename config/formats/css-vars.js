export const cssVars = ({ prefix, vpMin, vpMax, baseFontSize }) => ({
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
          const slope = ((maxValue - minValue) / (vpMax - vpMin)) * 100;
          const yIntercept = minValue - (slope * vpMin) / 100;
          const yInterceptRem = yIntercept / baseFontSize; // Convert to rem

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
        const sortedCategories = Array.from(tokenCategories).sort();

        sortedCategories.forEach((category) => {
          if (queries[category] && queries[category].length > 0) {
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            sections.push('', `/* ${categoryName} tokens */`, ...queries[category]);
          }
        });

        if (sections[0] === '') {
          sections.shift();
        }

        return sections.join('\n');
      };

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

      // Skip color tokens completely
      if (groupName === 'Color') return '';

      // Handle non-color tokens normally
      const groupContent = tokens
        .filter((token) => !token.name.startsWith('color-'))
        .map((token) => `  --${prefix}-${token.name}: ${token.value};`)
        .join('\n');
      return `  /* ${groupName} tokens */\n${groupContent}`;
    };

    // Generate color scheme CSS
    const generateColorScheme = () => {
      // Get all color tokens
      const colorTokens = dictionary.allTokens.filter(
        (token) =>
          token.name.startsWith('color-') &&
          (token.name.includes('light-') || token.name.includes('dark-'))
      );

      // Separate light and dark tokens
      const lightTokens = colorTokens.filter((token) => token.name.startsWith('color-light-'));
      const darkTokens = colorTokens.filter((token) => token.name.startsWith('color-dark-'));

      // Process light tokens
      const lightVars = lightTokens
        .map((token) => {
          const baseName = token.name.replace('color-light-', '');
          return `--${prefix}-color-${baseName}: ${token.original.value};`;
        })
        .join('\n  ');

      // Process dark tokens
      const darkVars = darkTokens
        .map((token) => {
          const baseName = token.name.replace('color-dark-', '');
          return `--${prefix}-color-${baseName}: ${token.original.value};`;
        })
        .join('\n  ');

      return `/* Color tokens */
:root,
html.light {
  ${lightVars}
}

html.dark {
  ${darkVars}
}

@media (prefers-color-scheme: light) {
  :root {
  ${lightVars}
  }
}

@media (prefers-color-scheme: dark) {
  :root {
  ${darkVars}
  }
}`;
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

    // Generate color scheme CSS
    const colorScheme = generateColorScheme();

    // Combine standard variables, media queries, and color scheme
    return `:root {\n${standardVariables}\n\n${mediaQueries}\n}\n\n${colorScheme}`;
  }
});