declare module 'png-metadata' {
  export function writeMetadata(
    buffer: Buffer,
    metadata: Record<string, Record<string, string>>
  ): Buffer;
}
