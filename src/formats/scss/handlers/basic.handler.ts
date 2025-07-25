import { TokenTypeHandlerParams } from '../../../types/index.js';
import { wrapInFileChapter } from '../../../utils/format.utils.js';
import { defineSassMapValues, wrapInSassMap } from '../utils.js';

const basicHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string =>
  wrapInFileChapter(name, wrapInSassMap(name, defineSassMapValues(tokens)), config?.noChapterTitle);

export default basicHandler;
