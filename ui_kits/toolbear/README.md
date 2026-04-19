# ToolBear UI Kit

Pixel-faithful recreation of the **Lilium / ToolBear** Vue 3 SPA
(`toolbear_ui/frontend/` in the original repo),
ported to React for easy reuse inside design artifacts.

> All components are cosmetic recreations — they look real but aren't
> wired to a real backend. Use them as a component library when mocking
> new ToolBear screens.

## Running

Open `index.html` in a browser. No build step.

The kit uses inline Babel transpilation (`<script type="text/babel">`)
and pulls components from the sibling `.jsx` files.

## Clickable demo flow

1. **Login** — a 6-digit code is shown, along with the `/login CODE`
   command you'd paste into the ToolBear bot chat. Click **"等待验证"**
   to simulate the chat approval round-trip.
2. **Market** — landing view. Turnip price card with live-style
   sparkline, tabs for overview / orderbook / farm.
3. **Navbar** — switch between 大头菜 / 股票 / 钱包 / 帕鲁 / 交易行 / 游戏 / 逃离.
4. **Games → 德州扑克** — opens a poker table using the real poker
   SVG assets from `../../assets/poker/`.
5. **Avatar menu → 退出当前账号** — opens the `ConfirmDialog` modal.
6. State is persisted to `localStorage` so refresh doesn't lose route
   or login.

## Files

| File | What |
|---|---|
| `index.html`        | Demo shell + app root. |
| `kit.css`           | UI-kit-scoped styles; imports tokens from `../../colors_and_type.css`. |
| `Primitives.jsx`    | `Button`, `Badge`, `Input`, `Card`, `Spinner`, `Avatar`, `StatusDot`, `Icon`. |
| `Navbar.jsx`        | Fixed 56px top bar + mobile `TabBar`. |
| `LoginView.jsx`     | `/login CODE` flow with copy-to-clipboard. |
| `WalletView.jsx`    | Hero balance card + transaction list. |
| `MarketView.jsx`    | Turnip market: sparkline, tabs, order book, farm. |
| `GamesView.jsx`     | Lobby + room list + `PokerTable` (uses real poker SVGs). |
| `OtherViews.jsx`    | `StockView`, `PalsView`, `ConfirmDialog`, `EmptyState`. |

## Conventions

- All sizes come from CSS vars in `colors_and_type.css`. Don't hard-code.
- Any numeric value goes in `class="mono"` (`--font-mono`).
- Badges use `tone="success|danger|info|warning|accent|neutral"`.
- Buttons press with `active:opacity-80 active:scale-[0.98]` via
  global CSS — don't re-implement per button.
- Dark-mode only; do not add a light theme.

## What's missing vs the real product

- No real bot integration. The 6-digit code is a dummy.
- Raid / Board / Achievements / Settings are empty-state stubs.
- No live charts; sparkline data is static.
- No Admin / Developer views.
