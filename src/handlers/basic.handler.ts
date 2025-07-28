import { TransformedToken } from 'style-dictionary';
import { CustomFormatterCategory, GeneralHandlerParams } from '../types/format.types.js';
import { tab, wrapInFileChapter } from '../utils/formats.utils.js';
import { toSpaceCase } from '../utils/strings.utils.js';

// Renders basic tokens based on a given context
export const basicHandler = ({
  name,
  category,
  type,
  wrapper,
  definer,
  formatArgs,
  tokens,
  config
}: GeneralHandlerParams): string => {
  let code = wrapper({
    name: category !== CustomFormatterCategory.CSS ? name : undefined,
    code: definer({ type, tokens, options: formatArgs?.options })
  });

  if (name === 'Other') {
    const groupedTokens = tokens.reduce<Record<string, TransformedToken[]>>((acc, token) => {
      const type = token.$type;

      if (!acc[type || '']) {
        acc[type || ''] = [];
      }

      acc[type || ''].push(token);

      return acc;
    }, {});

    if (category === CustomFormatterCategory.CSS) {
      code = Object.values(groupedTokens)
        .map(
          (tokens) =>
            wrapper({
              code: definer({ type, tokens, indent: tab(2), options: formatArgs?.options }),
              indent: tab()
            }) + `\n`
        )
        .join('\n');
    } else {
      code =
        wrapper({
          name,
          code: Object.entries(groupedTokens)
            .map(
              ([groupName, tokens], index) =>
                wrapper({
                  name:
                    category === CustomFormatterCategory.JS ? groupName : toSpaceCase(groupName),
                  code: definer({ type, tokens, indent: tab(2), options: formatArgs?.options }),
                  indent: tab()
                }) +
                (index < Object.entries(groupedTokens).length - 1 &&
                category === CustomFormatterCategory.JS
                  ? ','
                  : '')
            )
            .join('\n')
        }) + '\n';
    }
  }

  return wrapInFileChapter(name, code, config?.noChapterTitle);
};
