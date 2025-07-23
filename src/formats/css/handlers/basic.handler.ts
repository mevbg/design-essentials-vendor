import { TokenTypeHandlerParams } from '../../../types';
import { defineSection } from '../../../utils';
import { defineCssCustomProperties, wrapInRoot } from '../utils';

const basicHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string =>
  defineSection(name, wrapInRoot(defineCssCustomProperties(tokens)), config?.noFlagComment);

export default basicHandler;
