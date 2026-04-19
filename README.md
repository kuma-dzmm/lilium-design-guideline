# Lilium (ToolBear / 工具熊) Design System

> **Codename Lilium · 莉莉** — a game-economy dashboard and social play-space
> attached to a Chinese chat-bot ecosystem. ToolBear is the public product name;
> Lilium is the codename for the underlying stack.
> *"融合了 AI 智能体群、华尔街金融模型以及深度 RPG 游戏引擎的分布式系统架构。"*

## Sources

All visual + interaction context was lifted from the private repo
on GitHub (codebase attached to this project). Front-ends live there:

- `toolbear_ui/frontend/` — **Vue 3 + Tailwind v4** SPA, port 5174.
  This is the canonical "Lilium" surface. Contains the navbar, login,
  wallet, games, turnip market, stock, land, pals, raid, admin.
  Mobile-first; has a bottom tab-bar on small screens.

Key files read: `toolbear_ui/frontend/src/style.css` (theme variables),
`App.vue` (navbar + nav structure), `LoginView.vue`, `WalletView.vue`,
`GameLobbyView.vue`, `AboutLiliumView.vue`, `ConfirmDialog.vue`.

## What is ToolBear?

A single web dashboard for everything the ToolBear bot exposes to users in
chat rooms. The bot is the real backend; the web UI is a richer view on
the same data. Pillars, roughly in order of visual prominence:

1. **Turnip market (大头菜)** — price charts, portfolio, farm.
2. **Stock (股票)** — simulated stock trading with leverage + order book.
3. **Market Board (交易行)** — general order-book exchange.
4. **Wallet (钱包)** — balance, transactions, wealth leaderboard.
5. **Land / Property (地产)** — farm, warehouse, dorm, mine, mill.
6. **Pals (帕鲁)** — creature collecting, breeding, work assignment.
7. **Raid (逃离魅魔谷)** — solo text MUD with map, skills, inventory.
8. **Games (游戏)** — UNO, Texas Hold'em poker, other casual games.
9. **Achievements, Settings, Admin, Developer, Notifications.**

Language is 100% Chinese. Theme is always dark — there is no light mode.

## Content Fundamentals

**Voice.** Terse, functional, second-person implied (never "您" honorifics;
no hand-holding). Reads like a crypto-exchange app had a baby with a
Discord game bot. Example CTAs: `登录`, `创建游戏`, `加载更多`, `退出当前账号`.

**Casing.** Chinese throughout UI copy. English only for proper nouns,
code-style commands (`/login CODE`), unit labels (`KMBT / 万 / 亿`) and
tech shorthand (`JWT`, `API`, `Passkey`). No sentence-case drama; no
emoji peppering.

**Pronouns.** Uses "你" and "你的" freely, never "您". Bot addresses user
like a peer.

**Density.** Data-dense by default — wallet, stats, market views stack
numbers, badges, labels tightly. Copy is short: 1–3 Chinese chars for
nav items (`大头菜`, `股票`, `钱包`, `帕鲁`, `成就`); label-like rather
than descriptive.

**Numbers.** Always monospaced. Always formatted via the central
`numberFormat` util — never hand-rolled. Amounts use `$` prefix or bare
numbers with KMBT/万/亿 suffixes. Gains are prefixed `+`, losses `-`,
color-coded green/red respectively.

**Emoji.** Used sparingly as *iconography*, not decoration: bear `🐻`
is the brand mark in the navbar. `♠️`, `⚔️`, `🌙` appear as colored
category glyphs inside tiles. A playful April-1 easter egg animates
wallet balance with `🐛 🥬 💩`. Regular body copy does **not** use
emoji.

**Error / success tone.** Quiet. `请稍后重试`, `加载中...`, `暂无交易记录`.
Never exclamatory. Dangerous actions get a `text-danger` tint + confirm
dialog — never a scary "⚠️ WARNING".

**Examples in the wild.**

- Login code screen: `请在聊天窗口输入` / `/login 123456` / `等待验证中...`
- Wallet empty: `暂无交易记录`
- Games tile: `经典 UNO 卡牌游戏，支持各种功能牌和万能牌，创建房间后分享链接邀请好友加入。`
- Bot status: `正常` (dot green) / `连接错误` (dot red).
- Confirm dialog: bare title + one sentence + two buttons (cancel / confirm).

## Visual Foundations

**Palette.** One accent (`#ff5a8a` — a warm magenta/pink) against a
three-step neutral dark ramp (`#0f0f12` → `#1a1a21` → `#252530`) with
a dim hairline border at `#32323e`. Semantic trio of green / red / blue
for success / danger / info, each with a 15%-alpha tint used as the
badge background. **Do not** introduce new hues.

**Type.** System sans (`-apple-system, 'Noto Sans SC', …`) for UI.
`SF Mono` stack for every numeric value — balances, prices, times, user
IDs, login codes. No custom webfont. Page titles are 24px bold w/
`-0.01em` tracking; hero numbers reach 40px.

**Spacing.** Tailwind 4px grid. Cards use 20–24px padding (`p-5 / p-6`);
list rows use 14px vertical; horizontal container width tops out around
640–800px on most views.

**Backgrounds.** Solid `var(--bg-primary)`. No gradients, no textures,
no patterns in-app. Single exception: the shutdown `farewell/index.html`
uses two dim radial gradients (purple + blue) + a twinkling starfield
— this is a *one-off memorial page*, **not** the product look.

**Cards.** `bg-secondary` + 1px `--border` + `rounded-xl` (12px). Never
rely on shadow for separation — the border does the work. On hover,
cards don't lift; only interactive *rows* do (via `bg-tertiary` fill).

**Borders.** Always 1px, always `--border`. Focused inputs swap to
`rgba(255,90,138,0.88)`. Tabs use a 2px accent underline on the active
item.

**Radii.** Inputs + buttons `rounded-lg` (8px). Cards + modals
`rounded-xl` (12px). Badges `rounded-[10px]`. Avatars + status dots
`rounded-full`.

**Shadows.** Minimal. Modals use `shadow-2xl` / `shadow-lg`; cards do
not. Popovers (`account menu`, `status detail`) get `shadow-lg` only.

**Animation.** Subtle and short (150–220ms), always `ease`.
- Buttons: `active:opacity-80 active:scale-[0.98]` — universal press state.
- Skeletons: 1.5s shimmer (`ui-skeleton-shimmer`).
- Trade tick flash: 1.4s color+translateY reset.
- Spinners: 6–14px bordered circles, `animate-spin`.
- No bounces. No springy overshoots. No attention-grabbing idle motion.

**Hover states.** Nav items: `text-secondary → text-primary` +
`bg-tertiary` fill. Primary CTAs: `hover:bg-accent/85` (or
`hover:brightness-110`). Icons tint to `text-primary`.

**Press states.** `opacity: 0.8; transform: scale(0.98)` applied
globally to every `button` and `[role="button"]` via the base layer.

**Focus.** 2px accent outline + 2px offset + 1px glow ring — all via
the `.ui-focus-ring` utility. Never rely on default browser outline.

**Transparency / blur.** Modal scrim is `bg-black/70 backdrop-blur-sm`.
Badges use 15% alpha fills of their text color. Otherwise the design
avoids translucency.

**Layout.** Fixed top navbar (56px) on all viewports. Below `lg`
(1024px), a fixed bottom 5-slot tab-bar appears + top nav collapses to
logo + status + avatar. Main content is always capped: 640px for
wallet/login, 800px for settings/about, 3xl for games, full-width for
markets/admin.

**Imagery.** No stock photography. No generated illustration. Assets
are functional: **poker card SVGs** (52 cards + bicycle back) and
**UNO card SVGs** (108 cards) — both under
`toolbear_ui/frontend/public/`. See `assets/`.

## Iconography

- **Primary icon library: `lucide-vue-next`** (Lucide) — stroke-based,
  `stroke-width: 2`, rendered at 15–24px. Used everywhere nav and inline.
  Example imports: `Sprout, TrendingUp, Wallet, Trophy, Map, Gamepad2,
  Egg, Menu, X, BarChart3, ShoppingBag, MessageSquare, Shield, Copy,
  Check, Code, Calendar`.
- **Color:** icons inherit `currentColor`. Default `text-secondary`;
  active / hover → `text-primary` or `text-accent`.
- **Sizing:** nav inline = `:size="15"`; game-tile hero = `:size="20"`;
  section headings = `:size="24"`.

- **Emoji as category icons.** Used *sparingly* as a colored glyph
  inside a tinted 40×40 tile: `♠️` (poker), `⚔️` (raid), `🐻` (brand),
  `🌙` (farewell). Not used in body copy, not in toasts, not in buttons.
- **Card-game SVGs.** Playing cards (`/public/poker/*.svg`) and UNO
  cards (`/public/uno-cards/*.svg`) are first-class assets, copied into
  `assets/poker/` and `assets/uno/`.

- **No custom icon font, no sprite sheet.** Lucide is pulled in as a
  Vue package; tree-shaken per import.

## Substitutions + Caveats

- **Fonts.** The product relies on the platform's system sans
  (`-apple-system, 'Noto Sans SC', …`) and `SF Mono`. **No webfont
  files** are shipped in the repo, and nothing here needs to be copied
  into `fonts/`. If you want pixel-perfect rendering on Linux/Windows,
  load Google Fonts: `Inter` + `Noto Sans SC` for sans, `JetBrains Mono`
  for mono. **Flagged** — no official brand font exists.
- **Logo.** The only "logo" is the 🐻 emoji sitting in the navbar. No
  SVG mark is in the repo. We did **not** invent one.
- **Card SVGs were copied** (52 playing cards + bicycle back + 108 UNO
  cards). Heavy. See `assets/poker/` and `assets/uno/`.

## Index (files in this design system)

| Path | What |
|---|---|
| `README.md` | This file — brand context, foundations, content voice. |
| `SKILL.md` | Agent-invocable skill manifest. |
| `colors_and_type.css` | CSS custom properties, semantic element defaults, base components. |
| `preview/` | Small HTML cards that populate the Design System tab. |
| `assets/poker/` | 52 playing cards + back (SVG). |
| `assets/uno/` | 108 UNO cards (SVG). |
| `ui_kits/toolbear/` | Lilium/ToolBear UI kit. Pixel-faithful recreation of the Vue SPA. |
| `ui_kits/toolbear/index.html` | Clickable demo: login → market → wallet → games. |
| `ui_kits/toolbear/*.jsx` | Reusable components (Navbar, Card, Button, Badge, TabBar, …). |
