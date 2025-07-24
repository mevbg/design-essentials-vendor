import { TokenTypeHandlerParams } from '../../../../types';
import { wrapInFileChapter } from '../../../../utils/formats.utils';
import { defineJsObjectItemsWithValues, wrapInJsConst } from '../../utils';

const basicHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string =>
  wrapInFileChapter(
    name,
    wrapInJsConst(name, defineJsObjectItemsWithValues(tokens)),
    config?.noChapterTitle
  );

export default basicHandler;
