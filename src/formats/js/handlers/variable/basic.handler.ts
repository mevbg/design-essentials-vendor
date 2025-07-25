import { TokenTypeHandlerParams } from '../../../../types/index.js';
import { wrapInFileChapter } from '../../../../utils/format.utils.js';
import { defineJsObjectItemsWithVariables, wrapInJsConst } from '../../utils.js';

const basicHandler = (name: string, { options, tokens, config }: TokenTypeHandlerParams): string =>
  wrapInFileChapter(
    name,
    wrapInJsConst(name, defineJsObjectItemsWithVariables(tokens, options?.prefix)),
    config?.noChapterTitle
  );

export default basicHandler;
