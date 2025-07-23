import { TokenTypeHandlerParams } from '../../../../types';
import { defineSection } from '../../../../utils';
import { defineObjectItemsWithVariables, wrapInConst } from '../../utils';

const basicHandler = (name: string, { options, tokens, config }: TokenTypeHandlerParams): string =>
  defineSection(
    name,
    wrapInConst(name, defineObjectItemsWithVariables(tokens, options?.prefix)),
    config?.noFlagComment
  );

export default basicHandler;
