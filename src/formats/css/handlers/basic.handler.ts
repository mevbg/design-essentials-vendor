import { TokenTypeHandlerParams } from '../../../types/index.js';
import { wrapInFileChapter } from '../../../utils/formats.utils.js';
import { defineCssCustomProperties, wrapInCssRoot } from '../utils.js';

const basicHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string =>
  wrapInFileChapter(name, wrapInCssRoot(defineCssCustomProperties(tokens)), config?.noChapterTitle);

export default basicHandler;
