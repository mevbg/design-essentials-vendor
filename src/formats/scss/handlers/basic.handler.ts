import { TokenTypeHandlerParams } from '../../../types';
import { defineSection } from '../../../utils';
import { defineMapValues, wrapInMap } from '../utils';

const basicHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string =>
  defineSection(name, wrapInMap(name, defineMapValues(tokens)), config?.noFlagComment);

export default basicHandler;
