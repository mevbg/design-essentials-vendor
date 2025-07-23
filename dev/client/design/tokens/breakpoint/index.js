import { $300, $600, $1800 } from '../../constants/breakpoint.constants.js';
import { px } from '../../utils/units.utils.js';

export default {
  breakpoint: {
    $type: 'breakpoint',

    // Defines the zone within which the content frame expands,
    // with the minimum boundary being full screen utilization,
    // and the maximum being fixed unless a full-expand/presentation mode
    // is triggered (via a button)
    layout: {
      minimum: { $value: px($300) },
      maximum: { $value: px($1800) }
    },

    // Defines the breakpoint at which the layout shifts
    // from a single column to two columns
    columns: {
      oneToTwo: { $value: px($600) }
    }
  }
};
