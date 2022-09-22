export const createFileFromDataURL = (dataUrl: string, fileName: string) => {
  // the image data url has a stable format of 'data:image/<extension>;base64,<data>'
  const mimeType = dataUrl.split(':')[1].split(';')[0];
  const extension = mimeType.split('/')[1];
  const byteString = atob(dataUrl.split(',')[1]);

  // write the bytes of the string to a typed array
  const intArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([intArray], { type: mimeType });
  return new File([blob], `${fileName}.${extension}`, {
    type: mimeType,
  });
};
