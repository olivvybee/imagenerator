import path from 'path';
import fs from 'fs';

import { Generator } from '../types/GeneratorTypes';
import { buildMockSettingValues } from '../test-utils';

jest.mock('../utils/loadImage', () => ({
  loadImage: jest.fn(() => {
    const img = document.createElement('img');
    img.width = 600;
    img.height = 600;
    return img;
  }),
}));

jest.mock('../utils/loadFont', () => ({
  loadFont: jest.fn(),
}));

const getGenerators = () => {
  const dirs = fs.readdirSync('./generators');
  const generators: Generator[] = [];

  dirs.forEach((dir) => {
    const dirPath = path.resolve('./generators', dir);

    if (!fs.statSync(dirPath).isDirectory()) {
      return;
    }

    const index = path.resolve(dirPath, 'index.ts');
    const generatorModule = require(index);

    const generator = Object.values(generatorModule)[0];
    generators.push(generator as Generator);
  });

  return generators;
};

const buildTests = () => {
  const generators = getGenerators();

  describe('generator metadata', () => {
    it('has a unique name for all generators', () => {
      const names = generators.map((generator) => generator.name);
      expect(names).toContainNoDuplicates();
    });
  });

  generators.forEach((generator) => {
    describe(generator.name, () => {
      it('has a description', () => {
        expect(generator.description).not.toBeFalsy();
      });

      it('has help text', () => {
        expect(generator.helpText).not.toBeFalsy();
      });

      it('has a unique name for all settings', () => {
        const names = Object.values(generator.settings).map(
          (setting) => setting.name
        );
        expect(names).toContainNoDuplicates();
      });

      it('generates alt text', async () => {
        const canvas = document.createElement('canvas');

        const mockSettingValues = buildMockSettingValues(generator.settings);
        const result = await generator.generate(canvas, mockSettingValues);
        expect(result.suggestedAltText).not.toBeFalsy();
      });
    });
  });
};

buildTests();
