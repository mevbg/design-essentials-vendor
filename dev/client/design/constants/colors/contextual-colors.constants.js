import * as Schemes from './schemes/index.js';

export const content    = (colorSchemeName) => Schemes[colorSchemeName].content;
export const background = (colorSchemeName) => Schemes[colorSchemeName].background;
