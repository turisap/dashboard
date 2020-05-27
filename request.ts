function get<T>(url): Promise<T> {
  return fetch(url).then((res) => {
    const contentType = res.headers.get("content-type");

    if (!res.ok) throw Error(res.statusText || "Request failed");

    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("wrong response format supplied");
    }

    return res.json();
  });
}

export { get };
