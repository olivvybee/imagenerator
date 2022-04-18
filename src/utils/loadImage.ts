export const loadImage = async (url: string) => {
  const image = new Image();
  await new Promise((resolve) => {
    image.onload = resolve;
    image.src = url;
  });
  return image;
};
