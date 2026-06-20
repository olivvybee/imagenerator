import { SettingValues } from '../../types/SettingTypes';
import { SisyphusSettings } from './types';

export const buildAltText = (settings: SettingValues<SisyphusSettings>) => {
  const { boulder, sisyphus } = settings;

  const boulderDescription = boulder
    ? `The boulder is labelled "${boulder}"`
    : '';

  const sisyphusDescription = sisyphus
    ? `Sisyphus is labelled "${sisyphus}"`
    : '';

  const labels =
    boulderDescription && sisyphusDescription
      ? `${boulderDescription} and ${sisyphusDescription}.`
      : boulderDescription || sisyphusDescription
        ? `${boulderDescription || sisyphusDescription}.`
        : '';

  return `An illustration of Sisyphus pushing the boulder up the hill. ${labels}`.trim();
};
