import StyleDictionary from 'style-dictionary';
import * as formats from './formats/index.js';

export default ({ sourcePath, buildPath, prefix, vpMin, vpMax, baseFontSize }) => {
  Object.values(formats).forEach((getFormat) => {
    StyleDictionary.registerFormat(
      getFormat({ prefix, vpMin, vpMax, baseFontSize })
    );
  });

  return {
    source: [`${sourcePath}/index.js`],

    platforms: {
      css: {
        transformGroup: 'scss',
        buildPath: buildPath,
        files: [
          {
            destination: 'css-vars.tokens.scss',
            format: 'css/css-vars'
          }
        ]
      },

      scss: {
        transformGroup: 'scss',
        buildPath: buildPath,
        files: [
          {
            destination: 'sass.tokens.scss',
            format: 'scss/map-deep'
          }
        ]
      },

      js: {
        transformGroup: 'js',
        buildPath: buildPath,
        files: [
          {
            destination: 'js-objects.tokens.js',
            format: 'javascript/js-objects'
          },
          {
            destination: 'css-vars.tokens.js',
            format: 'javascript/css-vars'
          },
          {
            destination: 'js-constants.tokens.js',
            format: 'javascript/es6'
          }
        ]
      }
    }
  }
};
