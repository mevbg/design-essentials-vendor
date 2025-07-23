export const toHex = (color) => color.to('srgb').toString({ format: 'hex' });

export const parseColorGroupToStyleDictionaryFormat = (group) => {
  const processValue = (value) => {
    // Check if the value is a Color object (has 'to' method)
    if (value && typeof value.to === 'function') {
      return { $value: toHex(value) };
    }

    // If it's an object but not a Color, recursively process its properties
    if (value && typeof value === 'object' && value.constructor === Object) {
      return Object.fromEntries(
        Object.entries(value).map(([key, val]) => [key, processValue(val)])
      );
    }

    // For any other value type, return as is
    return value;
  };

  return Object.fromEntries(
    Object.entries(group).map(([key, value]) => [key, processValue(value)])
  );
};

export const transformToStyleDictionaryColors = (groups) =>
  groups.map((group) => parseColorGroupToStyleDictionaryFormat(group));
