import { FormatHandler, TokenTypeHandlerParams } from '../../../../types';
import { wrapInFileChapter } from '../../../../utils/formats.utils';
import { defineJsObjectItemsWithVariables, wrapInJsConst } from '../../utils';

const basicHandler: FormatHandler = (
  name: string,
  { options, tokens, config }: TokenTypeHandlerParams
): string =>
  wrapInFileChapter(
    name,
    wrapInJsConst(name, defineJsObjectItemsWithVariables(tokens, options?.prefix)),
    config?.noChapterTitle
  );

export default basicHandler;
