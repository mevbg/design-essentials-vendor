import { FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { CORE_TOKENS } from '../constants.js';
import { basicHandler } from '../handlers.js';
import {
  CodeBlockContentParams,
  CodeBlockWrapperParams,
  CoreTokenHandlers,
  CustomFormatter,
  FormatBuilder,
  JsFormatterType,
  TokenTypeHandlerParams
} from '../types/index.js';
import { PlatformName } from '../types/platform.types.js';
import { capitalize, toSpaceCase } from './strings.utils.js';
import { tokenIsFluid } from './tokens/fluid-tokens.utils.js';

// Returns a file header with a provided name
export const fileHeader = (name: string): string =>
  `/* =================================================== */\n/* ${name.toUpperCase()} */\n/* =================================================== */\n`;

// Defines a comment-separated chapter in a file with a provided name and code
export const wrapInFileChapter = (name: string, code: string, noChapterTitle?: boolean): string =>
  noChapterTitle ? `${code}\n` : `\n${`/* ${name} Tokens */`.toUpperCase()}\n\n${code}\n`;

// Returns a pair of spaces multiplied by the provided number
export const tab = (c: number = 1): string => '  '.repeat(c);

// Returns a set of core token handlers for a given format
export const getCoreTokenHandlers = (
  format: CustomFormatter,
  type: JsFormatterType | null = null
): CoreTokenHandlers => {
  const getHandler = async (...args: [string, TokenTypeHandlerParams]) => {
    const handlerType =
      args[1].tokens.length && args[1].tokens[0].$type === 'color'
        ? 'color'
        : args[1].tokens.some(tokenIsFluid)
          ? 'fluid'
          : 'basic';

    if (handlerType !== 'basic') {
      const { default: handler } = await import(
        `../platforms/${format}/handlers/${type ? `${type}/` : ''}${handlerType}.handler.js`
      );
      return handler(...args);
    }

    const { default: config } = await import(`../platforms/${format}/${format}.config.js`);
    return basicHandler({
      name: args[0],
      params: args[1],
      ...(type ? config[type] : config)
    });
  };

  return Object.fromEntries(
    CORE_TOKENS.map((token) => [
      token,
      (params: TokenTypeHandlerParams) => getHandler(capitalize(toSpaceCase(token)), params)
    ])
  );
};

// Returns a destination file name
export const getDestinationFileName = (platform: PlatformName, name: string) =>
  `${name}.design-tokens.${platform}`;

// Returns a formatter name
export const getFormatterName = (platform: PlatformName, name: string) => `mev/${platform}/${name}`;

// Returns a function for a formatter
// that handles all tokens in a single file
export const allFormatterTemplate =
  ({
    platform,
    name,
    fileHeaderTitle,
    prefix = () => {},
    coreTokenHandlers,
    wrapper,
    definer
  }: {
    platform: PlatformName;
    name: string;
    fileHeaderTitle: string;
    prefix?: (output: string[], formatArgs: FormatFnArguments) => void;
    coreTokenHandlers: CoreTokenHandlers;
    wrapper: (params: CodeBlockWrapperParams) => string;
    definer: (params: CodeBlockContentParams) => string;
  }): FormatBuilder =>
  () => ({
    name: getFormatterName(platform, name),
    format: async function (formatArgs: FormatFnArguments) {
      // Get the dictionary and the options from the format arguments
      const { dictionary, options } = formatArgs;

      // Define the output array
      const output: string[] = [];

      // Get all tokens from the dictionary
      const { allTokens } = dictionary;

      // Add header to the output array
      output.push(fileHeader(fileHeaderTitle));

      // Handle the prefix (if such)
      prefix(output, formatArgs);

      // Parse tokens that have a core handler
      const getCoreTokens = (type: string): TransformedToken[] =>
        allTokens.filter((token) => token.$type === type);
      const promises: Promise<string>[] = [];
      Object.entries(coreTokenHandlers).forEach(([type, handlerFn]) => {
        const tokens = getCoreTokens(type);
        if (tokens.length) {
          promises.push(handlerFn({ options, tokens }));
        }
      });
      const responses = await Promise.all(promises);
      responses.forEach((response) => {
        output.push(response);
      });

      // Parse tokens that don't have a core handler
      const otherTokens: TransformedToken[] = allTokens.filter(
        (token) => !Object.keys(coreTokenHandlers).includes(token.$type || '')
      );
      if (otherTokens.length) {
        output.push(
          basicHandler({
            name: 'Other',
            params: { options, tokens: otherTokens },
            wrapper,
            definer
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
    platform,
    name,
    coreTokenHandlers
  }: {
    platform: PlatformName;
    name: string;
    coreTokenHandlers: CoreTokenHandlers;
  }): FormatBuilder =>
  () => ({
    name: getFormatterName(platform, name),
    format: async function (formatArgs: FormatFnArguments) {
      // Get the dictionary and the options from the format arguments
      const { dictionary, options } = formatArgs;

      // Define the output array
      const output: string[] = [];

      // Get all tokens from the dictionary
      const { allTokens: tokens } = dictionary;

      // Get the type of the tokens
      // If there are no tokens, exit the function
      const type = tokens.length && tokens[0].$type;
      if (!type) return;

      // Add header to the output array
      output.push(fileHeader(`${toSpaceCase(type)} Tokens`));

      // Parse the tokens
      const handler = coreTokenHandlers[type as keyof typeof coreTokenHandlers];
      if (handler) {
        output.push(await handler({ options, tokens, config: { noChapterTitle: true } }));
      }

      // Join the output array into a string and return it
      return output.join('\n');
    }
  });
