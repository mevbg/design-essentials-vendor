export const jsObjects = () => ({
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