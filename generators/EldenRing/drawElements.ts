import { WIDTH, HEIGHT } from './constants';

export const drawBackground = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
  gradient.addColorStop(0, 'rgba(21, 20, 16, 0)');
  gradient.addColorStop(0.05, 'rgba(21, 20, 16, 0.9)');
  gradient.addColorStop(0.2, 'rgba(21, 20, 16, 0.97)');
  gradient.addColorStop(0.8, 'rgba(21, 20, 16, 0.97)');
  gradient.addColorStop(0.95, 'rgba(21, 20, 16, 0.9)');
  gradient.addColorStop(1, 'rgba(21, 20, 16, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
};

export const drawBorders = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, 0);
  gradient.addColorStop(0, 'rgba(143, 141, 123, 0)');
  gradient.addColorStop(0.05, 'rgba(143, 141, 123, 0.8)');
  gradient.addColorStop(0.2, 'rgba(143, 141, 123, 0.95)');
  gradient.addColorStop(0.8, 'rgba(143, 141, 123, 0.95)');
  gradient.addColorStop(0.95, 'rgba(143, 141, 123, 0.8)');
  gradient.addColorStop(1, 'rgba(143, 141, 123, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, 4);
  ctx.fillRect(0, 145, WIDTH, 2);
  ctx.fillRect(0, HEIGHT - 4, WIDTH, 4);
};

export const drawButtons = (ctx: CanvasRenderingContext2D) => {
  let centerX = 295;
  let centerY = HEIGHT - 23;

  // Y button
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(179, 175, 96)';
  ctx.fillStyle = 'rgb(15, 8, 0)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX, centerY + 5);
  ctx.moveTo(centerX, centerY + 1);
  ctx.lineTo(centerX - 4, centerY - 4);
  ctx.moveTo(centerX, centerY + 1);
  ctx.lineTo(centerX + 4, centerY - 4);
  ctx.stroke();

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'middle';
  ctx.fillText(':Close', centerX + 16, centerY);

  // Select button
  centerX = 393;
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(200, 200, 200)';
  ctx.fillStyle = 'rgb(15, 8, 0)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.strokeRect(centerX - 6, centerY - 5, 8, 6);
  ctx.fillRect(centerX - 2, centerY - 1, 8, 6);
  ctx.strokeRect(centerX - 2, centerY - 1, 8, 6);

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'middle';
  ctx.fillText(':Good', centerX + 16, centerY);

  // Start button
  centerX = 492;
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(200, 200, 200)';
  ctx.fillStyle = 'rgb(15, 8, 0)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX - 5, centerY - 4);
  ctx.lineTo(centerX + 5, centerY - 4);
  ctx.moveTo(centerX - 5, centerY);
  ctx.lineTo(centerX + 5, centerY);
  ctx.moveTo(centerX - 5, centerY + 4);
  ctx.lineTo(centerX + 5, centerY + 4);
  ctx.stroke();

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'middle';
  ctx.fillText(':Poor', centerX + 16, centerY);
};

export const drawText = (ctx: CanvasRenderingContext2D, text: string) => {
  const [line1, line2] = text.split('\n').map((s) => s.trim());

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'top';

  if (line2) {
    ctx.fillText(line1.trim(), 165, 35);
    ctx.fillText(line2.trim(), 165, 75);
  } else {
    ctx.fillText(line1.trim(), 165, 55);
  }
};
