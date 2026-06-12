const assetFilePattern = /\.[a-zA-Z0-9]+$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    if (request.method !== "GET" || assetFilePattern.test(url.pathname)) {
      return assetResponse;
    }

    return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
  },
};
