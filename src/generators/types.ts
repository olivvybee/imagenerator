import { ComponentType, RefObject } from 'react';

export interface UpdateOptions {
  suggestedAltText?: string;
}

export interface RendererProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  onUpdate: (options?: UpdateOptions) => void;
  userImageUrl?: string;
}

export type Renderer = ComponentType<RendererProps>;

export interface GeneratorMetadata {
  route: string;
  name: string;
  Renderer: Renderer;
  allowsCustomImage: boolean;
  selectRandomImage?: () => string;
}
