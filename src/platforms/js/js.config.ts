import {
  defineJsObjectItemsWithValues,
  defineJsObjectItemsWithVariables,
  wrapInJsConst
} from './js.utils.js';

export default {
  static: {
    wrapper: wrapInJsConst,
    definer: defineJsObjectItemsWithValues
  },
  variable: {
    wrapper: wrapInJsConst,
    definer: defineJsObjectItemsWithVariables
  }
};
