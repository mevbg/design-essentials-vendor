import { FormatFnArguments, TransformedToken } from 'style-dictionary/types';
import { fileHeader, getFormatterName } from '../../../utils/formats.utils.js';
import { capitalize, toSpaceCase } from '../../../utils/strings.utils.js';
import * as handlers from '../handlers/index.js';
import { CustomFormatterCategory } from '../types/format.types.js';
import {
  CoreToken,
  CoreTokensHandlerResolvers,
  CustomFormatterType,
  DefinerParams,
  FormatterTemplateFn,
  OutputConfig,
  PlatformFilename,
  PlatformType,
  WrapperParams
} from '../types/index.js';
import { tokenIsFluid } from './fluid-tokens.utils.js';

// Returns a destination file name
export const getDestinationFileName = (platformType: PlatformType, name: PlatformFilename) =>
  `${platformType}/${name}.${platformType}`;

// Returns a formatter name
export const getCategoryFormatterName = (category: CustomFormatterCategory, name: string) =>
  getFormatterName(`${category}/${name}`);

// This function returns a promise with the output for a file.
// It is used by all handlers
export const getFileOutput = async ({
  name,
  category,
  config,
  parser
}: {
  name: string;
  category: CustomFormatterCategory;
  config?: OutputConfig;
  parser: (
    output: string[],
    wrapper: (args: WrapperParams) => string,
    definer: (args: DefinerParams) => string
  ) => void;
}): Promise<string> => {
  // Import the wrapper and definer functions for the current category
  const { wrapper, definer } = await import(`../platforms/${category}/utils.js`);

  // Define the output array
  const output: string[] = [];

  // Populate the output array with the parsed tokens
  parser(output, wrapper, definer);

  // Return the output
  return config?.noChapterTitle
    ? `${output.join('\n')}\n`
    : `\n${`/* ${name} */`.toUpperCase()}\n\n${output.join('\n')}\n`;
};

// Returns an object of core tokens keys with handlers builders for each type
export const getCoreTokensHandlerResolvers = ({
  category,
  type
}: {
  category: CustomFormatterCategory;
  type?: CustomFormatterType;
}): CoreTokensHandlerResolvers =>
  Object.fromEntries(
    Object.values(CoreToken).map((token: CoreToken) => [
      token,
      // HandlerResolver
      async (formatArgs, tokens, config) => {
        const name = capitalize(toSpaceCase(token));

        let handlerType: string = '';
        switch (true) {
          case tokens.length && tokens[0].$type === 'color':
            handlerType = 'color';
            break;
          case tokens.some(tokenIsFluid):
            handlerType = 'fluid';
            break;
          default:
            handlerType = 'basic';
        }

        // if (handlerType === 'SPECIFIC') {
        //   const { default: handler } = await import(
        //     `../platforms/${format}/handlers/${type ? `${type}/` : ''}${handlerType}.handler.js`
        //   );
        //   return handler(...args);
        // }

        // Get the handler function
        const handleTokens = handlers[`${handlerType}Handler` as keyof typeof handlers];

        return handleTokens({
          name,
          category,
          type,
          formatArgs,
          tokens,
          config
        });
      }
    ])
  ) as CoreTokensHandlerResolvers;

// This function represents a template for a format config
// that prepares one for formatting all tokens available.
export const allFormatterTemplate: FormatterTemplateFn = ({ name, category, type }) => ({
  name: getCategoryFormatterName(category, name),
  format: async function (formatArgs: FormatFnArguments) {
    // Get the core token handlers
    const coreTokensHandlerResolvers: CoreTokensHandlerResolvers = getCoreTokensHandlerResolvers({
      category,
      type
    });

    // Define the output array
    const output: string[] = [];

    // Get all tokens from the dictionary
    const { allTokens } = formatArgs.dictionary;

    // Add header to the output array
    output.push(fileHeader(`${category} Tokens${type ? ` (${type})` : ''}`));

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
        await handlers.basicHandler({
          name: 'Other',
          category,
          type,
          formatArgs,
          tokens: otherTokens
        })
      );
    }

    // Join the output array into a string and return it
    return output.join('\n');
  }
});

// This function represents a template for a format config
// that prepares one for formatting individual files for each core token available.
export const coreFormatterTemplate: FormatterTemplateFn = ({ name, category, type }) => ({
  name: getCategoryFormatterName(category, name),
  format: async function (formatArgs: FormatFnArguments) {
    // Get the dictionary and the options from the format arguments
    const { dictionary } = formatArgs;

    // Get the core token handlers
    const coreTokensHandlerResolvers: CoreTokensHandlerResolvers = getCoreTokensHandlerResolvers({
      category,
      type
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

// This function represents a template for a format config
// that prepares one for formatting all tokens that don't have a core handler (if such).
export const othersFormatterTemplate: FormatterTemplateFn = ({ name, category, type }) => ({
  name: getCategoryFormatterName(category, name),
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
      await handlers.basicHandler({
        name: 'Other',
        category,
        type,
        formatArgs,
        tokens,
        config: { noChapterTitle: true }
      })
    );

    // Join the output array into a string and return it
    return output.join('\n');
  }
});
