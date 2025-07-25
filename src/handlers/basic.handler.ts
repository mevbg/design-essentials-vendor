import {
  CodeBlockContentParams,
  CodeBlockWrapperParams,
  TokenTypeHandlerParams
} from '../types/index.js';
import { wrapInFileChapter } from '../utils/format.utils.js';

type BasicHandlerParams = {
  name: string;
  params: TokenTypeHandlerParams;
  wrapper: (params: CodeBlockWrapperParams) => string;
  definer: (params: CodeBlockContentParams) => string;
};

export default ({ name, params, wrapper, definer }: BasicHandlerParams): string => {
  return wrapInFileChapter(
    name,
    wrapper({ name, code: definer(params) }),
    params.config?.noChapterTitle
  );
};
