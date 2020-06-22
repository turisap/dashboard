import { PathReporter } from "io-ts/lib/PathReporter";
import { Decoder } from "io-ts";
import LogRocket from "logrocket";
import moment from "moment";

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
export const ioTSLogger = (
  codec: Decoder<any, any>,
  data: any,
  reference: string
) => {
  const res = codec.decode(data);
  if (res._tag === "Left") {
    const report = PathReporter.report(res);

    // uncomment for dev
    // console.error(`${reference} decoding error: ${report}`);
    LogRocket.captureMessage(`Wrong API response for ${reference}`, {
      extra: {
        errorMsg: report.toString(),
      },
    });
  }
};

export const getCurrentMonths = (n: number): Array<string> =>
  new Array(n)
    .fill(1)
    .map(() => moment())
    .map((moment, idx) => moment.subtract(idx, "M").format("MMM"))
    .reverse();
