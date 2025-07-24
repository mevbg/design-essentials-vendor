import * as Schemes from './schemes/index';

export const content    = (colorSchemeName) => Schemes[colorSchemeName].content;
export const background = (colorSchemeName) => Schemes[colorSchemeName].background;
