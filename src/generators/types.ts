import React, { RefObject } from 'react';

export interface Generator<C extends {}> {
  route: string;
  name: string;

  defaultConfig: C;
  Configurator: ConfiguratorComponent<C>;

  staticImage?: string;

  getCanvasSize: (image: HTMLImageElement) => { width: number; height: number };
  generate: (
    image: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    config: C
  ) => void;

  getSuggestedAltText?: (config: C) => string;
  selectRandomUrl?: () => string;
}

export type ConfiguratorComponent<C extends {}> = React.ComponentType<{
  config: C;
  setConfig: (config: C) => void;
}>;

export interface UpdateOptions {
  suggestedAltText?: string;
}

export interface RendererProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  onUpdate: (options?: UpdateOptions) => void;
  userImageUrl?: string;
}

export type Renderer = React.ComponentType<RendererProps>;

export interface GeneratorMetadata {
  route: string;
  name: string;
  Renderer: Renderer;
  allowsCustomImage: boolean;
  selectRandomImage?: () => string;
}
