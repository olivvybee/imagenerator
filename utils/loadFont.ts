export const loadFont = async (
  name: string = 'Atkinson Hyperlegible',
  url: string = '/fonts/Atkinson-Hyperlegible-Regular.woff2'
) => {
  const font = new FontFace(name, `url("${url}")`);
  await font.load();
  document.fonts.add(font);
  return font;
};
