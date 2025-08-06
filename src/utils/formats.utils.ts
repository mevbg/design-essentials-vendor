import { Format } from 'style-dictionary/types';
import { GeneratorParams } from '../types/generator.types.js';
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
  params: GeneratorParams<T>;
  outputGenerator: (output: string[], params: GeneratorParams<T>) => string;
}): Format => ({
  name: getFormatterName(name),
  format: () => {
    // Define the output array
    const output: string[] = [];

    // Add header to the output array
    output.push(fileHeader(toSpaceCase(toCamelCase(name))));

    // Handle the output
    generateOutput(output, params);

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
