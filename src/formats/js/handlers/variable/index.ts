import { TokenTypeHandlerParams } from '../../../../types';
import { tokenHasFluidValue } from '../../../../utils';

import basicHandler from './basic.handler';
import colorHandler from './color.handler';
import fluidHandler from './fluid.handler';

export default function getHandler(...args: [string, TokenTypeHandlerParams]) {
  if (args[1].tokens.length && args[1].tokens[0].$type === 'color') {
    return colorHandler(...args);
  }

  if (args[1].tokens.some(tokenHasFluidValue)) {
    return fluidHandler(...args);
  }

  return basicHandler(...args);
}
