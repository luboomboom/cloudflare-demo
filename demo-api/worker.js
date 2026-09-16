export default {
  async fetch(request, env, ctx) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }
    const url = new URL(request.url);
    const data = {
      message: "Hello from Cloudflare demo API 🚀",
      account: "Jialu1997",
      path: url.pathname,
      method: request.method,
      timestamp: new Date().toISOString(),
    };
    return new Response(JSON.stringify(data, null, 2), {
      headers: { ...cors, "content-type": "application/json; charset=utf-8" },
    });
  },
};
