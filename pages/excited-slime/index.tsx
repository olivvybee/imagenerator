import { GeneratorPage } from '../../components/GeneratorPage';
import { Generator, GeneratorFunction } from '../../types/GeneratorTypes';
import {
  SettingType,
  SettingValues,
  TextSetting,
} from '../../types/SettingTypes';
import { loadImage } from '../../utils/loadImage';
import { setupCanvas } from '../../utils/setupCanvas';
import multilineText from '../../utils/multilineText';

type ExcitedSlimeSettings = {
  firstPanel: TextSetting;
  secondPanel: TextSetting;
  thirdPanel: TextSetting;
};

type ExcitedSlimeCache = {
  backgroundImage: HTMLImageElement;
};

const generate: GeneratorFunction<
  ExcitedSlimeSettings,
  ExcitedSlimeCache
> = async (canvas, settings, cache) => {
  const backgroundImage =
    cache?.backgroundImage || (await loadImage('/assets/excited-slime.jpg'));

  const ctx = await setupCanvas(canvas, { backgroundImage });
  if (!ctx) {
    return {
      success: false,
    };
  }

  const { firstPanel = '', secondPanel = '', thirdPanel = '' } = settings;

  multilineText.font = 'Atkinson Hyperlegible';
  multilineText.fontSize = 48;
  multilineText.background = false;
  multilineText.drawText(ctx, firstPanel, 16, 0, 485, 375);
  multilineText.drawText(ctx, secondPanel, 16, 381, 485, 370);
  multilineText.drawText(ctx, thirdPanel, 16, 757, 485, 367);

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
    cache: {
      backgroundImage,
    },
  };
};

const buildAltText = (settings: SettingValues<ExcitedSlimeSettings>) => {
  const { firstPanel, secondPanel, thirdPanel } = settings;

  const descriptions = [firstPanel, secondPanel, thirdPanel].map((panel) =>
    panel ? `"${panel}"` : 'The text panel is blank'
  );

  return (
    'A meme with three rows, where each row has some text and an image of a slime from dragon quest.' +
    ' ' +
    `Row 1: ${descriptions[0]} and the slime is smiling.` +
    ' ' +
    `Row 2: ${descriptions[1]} and the slime is making a shocked face with its mouth open.` +
    ' ' +
    `Row 3: ${descriptions[2]} and the slime has tilted back from excitement. Its mouth is stretched even wider with excitement.`
  );
};

export const generator: Generator<ExcitedSlimeSettings> = {
  generate,
  name: 'Excited slime',
  description:
    "The dragon quest slime is getting progressively more excited about the memes you're making.",
  helpText: 'Enter text for each panel to create an image.',
  settings: {
    firstPanel: {
      type: SettingType.Text,
      name: 'First panel',
      params: {},
    },
    secondPanel: {
      type: SettingType.Text,
      name: 'Second panel',
      params: {},
    },
    thirdPanel: {
      type: SettingType.Text,
      name: 'Third panel',
      params: {},
    },
  },
};

const ExcitedSlimeGenerator = () => <GeneratorPage generator={generator} />;

export default ExcitedSlimeGenerator;
