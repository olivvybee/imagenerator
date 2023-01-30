import {
  DropdownSetting,
  SettingType,
  SettingValues,
  TextSetting,
} from '../../types/SettingTypes';
import { Generator, GeneratorFunction } from '../../types/GeneratorTypes';
import { GeneratorPage } from '../../components/GeneratorPage';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';

type EldenRingSettings = {
  firstLineFormat: DropdownSetting;
  firstLineText: TextSetting;
  conjunction: DropdownSetting;
  secondLineFormat: DropdownSetting;
  secondLineText: TextSetting;
};

type EldenRingCache = {
  font: FontFace;
  icon: HTMLImageElement;
};

const WIDTH = 850;
const HEIGHT = 190;

export const FORMATS = [
  '*** ahead',
  'No *** ahead',
  '*** required ahead',
  'Be wary of ***',
  'Try ***',
  'Likely ***',
  'First off, ***',
  'Seek ***',
  'Still no ***...',
  'Why is it always ***?',
  'If only I had a ***...',
  "Didn't expect ***...",
  'Visions of ***...',
  'Could this be a ***?',
  'Time for ***',
  '***, O ***',
  'Behold, ***!',
  'Offer ***',
  'Praise the ***!',
  'Let there be ***',
  'Ahh, ***...',
  '***',
  '***!',
  '***?',
  '***...',
];

export const CONJUNCTIONS = [
  '(none)',
  '\nand then',
  '\nor',
  '\nbut',
  '\ntherefore',
  '\nin short',
  '\nexcept',
  '\nby the way',
  '\nso to speak',
  '\nall the more',
  ',\n',
];

const generate: GeneratorFunction<EldenRingSettings, EldenRingCache> = async (
  canvas,
  settings,
  cache
) => {
  const font =
    cache?.font || (await loadFont('Garamond', '/fonts/EB-Garamond.woff2'));
  const icon = cache?.icon || (await loadImage('/assets/elden-ring-icon.png'));

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  drawBackground(ctx);
  drawBorders(ctx);
  drawButtons(ctx);

  ctx.drawImage(icon, 56, 60);

  const text = buildText(settings);
  drawText(ctx, text);

  const singleLineText = text.replaceAll('\n', ' ');
  const suggestedAltText = `An Elden Ring message box that says "${singleLineText}".`;

  return {
    success: true,
    suggestedAltText,
    cache: {
      font,
      icon,
    },
  };
};

const drawBackground = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
  gradient.addColorStop(0, 'rgba(21, 20, 16, 0)');
  gradient.addColorStop(0.05, 'rgba(21, 20, 16, 0.9)');
  gradient.addColorStop(0.2, 'rgba(21, 20, 16, 0.97)');
  gradient.addColorStop(0.8, 'rgba(21, 20, 16, 0.97)');
  gradient.addColorStop(0.95, 'rgba(21, 20, 16, 0.9)');
  gradient.addColorStop(1, 'rgba(21, 20, 16, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
};

const drawBorders = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
  gradient.addColorStop(0, 'rgba(143, 141, 123, 0)');
  gradient.addColorStop(0.05, 'rgba(143, 141, 123, 0.8)');
  gradient.addColorStop(0.2, 'rgba(143, 141, 123, 0.95)');
  gradient.addColorStop(0.8, 'rgba(143, 141, 123, 0.95)');
  gradient.addColorStop(0.95, 'rgba(143, 141, 123, 0.8)');
  gradient.addColorStop(1, 'rgba(143, 141, 123, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, 4);
  ctx.fillRect(0, 145, WIDTH, 2);
  ctx.fillRect(0, HEIGHT - 4, WIDTH, 4);
};

const drawButtons = (ctx: CanvasRenderingContext2D) => {
  let centerX = 295;
  let centerY = HEIGHT - 23;

  // Y button
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(179, 175, 96)';
  ctx.fillStyle = 'rgb(15, 8, 0)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX, centerY + 5);
  ctx.moveTo(centerX, centerY + 1);
  ctx.lineTo(centerX - 4, centerY - 4);
  ctx.moveTo(centerX, centerY + 1);
  ctx.lineTo(centerX + 4, centerY - 4);
  ctx.stroke();

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'middle';
  ctx.fillText(':Close', centerX + 16, centerY);

  // Select button
  centerX = 393;
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(200, 200, 200)';
  ctx.fillStyle = 'rgb(15, 8, 0)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.strokeRect(centerX - 6, centerY - 5, 8, 6);
  ctx.fillRect(centerX - 2, centerY - 1, 8, 6);
  ctx.strokeRect(centerX - 2, centerY - 1, 8, 6);

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'middle';
  ctx.fillText(':Good', centerX + 16, centerY);

  // Start button
  centerX = 492;
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(200, 200, 200)';
  ctx.fillStyle = 'rgb(15, 8, 0)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX - 5, centerY - 4);
  ctx.lineTo(centerX + 5, centerY - 4);
  ctx.moveTo(centerX - 5, centerY);
  ctx.lineTo(centerX + 5, centerY);
  ctx.moveTo(centerX - 5, centerY + 4);
  ctx.lineTo(centerX + 5, centerY + 4);
  ctx.stroke();

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'middle';
  ctx.fillText(':Poor', centerX + 16, centerY);
};

const buildText = (settings: SettingValues<EldenRingSettings>) => {
  const a = settings.firstLineFormat.replaceAll(
    '***',
    settings.firstLineText || '***'
  );
  const b = settings.secondLineFormat.replaceAll(
    '***',
    settings.secondLineText || '***'
  );

  return settings.conjunction === CONJUNCTIONS[0]
    ? a
    : `${a}${settings.conjunction} ${b}`;
};

const drawText = (ctx: CanvasRenderingContext2D, text: string) => {
  const [line1, line2] = text.split('\n').map((s) => s.trim());

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'top';

  if (line2) {
    ctx.fillText(line1.trim(), 165, 35);
    ctx.fillText(line2.trim(), 165, 75);
  } else {
    ctx.fillText(line1.trim(), 165, 55);
  }
};

export const generator: Generator<EldenRingSettings> = {
  generate,
  name: 'Try fingers, but hole',
  helpText:
    'Create a message using one or two lines of text. The second line will appear after choosing a joining phrase.',
  description: 'Create your own Elden Ring messages.',
  settings: {
    firstLineFormat: {
      name: 'First line format',
      type: SettingType.Dropdown,
      params: {
        options: FORMATS,
      },
    },
    firstLineText: {
      name: 'First line text',
      type: SettingType.Text,
      params: {},
    },
    conjunction: {
      name: 'Joining phrase',
      type: SettingType.Dropdown,
      params: {
        options: CONJUNCTIONS,
      },
    },
    secondLineFormat: {
      name: 'Second line format',
      type: SettingType.Dropdown,
      params: {
        options: FORMATS,
      },
      when: (settings) => settings.conjunction !== '(none)',
    },
    secondLineText: {
      name: 'Second line text',
      type: SettingType.Text,
      params: {},
      when: (settings) => settings.conjunction !== '(none)',
    },
  },
};

const EldenRingGenerator = () => <GeneratorPage generator={generator} />;

export default EldenRingGenerator;
