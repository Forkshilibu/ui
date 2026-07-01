# weiboUI Next + Vite 验证结果记录

> 验证日期：2026-06-30。本文记录本轮在当前开发容器内执行 `radix-weibo/button` 外部安装验证的结果。由于容器访问 npm registry 返回 403，本轮完成了 registry URL 可访问性、shadcn CLI 安装到临时 Next/Vite 项目、生成物路径独立性和 token class 静态检查；完整 `pnpm build` 级验证需要在可访问 npm registry 的环境中继续执行。

## 1. 本轮结论

| 验证项                                 | 结果   | 说明                                                                          |
| -------------------------------------- | ------ | ----------------------------------------------------------------------------- |
| 本地 v4 registry 服务                  | 通过   | `http://localhost:4000/r/styles/radix-weibo/button.json` 可访问               |
| Next 临时项目安装 `radix-weibo/button` | 通过   | 使用本地 `shadcn` CLI 和 registry URL 成功生成 `components/ui/button.tsx`     |
| Vite 临时项目安装 `radix-weibo/button` | 通过   | 使用本地 `shadcn` CLI 和 registry URL 成功生成 `src/components/ui/button.tsx` |
| 生成物路径独立性                       | 通过   | 生成物中未发现 `@/registry` 或 `/workspace/ui`                                |
| weibo token class 保留                 | 通过   | 生成物包含 `from-btn-orange-a` 等 weibo token class                           |
| Next `pnpm build`                      | 未完成 | npm registry 返回 403，无法完整安装 Next 项目依赖                             |
| Vite `pnpm build`                      | 未完成 | npm registry 返回 403，无法完整安装 Vite 项目依赖                             |

## 2. 已执行命令

### 2.1 启动本地 registry

```bash
pnpm --filter=@shadcn/react build && pnpm --filter=shadcn build && pnpm --filter=v4 registry:build && pnpm v4:dev
```

服务启动后确认 registry URL：

```bash
curl -fsS http://localhost:4000/r/styles/radix-weibo/button.json | python -c 'import json,sys; data=json.load(sys.stdin); print(data["name"], data["files"][0]["path"], len(data["files"][0]["content"]))'
```

输出：

```text
button registry/radix-weibo/ui/button.tsx 2722
```

### 2.2 Next 安装验证

最初尝试使用官方脚手架创建 Next 项目：

```bash
pnpm create next-app@latest /tmp/weiboui-next-validation --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-pnpm --yes
```

该命令因环境限制失败：

```text
ERR_PNPM_FETCH_403 GET https://registry.npmjs.org/create-next-app: Forbidden - 403
```

随后使用仓库内 `templates/next-app` 复制出临时项目，并手动写入 `components.json`。因为当前环境无法访问线上 shadcn init endpoint，`baseColor` 留空以避免 CLI 拉取远程 color registry，然后执行：

```bash
cd /tmp/weiboui-next-validation && node /workspace/ui/packages/shadcn/dist/index.js add http://localhost:4000/r/styles/radix-weibo/button.json --overwrite --yes
```

输出：

```text
✔ Checking registry.
✔ Created 1 file:
  - components/ui/button.tsx
```

Next 临时项目生成物检查：

```bash
cd /tmp/weiboui-next-validation && rg -n "@/registry|/workspace/ui|from-btn-orange-a|@/components/ui/button|style-weibo" components src app || true
```

关键输出：

```text
app/page.tsx:1:import { Button } from "@/components/ui/button"
components/ui/button.tsx:13:          "from-btn-orange-a to-btn-orange-b text-c-contrast hover:from-btn-orange-a hover:to-btn-orange-b active:from-btn-orange-pressed-a active:to-btn-orange-pressed-b bg-linear-to-r",
```

### 2.3 Vite 安装验证

使用仓库内 `templates/vite-app` 复制出临时项目，并手动写入 `components.json`。执行：

```bash
cd /tmp/weiboui-vite-validation && node /workspace/ui/packages/shadcn/dist/index.js add http://localhost:4000/r/styles/radix-weibo/button.json --overwrite --yes
```

输出：

```text
✔ Checking registry.
✔ Created 1 file:
  - src/components/ui/button.tsx
```

Vite 临时项目生成物检查：

```bash
rg -n "@/registry|/workspace/ui|from-btn-orange-a|@/components/ui/button|style-weibo" /tmp/weiboui-vite-validation/src || true
```

关键输出：

```text
/tmp/weiboui-vite-validation/src/App.tsx:1:import { Button } from "@/components/ui/button"
/tmp/weiboui-vite-validation/src/components/ui/button.tsx:13:          "from-btn-orange-a to-btn-orange-b text-c-contrast hover:from-btn-orange-a hover:to-btn-orange-b active:from-btn-orange-pressed-a active:to-btn-orange-pressed-b bg-linear-to-r",
```

### 2.4 静态验收命令

```bash
set -e
for app in next vite; do
  dir=/tmp/weiboui-${app}-validation
  if [ "$app" = next ]; then button="$dir/components/ui/button.tsx"; else button="$dir/src/components/ui/button.tsx"; fi
  test -f "$button"
  rg -q "from-btn-orange-a" "$button"
  ! rg -q "@/registry|/workspace/ui" "$dir"
  echo "$app validation static checks passed: $button"
done
```

输出：

```text
next validation static checks passed: /tmp/weiboui-next-validation/components/ui/button.tsx
vite validation static checks passed: /tmp/weiboui-vite-validation/src/components/ui/button.tsx
```

## 3. 待补验证

在可以访问 npm registry 的环境中继续完成：

1. 使用 `pnpm create next-app@latest` 创建全新 Next 项目。
2. 使用 `pnpm create vite@latest --template react-ts` 创建全新 Vite 项目。
3. 分别执行 `pnpm dlx shadcn@latest init` 和 `pnpm dlx shadcn@latest add http://localhost:4000/r/styles/radix-weibo/button.json`。
4. 分别执行 `pnpm build`。
5. 启动页面并截图检查 Light / Dark 下按钮视觉。

## 4. 当前判断

本轮已经证明 `radix-weibo/button.json` 可以被 shadcn CLI 从本地 registry URL 读取并写入 Next/Vite 形态的临时项目，且生成物使用业务侧组件路径和 weibo token class。剩余风险主要集中在真实依赖安装、项目 build 和浏览器视觉验证，需要换到可访问 npm registry 的环境继续完成。
