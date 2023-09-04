import { SettingType, Settings } from '../types/SettingTypes';

export const buildMockSettingValues = (settings: Settings) =>
  Object.entries(settings).reduce((processed, [key, setting]) => {
    if (setting.defaultValue) {
      return { ...processed, [key]: setting.defaultValue };
    }

    switch (setting.type) {
      case SettingType.Text:
        return { ...processed, [key]: 'mock-text-value' };

      case SettingType.Colour:
        return {
          ...processed,
          [key]: { name: 'mock-colour-value', hex: '#123456' },
        };

      case SettingType.Image:
        return {
          ...processed,
          [key]: {
            src: '/mock-image.jpg',
            crop: { x: 0, y: 0, width: 100, height: 100, unit: '%' },
          },
        };

      case SettingType.Slider:
        return { ...processed, [key]: setting.params.min };

      case SettingType.Dropdown:
        return { ...processed, [key]: setting.params.options[0] };

      case SettingType.Stepper:
        return { ...processed, [key]: setting.params.options[0] };
    }

    return { ...processed };
  }, {});
