export const actionPrefixer = (prefix: string) => (type: string) =>
  `${prefix}/${type}`;
