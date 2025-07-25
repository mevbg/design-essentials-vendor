// Converts a given string to kebab-case
export const toKebabCase = (str: string): string => str.replace(/([A-Z])/g, '-$1').toLowerCase();

// Capitalizes the first letter of a given string
export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

// Converts a given string to camelCase
export const spaceCaseToCamelCase = (str: string): string =>
  str
    .split(' ')
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');

// Converts a given string to space case
export const toSpaceCase = (str: string): string => str.replace(/([A-Z])/g, ' $1');

// Converts a given string to camelCase
export const toCamelCase = (str: string): string => {
  // If string contains dashes, treat as kebab-case
  if (str.includes('-')) {
    return str
      .split('-')
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  }

  // If string contains underscores, treat as snake_case
  if (str.includes('_')) {
    return str
      .split('_')
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  }

  // If string has capital letters, split by capitals (PascalCase or mixed case)
  if (/[A-Z]/.test(str)) {
    return str
      .replace(/([A-Z])/g, ' $1') // Add space before capitals
      .trim() // Remove leading space if any
      .split(' ')
      .map((word, index) =>
        index === 0
          ? word.toLowerCase()
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join('');
  }

  // If it's already all lowercase, just return it
  return str.toLowerCase();
};
