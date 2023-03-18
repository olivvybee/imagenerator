import { SettingValues } from '../../types/SettingTypes';
import { ExcitedSlimeSettings } from './types';

export const buildAltText = (settings: SettingValues<ExcitedSlimeSettings>) => {
  const { firstPanel, secondPanel, thirdPanel } = settings;

  const descriptions = [firstPanel, secondPanel, thirdPanel].map((panel) =>
    panel ? `"${panel}"` : 'The text panel is blank'
  );

  return (
    'A meme with three rows, where each row has some text and an image of a slime from dragon quest.' +
    ' ' +
    `Row 1: ${descriptions[0]} and the slime is smiling.` +
    ' ' +
    `Row 2: ${descriptions[1]} and the slime is making a shocked face with its mouth open.` +
    ' ' +
    `Row 3: ${descriptions[2]} and the slime has tilted back from excitement. Its mouth is stretched even wider with excitement.`
  );
};
