// fetch polyfill
import "whatwg-fetch";

function get<T>(url): Promise<T> {
  const controller = new AbortController();
  const options = { signal: controller.signal };

  setTimeout(() => controller.abort(), 4000);

  return window
    .fetch(url, options)
    .then((res) => {
      const contentType = res.headers.get("content-type");

      if (!res.ok) throw Error(res.statusText || "Request failed");

      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("wrong response format supplied");
      }

      return res.json();
    })
    .catch((err) => {
      if (err.name === "AbortError") {
        throw Error("Fetch aborted. Timeout exceeded");
      }

      throw Error(err);
    });
}

export { get };
