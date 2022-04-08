import React from 'react';

export interface Generator<C extends {}> {
  route: string;
  name: string;
  requiresUserImage: boolean;

  defaultConfig: C;

  getCanvasSize: (image: HTMLImageElement) => { width: number; height: number };
  generate: (
    image: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
    config: C
  ) => void;
  Configurator: ConfiguratorComponent<C>;
}

export type ConfiguratorComponent<C extends {}> = React.ComponentType<{
  config: C;
  setConfig: (config: C) => void;
}>;
