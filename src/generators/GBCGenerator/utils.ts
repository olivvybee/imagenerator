export const chunkString = (str: string, chunkSize: number) => {
  const numChunks = Math.ceil(str.length / chunkSize);
  const chunks = new Array(numChunks);
  for (let i = 0; i < numChunks; i++) {
    chunks[i] = str.substring(i * chunkSize, i * chunkSize + chunkSize);
  }
  return chunks;
};
