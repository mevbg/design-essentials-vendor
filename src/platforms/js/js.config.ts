import {
  defineJsObjectItemsWithValues,
  defineJsObjectItemsWithVariables,
  wrapInJsConst
} from './js.utils.js';

export default {
  static: {
    type: 'static',
    fluidSeparation: true,
    wrapper: wrapInJsConst,
    definer: defineJsObjectItemsWithValues
  },
  variable: {
    type: 'variable',
    fluidSeparation: false,
    wrapper: wrapInJsConst,
    definer: defineJsObjectItemsWithVariables
  }
};
