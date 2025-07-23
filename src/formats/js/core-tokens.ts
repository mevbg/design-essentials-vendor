import { TokenTypeHandlerParams } from '../../types';
import getStaticHandler from './handlers/static';
import getVariableHandler from './handlers/variable';

const handlerTypes = {
  static: getStaticHandler,
  variable: getVariableHandler
};

export type HandlerType = keyof typeof handlerTypes;

// Border
export const borderColor = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Border Color', p);
export const borderRadius = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Border Radius', p);
export const borderStyle = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Border Style', p);
export const borderWidth = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Border Width', p);

// Breakpoint
export const breakpoint = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Breakpoint', p);

// Color
export const color = (p: TokenTypeHandlerParams, h: HandlerType) => handlerTypes[h]('Color', p);

// Dimensions
export const dimensions = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Dimensions', p);

// Icon
export const icon = (p: TokenTypeHandlerParams, h: HandlerType) => handlerTypes[h]('Icon', p);

// Opacity
export const opacity = (p: TokenTypeHandlerParams, h: HandlerType) => handlerTypes[h]('Opacity', p);

// Shadow
export const boxShadow = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Box Shadow', p);

// Size
export const size = (p: TokenTypeHandlerParams, h: HandlerType) => handlerTypes[h]('Size', p);

// Transition
export const transition = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Transition', p);

// Typography
export const fontFamily = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Font Family', p);
export const fontSize = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Font Size', p);
export const fontWeight = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Font Weight', p);
export const letterSpacing = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Letter Spacing', p);
export const lineHeight = (p: TokenTypeHandlerParams, h: HandlerType) =>
  handlerTypes[h]('Line Height', p);
