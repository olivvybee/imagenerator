import { SettingValues } from '../../types/SettingTypes';
import { oxfordComma } from '../../utils/oxfordComma';
import { EndlessCycleSettings } from './types';

export const buildAltText = (settings: SettingValues<EndlessCycleSettings>) => {
  const { numberOfSteps, step1, step2, step3, step4 } = settings;

  const steps = [step1, step2, step3, step4]
    .map((step) => (step ? `"${step}"` : 'an empty space'))
    .slice(0, numberOfSteps);

  return `A meme showing a cycle of events where each step has an arrow pointing to the next, and the last one starts the cycle again. The steps are ${oxfordComma(
    steps
  )}.`;
};
