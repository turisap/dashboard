// fetch polyfill
import "whatwg-fetch";

const ABORT_TIMEOUT = 4000;

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

const requestBuilder = async <K>(url: URL, body?: any): Promise<K> => {
  const controller = new AbortController();
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

  setTimeout(() => controller.abort(), ABORT_TIMEOUT);

  try {
    const res = await window.fetch(url, options);

    const contentType = res.headers.get("content-type");

    if (!res.ok) throw Error(res.statusText || "Request failed");

    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("wrong response format supplied");
    }

    return res.json();
  } catch (err) {
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

const get = async <K>(url: string, params?: QueryParams): Promise<K> => {
  const urlWithParams = constructUrl({ url, params });

  return await requestBuilder<K>(urlWithParams);
};

const post = async <K>(url: string, body: any): Promise<K> => {
  const urlWithParams = constructUrl({ url });

  return requestBuilder<K>(urlWithParams, body);
};

export { get, post };
