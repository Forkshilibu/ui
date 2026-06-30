# weiboUI 移动端 Design Tokens

> 本文档沉淀 weiboUI MVP 的移动端 Design Tokens 约束。后续如果在当前 monorepo 内落地代码，建议新增 `tokens/tailwind.preset.js` 作为 token 权威来源，并让应用侧 `tailwind.config.js` 只负责引用 preset 和声明 content。

## 1. Token 权威来源与使用原则

- `tokens/tailwind.preset.js` 应作为 token 权威来源。
- `tailwind.config.js` 只用于项目构建，负责引用 preset 并声明 content。
- 页面和组件只能使用 preset 中定义的 Tailwind token。
- 不得使用 Tailwind 任意值语法，例如 `bg-[#FF8200]`、`text-[13px]`、`rounded-[7px]`。
- 不得在组件 CSS、示例或文档 demo 中直接写原始色值。

## 2. 颜色 Token 规则

颜色 token 以 Figma 文件级本地变量为来源。Figma 变量对象应保留 `name`、`description`、`codeSyntax`、light/dark 原始值等信息。

按钮分组中，部分 Figma 源变量保留了历史重复前缀 `btn/btn-*`；仓库内需要归一化为 `btn.*` 和 `--w-btn-*`。

实现规则：

- `tokens/tailwind.preset.js` 按 Figma Group 分层定义颜色，例如 `colors.c.brand`、`colors.btn.orange-a`。
- Tailwind 色值直接引用 CSS 变量，例如 `var(--w-c-brand)`。
- 不使用 `colorToken`、`rgb(...)` 或 `<alpha-value>`。
- `src/theme.css` 在 `:root` 定义浅色变量，在根节点 `.theme-dark` 覆盖同名变量。
- CSS 变量统一使用 `--w-*` 前缀，例如 `--w-c-brand`、`--w-btn-orange-a`。
- Figma 原始值直接写入 CSS 变量，包括 8 位 hex alpha，例如 `#FF82000D`。
- 组件 CSS 和页面示例不得通过新增 `*-dark` token 实现暗黑模式。
- 不使用 Tailwind 透明度 class，例如 `bg-c-brand/20`。
- 如需透明色，必须使用 Figma 已定义的 alpha token。

## 3. 核心颜色 Token

| Token                  | Light       | Dark        | Figma 来源                   | 备注                         |
| ---------------------- | ----------- | ----------- | ---------------------------- | ---------------------------- |
| `c.brand`              | `#FF8200`   | `#EA8011`   | `c/brand`                    | 品牌色                       |
| `c.brand-80`           | `#FF8200CC` | `#EA8011CC` | `品牌色80`                   | 品牌色 80% alpha             |
| `c.brand-60`           | `#FF820099` | `#FFFFFF`   | `品牌色60`                   | 品牌色 60% alpha             |
| `c.brand-40`           | `#FF820066` | `#EA801166` | `品牌色40`                   | 品牌色 40% alpha             |
| `c.brand-20`           | `#FF820033` | `#EA801133` | `Col/brand/brand 20`         | 品牌色 20% alpha             |
| `c.brand-10`           | `#FF82001A` | `#EA80111A` | `Col/brand/brand 10`         | 品牌色 10% alpha             |
| `c.badge`              | `#F43530`   | `#BA361D`   | `Col/func/badge` / `c/badge` | 红点提醒                     |
| `c.content`            | `#333333`   | `#D3D3D3`   | `c/content`                  | 昵称、正文                   |
| `c.subtitle`           | `#636363`   | `#999999`   | `c/subtitle`                 | 转发、副标题                 |
| `c.attachment`         | `#939393`   | `#888888`   | `c/attachment`               | 时间来源                     |
| `c.empty`              | `#BDBDBD`   | `#3A3A3A`   | `c/empty`                    | 失效描述文字色               |
| `c.empty-gray`         | `#F5F5F5`   | `#2D2D2D`   | `c/empty-gray`               | 占位图/加载失败背景          |
| `c.card`               | `#FFFFFF`   | `#1E1E1E`   | `c/card`                     | 卡片背景                     |
| `c.card-pressed`       | `#F0F0F0`   | `#1B1B1B`   | `c/card-pressed`             | 卡片点击色                   |
| `c.global`             | `#F5F5F5`   | `#151515`   | `c/global`                   | 全局背景底色                 |
| `c.spacing`            | `#EEEEEE`   | `#151515`   | `c/spacing`                  | 全局背景底色                 |
| `c.retweet`            | `#F7F7F7`   | `#181818`   | `c/retweet`                  | 转发                         |
| `c.multimedia`         | `#F8F8F8`   | `#181818`   | `c/multimedia`               | 多媒体背景                   |
| `c.multimedia-pressed` | `#F0F0F0`   | `#161616`   | `c/multimedia-pressed`       | 多媒体点击                   |
| `c.dividing`           | `#E6E6E6`   | `#151515`   | `c/dividing`                 | 分割线                       |
| `c.contrast`           | `#FFFFFF`   | `#D3D3D3`   | `c/contrast`                 | 深底白字                     |
| `c.link`               | `#507DAF`   | `#7691B9`   | `c/link`                     | 链接色                       |
| `c.focus`              | `#F46200`   | `#C95700`   | `c/focus`                    | 焦点色                       |
| `c.encourage`          | `#10B524`   | `#2AA045`   | `c/encourage`                | 鼓励色                       |
| `c.alart`              | `#E14123`   | `#D33635`   | `c/alart`                    | 警示色，沿用 Figma 原始拼写  |
| `c.failbrown`          | `#AF8246`   | `#977030`   | `c/failbrown`                | 失效提示                     |
| `c.switch-off`         | `#E9E9E9`   | `#3B3B3B`   | `c/switch-off`               | 关态开关背景                 |
| `c.default-blue`       | `#DCECFA`   | `#303E55`   | `c/default-blue`             | 默认蓝色占位                 |
| `c.bubble`             | `#3FA3FF`   | `#1E1E1E`   | `Col/func/bubble`            | 消息箱自己发出对话气泡背景色 |
| `c.inbox-font`         | `#A6E4FF`   | `#507DAF`   | `Col/func/inbox_font`        | 蓝底气泡 @ 链接色            |

## 4. 按钮颜色 Token

| Token                        | Light       | Dark        | Figma 来源                              | 备注                    |
| ---------------------------- | ----------- | ----------- | --------------------------------------- | ----------------------- |
| `btn.orange-a`               | `#FF8200`   | `#C76D28`   | `btn/orange-a`                          | 橙色按钮渐变起点        |
| `btn.orange-b`               | `#FFBC33`   | `#CA962B`   | `btn/orange-b`                          | 橙色按钮渐变终点        |
| `btn.orange-pressed-a`       | `#EB7922`   | `#A7651E`   | `btn/orange-pressed-a`                  | 橙色按钮按下起点        |
| `btn.orange-pressed-b`       | `#EFB234`   | `#AC7C1E`   | `btn/orange-pressed-b`                  | 橙色按钮按下终点        |
| `btn.orange-fil`             | `#FF82000D` | `#EA80110D` | `btn/orange-fil`                        | 橙色线框点击填充        |
| `btn.orange-outline-pressed` | `#FFF7EF`   | `#28221D`   | `按钮/线框/橙色线框/橙色线框_背景_按下` | Follow 橙色线框按下填充 |
| `btn.green-a`                | `#41A852`   | `#398845`   | `btn/green-a`                           | 绿色按钮渐变起点        |
| `btn.green-b`                | `#64C87B`   | `#469D5E`   | `btn/green-b`                           | 绿色按钮渐变终点        |
| `btn.green-pressed-a`        | `#2A9A3C`   | `#276431`   | `btn/green-pressed-a`                   | 绿色按钮按下起点        |
| `btn.green-pressed-b`        | `#5FB974`   | `#348245`   | `btn/green-pressed-b`                   | 绿色按钮按下终点        |
| `btn.green-fil`              | `#4CBC5F0D` | `#46A85D0D` | `btn/green-fil`                         | 绿色线框点击填充        |
| `btn.blue-a`                 | `#4294EA`   | `#4279B3`   | `btn/blue-a`                            | 蓝色按钮渐变起点        |
| `btn.blue-b`                 | `#52B4EB`   | `#4991B9`   | `btn/blue-b`                            | 蓝色按钮渐变终点        |
| `btn.blue-pressed-a`         | `#2471C2`   | `#346393`   | `btn/btn-blue-pressed-a`                | 蓝色按钮按下起点        |
| `btn.blue-pressed-b`         | `#55A5D0`   | `#306F93`   | `btn/btn-blue-pressed-b`                | 蓝色按钮按下终点        |
| `btn.blue-fil`               | `#5B9CD40D` | `#568FC70D` | `btn/blue-fil`                          | 蓝色线框点击填充        |
| `btn.red-a`                  | `#E72A25`   | `#B03E3E`   | `btn/btn-red-a`                         | 红色按钮渐变起点        |
| `btn.red-b`                  | `#FF8181`   | `#D05150`   | `btn/btn-red-b`                         | 红色按钮渐变终点        |
| `btn.red-pressed-a`          | `#D4382B`   | `#913A33`   | `btn/btn-red-pressed-a`                 | 红色按钮按下起点        |
| `btn.red-pressed-b`          | `#EE6B66`   | `#AC423F`   | `btn/btn-red-pressed-b`                 | 红色按钮按下终点        |
| `btn.red-fil`                | `#F469690D` | `#D1413F0D` | `btn/btn-red-fil`                       | 红色线框点击填充        |
| `btn.gray`                   | `#F6F6F6`   | `#2C2C2C`   | `btn/gray`                              | 灰色按钮背景            |
| `btn.gray-pressed`           | `#EAEAEA`   | `#272727`   | `btn/gray-pressed`                      | 灰色按钮按下背景        |
| `btn.gray-disabled`          | `#F6F6F680` | `#2C2C2C80` | `btn/gray-disabled`                     | 禁用背景                |
| `btn.gray-stroke`            | `#93939366` | `#8888884D` | `btn/gray-stroke`                       | 灰色线框                |
| `btn.gray-outline-pressed`   | `#F9F9F9`   | `#242424`   | `按钮/线框/灰色线框/灰色线框_背景_按下` | Follow 已关注按下填充   |
| `btn.gray-fill`              | `#9393930D` | `#8888880D` | `btn/gray-fill`                         | 灰色线框点击填充        |
| `btn.link`                   | `#7593CB`   | `#5C77A9`   | `btn/btn-link`                          | 新流蓝色实色背景        |
| `btn.link-pressed`           | `#6785BE`   | `#5771A0`   | `btn/btn-link-pressed`                  | 新流蓝色按下            |
| `btn.link-stroke`            | `#546992`   | `#7A8BA5`   | `Btn/outline/newblue/border`            | 新流蓝色线框            |
| `btn.link-fil`               | `#5469920D` | `#7A8BA50D` | `btn/btn-link-fil`                      | 新流蓝色线框点击填充    |

## 5. 辅助色、图标、弹层与遮罩 Token

| Token                       | Light       | Dark                    | Figma 来源                                         | 备注                                    |
| --------------------------- | ----------- | ----------------------- | -------------------------------------------------- | --------------------------------------- |
| `base.aux.avatar-stroke-05` | `#0000000D` | `#FFFFFF1A`             | `基础颜色/辅助色/#000000 05头像描边`               | 头像描边                                |
| `base.aux.black-10`         | `#0000001A` | `#0000004D`             | `基础颜色/特殊色/黑&白 特殊色/#000000 010 白色`    | 半透明遮罩                              |
| `base.aux.black-20`         | `#00000033` | `#FFFFFF33`             | `基础颜色/辅助色/#000000- 020 黑色`                | 半透明文本                              |
| `base.white.d3-80`          | `#FFFFFFCC` | `#D3D3D3CC`             | `基础颜色/特殊色/白色色阶 #FF-D3/#FFFFFF 080 白色` | 禁用白字                                |
| `icon.default`              | `#D6D6D6`   | `#666666`               | `Icon/#D6D6D6`                                     | 默认图标                                |
| `icon.liked-pink`           | `#FFD7A5`   | `PENDING_DESIGN_REVIEW` | `图标/#FFD7A5 赞-肉粉`                             | 已赞图标肉粉填充，待补 Figma 暗黑变量值 |
| `icon.liked-orange`         | `#F48700`   | `PENDING_DESIGN_REVIEW` | `图标/#F48700 赞-橙色`                             | 已赞图标橙色填充，待补 Figma 暗黑变量值 |
| `icon.liked-red`            | `#E04023`   | `PENDING_DESIGN_REVIEW` | `图标/#E04023 赞-红色`                             | 已赞图标红色描边，待补 Figma 暗黑变量值 |
| `topnav.visit-bg`           | `#00000026` | `#FFFFFF26`             | TopNav 文档访问量胶囊                              | 待设计变量确认                          |
| `avatar.live-start`         | `#FF8F00`   | `#FF8F00`               | Avatar 节点直播标签渐变起点                        | 组件值                                  |
| `avatar.live-end`           | `#FF5200`   | `#FF5200`               | Avatar 节点直播标签渐变终点                        | 组件值                                  |
| `popup.toast`               | `#333333F0` | `#2C2C2CF0`             | `Popup/toast`                                      | 轻提示背景                              |
| `popup.share`               | `#FAFAFABF` | `#242424`               | `Popup/share`                                      | 分享弹层背景                            |
| `popup.dialog`              | `#FFFFFF`   | `#2C2C2C`               | `Popup/dialog` / `弹层/#FFFFFF 对话框`             | 对话框背景色                            |
| `popup.bubble-yellow`       | `#F5B22AFA` | `#DD8855FA`             | `Popup/bubble_yellow`                              | 黄色提示气泡                            |

## 6. 遮罩层

遮罩层统一蒙层色阶透明度，用于弹窗背景、图片遮罩、底部面板、毛玻璃效果等场景。提供黑色五档和白色五档；遮罩层不区分暗色模式，两种模式下值相同。

| Token      | Tailwind class | 值          | 用途                                             |
| ---------- | -------------- | ----------- | ------------------------------------------------ |
| `black-80` | `bg-black-80`  | `#000000CC` | 运营类弹层背景、沉浸式浮层、视频播放遮罩         |
| `black-60` | `bg-black-60`  | `#00000099` | 模态弹窗背景、全屏遮罩、重要操作确认             |
| `black-40` | `bg-black-40`  | `#00000066` | 底部面板背景、半屏弹窗、图片预览遮罩             |
| `black-20` | `bg-black-20`  | `#00000033` | 轻量提示背景、卡片悬浮遮罩、渐变过渡             |
| `black-10` | `bg-black-10`  | `#0000001A` | 微弱分隔层、列表项按压态反馈、图片微暗处理       |
| `white-80` | `bg-white-80`  | `#FFFFFFCC` | 浅色毛玻璃面板、搜索栏下拉背景、沉浸式阅读遮罩   |
| `white-60` | `bg-white-60`  | `#FFFFFF99` | 毛玻璃效果底层、顶部导航栏半透明背景             |
| `white-40` | `bg-white-40`  | `#FFFFFF66` | 深色模式弹层背景、视频暂停蒙层、骨架屏底色       |
| `white-20` | `bg-white-20`  | `#FFFFFF33` | 深色卡片悬浮态、夜间模式按钮 hover、深色背景分隔 |
| `white-10` | `bg-white-10`  | `#FFFFFF1A` | 图片高光叠加、卡片微光泽、浅色内容区呼吸层       |

使用约束：

- 只使用 `bg-black-*` / `bg-white-*` class，不用 Tailwind 透明度 class 拼装遮罩。
- `black-60` 优先用于模态弹窗背景和全屏遮罩。
- `black-40` 优先用于底部面板背景、半屏弹窗和图片预览遮罩。
- `black-10` 可用于图片微暗处理；头像和 V 标深色蒙层仍按对应组件规范执行。
- `white-60` 优先用于顶部导航栏半透明背景和毛玻璃效果。
- `white-40` 优先用于深色模式弹层背景和骨架屏底色。
- 白色色阶主要用于深色模式下的层级区分与毛玻璃效果。

## 7. 排版 Token

来源：Figma 节点 `02 字体排版 Typography`。

### 字体家族

- iOS：中文使用 PingFang SC，英文/数字使用 SF Pro Text / SF Pro Display。
- Android：中文使用 HarmonyOS Sans SC，英文/数字使用 Roboto。
- Web/H5：`font-sans` 使用 `-apple-system`、`BlinkMacSystemFont`、`PingFang SC`、`HarmonyOS Sans SC`、`Microsoft YaHei`、`Roboto`、`Helvetica`、`Arial`、`sans-serif`。

### 字重

- 仅允许 3 档：Regular 400、Medium 500、Semibold 600。
- Regular 400 用于 body、label、caption。
- Medium 500 仅用于 `display/large` 和 headline 系列标题。
- Semibold 600 仅用于数据数字强调，例如关注数、粉丝数、点赞量。

### 行高

- 短文本 `<2` 行：使用 `text-*` token 自带 `line-height: normal`，对应 Figma Auto。
- 长文本 `>=2` 行：在 `text-*` token 外叠加对应 `leading-*-long`，行高按字号 × 1.5 后向上取偶。
- 深色模式不改变字号、字重、行高或字间距，只调整文字颜色。

| Token              | 字号 | 字重 | 短文本行高 | 长文本行高                        | 用途                                 |
| ------------------ | ---- | ---- | ---------- | --------------------------------- | ------------------------------------ |
| `text-display-lg`  | 28   | 500  | normal     | `leading-display-lg-long` / 42px  | 启动页标语、运营活动大标题           |
| `text-headline-lg` | 22   | 500  | normal     | `leading-headline-lg-long` / 34px | 页面主标题、沉浸式详情标题           |
| `text-headline-md` | 20   | 500  | normal     | `leading-headline-md-long` / 30px | 模块大标题、发布页标题、个人中心昵称 |
| `text-headline-sm` | 17   | 500  | normal     | `leading-headline-sm-long` / 26px | 顶部导航栏 NavBar 标题               |
| `text-headline-xs` | 16   | 500  | normal     | `leading-headline-xs-long` / 24px | 内容模块标题、搜索页标题             |
| `text-body-lg`     | 16   | 400  | normal     | `leading-body-lg-long` / 24px     | 正文、列表标题、评论区标题           |
| `text-body-md`     | 15   | 400  | normal     | `leading-body-md-long` / 24px     | 长文阅读、私信气泡                   |
| `text-body-sm`     | 14   | 400  | normal     | `leading-body-sm-long` / 22px     | 评论正文、通用说明、会话昵称         |
| `text-label-lg`    | 14   | 400  | normal     | `leading-label-lg-long` / 22px    | 主按钮、关注、发布、登录、表单 Label |
| `text-label-md`    | 13   | 400  | normal     | `leading-label-md-long` / 20px    | 互动按钮，转发、评论、点赞           |
| `text-label-sm`    | 12   | 400  | normal     | `leading-label-sm-long` / 18px    | 小标签、话题胶囊、次级按钮           |
| `text-caption-lg`  | 13   | 400  | normal     | `leading-caption-lg-long` / 20px  | 列表次要说明、会话消息预览           |
| `text-caption-md`  | 12   | 400  | normal     | `leading-caption-md-long` / 18px  | 时间、地点、浏览量、元信息           |
| `text-caption-sm`  | 11   | 400  | normal     | `leading-caption-sm-long` / 18px  | 角标数字、红点计数、认证标注         |
| `text-caption-xs`  | 10   | 400  | normal     | `leading-caption-xs-long` / 16px  | 底部标签栏 TabBar 文字               |

使用约束：

- 不得新增非标准字号，例如 19px、17.5px。
- 中英文混排时，英文和数字默认继承中文字号与字重。
- 正文字号不得小于 12px；可点击文字不得小于 13px；点击热区不得小于 44×44px。
- 字间距统一为 0；组件级字间距若来自历史 Figma 节点，后续按对应组件节点复核。

## 8. 布局 Token

布局 token 在 `src/theme.css` 中以 Figma 标注的 CSS 变量名落地，例如 `--spacing-md`、`--spacing-container-padding`、`--breakpoint-pad-min`。Tailwind spacing 和 grid class 直接引用这些变量；Tailwind `screens` 使用静态数值生成断点。

移动端以 2px 为基础单位，Foldable / Pad 以 4px 为基础单位；所有间距遵循 2px 基线。

| Token                       | Tailwind class                    | 值                 | 使用场景                              |
| --------------------------- | --------------------------------- | ------------------ | ------------------------------------- |
| `spacing.none`              | `p-none` / `gap-none`             | 0                  | 间距为零                              |
| `spacing.2xs`               | `p-2xs` / `gap-2xs`               | 2px                | 极紧凑尺寸内/外边距                   |
| `spacing.xs`                | `p-xs` / `gap-xs`                 | 4px                | 超紧凑尺寸内/外边距                   |
| `spacing.sm`                | `p-sm` / `gap-sm`                 | 6px                | 紧凑尺寸内/外边距                     |
| `spacing.md-compact`        | `p-md-compact` / `gap-md-compact` | 8px                | 默认偏紧凑尺寸内/外边距               |
| `spacing.md-tight`          | `p-md-tight` / `gap-md-tight`     | 10px               | 默认紧凑增强尺寸内/外边距，卡片间距   |
| `spacing.md`                | `p-md` / `gap-md`                 | 12px               | 默认尺寸内/外边距，内容区上下 padding |
| `spacing.md-relaxed`        | `p-md-relaxed` / `gap-md-relaxed` | 14px               | 默认偏宽松尺寸内/外边距               |
| `spacing.lg`                | `p-lg` / `gap-lg`                 | 16px               | 宽松尺寸内/外边距                     |
| `spacing.xl`                | `p-xl` / `gap-xl`                 | 24px               | 超宽松尺寸内/外边距                   |
| `spacing.2xl`               | `p-2xl` / `gap-2xl`               | 32px               | 极宽松尺寸内/外边距                   |
| `spacing.container-padding` | `px-container-padding`            | 14px / 24px / 32px | 可用页面边距 token，随响应式分级变化  |

AI 选距规则：

- 先判断层级，再选数值：元素内部微调用 `2xs` / `xs` / `sm`，控件和列表内部用 `md-compact` / `md` / `md-relaxed`，模块和卡片组之间用 `md-tight` / `lg` / `xl` / `2xl`。
- `spacing.none` 只用于明确无间距的贴合场景。
- `spacing.2xs`、`spacing.xs`、`spacing.sm` 用于紧凑组件内部，不作为页面主留白。
- `spacing.md-compact`、`spacing.md-tight`、`spacing.md`、`spacing.md-relaxed` 是默认区间，优先用于按钮、表单、列表项、卡片内边距和内容块分隔。
- `spacing.md-tight` 是卡片间距默认值。
- `spacing.xl` 和 `spacing.2xl` 用于大块内容分组、页面级分隔或顶部大间距区。
- 需要页面边距 token 时优先使用 `px-container-padding`，不要按设备写死 `12px` / `14px` / `24px`。

## 9. 响应式分级

布局切换依据窗口宽度，不直接按设备型号判断。

| 分级     | 断点          | 结构定位     | 适用场景                                   | 容器边距 |
| -------- | ------------- | ------------ | ------------------------------------------ | -------- |
| Mobile   | `<600px`      | 单列主内容流 | 手机、折叠屏外屏、小窗模式                 | 14px     |
| Foldable | `600px~904px` | 双区布局     | 折叠屏展开态、中等宽度窗口、小尺寸平板竖屏 | 24px     |
| Pad      | `>=905px`     | 双区布局     | Pad、大尺寸横向窗口                        | 32px     |

断点 token：

- `mobile`：`max-width: 599px`。
- `foldable`：`min-width: 600px` 到 `max-width: 904px`，对应 `--breakpoint-foldable-min` / `--breakpoint-foldable-max`。
- `pad`：`min-width: 905px`，对应 `--breakpoint-pad-min`。

页面结构：

| 项目               | 值                 | Token / class                                                     |
| ------------------ | ------------------ | ----------------------------------------------------------------- |
| 顶部导航           | 44px               | `--layout-nav-top-height` / `h-layout-nav-top-height`             |
| 底部导航 L1        | 50px               | `--layout-nav-bottom-height-l1` / `h-layout-nav-bottom-height-l1` |
| 底部导航 L2        | 54px               | `--layout-nav-bottom-height-l2` / `h-layout-nav-bottom-height-l2` |
| 内容区上下间距     | 12px               | `--spacing-md` / `py-md`                                          |
| 可用页面边距 token | 14px / 24px / 32px | `--spacing-container-padding` / `px-container-padding`            |

结构原则：

- 以窗口宽度为准：布局切换依据窗口宽度，不按设备型号判断。
- 以内容容器重排为核心：大屏通过新增/重排容器实现，不采用线性拉伸。
- 保持主任务稳定：主 Feed 稳定、导航位置稳定，大屏提升效率但不改变核心路径。
- 主内容区承载 Feed / 列表；辅助区承载详情、评论、热门、推荐等内容。
- 大屏下主内容区设置最大舒适阅读宽度；辅助区固定宽度或窄弹性，外层容器可弹性扩张。

## 10. 圆角 Token

Figma 标准圆角包含 9 档：0px、2px、4px、6px、8px、10px、12px、16px、999px。

| Figma 变量               | Tailwind token          | Tailwind class     | 值    | 用途                                                                     |
| ------------------------ | ----------------------- | ------------------ | ----- | ------------------------------------------------------------------------ |
| `radius/radius-none`     | `borderRadius.none`     | `rounded-none`     | 0px   | 无圆角、方形                                                             |
| `radius/radius-xsmall`   | `borderRadius.xsmall`   | `rounded-xsmall`   | 2px   | 超小圆角，用于小型细节元素、小标签                                       |
| `radius/radius-small`    | `borderRadius.small`    | `rounded-small`    | 4px   | 小圆角，用于卡片内元素、广告卡片、toast、封面、banner                    |
| `radius/radius-medium`   | `borderRadius.medium`   | `rounded-medium`   | 6px   | 中圆角，用于底部大按钮、下拉菜单、提示气泡、选项按钮                     |
| `radius/radius-large`    | `borderRadius.large`    | `rounded-large`    | 8px   | 大圆角，用于 Section Card                                                |
| `radius/radius-xlarge`   | `borderRadius.xlarge`   | `rounded-xlarge`   | 10px  | 超大圆角                                                                 |
| `radius/radius-xxlarge`  | `borderRadius.xxlarge`  | `rounded-xxlarge`  | 12px  | 特大圆角，用于弹窗、ListAction 内部卡片                                  |
| `radius/radius-xxxlarge` | `borderRadius.xxxlarge` | `rounded-xxxlarge` | 16px  | 特特大圆角，用于半弹层导航栏、ListAction 容器、大型输入框                |
| `radius/radius-full`     | `borderRadius.full`     | `rounded-full`     | 999px | 全圆角，用于全局按钮、头像、状态标签、搜索框、提示打点、角标、顶部提示条 |

使用约束：

- 新组件和新页面不得新增非标准圆角。
- 状态标签、胶囊按钮等场景使用 `rounded-full`。
- 同一组件内存在内外两层圆角时，优先遵循“内层圆角 = 外层圆角 - 间距”并就近取已有 token。

## 11. 投影 Token

投影用于柔和多层阴影、层级分离和多媒体文字可读性。设计确认以 Figma Effect Style 为准，浅色和暗黑模式共用同一套投影。

| Token                    | Tailwind class        | 值                                                                      | 用途                   |
| ------------------------ | --------------------- | ----------------------------------------------------------------------- | ---------------------- |
| `boxShadow.hairline`     | `shadow-hairline`     | `0 0.5px 0 0 var(--w-c-dividing)`                                       | 底部分割线             |
| `boxShadow.hairline-top` | `shadow-hairline-top` | `0 -0.5px 0 0 var(--w-c-dividing)`                                      | 顶部分割线             |
| `boxShadow.xs`           | `shadow-xs`           | `0 1px 2px 0 #0000000A, 0 0 4px 0 #00000005`                            | 极轻投影               |
| `boxShadow.sm`           | `shadow-sm`           | `0 1px 3px 0 #0000000F, 0 2px 8px 0 #0000000A`                          | 轻投影                 |
| `boxShadow.md`           | `shadow-md`           | `0 2px 4px 0 #00000014, 0 4px 16px 0 #0000001A`                         | 中投影                 |
| `boxShadow.lg`           | `shadow-lg`           | `0 4px 8px 0 #0000000F, 0 8px 24px 0 #0000000F, 0 0 40px 0 #00000008`   | 强投影                 |
| `boxShadow.xl`           | `shadow-xl`           | `0 8px 16px 0 #00000014, 0 16px 40px 0 #0000000F, 0 0 64px 0 #0000000A` | 最强投影               |
| `boxShadow.orange-glow`  | `shadow-orange-glow`  | `0 0 12px 0 #FF820026, 0 0 24px 0 #FF820014`                            | 品牌橙光晕             |
| `boxShadow.card`         | `shadow-card`         | 同 `shadow-sm`                                                          | 静息卡片语义别名       |
| `boxShadow.modal`        | `shadow-modal`        | 同 `shadow-xl`                                                          | 模态弹窗语义别名       |
| `text-shadow-xs`         | `text-shadow-xs`      | `0 1px 1px #00000033`                                                   | 多媒体画面上的文字投影 |

使用约束：

- 普通容器优先按层级使用 `shadow-xs`、`shadow-sm`、`shadow-md`、`shadow-lg`、`shadow-xl`。
- 语义清楚的静息卡片和模态弹窗可使用 `shadow-card`、`shadow-modal`。
- 品牌发光只使用 `shadow-orange-glow`，不泛化到其他品牌色。
- 多媒体画面上的白色文字可使用 `text-shadow-xs`。
- 分割线仍使用 `shadow-hairline` 或 `shadow-hairline-top`，不使用容器投影替代。

## 12. 分割线 Token

| Token / Class                             | 值                               | 用途                                    |
| ----------------------------------------- | -------------------------------- | --------------------------------------- |
| `c.dividing`                              | `#E6E6E6` light / `#151515` dark | 灰色分割线                              |
| `c.contrast`                              | `#FFFFFF` light / `#D3D3D3` dark | 多媒体/图像背景上的白色分割线           |
| `divider-horizontal` / `divider-vertical` | 0.5px                            | 水平/垂直分割线厚度，宽度/高度均为 100% |

使用约束：

- 分割线用于区隔列表项、评论项、设置项、工具栏或多媒体图像上的内容层级。
- 水平分割线可全宽或左缩进对齐内容；左缩进由业务容器控制。
- 白色分割线只用于深色、多媒体或图像背景。
- 不使用容器投影、背景块或透明度 class 替代分割线。

## 13. Button MVP Token 使用建议

`button` 是 weiboUI MVP 的首个组件，应优先使用以下 token：

| 场景           | 推荐 token                                          |
| -------------- | --------------------------------------------------- |
| 主按钮背景     | `btn.orange-a` + `btn.orange-b`                     |
| 主按钮按下     | `btn.orange-pressed-a` + `btn.orange-pressed-b`     |
| 主按钮文字     | `c.contrast`                                        |
| 灰色次按钮背景 | `btn.gray`                                          |
| 灰色次按钮按下 | `btn.gray-pressed`                                  |
| 禁用背景       | `btn.gray-disabled`                                 |
| 线框边框       | `btn.gray-stroke` 或 `btn.link-stroke`              |
| 按钮字号       | `text-label-lg` / `text-label-md` / `text-label-sm` |
| 点击热区       | 不小于 44×44px                                      |
| 胶囊按钮圆角   | `rounded-full`                                      |

## 14. 待确认

- `topnav.visit-bg` 来自现有 TopNav 文档访问量胶囊半透明值，待设计变量确认。
- `icon.liked-pink`、`icon.liked-orange`、`icon.liked-red` 的 dark 值仍为 `PENDING_DESIGN_REVIEW`，待补 Figma 暗黑变量值。
