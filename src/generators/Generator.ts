import React from 'react';

export abstract class Generator {
  static route: string;
  static title: string;

  abstract requiresUserImage: boolean;

  getCanvasSize(image: HTMLImageElement): { width: number; height: number } {
    return {
      width: image.width,
      height: image.height,
    };
  }

  abstract generate(
    image: HTMLImageElement,
    ctx: CanvasRenderingContext2D
  ): void;

  abstract renderConfigurator(generate: () => void): React.ReactNode;
}
