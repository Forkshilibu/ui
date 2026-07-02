# weiboUI Next + Vite 验证手册

> 本文档用于验证 weiboUI MVP 的首个组件 `button` 能否通过 registry URL 在外部 Next 与 Vite 项目中安装、编译和渲染。验证目标不是复用当前 monorepo 的内部路径，而是模拟业务项目真实接入方式。

## 1. 验证目标

本轮验证覆盖以下结论：

1. Next 项目可以通过 registry URL 安装 `radix-weibo/button`。
2. Vite 项目可以通过 registry URL 安装 `radix-weibo/button`。
3. 安装后的代码不依赖当前 monorepo 的私有路径。
4. `button` 生成物包含 weibo token class，并且样式不会在 registry build 后丢失。
5. Light / Dark 模式下 CSS variables 可以正常切换。
6. MVP 阶段继续复用官方 shadcn CLI，不引入自有 CLI。

## 2. 当前仓库内预检

在启动外部项目验证前，先在当前仓库确认 registry 产物完整：

```bash
pnpm --filter=@shadcn/react build
pnpm --filter=shadcn build
pnpm --filter=v4 registry:build
pnpm weiboui:validate-registry
```

其中 `pnpm weiboui:validate-registry` 会检查以下内容：

- `style-weibo.css` 是否存在关键 token 映射。
- `base-weibo` / `radix-weibo` 的 registry index、button 和 button example 是否存在。
- 生成后的 `base-weibo` / `radix-weibo` Button 源码是否包含关键 weibo token class。
- `base-weibo` / `radix-weibo` Button registry JSON 是否包含运行所需依赖元数据。

如果这一步失败，不要继续做 Next / Vite 外部验证，应先修复 registry 源文件或重新执行 registry build。

## 3. 启动本地 registry 服务

在当前仓库启动 v4 文档站，让外部验证项目可以访问本地 registry JSON：

```bash
pnpm v4:dev
```

默认地址为：

```text
http://localhost:4000
```

需要验证的 button registry URL：

```text
http://localhost:4000/r/styles/radix-weibo/button.json
```

如果本地端口不同，应同步替换下面 Next / Vite 验证命令中的 registry URL。

## 4. Next 验证步骤

建议在当前仓库外部创建临时验证目录，避免误改 monorepo 文件：

```bash
mkdir -p /tmp/weiboui-next-validation
cd /tmp/weiboui-next-validation
pnpm create next-app@latest . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

初始化 shadcn 配置：

```bash
pnpm dlx shadcn@latest init
```

通过本地 registry URL 安装 `radix-weibo/button`：

```bash
pnpm dlx shadcn@latest add http://localhost:4000/r/styles/radix-weibo/button.json
```

在 `src/app/page.tsx` 中加入最小渲染用例：

```tsx
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="style-weibo flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <Button>微博主按钮</Button>
      <Button variant="secondary">次按钮</Button>
      <Button variant="outline">线框按钮</Button>
      <div className="dark style-weibo flex gap-4 rounded-xl p-6">
        <Button>暗色主按钮</Button>
        <Button variant="outline">暗色线框</Button>
      </div>
    </main>
  )
}
```

执行验证：

```bash
pnpm build
pnpm dev
```

验收标准：

- 页面可以正常编译和启动。
- `Button` import 路径为 `@/components/ui/button`。
- 代码中不出现 `@/registry/radix-weibo` 或当前 monorepo 绝对路径。
- 默认按钮呈现 weibo 橙色渐变。
- `.dark.style-weibo` 内按钮切换为暗色 token。
- icon-only 场景后续补充时必须提供 `aria-label`。

## 5. Vite 验证步骤

建议同样使用当前仓库外部的临时目录：

```bash
mkdir -p /tmp/weiboui-vite-validation
cd /tmp/weiboui-vite-validation
pnpm create vite@latest . --template react-ts
pnpm install
```

按 shadcn Vite 项目要求补齐 Tailwind 与路径别名配置后初始化：

```bash
pnpm dlx shadcn@latest init
```

通过本地 registry URL 安装 `radix-weibo/button`：

```bash
pnpm dlx shadcn@latest add http://localhost:4000/r/styles/radix-weibo/button.json
```

在 `src/App.tsx` 中加入最小渲染用例：

```tsx
import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <main className="style-weibo flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <Button>微博主按钮</Button>
      <Button variant="secondary">次按钮</Button>
      <Button variant="outline">线框按钮</Button>
      <div className="dark style-weibo flex gap-4 rounded-xl p-6">
        <Button>暗色主按钮</Button>
        <Button variant="outline">暗色线框</Button>
      </div>
    </main>
  )
}
```

执行验证：

```bash
pnpm build
pnpm dev
```

验收标准：

- Vite build 成功。
- `Button` import 路径为 `@/components/ui/button`。
- 安装后的 `button.tsx` 不依赖当前 monorepo 内部路径。
- 默认、secondary、outline 三种按钮可见。
- Light / Dark 容器下颜色变量切换正确。

## 6. 常见问题排查

### 6.1 registry URL 404

先确认 v4 文档站是否仍在运行：

```bash
curl http://localhost:4000/r/styles/radix-weibo/button.json
```

如果返回 404，重新执行：

```bash
pnpm --filter=v4 registry:build
pnpm v4:dev
```

### 6.2 Button 安装后没有 weibo 样式

先在当前仓库执行：

```bash
pnpm weiboui:validate-registry
```

如果失败，说明 registry 生成物中缺少 weibo token class。优先检查 `apps/v4/registry/styles/style-weibo.css` 是否仍使用 `@theme inline` 和 `@apply` 规则。

### 6.3 暗色模式不生效

确认业务页面外层同时具备：

```html
<div class="dark style-weibo">...</div>
```

或者确认全局暗色 class 的挂载节点可以被 `.style-weibo` 下的变量覆盖规则命中。

## 7. 完成标记

当 Next 与 Vite 都满足上述验收标准后，可以把 `docs/weiboui-mvp-decisions.zh-CN.md` 中的 `7.3 建立 Next + Vite 验证应用` 标记为完成，并进入下一步：补齐 button 的文档展示、截图与 npm 包发布准备。

## 8. 验证结果记录

当前容器内已完成一次受限环境验证，结果见 `docs/weiboui-next-vite-validation-result.zh-CN.md`。该记录确认 registry URL 安装与静态生成物检查通过，但由于 npm registry 403，完整 Next/Vite `pnpm build` 仍需在可访问 npm registry 的环境补跑。
