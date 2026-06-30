# 基于当前项目创建自有 UI 组件库：开发实施文档

> 目标：在当前 shadcn/ui monorepo 基础上，沉淀一套可持续维护、可部署、可发布的自有 UI 组件库。本文档优先选择低风险路线：先定制 registry 与文档站，再逐步抽象 npm primitives，最后再考虑自有 CLI。

## 1. 项目定位

当前仓库已经具备组件库基础设施：

- 根目录使用 monorepo workspace，包含 `apps/*` 与 `packages/*`。
- `apps/v4` 是文档站、组件展示站与 registry 构建入口。
- `apps/v4/registry` 是 v4 组件 registry 的源码事实来源。
- `packages/react` 可作为可发布的 React primitives 包。
- `packages/shadcn` 提供 CLI、registry、schema、preset、icons 等能力。

因此，自有组件库建议采用“双轨模式”：

1. **源码安装轨道**：通过 registry 输出可被 CLI 安装的组件源码。
2. **npm primitives 轨道**：把复杂、无样式或跨组件复用的行为能力沉淀到 npm 包。

## 2. 总体实施路线

### 阶段一：MVP Registry 与品牌化文档站

目标：通过现有 registry 管线，完成首批品牌化组件，并可从部署后的 URL 安装。

主要任务：

- 保留当前 monorepo 结构，避免早期大规模迁移目录。
- 将 `apps/v4` 品牌化为自有 UI 官网与组件文档站。
- 在 `apps/v4/registry` 下新增或改造自有组件、主题、样式 token。
- 使用现有 `pnpm --filter=v4 registry:build` 生成 installable registry JSON。
- 部署 `apps/v4`，暴露 `/r/*` registry 资源。

验收标准：

- 可以通过 registry URL 安装至少一个组件。
- 文档站可以展示组件预览、安装命令与 API 说明。
- registry 构建、类型检查、格式检查通过。

### 阶段二：组件矩阵与设计系统稳定化

目标：覆盖常见业务项目 80% 的 UI 场景。

主要任务：

- 完成基础 token：颜色、字体、圆角、阴影、间距、动效。
- 完成 Light / Dark 主题。
- 完成核心组件矩阵。
- 完成常用业务 blocks。
- 增加组件文档、示例、可访问性说明与变更日志。

### 阶段三：npm primitives 包

目标：将复杂行为沉淀为稳定 npm 包，降低 registry 组件重复维护成本。

主要任务：

- 将复杂逻辑放入 `packages/react/src`。
- 为每个 primitive 增加独立 export、测试与 README。
- registry 组件可以依赖这些 primitives，但 UI 表层仍保留源码安装模式。

### 阶段四：自有 CLI（可选）

目标：提供专属安装体验。

主要任务：

- 评估是否需要 fork `packages/shadcn` 为自有 CLI。
- 定制命令、默认 registry、品牌文案与错误提示。
- 发布 `your-ui` CLI 包。

建议：只有当 registry、组件 API、发布流程都稳定后，再进入该阶段。

## 3. 推荐目录职责

```txt
.
├── apps
│   └── v4
│       ├── app/                 # Next 文档站与官网路由
│       ├── content/docs/        # 文档内容
│       ├── registry/            # registry 源码事实来源
│       ├── public/r/            # registry 构建输出，供 CLI 安装
│       └── styles/              # 文档站消费的编译后组件样式
├── packages
│   ├── react/                   # 可发布 React primitives
│   └── shadcn/                  # CLI、registry、schema、preset 等工具
└── templates/                   # 初始化项目模板
```

第一阶段不建议移动 `apps/v4/registry`，因为当前构建脚本、文档站和 registry 输出路径都围绕该位置工作。

## 4. Registry 开发规范

### 4.1 Source of truth

`apps/v4/registry` 是组件 registry 源码事实来源。开发者应手动维护 authored source，避免直接编辑生成物。

重点目录：

```txt
apps/v4/registry/
├── bases/
│   ├── base/
│   └── radix/
├── styles/
│   └── style-*.css
├── new-york-v4/
├── themes.ts
├── base-colors.ts
├── fonts.ts
└── config.ts
```

建议策略：

- 新增品牌视觉时，优先新增 `styles/style-yourbrand.css`。
- 新增基础组件时，优先维护 `bases/base` 与 `bases/radix` 中的对应源码。
- 如果同时支持 Base UI 与 Radix UI，公共 API 应尽量保持一致。
- 不建议新增 legacy style 目录作为长期方案，除非明确只做一次性兼容。

### 4.2 Registry item 分层

建议按用途组织 registry item：

- `registry:style`：样式与全局 token。
- `registry:ui`：基础 UI 组件。
- `registry:block`：业务组合块。
- `registry:hook`：hooks。
- `registry:lib`：工具函数。
- `registry:example`：文档示例。
- `registry:internal`：内部依赖，不直接暴露给用户。

### 4.3 生成物规则

禁止手动修改以下生成物，除非明确知道构建管线影响：

- `apps/v4/public/r/*`
- `apps/v4/styles/<style>/ui/*`
- runtime registry index 文件
- block metadata index 文件

提交前应运行完整 registry 构建，确保生成物与源码一致。

## 5. 组件开发规范

### 5.1 API 设计

组件 API 应稳定、简单、可组合：

```tsx
<Button variant="default" size="md" />
<Button variant="secondary" size="sm" />
<Button variant="destructive" />
<Button asChild />
```

推荐约定：

- `variant` 控制语义视觉。
- `size` 控制尺寸。
- `asChild` 支持组合式渲染。
- `className` 始终透传到最外层可样式化元素。
- 复杂组件内部使用 `data-slot` 标记结构。
- 状态样式优先基于 `data-state`、`aria-*`、`disabled`。

### 5.2 样式策略

建议使用：

- Tailwind CSS variables 管理 token。
- `class-variance-authority` 管理 variants。
- `clsx` 与 `tailwind-merge` 合并 className。
- CSS variables 承载颜色、圆角、字体、阴影、图表色。

禁止：

- 在组件中硬编码品牌色。
- 组件内部写死业务文案。
- 把不可复用的业务逻辑混入基础 UI 组件。

### 5.3 可访问性要求

基础要求：

- 表单控件必须支持 label、description、error。
- 弹层类组件必须处理 focus trap、Esc 关闭、aria 属性。
- 菜单类组件必须支持键盘导航。
- 禁用状态必须同时处理视觉、交互与语义属性。
- Icon-only button 必须有可访问名称。

复杂交互组件优先基于 Radix UI 或 Base UI，不建议自行实现底层交互协议。

## 6. npm primitives 规范

`packages/react` 用于沉淀复杂、跨组件复用、无样式或低样式耦合的能力。

推荐结构：

```txt
packages/react/src/
├── message-scroller/
├── command/
├── data-table/
├── form/
└── virtual-list/
```

每个 primitive 应包含：

```txt
index.ts
README.md
*.test.ts
*.test.tsx
```

发布要求：

- 每个 public primitive 都需要在 `package.json` 的 `exports` 中声明。
- 保持 peer dependencies 宽松但明确。
- 不把业务主题 token 绑定到 primitives。
- primitives 可以被 registry 组件消费。

## 7. 文档站规范

文档站应承担四类职责：

1. **组件说明**：安装、用法、API、可访问性说明。
2. **实时预览**：展示不同 variant、size、state。
3. **主题展示**：展示颜色、字体、圆角、暗色模式。
4. **Registry 入口**：提供 CLI 可访问的 `/r/*` 输出。

推荐每个组件文档包含：

- 简介。
- 安装命令。
- 基础用法。
- Variants。
- Sizes。
- Composition 示例。
- Accessibility 说明。
- Changelog 或 breaking changes。

## 8. 构建与验证流程

### 8.1 本地开发

```bash
pnpm install
pnpm --filter=v4 dev
```

### 8.2 Registry 构建

完整构建：

```bash
pnpm --filter=v4 registry:build
```

局部迭代可使用 targeted build，但提交前必须执行完整构建。

### 8.3 质量检查

建议提交前运行：

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm --filter=v4 validate:registries
```

如修改了 `packages/react`：

```bash
pnpm --filter=@shadcn/react test
pnpm --filter=@shadcn/react typecheck
pnpm --filter=@shadcn/react build
```

如后续包名已改为自有 scope，应同步替换 filter 名称。

## 9. 发布流程

### 9.1 发布 registry 与文档站

```bash
pnpm --filter=v4 build
```

部署 `apps/v4` 后，用户应可以通过公开 URL 访问 registry JSON。

### 9.2 发布 npm primitives

```bash
pnpm --filter=@your-scope/react build
pnpm --filter=@your-scope/react publish --access public
```

### 9.3 发布自有 CLI（可选）

```bash
pnpm --filter=your-ui build
pnpm --filter=your-ui publish --access public
```

## 10. 用户安装体验设计

### 10.1 URL 安装

适合 MVP 阶段：

```bash
pnpm dlx shadcn@latest add https://your-domain.com/r/styles/your-style/button.json
```

### 10.2 命名 registry 安装

适合 registry 稳定后：

```json
{
  "registries": {
    "@your-ui": "https://your-domain.com/r/{name}.json"
  }
}
```

```bash
pnpm dlx shadcn@latest add @your-ui/button
```

### 10.3 自有 CLI 安装

适合成熟阶段：

```bash
pnpm dlx your-ui init
pnpm dlx your-ui add button
pnpm dlx your-ui add dashboard-01
```

## 11. 推荐首批组件清单

### 基础组件

- button
- input
- textarea
- label
- checkbox
- radio-group
- switch
- select
- dialog
- sheet
- popover
- dropdown-menu
- tabs
- accordion
- tooltip
- badge
- avatar
- card
- table
- form

### 业务 blocks

- login-form
- signup-form
- dashboard-shell
- sidebar-layout
- settings-page
- data-table
- pricing-section
- hero-section
- empty-state
- error-page

### primitives 候选

- message-scroller
- virtual-list
- command primitives
- data-table state hooks
- form field primitives
- keyboard navigation hooks

## 12. 团队协作约定

- 所有组件 API 变更必须更新文档和示例。
- 所有 registry 组件新增、删除、重命名后，需要重建 registry indexes。
- 所有视觉 token 变更必须验证 Light / Dark 两种模式。
- 所有复杂交互组件必须补充可访问性检查说明。
- 不直接修改生成物；通过 registry 构建产生输出。
- 新增 npm primitive 时必须同步更新 `exports`、测试与 README。

## 13. 风险与规避

| 风险                                | 规避方案                                |
| ----------------------------------- | --------------------------------------- |
| 过早 fork CLI，维护成本过高         | MVP 阶段继续兼容官方 shadcn CLI         |
| 组件源码和文档不同步                | 组件 PR 必须包含文档示例                |
| 生成物被手改                        | 提交前执行完整 registry build           |
| 主题 token 无边界                   | 所有颜色、圆角、字体、阴影进入 token 层 |
| primitives 与 UI 强耦合             | primitives 保持 headless 或低样式耦合   |
| 同时维护 Base UI 与 Radix UI 成本高 | 先选一个主 base，另一个按需补齐         |

## 14. 现在第一步应该做什么

第一步不是马上改组件代码，而是先完成一份 **MVP 范围确认清单**。这一步的目标是把“要做一个自己的 UI 组件库”收敛成可以在 1～2 周内验证的最小闭环。

### 14.1 第一天要产出的内容

请先确定并记录以下 6 个决策：

1. **组件库名称**：例如 `Acme UI`、`Your UI`。
2. **npm scope**：例如 `@acme`、`@your-org`。
3. **首个 style id**：例如 `acme`、`brand`、`default`，用于后续 `style-acme.css`。
4. **首批 5 个组件**：建议选择 `button`、`input`、`card`、`dialog`、`form`。
5. **首个验证项目类型**：建议先选 Next 或 Vite 中团队最常用的一种；如需要覆盖更完整场景，可以同时验证 Next + Vite。
6. **是否暂缓自有 CLI**：MVP 阶段建议明确写下“暂缓，先复用 shadcn CLI + 自有 registry URL”。

### 14.2 需要业务方/负责人提供的信息

为了进入执行，我需要你先提供以下信息；如果暂时没有答案，可以先写“待定”，但组件库名称、首个 style id、首批组件这 3 项建议当天确定。

| 信息                              | 必填     | 示例                                        | 用途                                        |
| --------------------------------- | -------- | ------------------------------------------- | ------------------------------------------- |
| 组件库中文/英文名称               | 是       | `Acme UI`                                   | 用于文档站标题、README、后续包名与品牌露出  |
| npm scope 或组织名                | 是       | `@acme`                                     | 用于规划 `@acme/react`、`@acme/ui` 等包名   |
| 首个 style id                     | 是       | `acme`                                      | 用于命名 `style-acme.css` 与 registry style |
| 品牌主色与中性色                  | 是       | `blue` + `neutral`                          | 用于第一版 token 与 Light / Dark 主题       |
| 首批 5 个组件                     | 是       | `button`、`input`、`card`、`dialog`、`form` | 用于锁定 MVP 范围                           |
| 首个验证应用类型                  | 是       | Next / Vite / Next + Vite                   | 用于端到端验证安装体验                      |
| 是否需要暗色模式                  | 建议提供 | 是                                          | 影响 token 设计和验收标准                   |
| 是否需要同时支持 Radix 与 Base UI | 建议提供 | 先 Radix                                    | 影响实现成本和目录维护范围                  |
| 目标使用方                        | 建议提供 | 内部中后台 / 官网 / SaaS                    | 影响组件优先级和 blocks 类型                |
| 是否计划发布 npm 包               | 可后置   | MVP 暂不发布                                | 影响 `packages/react` 的改造优先级          |
| 是否计划自有 CLI                  | 可后置   | MVP 暂缓                                    | 影响是否 fork `packages/shadcn`             |

建议你可以直接按下面模板回复：

```txt
组件库名称：
npm scope：
首个 style id：
品牌主色/中性色：
首批 5 个组件：
首个验证应用：Next / Vite / Next + Vite / 其他
暗色模式：需要 / 暂不需要
底层优先：Radix / Base UI / 暂不确定
目标使用场景：
MVP 是否发布 npm 包：是 / 否
MVP 是否做自有 CLI：是 / 否
```

### 14.3 第一周执行顺序

完成决策后，按下面顺序执行：

1. 新增首个品牌 style token 文件，例如 `apps/v4/registry/styles/style-acme.css`。
2. 在 registry 配置中注册该 style，并确认文档站可以识别。
3. 品牌化首批 5 个基础组件。
4. 为首批组件补齐 docs 与 examples。
5. 执行 `pnpm --filter=v4 registry:build`。
6. 启动文档站，确认组件预览可用。
7. 在一个外部 Next 或 Vite 项目中通过 registry URL 安装组件，完成端到端验证。

### 14.4 第一步完成标准

当以下内容都满足时，第一步才算完成：

- 已有一份明确的 MVP 决策记录。
- 已确定首个 style id 与首批 5 个组件。
- 团队同意 MVP 阶段不 fork CLI，优先打通 registry 安装链路。
- 可以开始创建 `style-<brand>.css` 与首批组件改造任务。

### 14.5 建议任务拆分

可以把第一步拆成 3 个 issue：

1. `docs: define UI library MVP decisions`
   - 记录名称、scope、style id、首批组件、验证项目与 CLI 策略。
2. `feat(registry): add initial brand style tokens`
   - 新增首个品牌 style token，并接入 registry 配置。
3. `feat(registry): brand first five UI components`
   - 改造首批 5 个组件，并补齐 docs/examples。

## 15. 后续里程碑

1. 完成 MVP 决策记录。
2. 新增首个品牌 style token 文件。
3. 选择 5 个基础组件完成品牌化改造。
4. 为这 5 个组件补齐文档与 examples。
5. 执行 registry build 并部署文档站。
6. 在一个外部 Next 或 Vite 项目中验证安装体验。
