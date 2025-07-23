import { Monochrome, Red, Green } from '../colors.constants.js';

export const dark = {
  content: {
    primary: {
      base: Monochrome.WHITE,
      inverted: Monochrome.BLACK
    },
    red: {
      base: Red.RED_70
    },
    green: {
      base: Green.GREEN_70
    },
    gray: {
      strongest: Monochrome.GRAY_90,
      strong: Monochrome.GRAY_80,
      medium: Monochrome.GRAY_60,
      weak: Monochrome.GRAY_40,
      weakest: Monochrome.GRAY_20
    }
  },

  background: {
    primary: {
      base: Monochrome.BLACK,
      inverted: Monochrome.WHITE,
    },
    gray: {
      strongest: Monochrome.GRAY_90,
      strong: Monochrome.GRAY_80,
      medium: Monochrome.GRAY_60,
      weak: Monochrome.GRAY_40,
      weakest: Monochrome.GRAY_20
    },
    red: {
      base: Red.RED_90,
      weak: Red.RED_70,
      weakest: Red.RED_50
    },
    green: {
      base: Green.GREEN_90,
      weak: Green.GREEN_70,
      weakest: Green.GREEN_50
    }
  }
};
