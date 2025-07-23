import { TokenTypeHandlerParams } from '../../types';
import getHandler from './handlers';

// Border
export const borderColor = (p: TokenTypeHandlerParams) => getHandler('Border Color', p);
export const borderRadius = (p: TokenTypeHandlerParams) => getHandler('Border Radius', p);
export const borderStyle = (p: TokenTypeHandlerParams) => getHandler('Border Style', p);
export const borderWidth = (p: TokenTypeHandlerParams) => getHandler('Border Width', p);

// Breakpoint
export const breakpoint = (p: TokenTypeHandlerParams) => getHandler('Breakpoint', p);

// Color
export const color = (p: TokenTypeHandlerParams) => getHandler('Color', p);

// Dimensions
export const dimensions = (p: TokenTypeHandlerParams) => getHandler('Dimensions', p);

// Icon
export const icon = (p: TokenTypeHandlerParams) => getHandler('Icon', p);

// Opacity
export const opacity = (p: TokenTypeHandlerParams) => getHandler('Opacity', p);

// Shadow
export const boxShadow = (p: TokenTypeHandlerParams) => getHandler('Box Shadow', p);

// Size
export const size = (p: TokenTypeHandlerParams) => getHandler('Size', p);

// Transition
export const transition = (p: TokenTypeHandlerParams) => getHandler('Transition', p);

// Typography
export const fontFamily = (p: TokenTypeHandlerParams) => getHandler('Font Family', p);
export const fontSize = (p: TokenTypeHandlerParams) => getHandler('Font Size', p);
export const fontWeight = (p: TokenTypeHandlerParams) => getHandler('Font Weight', p);
export const letterSpacing = (p: TokenTypeHandlerParams) => getHandler('Letter Spacing', p);
export const lineHeight = (p: TokenTypeHandlerParams) => getHandler('Line Height', p);
