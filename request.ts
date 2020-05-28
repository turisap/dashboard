// fetch polyfill
import "whatwg-fetch";

const ABORT_TIMEOUT = 4000;

async function get<T>(url): Promise<T> {
  const controller = new AbortController();
  const options = { signal: controller.signal };

  const urlWithParams = new URL(url, process.env.DEV_HOST);

  setTimeout(() => controller.abort(), ABORT_TIMEOUT);

  // search params

  try {
    const res = await window.fetch(urlWithParams, options);

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
}

export { get };
