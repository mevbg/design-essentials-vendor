import { Monochrome, Red, Green } from '../colors.constants.js';

export const light = {
  content: {
    primary: {
      base: Monochrome.BLACK,
      inverted: Monochrome.WHITE
    },
    red: {
      base: Red.RED_50
    },
    green: {
      base: Green.GREEN_50
    },
    gray: {
      strongest: Monochrome.GRAY_20,
      strong: Monochrome.GRAY_40,
      medium: Monochrome.GRAY_60,
      weak: Monochrome.GRAY_80,
      weakest: Monochrome.GRAY_90
    }
  },

  background: {
    primary: {
      base: Monochrome.WHITE,
      inverted: Monochrome.BLACK,
    },
    gray: {
      strongest: Monochrome.GRAY_20,
      strong: Monochrome.GRAY_40,
      medium: Monochrome.GRAY_60,
      weak: Monochrome.GRAY_80,
      weakest: Monochrome.GRAY_90
    },
    red: {
      base: Red.RED_50,
      weak: Red.RED_70,
      weakest: Red.RED_90
    },
    green: {
      base: Green.GREEN_50,
      weak: Green.GREEN_70,
      weakest: Green.GREEN_90
    }
  }
};
