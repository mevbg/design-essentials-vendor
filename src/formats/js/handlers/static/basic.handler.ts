import { TokenTypeHandlerParams } from '../../../../types/index.js';
import { wrapInFileChapter } from '../../../../utils/formats.utils.js';
import { defineJsObjectItemsWithValues, wrapInJsConst } from '../../utils.js';

const basicHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string =>
  wrapInFileChapter(
    name,
    wrapInJsConst(name, defineJsObjectItemsWithValues(tokens)),
    config?.noChapterTitle
  );

export default basicHandler;
