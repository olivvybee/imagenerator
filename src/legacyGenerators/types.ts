import { ComponentType, RefObject } from 'react';

export interface UpdateOptions {
  suggestedAltText?: string;
  useVerticalLayout?: boolean;
}

export interface RendererProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  onUpdate: (options?: UpdateOptions) => void;
  userImageUrl?: string;
}

export type Renderer = ComponentType<RendererProps>;

export interface LegacyGenerator {
  route: string;
  name: string;
  description: string;
  Renderer: Renderer;
  allowsCustomImage: boolean;
  selectRandomImage?: () => string;
}
