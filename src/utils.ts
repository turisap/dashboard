export const actionPrefixer = (prefix: string) => (type: string) =>
  `${prefix}/${type}`;

export const asyncActionPrefixer = (prefix: string) => (
  type: string
): [string, string, string] => [
  `${prefix}/${type}_REQUEST`,
  `${prefix}/${type}_SUCCESS`,
  `${prefix}/${type}_FAILURE`,
];
