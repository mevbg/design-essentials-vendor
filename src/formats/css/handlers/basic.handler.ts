import { FormatHandler, TokenTypeHandlerParams } from '../../../types';
import { wrapInFileChapter } from '../../../utils/formats.utils';
import { defineCssCustomProperties, wrapInCssRoot } from '../utils';

const basicHandler: FormatHandler = (
  name: string,
  { tokens, config }: TokenTypeHandlerParams
): string =>
  wrapInFileChapter(name, wrapInCssRoot(defineCssCustomProperties(tokens)), config?.noChapterTitle);

export default basicHandler;
