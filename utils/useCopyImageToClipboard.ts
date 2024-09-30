import { useEffect, useState } from 'react';

type CopyFn = (blob: Blob) => Promise<boolean>;

export const useCopyImageToClipbaord = (): [CopyFn, boolean] => {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false);
      }, 3000);
    }
  }, [hasCopied]);

  const copy = async (blob: Blob) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setHasCopied(true);
      return true;
    } catch (error) {
      console.warn('Failed to copy:', error);
      setHasCopied(false);
      return false;
    }
  };

  return [copy, hasCopied];
};
