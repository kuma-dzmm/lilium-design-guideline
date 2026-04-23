# ToolBear · 通用 UI 规范 (General UI Spec)

> 范围：所有**非游戏**界面。游戏界面（扑克桌、UNO 桌、Raid MUD）不受此规范约束。
>
> 密度：**密集（Dense）**。这是交易所风格的产品，用户来看数字、下单、管理资产。
> 留白是成本，不是美德。每一个 px 都要有理由。
>
> 宿主：深色主题，中文 UI，系统字体，`SF Mono` 用于所有数字。
>
> 所有 token 源头：[`../colors_and_type.css`](../colors_and_type.css)。
> 本文档是**规则**层，不是 token 本身。

---

## 目录

1. [布局与容器](#1-布局与容器)
2. [页面骨架](#2-页面骨架)
3. [导航](#3-导航)
4. [列表与表格](#4-列表与表格)
5. [表单](#5-表单)
6. [模态层 · Modal / Drawer / Popover / Tooltip](#6-模态层)
7. [反馈 · Toast / 通知 / 状态](#7-反馈)
8. [空状态 · 加载 · 错误](#8-空加载错误)
9. [流程 · Stepper · Progress · Segmented](#9-流程)
10. [危险操作与确认](#10-危险操作)
11. [数字 · 日期 · 时间 格式化](#11-格式化)
12. [键盘快捷键](#12-键盘)
13. [移动端适配](#13-移动端)
14. [不要做的事](#14-禁忌)

---

## 1. 布局与容器

### 三档页面宽度 tier

| Tier     | 最大宽度 | `.tb-main--narrow` | 用在哪 |
|----------|---------|--------------------|--------|
| Narrow   | 640px   | `tb-main--narrow`  | 登录、钱包、设置·安全、转账、单对象编辑 |
| Medium   | 860px   | `tb-main`（默认）   | 大头菜、股票、帕鲁、通知、成就、公告 |
| Wide     | 1120px  | `tb-main--wide`    | 交易行、管理后台、数据表格、开发者工具 |

**选型规则**：
- 一次只看一个对象 → **narrow**。
- 看一个对象 + 它的列表 / 统计 → **medium**。
- 比较多对象、数据表、多列面板 → **wide**。
- 不要更宽。超过 1120px 的表格用 **横向滚动**，不扩容器。

**外边距**：
- 桌面：容器左右 `padding: 0 20px`，顶部 `24px`，底部 `80px`（为 tabbar 让位）。
- 移动（<1024px）：容器左右 `padding: 0 16px`，底部 `88px`（tabbar 56 + 32 呼吸）。

### 栅格

- 4px 基线。所有 `padding / margin / gap` 用 `--space-*`。
- 常见 gap：行内元素 8 · 卡片内部 12 · 卡片之间 12 · section 之间 24。
- 不用 12 列栅格。内容 `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))`
  比固定列灵活。

### 断点

| Breakpoint | px    | 触发什么 |
|------------|-------|----------|
| `xs`       | ≥480  | 卡片网格由 1 列变 2 列 |
| `sm`       | ≥640  | 钱包 hero 横向展开 |
| `md`       | ≥768  | 表格显示全部列 |
| `lg`       | ≥1024 | 顶部 nav 展开 · 底部 tabbar 消失 |
| `xl`       | ≥1280 | `.tb-main--wide` 启用 |

---

## 2. 页面骨架

每个页面都由**四块**组成，顺序固定：

```
┌─────────────────────────────────────────┐
│ ① Header  (title + actions)             │  ← 56px
│ ② Sub-nav (breadcrumb · tabs · filters) │  ← 可选
│ ③ Content                               │
│ ④ Footer  (分页 · load more)            │  ← 可选
└─────────────────────────────────────────┘
```

### ① Header

- 高度 ~48px。`h1` 24/700/-0.01em 字。
- **Title 左侧**：可放 24×24 图标（Lucide）或 36×36 品类色块。
- **右侧**：1-3 个操作按钮。主 CTA 始终最右。不超过 3 个；多了进 `⋯` 菜单。
- **无副标题**。需要说明 → 放 Tooltip 在 title 旁边的 `?` 图标里。

```
[icon] 大头菜市场                            [⟳ 刷新]  [创建订单]
```

### ② Sub-nav（按需）

四种形态，**优先级从高到低**：

1. **Breadcrumb**：只在层级超过 2 层时出现。`首页 / 帕鲁 / 火花兽`。
   分隔符用 `/`，不用 `>`。最后一级不可点。
2. **Tabs**：同对象的不同视图（概览 / 交易 / 设置）。2px accent 下划线。
3. **Segmented control**：小范围切换（24h / 7d / 30d）。置于内容右上角。
4. **Filter bar**：搜索 + 一排 `<select>`。置于列表正上方，`margin-bottom: 12`。

**不要**同时出现两个 sub-nav。Tabs 和 breadcrumb 二选一。

### ③ Content

按信息密度从高到低排：
1. **Hero card**（首屏最吸睛数据，余额、当前价）
2. **快捷操作区**（3-5 个按钮，挨着 hero）
3. **列表 / 表格**（主体）
4. **次要数据块**（底部 4-column stat grid）

### ④ Footer

- 列表超过 20 条 → 显示 `加载更多` ghost button（居中，14px 间距）。
- 表格 → 底部分页条（见 §4.3）。

---

## 3. 导航

### 顶栏（Desktop · ≥1024px）

- 固定 56px，sticky。
- 左：🐻 + `ToolBear`。可点，回首页。
- 中：7-8 个主导航项。不超过 8。
- 右：状态点（正常 / 连接错误）· 头像菜单。
- 激活态：`accent-tint` 底 + accent 文字 + 500 weight。
- Hover：`bg-tertiary` 底 + `fg-primary` 文字。
- **不要**把登录按钮和用户头像同时显示。

### 侧栏（可选 · 仅 Wide tier）

- 管理后台、开发者工具这类 wide-tier 页面可用侧栏代替顶栏 nav 项。
- 宽度 240px，fixed left。顶栏仍保留，但中间 nav 项移到侧栏。
- 侧栏分组：每组 heading（11px uppercase `fg-secondary`）+ 组内链接。
- 链接：12px 上下 padding，10px border-radius，同 desktop nav 激活样式。

### 底部 TabBar（Mobile · <1024px）

- 固定 56px。5 个 slot 最多。
- **选 slot 的规则**：你想让用户随时切到哪 5 个页面？
  默认：`大头菜 · 股票 · 钱包 · 游戏 · 更多`。
- 第 5 个 slot 必须是 `更多`（带 `menu` 图标），点开全屏菜单。
- 图标 18px，label 10px，间距 2。active 用 `accent`，其余 `fg-secondary`。

### Breadcrumb

- 只在 ≥3 层深度时出现。
- 字号 12，`fg-secondary`。当前项 `fg-primary` + 500。
- `/` 分隔，左右各 6px 空格。
- 省略：超过 4 级时用 `首页 / … / 帕鲁 / 火花兽`。

### 标题栏内的「返回」

- 深层页（poker 桌、帕鲁详情）左上放 `← 返回大厅`。
- `ghost` button，14px 字，不占 header 的 title 位置。
- 有 breadcrumb 就不要「返回」按钮，反之亦然。

---

## 4. 列表与表格

### 4.1 列表行（list row）

**所有列表都走这个结构**：

```
┌──────────────────────────────────────────────┐
│ [32×32 icon]  主文本 15/500                  │
│               辅文本 12/mono/fg-secondary    │
│                                      [金额/标签] │
└──────────────────────────────────────────────┘
```

- 行高：**56px 密集** / 64px 舒适。默认密集。
- `padding: 12px 16px`。
- 行间分隔用 1px border，不要 shadow。
- Hover：`bg-tertiary`。
- **整行可点** → 光标 pointer，整行 hover 高亮。
- **整行不可点** → 右侧放 1-2 个按钮（`sm` · `secondary`）。
- 最后一行不显示底边 border。

### 4.2 筛选条 / 查询条（Query Bar）

> Raid · Market · 订单 · Pal 背包 · 交易记录——凡是列表 ≥ 20 行，必须走统一查询条。一个组件，一种顺序，一种行为。

**锚点**

- 永远**贴在列表正上方**，`margin-bottom: 12px`。
- 左右边界对齐列表，不是页面容器。
- 顺序：页面标题 → 结果计数 → 查询条 → 列表。

**结构（桌面，左→右，高度 36px）**

```
[🔍 搜索名字、ID、稀有度…]  [稀有度 ▾] [状态 ▾] [排序：价格 ↓ ▾]   ...   共 1,248 条 · 显示 25
```

1. **搜索框** — `flex: 1`，最小 220px，最宽的那个。36px 高，左 🔍 右 `×`。placeholder **写清搜哪几个字段**，不写「搜索」。Debounce 300ms，Enter 立即触发，`×` 清空立即重查。
2. **筛选 select** — 36px 高。标题是**字段名**（「稀有度」「状态」），已选中时标题替换为值（「稀有度：传说」）并上 accent 边框。同页上限 4 个，多了进「更多筛选」popover。改变立刻查，不要「应用」按钮。多选下拉在关闭时一次性 fire。
3. **排序** — 一般 select；data table 走表头点击（避免双真相）。方向用 `↑ / ↓`，不用 asc/desc 文字。每个页面必须定合理默认。
4. **结果计数** — 右上角 mono secondary。`共 1,248 条 · 显示 25`；筛选后 `筛选后 82 条`；>10,000 写 `10,000+`。

**已选筛选 · Chip 行**

- 查询条下方 8px。`字段 = 值 ×`，24px 高，`accent-tint / accent`，`border-radius: 999px`。
- 点 `×` 只清一项；≥2 个 chip 时末尾跟「清除全部」。
- Chip 值走**用户语言**（见 §15）：写「传说」不是 `legendary`；写「在售」不是 `status=listed`。
- **搜索关键字不上 chip**（搜索框里已经可见）。

**URL 同步（不可省）**

- 搜索 / 筛选 / 排序 / 分页全部写 URL。详见 §13.5。
- 多值重复 key：`?rarity=legendary&rarity=epic`。
- 默认值不写。首次进页面先读 URL 再发请求。

**Saved Views（可选 · 常用列表加）**

- 视图条在查询条**上方**作为 segmented tabs：`所有 · 我的在售 · 未领奖励 · + 新视图`。
- 切换视图 = 写一组 query 参数。视图名不进 URL，URL 永远是参数源头。
- Raid · Market · 订单至少配 2–3 个系统默认视图。

**移动端（<720px）**

- 搜索框独占一行，100% 宽。
- 搜索框右侧只保留一个 `筛选/排序` 按钮，不在按钮上重复显示筛选值或当前排序。
- 点开进入右侧 drawer / 底部 sheet；drawer 内分两组：`筛选`、`排序`。
- Drawer 底部粘顶条：`清除` / `查看 82 条结果`。
- Chip 行在列表上方，可横向滚动。结果计数移到 chip 下方。

**具体页面 · 必备筛选**

| 页面 | 搜索 | 筛选 | 排序默认 |
|------|------|------|----------|
| **Raid** | 副本名、队长 ID | 难度 · 阵营 · 剩余时间 · 席位 | 剩余时间 ↑ |
| **Market** | 物品名、卖家、物品 ID | 分类 · 稀有度 · 价格区间 · 状态 | 最新挂单 ↓ |
| **Pal 背包** | 名字、标签 | 稀有度 · 阵营 · 战力区间 · 是否上阵 | 战力 ↓ |
| **订单 / 交易记录** | 订单号、对方 ID | 类型 · 状态 · 时间段 | 创建时间 ↓ |
| **任务 / 活动** | 任务名 | 状态 · 分类 | 可领取优先 + 截止时间 ↑ |

**加载与空态**

- 查询中：列表上方 2px 进度条（accent），不动原行，保留滚动位置。
- 0 结果：`没有匹配的结果` + `清除筛选` ghost button，**查询条保留可用**。
- 筛太狠 0 结果可智能降级：`去掉「稀有度=传说」可看到 48 条`（可选）。
- 错误：列表位置换错误卡 + `重试`，查询条保留。

**Do / Don't**

| ✅ Do | ❌ Don't |
|------|---------|
| 筛选改变立刻重查 | 「应用筛选」按钮 |
| 搜索 placeholder 写搜哪几个字段 | placeholder 只写「搜索」 |
| 已选筛选用 chip 可见、可一键删 | 排序和筛选混成一个 select |
| 默认排序符合直觉 | 表头排序 + 顶部排序 select 同时存在 |
| Chip / 筛选值走用户语言 | 筛选值 `status=active` 直接渲染 |
| 结果计数放查询条右上 | 结果数藏在分页器里 |

### 4.3 分页

**优先用「加载更多」**（更适合移动 + 无限流数据）。
`加载更多` 是 `ghost` button，居中，`fg-secondary`。

**经典分页条**（只在 data table 用）：

```
  全 1,248 条 · 每页 [25 ▾]        ‹ 1 2 3 … 50 ›
```

- 左：总数 + 每页选择。
- 右：页码。当前页 `accent-tint` 底。
- 始终显示首末页 + 当前页前后各 2 页。
- 不显示 `跳转到第 X 页`。需要的用户会用 URL。

### 4.4 Data Table

- 表头：`bg-secondary`，12/500/uppercase/letter-spacing 0.06em，`fg-secondary`。
- 表头高 40px。行高 44 密集 / 52 舒适。
- 数字列**必须**右对齐 + mono。
- 文本列左对齐。
- 可排序列头：hover 显示 `↕`，激活显示 `↑` 或 `↓`（accent 色）。
- 行点击进详情（整行光标 pointer）。行末 `⋯` 菜单按钮放更多操作。
- **勾选批量操作**：行首 24×24 checkbox 列；≥1 行勾选时顶栏出现 **批量操作条**
  （粘在 table 顶部，`bg-tertiary`），显示 `已选 N 条` + 操作 + `取消`。
- 固定表头 + 横向滚动优于缩小字号。
- **空**：保留表头，body 显示 §8 空态插画 + 文案。
- **加载中**：8-12 行 skeleton，列宽与表头对齐。

### 4.5 排序 · 筛选 · 搜索

- 搜索是 **debounced**，延迟见 §4.6 表格。按回车立即触发。
- 筛选改变 → 立刻重查，不要 `应用` 按钮。
- 排序只能单列。点第二次倒序，点第三次恢复默认。
- URL 同步：搜索、筛选、排序、分页必须写进 query params，
  刷新不丢状态，可分享链接。

### 4.6 Debounce / Throttle 时长表

> 凡是「用户还在操作就不该立刻发请求」的场景，必须走统一延迟。
> 不要自己拍脑袋写 200、500 这种值。

| 场景 | 策略 | 延迟 | 说明 |
|------|------|------|------|
| 搜索框（列表筛选） | debounce | **300ms** | 回车立即触发，清空立即重查 |
| 自动补全 / 命令面板 | debounce | **150ms** | 用户要的是即时反馈 |
| 字段级表单校验（远程查重，例：用户名是否占用） | debounce | **500ms** | 远端请求，宁等勿频 |
| 字段级本地校验（格式、长度） | 无 debounce | 0 | blur 时触发，见 §5.2 |
| 筛选 / 排序 / 切 tab | 无 debounce | 0 | 离散操作，立刻触发 |
| 滑块 / range input（影响图表） | throttle | **100ms** | 拖动时节流，松手时最终 fire |
| 窗口 resize / 滚动位置上报 | throttle | **200ms** | 用 `requestAnimationFrame` 包 |
| 富文本 / 草稿自动保存 | debounce | **1500ms** | 键入停 1.5s 后静默保存 |
| 虚拟列表 / 无限滚动加载 | throttle | **100ms** | 检测到底部触发，下一次 100ms 后才能再触发 |
| 输入时千分位格式化 | 无 debounce | 0 | 每次键入即格式化（见 §5 金额输入） |

**实现要求**：
- **统一 hook / util**：`useDebounced(value, delay)` + `debounce(fn, delay)`，所有页面走同一个，不要各自实现。
- **取消前一次**：新输入进来必须取消上一次还在 flight 的请求（`AbortController`），不只是忽略响应。
- **Loading 触发点**：skeleton / spinner 的显示**延后到 debounce 结束**后的真正请求期间。用户键入过程中不闪 loading。
- **清空立即触发**：搜索框点 `×` 清空，**不走 debounce**，立刻重查。
- **首字符延迟**：键入第 1 个字符后的首次查询也走 debounce，不要"第一下立刻查"。
- **回车跳过 debounce**：用户按回车 = 明确"现在就要"，立刻触发 + 取消待执行的 debounce。

### 4.7 行内操作 / Row Actions

> 列表行上的卖出 · 平仓 · 上架 · 撤单 · 领取 · 上阵：什么时候用行内按钮、Popover、Drawer、Modal，有一套决策树。不要每页各自发明。

**决策树**

```
Q1  需要用户输入参数吗？（数量 / 价格 / 备注 …）
      否 → Q2
      是 → Q3

Q2  操作是否破坏性 / 大额 / 不可逆（见 §10 危险分级）？
      否 → 行内按钮，点一下直接执行（toast + 撤销）
      是 → Confirm Modal

Q3  输入是 1–2 字段且 30 秒内能填完？
      是 → Popover（紧贴行）
      字段多 / 需要预览 / 多步 → Drawer（右侧）
      跨页流程 / 创建新对象 → Route 页（/orders/new）
```

**四种容器的使用边界**

| 容器 | 触发 | 何时用 | 典型例子 |
|------|------|--------|----------|
| **行内按钮** | 直接点 | 零输入 · 可逆 · 瞬时 | 领取奖励 · 上阵 · 应战 |
| **Popover** | 点行内按钮 | 1–2 字段就地改 · 不离开列表 | Market 改价 · 改数量 |
| **Drawer** | 点按钮 / 行 | 字段多 / 预览计算 / 需要看行详情 | 上架 · 平仓 · 订单详情 |
| **Confirm Modal** | 点行内按钮 | 破坏性 / 不可逆 / 大额 · 无表单 | 撤单 · 卖出全部 · 退队 |
| **Route 页** | 点按钮 | 多步 / 完整创建 / 可分享 URL | /orders/new · /raid/:id/lineup |

**行内按钮布局**

- 行末右侧，最多 **2 个可见按钮 + 1 个 `⋯`**。再多进 `⋯`。
- 样式：`secondary · sm` (28px)。一行最多 1 个 primary。
- 顺序：次要 → 主要（主要最靠右）。
- 破坏性按钮放进 `⋯` 末尾，**不**直接挂行上。
- 文字用**动词**：`卖出 / 撤单 / 领取`——不写 `详情 / 更多`（整行已可点进详情）。
- 按钮 hit area：桌面 28px，移动 ≥ 40px。
- `⋯` 菜单**点击**展开，不 hover。

**Do / Don't**

| ✅ Do | ❌ Don't |
|------|---------|
| 点整行 = 进详情；点按钮 = 执行操作 | 按钮点击冒泡到整行跳转 |
| `stopPropagation` 必写 | 把表单塞进行内 expand（手风琴） |
| Drawer 打开时对应行高亮（2px accent 左条） | 把"改价"用 modal（打断浏览） |
| 异步操作：按钮显 spinner + 禁用该行其他按钮 | 把"撤单"做成一键执行（破坏性必须 confirm） |
| 乐观更新：UI 先变，toast 只是确认 | 行里塞 >3 按钮 |
| 成功 toast「已撤单 · 撤销」5s 内可撤销 | Hover 才出按钮（移动端无 hover） |

**Popover（就地操作）**

- 宽 280–360px，箭头指向触发按钮。
- 标题 14/500 + 一行副标题。
- 底部：左 secondary「取消」· 右 primary「保存」。Enter 提交。
- 同屏只有一个 popover；打开新的自动关旧的。
- 提交成功 → 关闭 + 行刷新为新值 + toast。

**Drawer（详情 / 编辑）**

- 右侧滑出，宽 420px。移动端底部全屏。
- 分区：对象头 → 状态块 → 表单 → 预览计算（手续费 / 可得金额）→ 底部粘顶操作条。
- 列表可见可点：点另一行切 drawer 内容 + URL 对象 key 切换，drawer 不关。
- URL 带 `?order=128473`，deep link 可直接打开。
- 内部可再弹 confirm modal。

**Confirm Modal**

- 只用于"确认吗？"，**无表单字段**。有字段走 drawer。
- 危险级别按 §10：L1 toast · L2 confirm · L3 输入对象名 · L4 强调金额。
- 主按钮 `variant="danger"`，焦点默认在取消。

**批量操作**

- 行首 checkbox。勾选 ≥1 行 → 表格顶部粘顶操作条：`已选 3 条 · 批量撤单 · 批量下架 · 取消`。
- 条高 44px，`bg-tertiary`。
- 批量操作统一 modal confirm，列出受影响对象（>5 写"等 N 条"）。
- 异步：按钮 spinner + 进度「3/10 完成」。结束 toast「成功 8 · 失败 2 · 查看」，点查看展开失败 drawer。
- 只操作当前页。提示"仅选中当前页 25 条"。

**异步反馈统一流程**

```
点击行内按钮
  → 按钮 spinner，该行其他按钮 disabled
  → 乐观：UI 立即体现（行变灰 / 移除 / 状态变）
  → 完成：
      成功 → toast「已撤单 · 撤销」5s
      失败 → 回滚 UI + toast「撤单失败 · 重试」
```

- "撤销"只在真正可撤销的动作上给（撤单 · 删除草稿）。支付成功、已发送不给。
- 5s 内撤销 → 反向请求；超时 → fire & forget。
- 状态变化**必须先在行上体现**，不要只靠 toast 通知"成了"。

**典型场景 · 查表**

| 场景 | 容器 | 理由 |
|------|------|------|
| Market · 上架 | Drawer | 选物品 · 定价 · 看手续费 |
| Market · 改价 | Popover | 只改一个数字 |
| Market · 撤单 | Confirm Modal | 破坏性，一句话 |
| Market · 立即买入 | Drawer | 显示成交额 · 手续费预览 |
| Stocks · 平仓 | Drawer | 选数量 · 估算盈亏 |
| Stocks · 一键平仓（市价） | Confirm Modal | 零输入 + 破坏性 |
| Raid · 应战 | 行内按钮 | 零输入，直接加入 |
| Raid · 配队出战 | Route 页 | 选 Pal + 阵型，多步 |
| 任务 · 领奖 | 行内按钮 | 一键直接领 |
| Pal · 上阵/下阵 | 行内按钮 | 零输入切换 |
| 订单 · 取消 | Confirm Modal | 破坏性 · 涉及退款 |
| 订单 · 查看详情/物流 | Drawer | 信息多，不离开列表 |

**Agent 自检**

- 这个按钮真的需要吗？它和"点整行进详情"重复吗？
- 字段 ≥ 3 还用 modal 吗？（改 drawer）
- 危险操作有 confirm 吗？非危险操作被迫多点一下 confirm 吗？两种都错。
- 异步操作 UI 先变了吗？还是只靠 toast？
- 移动端这行按钮还点得中吗？

---

## 5. 表单

### 5.1 字段结构

```
Label (13/500)
[ input ]
helper 12/fg-secondary（可选）
```

- Label 在 input 正上方，6px 间距。**不要**浮动 label，不要 placeholder 当 label。
- 必填：label 右侧 2px 红点。不要 `*`。
- Helper 是静态说明，error 会替换它。

### 5.2 校验时机

- **提交前**：文本字段不校验。提交按钮禁用的唯一条件是「有必填项为空」。
- **提交时**：服务端或客户端校验，错误项加 `danger` 边框 + helper 变成错误文案。
- **离焦（blur）**：邮箱 / 登录码 / URL 这种**格式**类字段离焦校验。
- **键入时**：只对**强度**类字段实时（密码强度、字符计数）。

### 5.3 错误显示

- 字段级：input 边框 `var(--danger)`，helper 文字 `var(--danger)`。
- 整表级：错误 summary 放在提交按钮上方，`danger-tint` 卡片，列出字段链接。
  只在**多错误**时用；单错误就地提示即可。

### 5.4 提交流程

1. 点提交 → 按钮 `loading`（见 §9 progress），禁用。
2. 成功 → toast + 跳转 / 关 modal。
3. 失败 → 按钮恢复，toast（`danger`）+ 字段级错误。
4. 网络 timeout（10s） → 按钮恢复 + toast `连接错误，请重试`。

### 5.5 常见字段模式

- **金额 / 数值输入**：**一律 `type="text"` + `inputmode`**，**禁止 `type="number"`**。
  `type="number"` 在移动端弹纯数字键盘（没小数点 / 千分位），吞后缀，滚轮改值，
  跨浏览器行为不一致。改用：
  - 整数字段 → `<input type="text" inputmode="numeric">`
  - 带小数 → `<input type="text" inputmode="decimal">`
  - 视觉上金额 mono + 右对齐，`$` 前缀和单位后缀做成**非交互 adornment**，不进 value。
  - 支持**后缀解析**：`1.2M` → `$1,200,000`；`5 万` → `50,000`。blur 格式化，focus 还原。
  - 允许粘贴 `$1,284.25` / `1,284` / `−500`；parser 清洗千分位、货币符号、全角字符。
  - 非法输入 **不** 在键入时阻止，blur 时才校验 + 报错。
- **验证码输入**：6 个 56×56 `.input`，逐格聚焦，粘贴自动填充。
- **日期**：`YYYY-MM-DD` 只读 input + calendar popover。不允许纯文本键入。
- **下拉**：≤6 项 用原生 `<select>`；>6 项 用搜索下拉（custom）。
- **危险字段**（例如删除确认）：要求用户**输入对象名**才启用按钮。

---

## 6. 模态层

按侵入性从低到高：`Tooltip < Popover < Drawer < Modal`。**优先用最低的**。

### 6.1 Tooltip

- 显示**静态说明**（14 字内）。鼠标悬停 300ms 后出现，立即消失。
- `bg-secondary` 底，1px `--border`，`shadow-sm`，border-radius 6，`padding: 6px 8px`，12px 字。
- 禁止点击、禁止链接、禁止按钮。内容超标 → 改 Popover。
- 移动端：长按 400ms 显示。

### 6.2 Popover

- 显示**交互内容**：颜色选择器、过滤面板、状态详情。
- `bg-secondary` + 1px border + `shadow-popover`，border-radius 12，`padding: 12-16`。
- 宽度 200-320px。按 trigger 对齐。
- 点击外部关闭。ESC 关闭。trigger 重复点关闭。
- **不要**嵌套 Popover。

### 6.3 Drawer（侧拉面板）

- **什么时候用**：承载列表项的详情、过滤、编辑表单。
  关键特征：**不离开当前列表**，关闭后列表状态 intact。
- 右侧滑出，宽度：narrow 400 / medium 520 / wide 720。
- `bg-secondary`，左边 1px border，`shadow-lg`。
- 自带内部 header（title + `×` 关闭）· body · footer。
- 打开动画：200ms ease-out，translateX；关闭 150ms ease-in。
- 背景不加 scrim（可点后面）。**例外**：drawer 内有表单且有未保存改动 → 加 `rgba(0,0,0,0.3)` scrim 防误点。
- 移动：满屏 drawer，从底部上滑。

### 6.4 Modal

- **什么时候用**：必须阻断用户流程的单一决策（确认、登录、创建一个新对象）。
- 居中，宽度 400 / 520 / 680。不做全屏 modal（改 route）。
- 结构：title（18/600）· body（14/1.55）· footer 按钮（右对齐）。
- 取消在左，主操作在右。`ESC` = 取消。点外部 = 取消。
- `tb-scrim` 背景（70% 黑 + blur）。`shadow-modal`。
- 一次只能开一个 Modal。要套娃 → 改流程。

---

## 7. 反馈

### 7.1 Toast

- 位置：**右下角**，距右 24 / 距下 24。桌面与移动一致。
- 宽度 320px 固定，多条堆叠向上，12px 间距。
- 样式：`bg-secondary` + 1px border-left（`4px` 粗，色为 tone）+ `shadow-lg`。
- 构造：`icon` + `title 14/500` +（可选）`body 12/fg-secondary` +（可选）`action link`。
- 停留：`success/info` 4s · `warning` 6s · `danger` 不自动消失，手动 `×`。
- 一次 ≤3 条。同一事件不重复 toast。
- 有 `action` 的 toast（例如「已删除 · 撤销」）停留 +2s。

### 7.2 Notification（铃铛里的）

- 铃铛 badge：红点 + 数字（>99 显示 `99+`）。
- 面板：通知分三组，`新的 / 今日 / 更早`。每条 max 80 字，多余省略。
- 未读：左侧 3px accent 条。点击整条跳对应对象 + 标记已读。
- 清空：顶部 `全部标记已读` ghost link。

### 7.3 Inline status

- 行内状态点：见 §components_badges 预览卡。`✓ 正常 / ⦿ 连接中 / ● 连接错误`。
- 大面积状态：banner 置于页面顶部，`warning-tint` 或 `danger-tint` 背景，高 40px。
  banner 有 `×` 可关（会 localStorage 记住）。
- 三种 banner 互斥，同时只能有一条。

---

## 8. 空 · 加载 · 错误

> 这三个是**最容易被做烂**的状态。必须有统一模板。

### 8.1 空状态

结构：

```
       [mascot 40-56px]
   [title 16/500]
   [body 13/fg-secondary · 可带 1 行引导]
      [primary action button（可选）]
```

- **Mascot** 用 emoji 作占位：钱包空 `🐻`，帕鲁空 `🥚`，通知空 `🔔`，
  夜间维护 `🌙`。
- 文案允许**一点点性格**：
  - ✅ `暂无交易记录。先去市场上转转？`
  - ✅ `一个帕鲁都没有。去孵一个吧。`
  - ❌ `您还没有任何交易记录。请前往市场进行交易。` （太正式）
  - ❌ `啥都没有哈哈哈 🐻🐻🐻` （过火）
- **有 filter** 导致的空 → 不展示 mascot，只说 `没有匹配 "XXX" 的结果` + `清空筛选` ghost button。

### 8.2 加载状态

三种，按**用户会等多久**选：

| 预计时长 | 用什么 | 形态 |
|--------|--------|------|
| <300ms | 什么都不显示 | 直接渲染 |
| 300ms - 2s | Skeleton | 与最终布局同构，灰块占位，1.5s shimmer |
| 2s-10s | Skeleton + 底部 `tb-spin` 点 + `加载中...` 12/muted | 让用户知道还在跑 |
| >10s | 超时，转 §8.3 错误态 | |

- **Skeleton 绝不加文字**（"Loading..." 之类）。布局同构 = 骨架与真 UI 结构 1:1。
- 按钮内加载：按钮内部 12px spinner 替换 left icon，label 变 `加载中...`。

### 8.3 错误态

- **局部错误**（一个 card / table 加载失败）：卡内显示 `icon + 文案 + 重试`，不跳页。
  文案：`加载失败。`+ `重试` ghost button。
- **整页错误**（400/403/404/500）：
  - 404: `🐻 迷路了。这个页面不存在。` + `回首页`
  - 403: `🚫 没有权限。` + `回首页`
  - 500: `⚙️ 出了点问题。` + `重试` + `回首页`
- **连接错误**：页面顶部 banner `⚠️ 与 ToolBear 失联。正在重连...`
  后台重连成功后 banner 消失，不 toast。

---

## 9. 流程

### 9.1 Stepper（多步表单）

- 水平 stepper 顶部：`[1 已完成] ─ [2 进行中] ─ [3 未开始]`
- step 圆圈 24px：`success-tint/success` 已完成 · `accent-tint/accent` 当前 · `bg-tertiary/fg-secondary` 未来。
- 连接线 2px，`border` 色，当前之前的变 `success` 色。
- 下方是当前 step 的表单。
- 导航按钮在 footer：`上一步`（secondary）+ `下一步`（primary）。
- 允许点已完成 step 回看。当前 step 已填字段进入回看时**保留输入**。
- 第一步没 `上一步`，最后一步 `下一步` 改 `完成`。

### 9.2 Progress 进度条

- 线形：高 6px，`bg-tertiary` 底，fill 颜色看语义（success / accent / info）。
- `border-radius: 999`。
- 百分比文字在**右上**，12/mono/fg-secondary。
- indeterminate：整条滑块来回，1.2s 周期。
- 不用圆环 progress（视觉开销大，与密集风格冲突）。
  例外：用户头像 level 圈可以用（帕鲁界面）。

### 9.3 Segmented control

- 用于 2-4 个互斥小选项。`24h / 7d / 30d` 是最典型。
- 整体 1px border + radius 8。内部按钮无 border，激活的 `bg-tertiary` 底。
- 高度 28-32。字号 12-13。
- 不是 tabs 的替代——segmented 控制**数据的视图**，不换页面。

### 9.4 Skeleton loader 模板

| 场景 | skeleton 结构 |
|------|---------------|
| 列表行 | `32×32 圆` + `60% 宽 14px 行` + `40% 宽 12px 行` |
| Hero card | `80px` 空白 + `40%×14px` + `60%×32px` + `30%×12px` |
| Stat grid (4列) | 4 个 `60px×60px` 卡，各含 `40%×12` + `70%×18` |
| Table | 表头不做 skeleton（真实渲染）· body 8 行 row skeleton |
| Chart | 整个 chart 区域一块 `bg-tertiary` + shimmer，不画假线 |

---

## 10. 危险操作

### 10.1 分级

| 级别 | 动作 | 确认形式 |
|------|------|----------|
| L1 · 可逆 | 取消订单、撤销转账、标记已读 | 不弹窗，toast + `撤销` 5s |
| L2 · 一般破坏 | 删除草稿、退出账号、关闭房间 | `ConfirmDialog`，主按钮 `primary` |
| L3 · 不可逆 | 删除对象、清空数据、转账、重置密码 | `ConfirmDialog`，主按钮 `danger`，可能要求**输入对象名** |
| L4 · 大额 | 大额转账（>$10k）、卖出全部持仓 | L3 + 额外风险提示文案（强调金额、不可逆）。**不做**二次登录码 / Passkey 认证 —— 这是游戏，不是银行 |

### 10.2 ConfirmDialog 文案规则

- Title 是问句：`确认退出账号？` `确认删除火花兽？`
- Body 说**后果**，不是重复 title。
  ✅ `退出后需要重新获取登录码。你当前持仓不会丢失。`
  ❌ `你确定吗？此操作不可撤销。`
- 按钮用**动词**，不用 `确认 / 取消`：
  ✅ `退出账号` / `删除` / `转账 $12,000`
  ❌ `是 / 否`

### 10.3 危险操作全局约束

- 任何 L3+ 按钮必须是 `variant="danger"`，不是 `primary`。
- 按钮旁永远**不放**loading spinner 的同时还能再点一次——按下后立即禁用。
- 刚确认的破坏性操作，toast 必须带 `撤销`（如果技术上能撤销）。
- 不可撤销的操作，toast 省略 `撤销`，只说 `已删除 火花兽`。

---

## 11. 格式化

### 11.1 数字

- 所有数字 `font-family: var(--font-mono)`，tabular figures。
- 千分位 `,`（en-US locale）。小数位根据语义：
  - 金钱：整元 $1,284,320 · 带 $1,284.25
  - 股价：$128.40（2 位）
  - 百分比：+6.82% · +0.4%（1-2 位）
  - 数量：128 株（整数，单位跟在后）
- 大数缩写：`$1.28M` · `$3.2B` · `128K`。中文上下文可用 `128 万 / 3.2 亿`。
- 符号：正数 **必加** `+` 前缀并 **success 色** ；负数 `−`（U+2212，不是 hyphen）并 **danger 色**；
  零不加符号，`fg-secondary` 色。
- 所有数字格式化必须走中央 `numberFormat` util（在 `ui_kits/toolbear/`）。
  不要在组件里 `.toFixed(2)`。

### 11.2 日期 · 时间

- **默认**：`YYYY-MM-DD HH:mm`，mono。
- **相对**：5 分钟内 `刚刚`；1 小时内 `N 分钟前`；24 小时内 `N 小时前`；
  昨日 `昨天 HH:mm`；今年 `MM-DD HH:mm`；跨年 full。
- **工具提示**：悬停相对时间显示绝对时间。
- 日期范围：`2026-04-15 — 2026-04-18`，两个 em-dash 不带空格。
- 时区永远显示用户本地，不显示 UTC 除非明确需要。

### 11.3 ID

- 用户：`@username`（小写，ASCII）。
- 内部 ID：`U-00128473`（mono，uppercase 前缀）。
- 订单、交易：`#128473`（mono，无前缀可省，用 # 表示 ID）。
- 地址 / hash：`0x12ab...cd34` 中间省略，点击复制。

---

## 12. 键盘

### 12.1 全局

| 键 | 作用 |
|---|---|
| `?` | 显示快捷键面板 |
| `g m` | Go to 大头菜 |
| `g s` | Go to 股票 |
| `g w` | Go to 钱包 |
| `g g` | Go to 游戏 |
| `/` | 聚焦搜索 |
| `Esc` | 关闭当前 modal / drawer / popover |
| `Cmd/Ctrl + K` | 命令面板（可选） |

### 12.2 表单内

- `Enter` = 提交主 action。
- `Esc` = 取消编辑 / 关闭。
- `Tab` 遍历所有可交互元素，不要 `tabindex=-1` 跳过按钮。
- 日期输入支持方向键改天/月。

### 12.3 表格

- `↑/↓` 导航行。
- `Enter` 打开详情。
- `Space` 勾选行（有 checkbox 列时）。
- `Cmd/Ctrl+A` 全选当前页（不是全部）。

### 12.4 Focus ring 一律用 `.tb-focus`（见 css）。

---

## 13. 移动端适配

> 每一条规则都要有移动端版本。这是最容易漏的地方。

| 桌面 | 移动 (<1024) |
|------|-------------|
| 顶栏 nav 横排 7 项 | 顶栏只剩 logo + 状态 + 头像；其余进底 tabbar + `更多` |
| Drawer 400-720 宽 | 满屏 drawer 从底部上滑，顶部 `×` 关 |
| Modal 400-680 宽 | 95% 宽，居中，最大高 90vh，内容滚动 |
| Tooltip hover | 长按 400ms 触发，tap 外部关 |
| Popover click | 同桌面，但宽度 ≤ 屏宽 - 32 |
| Toast 右下 320 | 底部中 `calc(100% - 32)` 宽，上推出现 |
| Filter bar 横排 | 搜索独占一行；其余进 `筛选` drawer |
| Data table 多列 | 横向滚动。固定首列（名称）。或改为 §4.1 列表行 |
| Segmented 24px 高 | 32px 高，命中目标 ≥ 44px |
| 按钮 md (36px) | 所有主按钮 ≥ 44px 高（Apple HIG 命中目标） |
| Hover 状态 | 全部退化为 `active` 瞬时状态 |
| Breadcrumb 可见 | 3 级及以下保留；4+ 级折叠成 `[← 帕鲁]` 返回按钮 |

---

## 13.5. Routing & URL

> URL 是唯一可分享、可刷新、可后退的状态容器。凡是「用户希望刷新/分享/回来还在」的状态，必须进 URL。

### 13.5.1 Route 结构

- **扁平优先**。`/wallet` `/market` `/stocks` `/pals`，不嵌套账号段（这是单用户产品）。
- **对象详情**走子段：`/stocks/:ticker`、`/pals/:id`、`/market/orders/:orderId`。
- **管理后台**单独 prefix：`/admin/...`，进入需权限。
- **动态段**用命名 slug，不用数字 ID：`/pals/sparkbear-0042`，不是 `/pals/42`。
- 路由段永远小写 + kebab-case。`/trading-post`，不是 `/TradingPost`。

### 13.5.2 哪些状态进 URL（query params）

**必须进**：
- 列表的 `search / filter / sort / page`
- 当前 tab（`?tab=overview`）
- 可 deep-link 打开的 drawer 对象（`?order=128473`）
- Segmented 控件的选择（`?range=7d`）
- 日期 / 区间筛选（`?from=2026-04-01&to=2026-04-18`）

**不进**：
- Modal 开关（确认框、登录）
- Tooltip / Popover
- 临时 UI 状态（hover、expanded card、collapsed panel）
- Skeleton / loading 状态
- 纯视觉偏好（密度、主题）— 走 localStorage

### 13.5.3 参数命名与格式

- 小写 snake 或 kebab：`?sort=price_desc&filter_status=active`。
- **排序**：`sort=<field>:<dir>`，dir 是 `asc` / `desc`。默认 dir 省略。
- **多值筛选**：重复 key，`?tag=rare&tag=fire`。不用 CSV，`?tag=rare,fire` 会跟逗号冲突。
- **布尔**：存在即真，缺省即假。`?archived` 等于 `archived=true`。
- **日期**：永远 `YYYY-MM-DD`，不带时间。`?from=2026-04-01`。
- **默认值**不写进 URL。第 1 页不写 `page=1`，默认 sort 不写。URL 越短越好。
- 不往 URL 里塞 base64 / JSON。如果状态复杂到需要编码，说明设计有问题，改 localStorage。

### 13.5.4 Deep link

- 任何一个 URL 打开都应该**直接落到对应视图**，不需要多一步点击。
  - `/market?filter_status=active&sort=price:desc&page=3` → 直接是那个筛选、那个排序、那个页。
  - `/pals?pal=sparkbear-0042` → 列表页 + 自动打开 sparkbear 的详情 drawer。
- 服务端不可用时，URL 状态仍在客户端生效（离线缓存能渲染就渲染）。

### 13.5.5 刷新 · 后退 · 前进

- 刷新不丢任何 URL 状态。**任何用到 `setState` 却不写 URL 的筛选都是 bug**。
- 浏览器**后退**按钮语义必须可预测：
  - 列表 → 详情 drawer → 后退 = 关 drawer，回列表（不离开页面）。
  - 列表 → 另一页 → 后退 = 回原列表，**scroll 位置恢复**。
  - 多步 stepper 不写每步 URL（每步按 `上一步`/`下一步` 不产生 history 条目）。
- 滚动恢复：前进后退时列表滚动位置必须恢复。使用 `history.scrollRestoration = 'manual'` + 自己记录。

### 13.5.6 Drawer / Modal 的 URL 行为

| 覆盖层 | 进 URL？ | 原因 |
|--------|---------|------|
| ConfirmDialog（删除、退出） | ❌ | 一次性决策，不 deep-linkable。 |
| Login modal | ❌ | 用 route `/login`，不是 modal-on-top。 |
| 对象详情 drawer（订单、帕鲁详情） | ✅ | 经常分享「看这个订单」。 |
| Filter drawer（移动端） | ❌ | 筛选本身进 URL，drawer 开关是 UI 状态。 |
| 创建表单 modal | 仅在长表单 | 长流程用 `/orders/new`，短表单走 modal，不进 URL。 |

Drawer deep link 用单个 query key：`?order=128473`、`?pal=sparkbear-0042`。
关闭 drawer 要从 URL 移除该 key（`history.replaceState`，不新增历史条目）。

### 13.5.7 API 参数约定

- URL query 和 API 查询参数用**同一套键名**。
  前端：`/market?sort=price:desc&page=3`
  API：  `GET /api/market?sort=price:desc&page=3`
  这样直接 `params = Object.fromEntries(new URL(location).searchParams)` 就能传 API。
- 分页：`page` + `page_size`（不用 `limit/offset`，难向用户解释）。
- 返回分页元数据：`{ items, page, page_size, total, total_pages }`。

### 13.5.8 URL 最大长度

- 控制在 2000 字符以内，超过就是信号——筛选集合应该改 server-side saved view。
- 不支持「任意 tag 多选」这种指数级组合的 URL 化；改成命名视图：
  `?view=my-watchlist`，服务端存 `view` 定义。

## 14. 用户语言 vs 开发者语言

> **用户不需要知道你是怎么实现的。** Agent 最常犯的错之一：
> 把「字段名 / 状态枚举 / 技术术语」直接渲染给用户看。

### 14.1 原则

- UI 里**看不到**：`null` / `undefined` / `NaN` / `[object Object]` / `Error 500` / `422`。
- UI 里**看不到**：内部枚举字符串（`PENDING_APPROVAL`）、数据库字段名（`user_id`、`created_at`）、API 路径、技术错误堆栈。
- UI 里**看不到**：调试标签（<code>TODO</code>、<code>WIP</code>、<code>TBD</code>、<code>placeholder</code>、<code>coming soon</code>）。
- UI 里**看不到**：未翻译的英文开发术语（<code>endpoint</code>、<code>payload</code>、<code>timeout</code>、<code>webhook</code>）。

### 14.2 翻译表 · 常见错误 → 正确说法

| ❌ 开发者写的 | ✅ 用户看到的 |
|--------------|--------------|
| `Error 500` / `Internal Server Error` | `出了点问题，请稍后重试` |
| `Error 404` | `找不到这个页面` |
| `401 Unauthorized` | `请先登录` |
| `403 Forbidden` | `没有权限查看` |
| `422 Validation Error` | （具体字段错误，见 §5.3） |
| `Timeout after 10000ms` | `连接超时，请检查网络` |
| `status: PENDING_APPROVAL` | `等待审核` |
| `status: ACTIVE` / `INACTIVE` | `进行中` / `已停用` |
| `null` / `undefined` | `—`（em-dash，见 §11 格式化） |
| `user_id: 128473` | `@linus` 或 `#128473` |
| `created_at: 2026-04-18T14:32:00Z` | `2026-04-18 14:32` |
| `amount: 128420.5` | `$128,420.50` |
| `Loading...` 永远显示 | 见 §8.2 loading 时长 |
| `Please try again` | `请重试` |
| `Submit` / `OK` / `Yes` | 动词（`保存`、`删除`、`转账`） |

### 14.3 枚举和状态翻译

- 每个状态枚举**必须有用户侧文案 + 语义色**，集中维护在 i18n / 常量文件里。
- 组件不直接渲染 `status`，而是渲染 `statusLabel(status)` + `statusColor(status)`。
- 状态名用**动词 / 形容词**，不用**进行时**或技术词：
  - ✅ `已支付` `已撤销` `待审核` `已下架`
  - ❌ `PAYMENT_SUCCESS` `CANCELLING` `IN_REVIEW` `DEPRECATED`

### 14.4 错误消息

用户看到的错误消息分三层：

| 层 | 内容 | 例 |
|---|------|----|
| **是什么** | 用户做的事 | `转账失败` |
| **为什么** | 用户能理解的原因 | `余额不足` |
| **怎么办** | 下一步动作 | `需要 $12,000，当前 $9,240。[充值]` |

技术错误（`connection refused`、`ECONNRESET`、`CORS error`）必须**包装**成上面三层再显示。
原始 error 对象进日志 / Sentry，不进 UI。

### 14.5 空值与占位

| 情况 | 显示什么 |
|------|---------|
| 字段无值（未填写） | `—`（em-dash） |
| 字段为 0（有意义） | `0` |
| 数字字段加载中 | Skeleton 灰块，不要 `--` 或 `NaN` |
| 头像无图 | 用户名首字母（ASCII）或 🐻 |
| 名字未设置 | `匿名用户` 或 `@username`（用 username 代替） |

### 14.6 开发者专用界面例外

- `/admin/...` 管理后台、开发者工具、日志页可以显示技术字段。
  但仍要遵守：错误信息人话化，技术 ID 加标签说明。
- 调试标签（`WIP`、`dev only`）只允许在非生产环境 `NODE_ENV !== 'production'` 时渲染。

### 14.7 Agent 自检清单

写任何 UI 文案 / 模拟数据前，过一遍：

1. 我写的字段名是不是数据库列名？改用户能懂的词。
2. 我写的状态是不是枚举值？查 i18n 表，用显示名。
3. 我写的错误信息里有 HTTP 状态码 / 技术栈词吗？去掉。
4. 我放的 `TODO` / `WIP` / `coming soon` 会不会到生产？删掉或隔离到开发环境。
5. 我写的按钮文案是"确认"这种抽象词，还是动词？改动词。
6. 空态、零值、未加载时会不会漏出 `null` / `undefined` / `NaN`？加 fallback。

---

## 15. 禁忌

不要做的：

- ❌ 蓝紫色 / 紫粉色渐变背景。我们是一个 accent pink，**纯色**。
- ❌ 卡片 + 左侧 accent 边条。这是一个做烂的 AI 模板。
- ❌ "Learn more →" 箭头 + CTA 副本。中文按钮用动词，一个词。
- ❌ 自动播放的背景动画 / 吸引注意力的 idle 动效。
- ❌ 漂浮 label（material design 那种）。我们用静态 label 在 input 上。
- ❌ 12 列栅格、Bootstrap row/col 那一套。用 flex / grid 直接写。
- ❌ 在数字上用 sans-serif 字体。**永远 mono**。
- ❌ emoji 在 body 正文里。emoji 只能出现在：category tile · mascot · toast icon · 页面 title 左侧品类色块。
- ❌ 浅色主题 / 深浅切换。这个产品就是深色。
- ❌ 圆形 / 橙色 / 绿色的默认 badge。Badge 颜色只有 §components_badges 里那几种。
- ❌ `确定 / 取消` 按钮。用动词。
- ❌ 蒙层点击**不**关闭 modal。一定要可关。
- ❌ 在 `bg-primary` 上放 `bg-primary` 元素。layering 必须靠 `secondary / tertiary` 区分。
- ❌ 悬浮态 / 激活态**同时**改变多于 2 个属性。选一个主要视觉变化。
- ❌ 过火的 mascot 文案。`🐻 没啥要看的啦～` 是底线，不能更俏皮。

---

## 附录 · 速查表

### 间距决策树

```
两个元素很紧密相关 → 8px gap
元素在同一卡片内 → 12-16px gap
元素是同类，但独立 → 16px gap
跨 section 的分隔 → 24px 上 margin
页面 block 之间 → 32px 上 margin
```

### 颜色决策树

```
数字是正增长 / 收入 / 在线 → success
数字是负变化 / 错误 / 下线 → danger
转账 / 信息型 / 中性变动 → info
需要注意但不致命 → warning
品牌强调 / 当前状态 / 选中 → accent
以上都不是 → neutral（fg-secondary on bg-tertiary）
```

### 组件选择决策树

```
告诉用户一个**事件发生了** → Toast
问用户一个**决定** → ConfirmDialog (Modal)
展示一个对象的**详情** → Drawer（保留列表上下文）
收集**表单数据** → 新 route or Modal（不是 Drawer，太挤）
展示**静态说明** → Tooltip
展示**交互小控件** → Popover
```
