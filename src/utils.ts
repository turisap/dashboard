import { PathReporter } from "io-ts/lib/PathReporter";
import { Decoder } from "io-ts";

/* eslint-disable @typescript-eslint/no-explicit-any */
// prefixers for typesafe actions
export const actionPrefixer = (prefix: string) => (type: string) =>
  `${prefix}/${type}`;

export const asyncActionPrefixer = (prefix: string) => (
  type: string
): [string, string, string] => [
  `${prefix}/${type}_REQUEST`,
  `${prefix}/${type}_SUCCESS`,
  `${prefix}/${type}_FAILURE`,
];

// logger for io-ts decoder
// TODO connect me to a real logging after dev
export const ioTSLogger = (
  codec: Decoder<any, any>,
  data: any,
  reference: string
) => {
  const res = codec.decode(data);
  console.error(`${reference} decoding error: ${PathReporter.report(res)}`);
};
