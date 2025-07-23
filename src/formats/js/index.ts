import { FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { fileHeader } from '../../utils';
import * as coreTokenHandlers from './core-tokens';
import basicStaticHandler from './handlers/static/basic.handler';
import basicVariableHandler from './handlers/variable/basic.handler';

export const staticFormatter = () => ({
  name: 'mev/js/static',
  format: function ({ dictionary, options }: FormatFnArguments) {
    // Define the output array
    const output: string[] = [];

    // Get all tokens from the dictionary
    const { allTokens } = dictionary;

    // Add header to the output array
    output.push(fileHeader('JS Tokens (static values)'));

    // Parse tokens that have a dedicated handler
    const getDedicatedTokens = (type: string): TransformedToken[] =>
      allTokens.filter((token) => token.$type === type);
    Object.entries(coreTokenHandlers).forEach(([type, handlerFn]) => {
      const tokens = getDedicatedTokens(type);

      if (tokens.length) {
        output.push(handlerFn({ options, tokens }, 'static'));
      }
    });

    // Parse tokens that don't have a dedicated handler
    const otherTokens: TransformedToken[] = allTokens.filter(
      (token) => !Object.keys(coreTokenHandlers).includes(token.$type || '')
    );
    if (otherTokens.length) {
      output.push(basicStaticHandler('Other', { options, tokens: otherTokens }));
    }

    // Join the output array into a string and return it
    return output.join('\n');
  }
});

export const variableFormatter = () => ({
  name: 'mev/js/variable',
  format: function ({ dictionary, options }: FormatFnArguments) {
    // Define the output array
    const output: string[] = [];

    // Get all tokens from the dictionary
    const { allTokens } = dictionary;

    // Add header to the output array
    output.push(fileHeader('JS Tokens (variable values)'));

    // Parse tokens that have a dedicated handler
    const getDedicatedTokens = (type: string): TransformedToken[] =>
      allTokens.filter((token) => token.$type === type);
    Object.entries(coreTokenHandlers).forEach(([type, handlerFn]) => {
      const tokens = getDedicatedTokens(type);

      if (tokens.length) {
        output.push(handlerFn({ options, tokens }, 'variable'));
      }
    });

    // Parse tokens that don't have a dedicated handler
    const otherTokens: TransformedToken[] = allTokens.filter(
      (token) => !Object.keys(coreTokenHandlers).includes(token.$type || '')
    );
    if (otherTokens.length) {
      output.push(basicVariableHandler('Other', { options, tokens: otherTokens }));
    }

    // Join the output array into a string and return it
    return output.join('\n');
  }
});
