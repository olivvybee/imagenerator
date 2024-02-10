import { SettingValues } from '../../types/SettingTypes';
import { VennDiagramSettings } from './types';

export const buildAltText = (settings: SettingValues<VennDiagramSettings>) => {
  const { leftCircle, rightCircle, overlap: overlapText } = settings;

  const left = leftCircle
    ? `The left circle is labelled with "${leftCircle.trim()}".`
    : 'The left circle is empty.';
  const right = rightCircle
    ? `The right circle is labelled with "${rightCircle.trim()}".`
    : 'The right circle is empty.';
  const overlap = overlapText
    ? `The overlap is labelled with "${overlapText.trim()}".`
    : 'The overlap is empty.';

  return `A venn diagram with two circles. ${left} ${right} ${overlap}`;
};
