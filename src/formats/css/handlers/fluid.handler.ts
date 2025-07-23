import { TokenTypeHandlerParams } from '../../../types';
import {
  defineSection,
  mapFluidTokensToCalcTokens,
  mapFluidTokensToMaxTokens,
  mapFluidTokensToMinTokens,
  separateFluidTokens,
  tab
} from '../../../utils';
import { defineCssCustomProperties, wrapInRoot } from '../utils';

const fluidHandler = (
  name: string,
  { options, tokens, config }: TokenTypeHandlerParams
): string => {
  // Define the output array
  const output: string[] = [];
  const { fluidTokens, regularTokens } = separateFluidTokens(tokens);

  if (regularTokens.length) {
    output.push(wrapInRoot(defineCssCustomProperties(regularTokens)) + '\n');
  }

  const { fluidScaleScheme, baseFontSize } = options || {};
  const { minViewportW, maxViewportW } = fluidScaleScheme;

  // min
  output.push(`@media all and (max-width: ${minViewportW - 1}px) {`);
  output.push(
    wrapInRoot(defineCssCustomProperties(mapFluidTokensToMinTokens(fluidTokens), tab(2)), tab())
  );
  output.push('}\n');

  // calc
  output.push(`@media all and (min-width: ${minViewportW}px) and (max-width: ${maxViewportW}px) {`);
  output.push(
    wrapInRoot(
      defineCssCustomProperties(
        mapFluidTokensToCalcTokens(fluidTokens, baseFontSize, fluidScaleScheme),
        tab(2)
      ),
      tab()
    )
  );
  output.push('}\n');

  // max
  output.push(`@media all and (min-width: ${maxViewportW + 1}px) {`);
  output.push(
    wrapInRoot(defineCssCustomProperties(mapFluidTokensToMaxTokens(fluidTokens), tab(2)), tab())
  );
  output.push('}');

  return defineSection(name, output.join('\n'), config?.noFlagComment);
};

export default fluidHandler;
