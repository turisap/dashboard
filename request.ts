// fetch polyfill
import "whatwg-fetch";
import LogRocket from "logrocket";

/* eslint-disable @typescript-eslint/no-explicit-any */
type QueryParams = {
  [key: string]: string | number;
};

type URLData = {
  url: string;
  params?: QueryParams;
};

type RequestOptions = {
  signal: AbortController["signal"];
  headers?: Headers;
  method?: "POST" | "GET";
  body?: any;
};

const requestBuilder = async <T>(url: URL, body?: any): Promise<T> => {
  const controller = new AbortController();
  const timeout = parseInt(process.env.ABORT_TIMEOUT);
  let options: RequestOptions = { signal: controller.signal };

  if (body) {
    options = {
      ...options,
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(body),
    };
  }

  setTimeout(() => controller.abort(), timeout);

  try {
    const res = await window.fetch(url, options);

    const contentType = res.headers.get("content-type");

    if (!res.ok) throw Error(res.statusText || "Request failed");

    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("wrong response format supplied");
    }

    return res.json();
  } catch (err) {
    LogRocket.captureException(err, {
      tags: {
        place: "Fetch wrapper",
      },
      extra: {},
    });

    if (err.name === "AbortError") {
      throw Error("Fetch aborted. Timeout exceeded");
    }

    throw err;
  }
};

const constructUrl = ({ url, params }: URLData) => {
  const urlObj = new URL(url, process.env.DEV_HOST);

  if (params) {
    Object.entries(params).forEach(([key, val]) =>
      urlObj.searchParams.set(key, val.toString())
    );
  }

  return urlObj;
};

const get = async <T>(url: string, params?: QueryParams): Promise<T> => {
  const urlWithParams = constructUrl({ url, params });

  return await requestBuilder<T>(urlWithParams);
};

const post = async <T>(url: string, body: any): Promise<T> => {
  const urlWithParams = constructUrl({ url });

  return requestBuilder<T>(urlWithParams, body);
};

export { get, post };
