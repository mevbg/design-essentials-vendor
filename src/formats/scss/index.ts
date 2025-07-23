import { FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { fileHeader, toSpaceCase } from '../../utils';
import * as coreTokenHandlers from './core-tokens';
import basicHandler from './handlers/basic.handler';

// Formatter for all tokens
export const scssAllFormatter = () => ({
  name: 'mev/scss/all',
  format: function ({ dictionary, options }: FormatFnArguments) {
    // Define the output array
    const output: string[] = [];

    // Get all tokens from the dictionary
    const { allTokens } = dictionary;

    // Add header to the output array
    output.push(fileHeader('SCSS Tokens'));

    // Parse tokens that have a dedicated handler
    const getDedicatedTokens = (type: string): TransformedToken[] =>
      allTokens.filter((token) => token.$type === type);
    Object.entries(coreTokenHandlers).forEach(([type, handlerFn]) => {
      const tokens = getDedicatedTokens(type);

      if (tokens.length) {
        output.push(handlerFn({ options, tokens }));
      }
    });

    // Parse tokens that don't have a dedicated handler
    const otherTokens: TransformedToken[] = allTokens.filter(
      (token) => !Object.keys(coreTokenHandlers).includes(token.$type || '')
    );
    if (otherTokens.length) {
      output.push(basicHandler('Other', { options, tokens: otherTokens }));
    }

    // Join the output array into a string and return it
    return output.join('\n');
  }
});

// Formatter for tokens with a dedicated handler
export const scssDedicatedFormatter = () => ({
  name: 'mev/scss/dedicated',
  format: function (args: FormatFnArguments) {
    // Define the output array
    const output: string[] = [];

    // Get all tokens from the dictionary
    const { allTokens: tokens } = args.dictionary;

    // Get the type of the tokens
    // If there are no tokens, exit the function
    const type = tokens.length && tokens[0].$type;
    if (!type) return;

    // Add header to the output array
    output.push(fileHeader(`${toSpaceCase(type)} Tokens`));

    // Parse the tokens
    const handler = coreTokenHandlers[type as keyof typeof coreTokenHandlers];
    if (handler) {
      output.push(handler({ options: args.options, tokens, config: { noFlagComment: true } }));
    }

    // Join the output array into a string and return it
    return output.join('\n');
  }
});
