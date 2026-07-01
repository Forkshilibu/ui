# weiboUI Button MVP 组件说明

> `button` 是 weiboUI MVP 的首个组件。本文档定义 Button 的首批变体、尺寸、Design Token 使用约束、Light / Dark 行为、可访问性要求和 registry 安装方式，作为后续截图验收、外部项目验证和 npm 包发布准备的依据。

## 1. 组件定位

Button 用于触发用户明确操作，是 weiboUI MVP 中最先验证的交互组件。当前优先级：

1. 移动端优先，默认点击热区不小于 44×44px。
2. 兼容中后台 PC 场景，支持 `xs` / `sm` / `default` / `lg` / icon 尺寸。
3. 使用 `radix-weibo` 作为首个对外验证 registry。
4. 继续复用 shadcn CLI 安装，不做自有 CLI。
5. 暗色模式通过 `.dark` + `.style-weibo` 的 CSS variables 切换，不新增 `*-dark` Tailwind class。

## 2. 当前实现来源

Button 的样式源头在：

```text
apps/v4/registry/styles/style-weibo.css
```

生成后的 Radix Button 源码在：

```text
apps/v4/styles/radix-weibo/ui/button.tsx
```

对外 registry URL：

```text
/r/styles/radix-weibo/button.json
```

本地验证 URL：

```text
http://localhost:4000/r/styles/radix-weibo/button.json
```

## 3. 变体规范

| Variant       | 用途                                 | 视觉策略             | Token 约束                                            |
| ------------- | ------------------------------------ | -------------------- | ----------------------------------------------------- |
| `default`     | 主操作，例如发布、关注、确认         | 橙色渐变实底         | 使用 `btn.orange-a` / `btn.orange-b` 和 pressed token |
| `secondary`   | 次级操作，例如取消、已关注、普通入口 | 灰色实底             | 使用 `btn.gray` / `btn.gray-pressed`                  |
| `outline`     | 弱强调操作，例如更多、筛选、次级入口 | 透明底 + 灰色描边    | 使用 `btn.gray-stroke` 和 pressed fill                |
| `ghost`       | 低强调操作，例如工具栏图标文字按钮   | 透明底，按压灰色反馈 | 使用 `btn.gray-pressed`                               |
| `destructive` | 删除、移除、危险操作                 | 警示色实底           | 使用 `c.alart`，沿用 Figma 原始拼写                   |
| `link`        | 文本链接操作                         | 透明底 + 链接色      | 使用 `btn.link` / `btn.link-pressed`                  |

约束：

- 不允许在组件实现中写原始业务色值。
- 不允许使用 Tailwind 透明度拼接，例如 `bg-c-brand/20`。
- 不允许为了暗色模式新增 `*-dark` 变体 class。
- pressed / active 状态优先使用 Figma 已给出的 pressed token。

## 4. 尺寸规范

| Size      | 场景                     | 最小高度 | 说明                                 |
| --------- | ------------------------ | -------- | ------------------------------------ |
| `xs`      | 紧凑标签、小型操作       | 32px     | 仅用于非核心按钮或密集工具区         |
| `sm`      | 中后台工具栏、列表内操作 | 36px     | PC 中后台常用尺寸                    |
| `default` | 移动端默认按钮           | 44px     | MVP 默认推荐尺寸，满足移动端触控热区 |
| `lg`      | 页面底部主按钮、强行动点 | 48px     | 适合移动端底部操作区                 |
| `icon-xs` | 小型 icon-only 操作      | 32×32px  | 必须提供可访问名称                   |
| `icon-sm` | 中小 icon-only 操作      | 36×36px  | 必须提供可访问名称                   |
| `icon`    | 默认 icon-only 操作      | 44×44px  | 移动端推荐 icon-only 尺寸            |
| `icon-lg` | 大型 icon-only 操作      | 48×48px  | 适合底部栏或强调入口                 |

移动端业务默认优先使用 `default` 或 `lg`。PC 中后台密集场景可以使用 `sm`，但应避免把 `xs` 作为主操作尺寸。

## 5. Light / Dark 行为

Button 不直接感知主题状态。主题由外层 class 控制：

```tsx
<div className="style-weibo">
  <Button>浅色按钮</Button>
</div>

<div className="dark style-weibo">
  <Button>暗色按钮</Button>
</div>
```

要求：

- `.style-weibo` 提供 weibo CSS variables。
- `.dark.style-weibo` 或 `.dark .style-weibo` 覆盖同名变量。
- 组件只消费 token class，例如 `from-btn-orange-a`、`text-c-content`。
- 深色模式不改变字号、字重、圆角或间距，只调整颜色变量。

## 6. 可访问性要求

Button MVP 必须满足以下要求：

1. icon-only Button 必须传入 `aria-label` 或等价可访问名称。
2. 禁用态使用 `disabled`，不要只依赖视觉置灰。
3. loading 态后续补齐时，应同时表达忙碌状态，例如 `aria-busy` 或禁用点击。
4. 触控场景下默认热区不小于 44×44px。
5. 链接样式按钮若用于导航，应优先通过 `asChild` 包裹链接元素。

示例：

```tsx
<Button size="icon" aria-label="发布微博">
  <PlusIcon />
</Button>
```

## 7. 推荐示例矩阵

后续文档站和截图验收至少覆盖以下组合：

| 分组          | 示例                                                       |
| ------------- | ---------------------------------------------------------- |
| 基础变体      | default / secondary / outline / ghost / destructive / link |
| 移动端尺寸    | default / lg                                               |
| PC 中后台尺寸 | xs / sm / default                                          |
| icon 按钮     | icon-xs / icon-sm / icon / icon-lg                         |
| 状态          | default / hover / active / disabled / loading              |
| 主题          | Light / Dark                                               |
| 组合          | 文本 + 左图标、文本 + 右图标、icon-only                    |

## 8. Registry 安装方式

本地验证时先启动 v4 registry：

```bash
pnpm v4:dev
```

然后在业务项目中安装：

```bash
pnpm dlx shadcn@latest add http://localhost:4000/r/styles/radix-weibo/button.json
```

如果当前环境无法访问 npm registry，可以使用本仓库已构建的本地 CLI 进行受限验证：

```bash
node /workspace/ui/packages/shadcn/dist/index.js add http://localhost:4000/r/styles/radix-weibo/button.json --overwrite --yes
```

## 9. 验收标准

Button MVP 进入下一阶段前至少满足：

- `radix-weibo/button.json` 可访问。
- Next 临时项目可以生成 `components/ui/button.tsx`。
- Vite 临时项目可以生成 `src/components/ui/button.tsx`。
- 生成物中不包含 `@/registry` 或当前 monorepo 绝对路径。
- 生成物中保留 `from-btn-orange-a`、`to-btn-orange-b`、`text-c-content` 等 token class。
- Light / Dark 下默认、secondary、outline 至少三种按钮视觉可用。
- icon-only Button 示例包含 `aria-label`。

## 10. 后续进入 npm 包前的准备

MVP 决策中要求发布 npm 包，但 Button 当前仍主要通过 registry 交付。进入 npm 包发布前需要确认：

1. npm 包名，例如 `@weibo/react` 或 `@weibo/ui`。
2. npm 包是否只导出 headless primitives，还是同时导出带样式的组件。
3. token CSS 的分发方式：独立 CSS、Tailwind preset、还是 registry style。
4. Button API 是否与 registry 版本保持一致。
5. 是否需要把 `style-weibo.css` 中的 token 拆分为 npm 可消费的 CSS 入口。

建议下一步先完成 Button 截图和外部可访问 npm registry 环境下的 `pnpm build` 验证，再决定 npm 包边界。
