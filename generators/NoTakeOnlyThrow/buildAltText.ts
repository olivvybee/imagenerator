import { SettingValues } from '../../types/SettingTypes';
import { NoTakeOnlyThrowSettings } from './types';

export const buildAltText = (
  settings: SettingValues<NoTakeOnlyThrowSettings>
) => {
  const { panel1, panel2, panel3 } = settings;

  const panel1Image =
    "In the first panel, the dog has its eyebrows raised like it's pleading, and it's holding a frisbee in its mouth.";
  const panel2Image =
    'In the second panel, a hand is trying to take the frisbee, but the dog looks angry.';
  const panel3Image =
    'In the final panel, the dog is still angry and still holding the frisbee.';

  const [panel1Text, panel2Text, panel3Text] = [panel1, panel2, panel3].map(
    (panel) =>
      panel ? `The text says "${panel}".` : "There's no text in the panel."
  );

  return `A three panel comic featuring a dog with big floppy ears. ${panel1Image} ${panel1Text} ${panel2Image} ${panel2Text} ${panel3Image} ${panel3Text}`;
};
