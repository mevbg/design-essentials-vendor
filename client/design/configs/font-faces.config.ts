import type { FontFacesGeneratorParams } from '../../../src/types/index.js';

export const fontFaces: FontFacesGeneratorParams = {
  sourcePath: 'client/fonts',
  fonts: {
    Gotham: {
      XLight: 200,
       Light: 300,
        Book: 400,
      Medium: 500,
        Bold: 600,
       Black: 700,
    }
  }
};
