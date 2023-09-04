import './test-utils/toContainNoDuplicates';
import 'jest-canvas-mock';

window.CanvasRenderingContext2D.prototype.roundRect = jest.fn();
