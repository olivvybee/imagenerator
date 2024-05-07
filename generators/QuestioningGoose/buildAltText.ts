import { SettingValues } from '../../types/SettingTypes';
import { QuestioningGooseSettings } from './types';

export const buildAltText = (
  settings: SettingValues<QuestioningGooseSettings>
) => {
  const { offscreenText, topPanelText, bottomPanelText } = settings;

  const offscreen = offscreenText
    ? ` someone offscreen is saying "${offscreenText}".`
    : '';

  const topText = topPanelText ? ` and is saying "${topPanelText}".` : '.';
  const topStart = offscreenText ? ' The' : ' the';
  const top = `${topStart} goose has its eyes narrowed with suspicion${topText}`;

  const bottomText = bottomPanelText
    ? `, shouting "${bottomPanelText.toUpperCase()}".`
    : '.';
  const bottom = `In the second panel, the goose is chasing someone down a hill${bottomText}`;

  return `A two panel comic featuring a goose. In the first panel,${offscreen}${top} ${bottom}`;
};
