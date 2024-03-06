/**
 * Loosely based on https://github.com/geongeorge/Canvas-Txt under MIT license
 */

export type TextAlign = 'left' | 'center' | 'right';
export type VerticalAlign = 'top' | 'middle' | 'bottom';

export interface BackgroundParams {
  background?: boolean;
  padding?: number;
}

export interface MultilineTextOptions {
  debug: boolean;
  align: TextAlign;
  vAlign: VerticalAlign;
  fontSize: number;
  fontWeight: string;
  fontFace: string;
  lineHeight: number;
  colour: string;
  background: boolean;
  opaqueBackground: boolean;
  backgroundPadding: number;
}

export interface DrawTextParams {
  x: number;
  y: number;
  width: number;
  height: number;
}

const buildFont = ({ fontWeight, fontSize, fontFace }: MultilineTextOptions) =>
  `${fontWeight} ${fontSize}px ${fontFace}`;

const getHorizontalAnchor = ({
  x,
  width,
  align,
}: Pick<DrawTextParams, 'x' | 'width'> &
  Pick<MultilineTextOptions, 'align'>) => {
  switch (align) {
    case 'left':
      return x;
    case 'right':
      return x + width;
    case 'center':
      return x + width / 2;
  }
};

const getVerticalAnchor = ({
  y,
  height,
  vAlign,
}: Pick<DrawTextParams, 'y' | 'height'> &
  Pick<MultilineTextOptions, 'vAlign'>) => {
  switch (vAlign) {
    case 'top':
      return y;
    case 'bottom':
      return y + height;
    case 'middle':
      return y + height / 2;
  }
};

const getHorizontalStart = (
  x: number,
  width: number,
  textWidth: number,
  align: TextAlign
) => {
  switch (align) {
    case 'left':
      return x;

    case 'right':
      return x + width - textWidth;

    case 'center':
      return x + width / 2 - textWidth / 2;
  }
};

const getVerticalStart = (
  y: number,
  height: number,
  textHeight: number,
  vAlign: VerticalAlign
) => {
  switch (vAlign) {
    case 'top':
      return y;

    case 'bottom':
      return y + height - textHeight;

    case 'middle':
      return y + height / 2 - textHeight / 2;
  }
};

export class MultilineText {
  private ctx: CanvasRenderingContext2D;

  options: MultilineTextOptions = {
    debug: false,
    align: 'center',
    vAlign: 'middle',
    fontSize: 14,
    fontWeight: '',
    fontFace: 'Atkinson Hyperlegible',
    lineHeight: 1,
    colour: '#000000',
    background: false,
    opaqueBackground: false,
    backgroundPadding: 8,
  };

  constructor(
    ctx: CanvasRenderingContext2D,
    options: Partial<MultilineTextOptions> = {}
  ) {
    this.ctx = ctx;
    this.options = { ...this.options, ...options };
  }

  drawText = (
    text: string,
    {
      x,
      y,
      width,
      height,
      ...overrideOptions
    }: DrawTextParams & Partial<MultilineTextOptions>
  ) => {
    const options = { ...this.options, ...overrideOptions };

    if (width <= 0 || height <= 0 || options.fontSize <= 0 || !text) {
      return { height: 0, width: 0 };
    }

    const previousFont = this.ctx.font;
    const font = buildFont(options);
    this.ctx.font = font;

    const previousAlign = this.ctx.textAlign;
    const previousBaseline = this.ctx.textBaseline;
    const previousFill = this.ctx.fillStyle;
    const previousAlpha = this.ctx.globalAlpha;

    this.ctx.textAlign = options.align;
    this.ctx.textBaseline = 'middle';

    const horizontalAnchor = getHorizontalAnchor({
      x,
      width,
      align: options.align,
    });
    const verticalAnchor = getVerticalAnchor({
      y,
      height,
      vAlign: options.vAlign,
    });

    const lines = text.split('\n');
    const wrappedLines: string[] = [];
    let boundingWidth = 0;

    lines.forEach((line) => {
      const words = line.split(' ');

      let currentLine = words[0];
      let currentWidth = this.ctx.measureText(currentLine).width;

      for (var i = 1; i < words.length; i++) {
        let word = words[i];
        const textWidth = this.ctx.measureText(currentLine + ' ' + word).width;
        if (textWidth <= width) {
          currentLine += ' ' + word;
          currentWidth = textWidth;
        } else {
          wrappedLines.push(currentLine);
          currentLine = word;

          if (currentWidth > boundingWidth) {
            boundingWidth = currentWidth;
          }

          currentWidth = this.ctx.measureText(currentLine).width;
        }
      }

      if (currentWidth > boundingWidth) {
        boundingWidth = currentWidth;
      }

      wrappedLines.push(currentLine);
    });

    const lineSpacing = options.fontSize * options.lineHeight;
    const totalHeight = wrappedLines.length * lineSpacing;

    const horizontalStart = getHorizontalStart(
      x,
      width,
      boundingWidth,
      options.align
    );
    const verticalStart = getVerticalStart(
      y,
      height,
      totalHeight,
      options.vAlign
    );

    if (options.background) {
      const backgroundX = horizontalStart - options.backgroundPadding;
      const backgroundY = verticalStart - options.backgroundPadding;
      const backgroundWidth = boundingWidth + 2 * options.backgroundPadding;
      const backgroundHeight = totalHeight + 2 * options.backgroundPadding;

      this.ctx.fillStyle = '#000000';
      this.ctx.globalAlpha = options.opaqueBackground ? 1 : 0.5;

      this.ctx.fillRect(
        backgroundX,
        backgroundY,
        backgroundWidth,
        backgroundHeight
      );

      this.ctx.globalAlpha = previousAlpha;
    }

    this.ctx.fillStyle = options.background ? '#ffffff' : options.colour;

    wrappedLines.forEach((line, index) => {
      const lineY = verticalStart + (index + 0.5) * lineSpacing;
      this.ctx.fillText(line, horizontalAnchor, lineY);
    });

    if (options.debug) {
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = '#00909e';
      this.ctx.strokeRect(x, y, width, height);

      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#f6d743';
      this.ctx.beginPath();
      this.ctx.moveTo(horizontalAnchor, y);
      this.ctx.lineTo(horizontalAnchor, y + height);
      this.ctx.stroke();

      this.ctx.strokeStyle = '#ff6363';
      this.ctx.beginPath();
      this.ctx.moveTo(x, verticalAnchor);
      this.ctx.lineTo(x + width, verticalAnchor);
      this.ctx.stroke();

      this.ctx.strokeStyle = '#d445ff';
      this.ctx.strokeRect(
        horizontalStart,
        verticalStart,
        boundingWidth,
        totalHeight
      );
    }

    this.ctx.font = previousFont;
    this.ctx.textAlign = previousAlign;
    this.ctx.textBaseline = previousBaseline;
    this.ctx.fillStyle = previousFill;

    return { height: totalHeight };
  };
}
