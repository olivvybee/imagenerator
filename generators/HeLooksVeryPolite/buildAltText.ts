import { SettingValues } from '../../types/SettingTypes';
import { HeLooksVeryPoliteSettings } from './types';

export const buildAltText = (
  settings: SettingValues<HeLooksVeryPoliteSettings>,
) => {
  const { image } = settings;

  const imageDesc = image
    ? `${image.description} has been sent in response with no additional context.`
    : "There's a blank space where a response should be.";

  return (
    'An edited screenshot of an iMessage conversation with "Bruce Landlord". ' +
    ' ' +
    'The landlord has sent a message that says "It is clear in the lease: no pets are allowed in the apt. Sorry".' +
    ' ' +
    imageDesc +
    ' ' +
    'The landlord has then replied with "OK I will make an exception because he looks very polite".'
  );
};
