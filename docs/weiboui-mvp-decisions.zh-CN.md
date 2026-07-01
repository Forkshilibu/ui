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

## 6. 进入实现前还需要你确认

Design Tokens 已提供，下一步可以开始创建 `tokens/tailwind.preset.js`、`src/theme.css` 与 `style-weibo.css`，并围绕移动端优先、兼容中后台 PC 的 `button` 打通第一条 MVP 链路。

## 7. 接下来需要做什么

现在已经完成了第一轮编码：`weibo` style 已注册，初版 token preset、theme variables 和 button style 已落地。接下来建议按下面顺序推进，避免一次性生成过多无关产物。

### 7.1 生成并验证 registry 输出

1. 先构建基础包，保证本地 `shadcn` 与 `@shadcn/react` 可被 v4 app 解析。
2. 针对 `radix-weibo` 做局部 registry/style 构建。
3. 如果局部构建通过，再执行完整 `registry:build`。
4. 检查 `apps/v4/public/r/styles/radix-weibo/button.json` 是否生成。
5. 检查 `apps/v4/styles/radix-weibo/ui/button.tsx` 是否生成。

建议命令：

```bash
pnpm --filter=@shadcn/react build
pnpm --filter=shadcn build
pnpm --filter=v4 registry:build -- --style radix-weibo --registry radix-weibo --indexes
```

### 7.2 补齐 button 文档和示例

Button MVP 组件说明已沉淀到 `docs/weiboui-button-mvp.zh-CN.md`。`button` 是 MVP 首个组件，下一步需要补齐：

- 移动端主按钮示例。
- 移动端次按钮示例。
- outline / ghost / destructive / link 示例。
- loading / disabled / icon button 示例。
- 暗色模式示例。
- 中后台 PC 尺寸示例。
- 通过 registry URL 安装的说明。

### 7.3 建立 Next + Vite 验证应用

详细验证流程已沉淀到 `docs/weiboui-next-vite-validation.zh-CN.md`。需要分别验证：

- Next 项目可以安装 `radix-weibo/button`。
- Vite 项目可以安装 `radix-weibo/button`。
- 安装后不依赖当前 monorepo 的私有路径。
- 暗色模式下 CSS variables 正确切换。
- Button 不出现任意值色值、任意字号或非标准圆角。

### 7.4 第一阶段验收标准

第一阶段完成标准：

- `weibo` style 能在 style picker 中出现。
- `radix-weibo` registry JSON 能生成。
- Next 验证项目能安装并渲染 button。
- Vite 验证项目能安装并渲染 button。
- Light / Dark 下 button 视觉可用。
- 移动端点击热区不小于 44×44px。
- 不做自有 CLI，继续使用 shadcn CLI 安装。
