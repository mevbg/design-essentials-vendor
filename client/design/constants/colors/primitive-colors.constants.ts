import * as Colors from './colors.constants';
import { upperSnakeToLowerKebab } from '../../utils/strings.utils';

const modifyToPrimitive = (obj) => Object.fromEntries(
  Object.entries(obj).map(([key, value]) => [upperSnakeToLowerKebab(key), value])
);

export const monochrome = modifyToPrimitive(Colors.Monochrome);
export const red        = modifyToPrimitive(Colors.Red);
export const green      = modifyToPrimitive(Colors.Green);
export const brand      = modifyToPrimitive(Colors.Brand);
