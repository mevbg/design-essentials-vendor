import { Format, FormatFnArguments } from 'style-dictionary/types';
import { ServiceParams } from '../types/services.types.js';
import { toCamelCase, toSpaceCase } from './strings.utils.js';

// Returns a file header with a provided name
export const fileHeader = (name: string): string =>
  `/* =================================================== */\n/* ${name.toUpperCase()} */\n/* =================================================== */\n`;

// Returns a pair of spaces multiplied by the provided number
export const tab = (c: number = 1): string => '  '.repeat(c);

// Returns a formatter name
export const getFormatterName = (name: string) => `mev/${name}`;

// This function represents a template for a format config
// that prepares one for formatting a custom output.
export const customFormatterTemplate = <T>({
  name,
  params,
  outputGenerator: generateOutput
}: {
  name: string;
  params: ServiceParams<T>;
  outputGenerator: (
    output: string[],
    params: ServiceParams<T>,
    formatArgs?: FormatFnArguments
  ) => string;
}): Format => ({
  name: getFormatterName(name),
  format: (formatArgs: FormatFnArguments) => {
    // Define the output array
    const output: string[] = [];

    // Add header to the output array
    output.push(fileHeader(toSpaceCase(toCamelCase(name))));

    // Handle the output
    generateOutput(output, params, formatArgs);

    // Join the output array into a string and return it
    return output.join('\n');
  }
});

export const cssSelectorBlock = ({
  name,
  code,
  indent = ''
}: {
  name: string;
  code: string;
  indent?: string;
}): string => `${indent}${name} {\n${code}\n${indent}}`;
