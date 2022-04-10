import React from 'react';

export interface Generator<C extends {}> {
  route: string;
  name: string;

  defaultConfig: C;
  Configurator: ConfiguratorComponent<C>;

  getCanvasSize: (image: HTMLImageElement) => { width: number; height: number };
  generate: (
    image: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    config: C
  ) => void;

  selectRandomUrl?: () => string;
}

export type ConfiguratorComponent<C extends {}> = React.ComponentType<{
  config: C;
  setConfig: (config: C) => void;
}>;
