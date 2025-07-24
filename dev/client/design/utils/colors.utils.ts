import Color from 'colorjs.io';

// Converts a given color to hex format
export const toHex = (color: Color): string => color.to('srgb').toString({ format: 'hex' });

// Transforms a given color group to Style Dictionary format
type ColorGroup = Record<string, Color>;
export const transformToStyleDictionaryColors = (groups: ColorGroup[]): ColorGroup[] => groups.map((group) => {
  const processValue = (value: Color) => {
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
});
