import { SettingValues } from '../../types/SettingTypes';
import { DramaticCrossroadsSettings, Variant } from './types';

export const buildAltText = (
  settings: SettingValues<DramaticCrossroadsSettings>
) => {
  const { leftPath, rightPath, person, variant } = settings;

  const personDesc = person
    ? `A person labelled "${person}" is standing at a fork in the road, with each path leading up to a castle standing on a cliff.`
    : 'A person is standing at a fork in the road, with each path leading up to a castle standing on a cliff.';

  const variantDesc = getVariantDescription(variant);

  const leftPathDesc = leftPath
    ? ` The castle on the left is labelled "${leftPath}".`
    : '';
  const rightPathDesc = rightPath
    ? ` The castle on the right is labelled "${rightPath}".`
    : '';

  return `${personDesc} ${variantDesc}${leftPathDesc}${rightPathDesc}`;
};

const getVariantDescription = (variant: string) => {
  switch (variant) {
    case Variant.GoodAndEvil:
      return 'The left castle is bright and clean, and is glowing with light under a clear blue sky. The right castle is dark and crumbling and there are dark clouds in the sky with lightning striking the roof.';

    case Variant.BothEvil:
      return 'Both castles are dark and crumbling, and there are dark clouds in the sky with lightning striking the roof of the castles.';

    case Variant.BothGood:
      return 'Both castles are bright and clean, and are glowing with light under a clear blue sky.';

    default:
      return '';
  }
};
