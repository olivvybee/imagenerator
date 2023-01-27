import { useEffect, useState } from 'react';
import useMediaQuery from './useMediaQuery';

// This is a subset of file types that the Web Share API supports
// Reference Web Share API docs before extending this list
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#shareable_file_types
type MimeType =
  | 'image/png'
  | 'image/jpeg'
  | 'image/webp'
  | 'video/mp4'
  | 'video/mpeg'
  | 'video/webm'
  | 'audio/wav'
  | 'audio/mpeg'
  | 'audio/webm';

// Not all share targets support all fields, unsupported fields may be omitted on share
type ShareData = { title?: string; text?: string; url?: string; file?: File };

type ShareFunctionParameters = {
  data: ShareData;
  onSuccess?: () => void;
  onError?: (e: Error) => void;
};

type ReturnType = {
  /**
   * A boolean to confirm sharing support.
   *
   * Represents text sharing support if no mimeType is provided to the hook.
   * Represents file sharing and text sharing support if a mimeType is provided to the hook.
   *
   * Can be used e.g. to toggle visibility of a share button
   */
  isSharingSupported: boolean;
  /**
   * A function to share text and/or a file via the Web Share API.
   *
   * The Web Share API provides access to a device's native sharing functionality. Text sharing is well-supported across
   * mobile platforms. File share support is more recent (Android Chrome 76+ and iOS Safari 15+). Desktop support is mixed
   * across the board.
   *
   * This function opens a device's share tray or share popup. To prevent abuse, web APIs that open popups like this can
   * only be invoked by user activation - https://html.spec.whatwg.org/multipage/interaction.html#tracking-user-activation
   *
   * Chromium browsers allow up to a second between a user activation and calls to `share`. Non-Chromium
   * browsers enforce the rule more strictly and cancel user activations if any asynchronous code is executed.
   *
   * Therefore, `share` should be used only in synchronous event handlers in direct response to user activations.
   *
   * @param data      - see ShareData type above
   * @param onSuccess - invoked after a successful share
   * @param onError   - invoked after a failed share or if data validation fails
   */
  share: ({ data, onSuccess, onError }: ShareFunctionParameters) => void;
};

const isTextSharingSupported = () => !!navigator.share;

const isFileSharingSupported = (mimeType: MimeType) =>
  !!navigator?.canShare &&
  navigator?.canShare?.({
    files: [
      new File([new Blob()], `file.${mimeType.split('/')[1]}`, {
        type: mimeType,
      }),
    ],
  });

const share = ({ data, onSuccess, onError }: ShareFunctionParameters) => {
  if (!isTextSharingSupported()) {
    return onError?.(new Error('Text sharing is not supported'));
  }

  if (data.file && !isFileSharingSupported(data.file.type as MimeType)) {
    return onError?.(new Error('File sharing is not supported'));
  }

  navigator
    .share?.({ ...data, files: data.file && [data.file] })
    .then(() => onSuccess?.())
    .catch((e) => {
      if (e.message.includes('cancel')) return;
      onError?.(e);
    });
};

export const useNativeShare = (mimeType?: MimeType): ReturnType => {
  const [isSharingSupported, setSharingSupported] = useState(false);

  const isTouchDevice = useMediaQuery('(pointer: coarse)');

  useEffect(() => {
    if (!isTouchDevice) {
      setSharingSupported(false);
    } else {
      setSharingSupported(
        mimeType ? isFileSharingSupported(mimeType) : isTextSharingSupported()
      );
    }
  }, [mimeType]);

  return {
    isSharingSupported,
    share,
  };
};
