import { FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { CORE_TOKENS } from '../constants.js';
import * as handlers from '../handlers/index.js';
import {
  CodeBlockContentParams,
  CodeBlockWrapperParams,
  CoreToken,
  CoreTokensHandlerResolvers,
  CustomFormatterCategory,
  CustomFormatterType,
  FormatBuilder
} from '../types/index.js';
import { PlatformName } from '../types/platform.types.js';
import { capitalize, toSpaceCase } from './strings.utils.js';
import { tokenIsFluid } from './tokens/fluid-tokens.utils.js';

// Returns an object of core tokens keys with handlers builders for each type
export const getCoreTokensHandlerResolvers = ({
  category,
  type,
  wrapper,
  definer
}: {
  category: CustomFormatterCategory;
  type?: CustomFormatterType;
  wrapper: (params: CodeBlockWrapperParams) => string;
  definer: (params: CodeBlockContentParams) => string;
}): CoreTokensHandlerResolvers =>
  Object.fromEntries(
    CORE_TOKENS.map((token: CoreToken) => [
      token,
      // HandlerResolver
      async (formatArgs, tokens, config) => {
        const name = capitalize(toSpaceCase(token));
        const handlerType =
          tokens.length && tokens[0].$type === 'color'
            ? 'color'
            : tokens.some(tokenIsFluid)
              ? 'fluid'
              : 'basic';

        // if (handlerType === 'SPECIFIC') {
        //   const { default: handler } = await import(
        //     `../platforms/${format}/handlers/${type ? `${type}/` : ''}${handlerType}.handler.js`
        //   );
        //   return handler(...args);
        // }

        return handlers[`${handlerType}Handler` as keyof typeof handlers]({
          name,
          category,
          type,
          wrapper,
          definer,
          formatArgs,
          tokens,
          config
        });
      }
    ])
  ) as CoreTokensHandlerResolvers;

// Returns a file header with a provided name
export const fileHeader = (name: string): string =>
  `/* =================================================== */\n/* ${name.toUpperCase()} */\n/* =================================================== */\n`;

// Defines a comment-separated chapter in a file with a provided name and code
export const wrapInFileChapter = (name: string, code: string, noChapterTitle?: boolean): string =>
  noChapterTitle ? `${code}\n` : `\n${`/* ${name} Tokens */`.toUpperCase()}\n\n${code}\n`;

// Returns a pair of spaces multiplied by the provided number
export const tab = (c: number = 1): string => '  '.repeat(c);

// Returns a destination file name
export const getDestinationFileName = (platform: PlatformName, name: string) =>
  `${name}.design-tokens.${platform}`;

// Returns a formatter name
export const getFormatterName = (platform: PlatformName, name: string) => `mev/${platform}/${name}`;

// Returns a function for a formatter
// that handles all tokens in a single file
export const allFormatterTemplate =
  ({
    name,
    category,
    type,
    fileHeaderTitle,
    prefixOutput = () => {},
    wrapper,
    definer
  }: {
    name: string;
    category: CustomFormatterCategory;
    type?: CustomFormatterType;
    fileHeaderTitle: string;
    prefixOutput?: (output: string[], formatArgs: FormatFnArguments) => void;
    wrapper: (params: CodeBlockWrapperParams) => string;
    definer: (params: CodeBlockContentParams) => string;
  }): FormatBuilder =>
  () => ({
    name: getFormatterName(category, name),
    format: async function (formatArgs: FormatFnArguments) {
      // Get the core token handlers
      const coreTokensHandlerResolvers: CoreTokensHandlerResolvers = getCoreTokensHandlerResolvers({
        category,
        type,
        wrapper,
        definer
      });

      // Define the output array
      const output: string[] = [];

      // Get all tokens from the dictionary
      const { allTokens } = formatArgs.dictionary;

      // Add header to the output array
      output.push(fileHeader(fileHeaderTitle));

      // Handle the prefix output (if such)
      prefixOutput(output, formatArgs);

      // Parse tokens that have a core handler
      const getCoreTokens = (type: string): TransformedToken[] =>
        allTokens.filter((token) => token.$type === type);
      const promises: Promise<string>[] = [];
      Object.entries(coreTokensHandlerResolvers).forEach(([type, handlerResolver]) => {
        const tokens = getCoreTokens(type);
        if (tokens.length) {
          promises.push(handlerResolver(formatArgs, tokens));
        }
      });
      const responses = await Promise.all(promises);
      responses.forEach((response) => {
        output.push(response);
      });

      // Parse tokens that don't have a core handler
      const otherTokens: TransformedToken[] = allTokens.filter(
        (token) => !Object.keys(coreTokensHandlerResolvers).includes(token.$type || '')
      );
      if (otherTokens.length) {
        output.push(
          handlers.basicHandler({
            name: 'Other',
            category,
            type,
            wrapper,
            definer,
            formatArgs,
            tokens: otherTokens
          })
        );
      }

      // Join the output array into a string and return it
      return output.join('\n');
    }
  });

// Returns a function for a formatter
// that handles a given type of core tokens individually
export const coreFormatterTemplate =
  ({
    name,
    category,
    type,
    wrapper,
    definer
  }: {
    name: string;
    category: CustomFormatterCategory;
    type?: CustomFormatterType;
    wrapper: (params: CodeBlockWrapperParams) => string;
    definer: (params: CodeBlockContentParams) => string;
  }): FormatBuilder =>
  () => ({
    name: getFormatterName(category, name),
    format: async function (formatArgs: FormatFnArguments) {
      // Get the dictionary and the options from the format arguments
      const { dictionary } = formatArgs;

      // Get the core token handlers
      const coreTokensHandlerResolvers: CoreTokensHandlerResolvers = getCoreTokensHandlerResolvers({
        category,
        type,
        wrapper,
        definer
      });

      // Define the output array
      const output: string[] = [];

      // Get all tokens from the dictionary
      const { allTokens: tokens } = dictionary;

      // Get the type of the tokens
      // If there are no tokens, exit the function
      const tokenType = tokens.length && tokens[0].$type;
      if (!tokenType) return;

      // Add header to the output array
      output.push(fileHeader(`${toSpaceCase(tokenType)} Tokens`));

      // Parse the tokens
      const handlerResolver =
        coreTokensHandlerResolvers[tokenType as keyof typeof coreTokensHandlerResolvers];
      if (handlerResolver) {
        output.push(await handlerResolver(formatArgs, tokens, { noChapterTitle: true }));
      }

      // Join the output array into a string and return it
      return output.join('\n');
    }
  });

// Returns a function for a formatter
// that handles a given type of core tokens individually
export const othersFormatterTemplate =
  ({
    name,
    category,
    type,
    wrapper,
    definer
  }: {
    name: string;
    category: CustomFormatterCategory;
    type?: CustomFormatterType;
    wrapper: (params: CodeBlockWrapperParams) => string;
    definer: (params: CodeBlockContentParams) => string;
  }): FormatBuilder =>
  () => ({
    name: getFormatterName(category, name),
    format: async function (formatArgs: FormatFnArguments) {
      // Get the dictionary and the options from the format arguments
      const { dictionary } = formatArgs;

      // Define the output array
      const output: string[] = [];

      // Get all tokens from the dictionary
      const { allTokens: tokens } = dictionary;

      // Add header to the output array
      output.push(fileHeader(`Other Tokens`));

      // Parse tokens that don't have a core handler
      output.push(
        handlers.basicHandler({
          name: 'Other',
          category,
          type,
          wrapper,
          definer,
          formatArgs,
          tokens,
          config: { noChapterTitle: true }
        })
      );

      // Join the output array into a string and return it
      return output.join('\n');
    }
  });
