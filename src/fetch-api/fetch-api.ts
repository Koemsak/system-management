export const fetchApi = async <T>(
  url: string,
  method: string = "GET",
  body: Record<string, any> = {},
  headers: Record<string, string> = {},
  authToken: string | null = null
): Promise<T> => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      body: ["POST", "PUT"].includes(method) ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(`Error: ${res.status} - ${res.statusText}`);
    const contentType = res.headers.get("Content-Type");

    console.log(contentType);

    if (contentType && contentType.includes("application/json")) {
      // If the response is JSON
      return await res.json();
    } else if (contentType && contentType.includes("text")) {
      // If the response is text (or plain text)
      return (await res.text()) as unknown as T; // Cast text to T (assuming T could be a string)
    } else {
      // Handle other types of responses if necessary
      throw new Error("Unsupported content type");
    }
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};
