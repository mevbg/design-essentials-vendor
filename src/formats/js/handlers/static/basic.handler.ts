import { TokenTypeHandlerParams } from '../../../../types';
import { defineSection } from '../../../../utils';
import { defineObjectItemsWithValues, wrapInConst } from '../../utils';

const basicHandler = (name: string, { tokens, config }: TokenTypeHandlerParams): string =>
  defineSection(
    name,
    wrapInConst(name, defineObjectItemsWithValues(tokens)),
    config?.noFlagComment
  );

export default basicHandler;
