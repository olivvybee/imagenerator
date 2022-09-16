export const loadFont = async (name: string, url: string) => {
  const font = new FontFace(name, `url("${url}")`);
  await font.load();
  document.fonts.add(font);
};
