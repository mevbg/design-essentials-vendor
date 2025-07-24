import { TokenTypeHandlerParams } from '../../../types';
import { wrapInFileChapter } from '../../../utils/formats.utils';
import { defineSassMapValues, wrapInSassMap } from '../utils';

const basicHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string =>
  wrapInFileChapter(name, wrapInSassMap(name, defineSassMapValues(tokens)), config?.noChapterTitle);

export default basicHandler;
