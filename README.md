# cloudflare-demo

由 WorkBuddy 通过 `wrangler` 一键部署到 Cloudflare 的演示工程。包含三个独立服务：**冒烟测试 Worker**、**示例 API Worker**、**静态站点（Pages）**，三者都在同一个 Cloudflare 账户下。

## 已上线服务

| 项目 | 类型 | 地址 | 说明 |
|---|---|---|---|
| **A. 冒烟测试** | Worker | https://wb-smoke-test.wb-jialu1997-9q2.workers.dev | 验证「写代码 → 部署上线」整条链路，返回纯文本。 |
| **C. 示例 API** | Worker | https://wb-demo-api.wb-jialu1997-9q2.workers.dev | 返回 JSON（带 CORS），可被前端直接 `fetch`。 |
| **B. 静态站点** | Pages | https://wb-demo-site.pages.dev（预览 https://4bf0f863.wb-demo-site.pages.dev ） | 首页按钮会调用上面的示例 API，前后端打通。 |

> workers.dev 子域：`wb-jialu1997-9q2.workers.dev`（通过 Cloudflare API 注册）
> 账户 ID：`ab78f394ced4189b05ce47a2810ed17e`

## 目录结构

```
cloudflare-demo/
├── README.md
├── smoke-test/            # A. 冒烟测试 Worker
│   ├── worker.js          # 返回纯文本 "Hello from Cloudflare smoke test!"
│   └── wrangler.toml      # name = wb-smoke-test
├── demo-api/              # C. 示例 API Worker
│   ├── worker.js          # 返回 JSON，含 CORS 头
│   └── wrangler.toml      # name = wb-demo-api
└── site/                  # B. 静态站点（Pages）
    └── index.html         # 调用 wb-demo-api 的首页
```

## 接口说明（示例 API Worker）

`GET https://wb-demo-api.wb-jialu1997-9q2.workers.dev`

返回示例：

```json
{
  "message": "Hello from Cloudflare demo API 🚀",
  "account": "Jialu1997",
  "path": "/",
  "method": "GET",
  "timestamp": "2026-09-16T00:00:00.000Z"
}
```

- 支持 `GET` / `POST`，已开启 CORS（`Access-Control-Allow-Origin: *`）。
- `OPTIONS` 预检直接返回 204，方便浏览器跨域调用。

## 本地重新部署

需要 `wrangler` 与 Cloudflare API Token（`CLOUDFLARE_API_TOKEN`）。

```bash
# 部署 Worker
CLOUDFLARE_API_TOKEN=<你的token> \
  npx wrangler deploy --config demo-api/wrangler.toml

CLOUDFLARE_API_TOKEN=<你的token> \
  npx wrangler deploy --config smoke-test/wrangler.toml

# 部署 Pages（需先建项目）
CLOUDFLARE_API_TOKEN=<你的token> \
  npx wrangler pages project create wb-demo-site --production-branch main

CLOUDFLARE_API_TOKEN=<你的token> \
  npx wrangler pages deploy site --project-name wb-demo-site --branch main
```

## 安全提示

- Cloudflare API Token 与 GitHub PAT 仅用于部署，用完请到对应后台 revoke。
- 本仓库不含任何密钥；部署凭据通过环境变量传入，不落盘。
