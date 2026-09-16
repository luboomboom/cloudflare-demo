export default {
  async fetch(request, env, ctx) {
    return new Response(
      "Hello from Cloudflare smoke test! Deploy pipeline works. 🚀\n",
      {
        headers: { "content-type": "text/plain; charset=utf-8" },
      }
    );
  },
};
