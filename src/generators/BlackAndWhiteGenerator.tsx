import { ReactNode } from 'react';
import { Generator } from './Generator';

export class BlackAndWhiteGenerator extends Generator {
  static route = '/b-and-w';
  static title = 'Black and white';
  requiresUserImage = true;

  renderConfigurator = (generate: () => void): ReactNode => {
    return <div>Configurator</div>;
  };

  generate = (image: HTMLImageElement, ctx: CanvasRenderingContext2D): void => {
    ctx.filter = 'grayscale(100)';
    ctx.drawImage(image, 0, 0);
  };
}
