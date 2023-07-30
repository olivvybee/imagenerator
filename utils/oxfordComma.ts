export const oxfordComma = (strings: string[]) => {
  if (strings.length === 1) {
    return strings[0];
  }

  if (strings.length === 2) {
    return strings.join(' and ');
  }

  const head = strings.slice(0, -1);
  const tail = strings.slice(-1)[0];
  return head.join(', ') + ', and ' + tail;
};
