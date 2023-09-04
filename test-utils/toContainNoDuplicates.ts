declare namespace jest {
  interface Matchers<R> {
    toContainNoDuplicates: () => void;
  }

  interface Expect {
    toContainNoDuplicates: () => void;
  }
}

expect.extend({
  toContainNoDuplicates(received) {
    if (!Array.isArray(received)) {
      return {
        message: () =>
          `argument to toContainNoDuplicates must be an array, received ${typeof received}`,
        pass: false,
      };
    }

    const arrayAsSet = new Set(received);
    if (arrayAsSet.size === received.length) {
      return {
        message: () => `[${received}] contains no duplicates`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected [${received}] to contain no duplicates`,
        pass: false,
      };
    }
  },
});
