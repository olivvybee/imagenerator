import { SettingValues } from '../../types/SettingTypes';
import { SorryImLateSettings } from './types';

export const buildAltText = (settings: SettingValues<SorryImLateSettings>) => {
  const { panel1Text, panel2Text } = settings;

  const panel1Description = panel1Text
    ? `saying "${panel1Text}"`
    : 'and has an empty speech bubble';
  const panel2Description = panel2Text ? `"${panel2Text}"` : 'nothing';

  return (
    'A two panel comic. ' +
    `In the first panel, a woman in a long black coat and black hair tied in a ponytail is walking through a door ${panel1Description}. ` +
    `In the second panel, another woman in a leather jacket and shoulder length brown hair is leaning through the doorway saying ${panel2Description}. ` +
    'The first woman is sighing.'
  );
};
