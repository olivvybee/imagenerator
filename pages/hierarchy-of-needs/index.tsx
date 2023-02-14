import multilineText from '../../utils/drawMultilineText';

import { GeneratorPage } from '../../components/GeneratorPage';
import { Generator, GeneratorFunction } from '../../types/GeneratorTypes';
import {
  SettingType,
  SettingValues,
  StepperSetting,
  TextSetting,
} from '../../types/SettingTypes';
import { loadFont } from '../../utils/loadFont';

type HierarchyOfNeedsSettings = {
  numberOfSegments: StepperSetting<number>;
  segment1: TextSetting;
  segment2: TextSetting;
  segment3: TextSetting;
  segment4: TextSetting;
  segment5: TextSetting;
};

type HierarchyOfNeedsCache = {
  font: FontFace;
};

const WIDTH = 1200;
const HEIGHT = 900;

const BACKGROUND_COLOUR = 'white';
const SEGMENT_COLOURS = ['#ceb4fd', '#fdb489', '#9cc5f1', '#fed687', '#a8d5ae'];

const SEGMENT_MAP = [
  [],
  [0, 0, 0, 0],
  [0, 0, 1, 1],
  [1, 1, 2, 2],
  [1, 1, 2, 3],
  [1, 2, 3, 4],
];

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const TEXT_BOXES: Rect[][] = [
  [],
  [{ x: 205, y: 300, width: 700, height: 500 }],
  [
    { x: 205, y: 150, width: 700, height: 400 },
    { x: 105, y: 600, width: 900, height: 250 },
  ],
  [
    { x: 205, y: 50, width: 700, height: 250 },
    { x: 155, y: 325, width: 800, height: 250 },
    { x: 105, y: 600, width: 900, height: 250 },
  ],
  [
    { x: 205, y: 50, width: 700, height: 250 },
    { x: 155, y: 325, width: 800, height: 250 },
    { x: 105, y: 600, width: 900, height: 125 },
    { x: 55, y: 735, width: 1000, height: 125 },
  ],
  [
    { x: 230, y: 50, width: 650, height: 250 },
    { x: 180, y: 315, width: 750, height: 125 },
    { x: 155, y: 450, width: 800, height: 125 },
    { x: 105, y: 600, width: 900, height: 125 },
    { x: 55, y: 735, width: 1000, height: 125 },
  ],
];

const generate: GeneratorFunction<
  HierarchyOfNeedsSettings,
  HierarchyOfNeedsCache
> = async (canvas, settings, cache) => {
  const font = cache?.font || (await loadFont());

  const {
    numberOfSegments,
    segment1 = '',
    segment2 = '',
    segment3 = '',
    segment4 = '',
    segment5 = '',
  } = settings;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.fillStyle = BACKGROUND_COLOUR;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const triangleWidth = WIDTH - 150;
  const triangleHeight = HEIGHT - 60;

  ctx.fillStyle = SEGMENT_COLOURS[0];
  ctx.fillRect(0, 30, WIDTH, (2 * triangleHeight) / 6);

  const blocks = SEGMENT_MAP[numberOfSegments];
  for (let i = 0; i < blocks.length; i++) {
    const colour = SEGMENT_COLOURS[blocks[i]];
    ctx.fillStyle = colour;
    ctx.fillRect(
      0,
      30 + (i + 2) * (triangleHeight / 6),
      WIDTH,
      triangleHeight / 6
    );
  }

  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(30 + triangleWidth / 2, 30);
  ctx.lineTo(30, 30 + triangleHeight);
  ctx.lineTo(30 + triangleWidth, 30 + triangleHeight);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = BACKGROUND_COLOUR;
  ctx.beginPath();
  ctx.moveTo(30 + triangleWidth / 2, 0);
  ctx.lineTo(30 + triangleWidth / 2, 30);
  ctx.lineTo(30, 30 + triangleHeight);
  ctx.lineTo(0, HEIGHT);
  ctx.lineTo(0, 0);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(30 + triangleWidth / 2, 0);
  ctx.lineTo(30 + triangleWidth / 2, 30);
  ctx.lineTo(30 + triangleWidth, 30 + triangleHeight);
  ctx.lineTo(WIDTH, HEIGHT);
  ctx.lineTo(WIDTH, 0);
  ctx.fill();

  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(30 + triangleWidth / 2 + 40, 30);
  ctx.lineTo(30 + triangleWidth + 40, 30 + triangleHeight);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(30 + triangleWidth / 2 + 10, 30);
  ctx.lineTo(30 + triangleWidth / 2 + 40, 30);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(740, 30 + (2 * triangleHeight) / 6);
  ctx.lineTo(770, 30 + (2 * triangleHeight) / 6);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(915, 30 + (4 * triangleHeight) / 6);
  ctx.lineTo(945, 30 + (4 * triangleHeight) / 6);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(1090, 30 + triangleHeight);
  ctx.lineTo(1120, 30 + triangleHeight);
  ctx.stroke();

  ctx.font = "32px 'Atkinson Hyperlegible'";
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';

  ctx.fillText('Self-fulfillment', 740, 15 + triangleHeight / 6);
  ctx.fillText('needs', 740, 45 + triangleHeight / 6);
  ctx.beginPath();
  ctx.moveTo(730, 30 + triangleHeight / 6);
  ctx.lineTo(682, 30 + triangleHeight / 6);
  ctx.stroke();

  ctx.fillText('Psychological', 915, 15 + (3 * triangleHeight) / 6);
  ctx.fillText('needs', 915, 45 + (3 * triangleHeight) / 6);
  ctx.beginPath();
  ctx.moveTo(905, 30 + (3 * triangleHeight) / 6);
  ctx.lineTo(857, 30 + (3 * triangleHeight) / 6);
  ctx.stroke();

  ctx.fillText('Basic', 1090, 15 + (5 * triangleHeight) / 6);
  ctx.fillText('needs', 1090, 45 + (5 * triangleHeight) / 6);
  ctx.beginPath();
  ctx.moveTo(1080, 30 + (5 * triangleHeight) / 6);
  ctx.lineTo(1032, 30 + (5 * triangleHeight) / 6);
  ctx.stroke();

  const segments = [segment1, segment2, segment3, segment4, segment5].slice(
    0,
    numberOfSegments
  );

  const textBoxes = TEXT_BOXES[numberOfSegments];
  textBoxes.forEach((textBox, index) => {
    const { x, y, width, height } = textBox;
    const text = segments[index];

    ctx.textBaseline = 'bottom';

    multilineText.fontSize = 48;
    multilineText.drawText(ctx, text, x, y, width, height);
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
    cache: {
      font,
    },
  };
};

const buildAltText = (settings: SettingValues<HierarchyOfNeedsSettings>) => {
  const { segment1, segment2, segment3, segment4, segment5 } = settings;

  const segments = [segment1, segment2, segment3, segment4, segment5]
    .filter((segment) => !!segment)
    .map((segment) => segment.trim())
    .filter((segment) => !!segment);

  if (segments.length === 0) {
    return "The triangle diagram showing Maslow's Hierarchy of Needs, except the usual segments have been covered up.";
  }

  let list = '';
  if (segments.length === 1) {
    list = `"${segments[0]}"`;
  } else if (segments.length === 2) {
    list = `"${segments[0]}" and "${segments[1]}"`;
  } else {
    const head = segments
      .slice(0, -2)
      .map((text) => `"${text}"`)
      .join(', ');
    const tail = segments[segments.length - 1];
    list = `${head}, and "${tail}"`;
  }

  return `The triangle diagram showing Maslow's Hierarchy of Needs, except the usual segments have been replaced with ${list}.`;
};

export const generator: Generator<HierarchyOfNeedsSettings> = {
  generate,
  name: 'Hierarchy of needs',
  description:
    "All you need is love, and a Maslow's hierarchy of needs generator.",
  helpText:
    'Choose the number of segments you would like, then fill in each segment.',
  settings: {
    numberOfSegments: {
      type: SettingType.Stepper,
      name: 'Number of segments',
      defaultValue: 1,
      params: {
        options: [1, 2, 3, 4, 5],
        allowWrapping: false,
      },
    },
    segment1: {
      type: SettingType.Text,
      name: 'Segment 1',
      params: {},
    },
    segment2: {
      type: SettingType.Text,
      name: 'Segment 2',
      params: {},
      when: (settings) => settings.numberOfSegments >= 2,
    },
    segment3: {
      type: SettingType.Text,
      name: 'Segment 3',
      params: {},
      when: (settings) => settings.numberOfSegments >= 3,
    },
    segment4: {
      type: SettingType.Text,
      name: 'Segment 4',
      params: {},
      when: (settings) => settings.numberOfSegments >= 4,
    },
    segment5: {
      type: SettingType.Text,
      name: 'Segment 5',
      params: {},
      when: (settings) => settings.numberOfSegments >= 5,
    },
  },
};

const HierarchyOfNeedsGenerator = () => <GeneratorPage generator={generator} />;

export default HierarchyOfNeedsGenerator;
