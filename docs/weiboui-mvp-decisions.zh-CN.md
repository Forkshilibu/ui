# weiboUI MVP 决策记录

> 本文档记录 weiboUI 第一阶段 MVP 的已确认信息、待确认信息，以及进入实现前的决策依据。当前阶段目标是先打通 Next 验证应用中的 registry 安装链路，并优先完成 `button` 组件。

## 1. 已确认信息

| 项目                | 决策                      |
| ------------------- | ------------------------- |
| 组件库名称          | `weiboUI`                 |
| npm scope           | `@weibo`                  |
| 品牌主色            | `#ff8200`                 |
| 首批组件            | `button`                  |
| 首个验证应用        | Next + Vite               |
| 暗色模式            | 需要                      |
| 底层优先            | Radix                     |
| MVP 是否发布 npm 包 | 是                        |
| MVP 是否做自有 CLI  | 否                        |
| 首个 style id       | `weibo`                   |
| 目标使用场景        | 移动端组件，兼容中后台 PC |

## 2. 待确认信息

| 项目          | 当前状态 | 说明                                                                                                             |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| Design Tokens | 已提供   | 移动端 token 已沉淀到 `docs/weiboui-design-tokens.zh-CN.md`，实现时应以 `tokens/tailwind.preset.js` 作为权威来源 |

## 3. 什么是 style id

`style id` 是组件库里一套视觉风格的稳定机器名，用来标识 registry 中的一组 design tokens、组件样式和安装路径。

它不是展示给用户看的品牌全名，而是用于代码、文件名和 registry 路径的短名称。

例如，如果 style id 是 `weibo`，后续会出现类似命名：

```txt
apps/v4/registry/styles/style-weibo.css
/r/styles/weibo/button.json
pnpm dlx shadcn@latest add https://your-domain.com/r/styles/weibo/button.json
```

## 4. style id 命名建议

建议使用：

- 小写英文。
- 短横线分隔。
- 不包含空格、中文、`@`、大写字母。
- 尽量稳定，后续不要频繁改名，因为它会进入 registry URL 和文档示例。

针对 `weiboUI`，已确认首个 style id 使用 `weibo`。此前评估过的候选如下：

| 候选 style id | 推荐度               | 说明                                                 |
| ------------- | -------------------- | ---------------------------------------------------- |
| `weibo`       | 推荐                 | 简短、稳定、和品牌强相关，适合默认首个 style         |
| `weiboui`     | 可用                 | 与组件库名称一致，但作为路径略长                     |
| `orange`      | 不推荐作为首个 style | 描述颜色而不是品牌，后续如果增加其他橙色主题容易混淆 |
| `default`     | 不推荐               | 语义过泛，不利于未来多品牌或多风格扩展               |

已选择 `weibo` 作为首个 style id。

## 5. 当前 MVP 范围建议

基于已提供信息，建议第一阶段只做以下闭环：

1. 新增 `weibo` style token。
2. 用品牌主色 `#ff8200` 建立 Light / Dark 两套 CSS variables。
3. 优先改造移动端友好的 `button`，同时保证在中后台 PC 场景下可用。
4. 在文档站补齐 button 的移动端尺寸、PC 中后台尺寸、状态和安装说明。
5. 执行 registry build。
6. 使用 Next 与 Vite 验证应用分别通过 registry URL 安装 button。
7. 暂不做自有 CLI，继续复用 shadcn CLI。

## 6. 当前实现状态

截至 2026-07-01，第一阶段 MVP 已经从“进入实现前确认”推进到“Button registry 链路已打通，等待完整外部构建与视觉验收”的状态。

已完成：

1. `weibo` style id 已确认并注册。
2. `tokens/tailwind.preset.js`、`src/theme.css` 与 `apps/v4/registry/styles/style-weibo.css` 已落地初版 token。
3. Light / Dark 两套 CSS variables 已接入 `.style-weibo`。
4. `base-weibo` 与 `radix-weibo` 的 `button` registry 输出已生成。
5. Button 示例已覆盖 Light / Dark、loading、disabled、icon button 与常用变体。
6. Next 与 Vite 的受限环境安装验证已完成：可以通过本地 registry URL 安装 `radix-weibo/button`，且生成物不依赖当前 monorepo 私有路径。
7. `pnpm weiboui:validate-registry` 已加入根脚本，用于持续校验 weiboUI registry 产物。

仍需完成：

1. 在可访问 npm registry 的环境中使用官方脚手架创建全新 Next / Vite 项目。
2. 在真实外部项目内执行 `pnpm dlx shadcn@latest init` 与 registry URL 安装。
3. 分别执行 Next / Vite 的 `pnpm build`。
4. 启动页面并截图验收 Light / Dark 下 Button 视觉。
5. 梳理 npm 包发布前的包名、CSS 入口、版本策略与 smoke test。

## 7. 接下来需要做什么

现在已经完成 Button MVP 的第一条 registry 安装链路。接下来建议按下面顺序推进，避免在 npm 发布前遗漏外部项目验证和视觉验收。

### 7.1 维持 registry 输出可验证

每次修改 weibo tokens、Button 样式或 Button 示例后，都应该重新执行 registry build，并运行 weiboUI 专用校验。

建议命令：

```bash
pnpm --filter=@shadcn/react build
pnpm --filter=shadcn build
pnpm --filter=v4 registry:build
pnpm weiboui:validate-registry
```

当前 `pnpm weiboui:validate-registry` 会检查：

- `style-weibo.css` 是否存在关键 token 映射。
- `apps/v4/app/globals.css` 是否注册 `style-weibo` variant。
- `apps/v4/app/style-registry.css` 是否导入 weibo style。
- `base-weibo` / `radix-weibo` 的 registry index、button 与 button example 是否存在。
- 生成后的 Button 源码是否包含关键 weibo token class。
- Button 示例 registry 内容是否与源文件同步。

### 7.2 完成真实 Next + Vite 外部项目验证

详细验证流程已沉淀到 `docs/weiboui-next-vite-validation.zh-CN.md`，当前受限环境结果见 `docs/weiboui-next-vite-validation-result.zh-CN.md`。

需要在可访问 npm registry 的环境中补齐：

1. 使用 `pnpm create next-app@latest` 创建全新 Next 项目。
2. 使用 `pnpm create vite@latest --template react-ts` 创建全新 Vite 项目。
3. 分别执行 `pnpm dlx shadcn@latest init`。
4. 分别执行 `pnpm dlx shadcn@latest add http://localhost:4000/r/styles/radix-weibo/button.json`。
5. 分别执行 `pnpm build`。
6. 启动页面并截图检查 Light / Dark 下按钮视觉。

### 7.3 补齐 button 文档和展示

Button MVP 组件说明已沉淀到 `docs/weiboui-button-mvp.zh-CN.md`。下一步需要把文档说明转成站点可见展示，至少覆盖：

- 移动端主按钮示例。
- 移动端次按钮示例。
- outline / ghost / destructive / link 示例。
- loading / disabled / icon button 示例。
- 暗色模式示例。
- 中后台 PC 尺寸示例。
- 通过 registry URL 安装的说明。

### 7.4 准备 npm 发布前检查清单

MVP 目标包含发布 npm 包，但暂不做自有 CLI。因此发布前至少需要确认：

1. 包名使用 `@weibo/react`、`@weibo/ui`，还是其他命名。
2. `style-weibo.css` 是否需要拆成 npm 可消费的 CSS 入口。
3. registry URL 安装与 npm 包消费之间的边界。
4. 发布 tag、版本号策略和 changelog 规则。
5. 发布前 smoke test：外部 Next、Vite 项目安装、build、截图。

### 7.5 第一阶段验收标准

第一阶段完成标准：

- `weibo` style 能在 style picker 中出现。
- `radix-weibo` registry JSON 能生成。
- Next 验证项目能安装并渲染 button。
- Vite 验证项目能安装并渲染 button。
- Light / Dark 下 button 视觉可用。
- 移动端点击热区不小于 44×44px。
- 不做自有 CLI，继续使用 shadcn CLI 安装。

当前判断：registry 产物和受限环境静态安装验证已经通过；完整外部项目 build、浏览器渲染截图和 npm 发布准备仍未关闭。
