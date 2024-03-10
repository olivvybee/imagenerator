import { SettingValues } from '../../types/SettingTypes';
import { ExcitedSlimeSettings } from './types';

export const buildAltText = (settings: SettingValues<ExcitedSlimeSettings>) => {
  const { firstPanel, secondPanel, thirdPanel, includeSadPanel, fourthPanel } =
    settings;

  const descriptions = [firstPanel, secondPanel, thirdPanel, fourthPanel].map(
    (panel) => (panel ? `says "${panel}"` : 'has a blank text panel')
  );

  const hasSadPanel = includeSadPanel === 'Yes';
  const rowCount = hasSadPanel ? 'four' : 'three';

  let text =
    `A meme with ${rowCount} rows, where each row has some text and an image of a slime from dragon quest.` +
    ' ' +
    `Row 1 ${descriptions[0]} and the slime is smiling.` +
    ' ' +
    `Row 2 ${descriptions[1]} and the slime is making a shocked face with its mouth open.` +
    ' ' +
    `Row 3 ${descriptions[2]} and the slime has tilted back from excitement. Its mouth is stretched even wider with excitement.`;

  if (hasSadPanel) {
    text +=
      ' ' +
      `Row 4 ${descriptions[3]} and the slime has returned to its original position and now looks sad.`;
  }

  return text;
};
