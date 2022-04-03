import { ReactNode } from 'react';
import { Generator } from './Generator';

export class BlackAndWhiteGenerator extends Generator {
  route = '/b-and-w';
  requiresUserImage = true;

  constructor() {
    super();
  }

  renderConfigurator = (generate: () => void): ReactNode => {
    return <div>Configurator</div>;
  };

  generate = (image: HTMLImageElement, ctx: CanvasRenderingContext2D): void => {
    ctx.filter = 'grayscale(100)';
    ctx.drawImage(image, 0, 0);
  };
}
