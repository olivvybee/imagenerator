import { Generator } from '../types/GeneratorTypes';
import { Settings } from '../types/SettingTypes';

export const getAllGenerators = async () => {
  const context = require.context(
    '../pages',
    true,
    /^(?!.*\.(?:css)$)pages\/.*\/index.tsx/
  );

  const promises = context.keys().map(async (key) => {
    const exports = await context(key);

    const generator = exports.generator as Generator<Settings>;
    if (!generator) {
      return undefined;
    }

    return {
      route: key.replace('pages/', '').replace('/index.tsx', ''),
      name: generator.name,
      description: generator.description,
    };
  });

  const generators = await Promise.all(promises);

  return generators.filter(Boolean);
};
