import { Generator } from '../types/GeneratorTypes';
import { Settings } from '../types/SettingTypes';

export const getAllGenerators = async () => {
  const context = require.context(
    '../pages',
    true,
    /^(?!.*\.(?:css)$)pages\/.*\/index.tsx/
  );

  const generators = context.keys().map((key) => {
    const generator = context(key).generator as Generator<Settings>;
    if (!generator) {
      return undefined;
    }

    return {
      route: key.replace('pages/', '').replace('/index.tsx', ''),
      name: generator.name,
      description: generator.description,
    };
  });

  return generators.filter(Boolean);
};
