import Color from 'colorjs.io';

// Converts a given color to Hex format
export const toHex = (color: Color): string => color.to('srgb').toString({ format: 'hex' });

// Converts a given color to RGB format
export const toRGB = (color: Color): string => color.to('srgb').toString();

// Converts a given color to Hex format
export const toHSL = (color: Color): string => color.to('hsl').toString();

// Converts a given color to P3 format
export const toP3 = (color: Color): string => color.to('p3').toString();

// Converts a given color to OkLCH format
export const toOkLCH = (color: Color): string => color.to('oklch').toString();

// Converts a given color to OkHSL format
export const toOkHSL = (color: Color): string => color.to('okhsl').toString();

// Transforms a given color group to Style Dictionary format
type ColorGroup = Record<string, Color>;
export const transformToStyleDictionaryColors = (groups: ColorGroup[]): ColorGroup[] => groups.map((group) => {
  const processValue = (value: Color) => {
    // Check if the value is a Color object (has 'to' method)
    if (value && typeof value.to === 'function') {
      return {
        $value: toHex(value),
        rgb: toRGB(value),
        hsl: toHSL(value),
        p3: toP3(value),
        oklch: toOkLCH(value),
        okhsl: toOkHSL(value)
      };
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
