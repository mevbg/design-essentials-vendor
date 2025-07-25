import { BasicHandlerParams } from './types/format.types.js';
import { wrapInFileChapter } from './utils/formats.utils.js';

// Returns a basic handler for a given name, params, wrapper, and definer
export const basicHandler = ({ name, params, wrapper, definer }: BasicHandlerParams): string => {
  return wrapInFileChapter(
    name,
    wrapper({ name, code: definer(params) }),
    params.config?.noChapterTitle
  );
};
