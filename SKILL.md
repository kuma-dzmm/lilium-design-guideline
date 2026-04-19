---
name: toolbear-design
description: Use this skill to generate well-branded interfaces and assets for ToolBear (codename Lilium · 工具熊), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other
available files. `colors_and_type.css` is the authoritative token sheet;
`ui_kits/toolbear/` is a working React component kit copied from the
Vue 3 SPA at `toolbear_ui/frontend/`; `assets/poker/` and `assets/uno/`
hold the full card decks.

If creating visual artifacts (slides, mocks, throwaway prototypes,
etc), copy assets out and create static HTML files for the user to
view. If working on production code, you can copy assets and read the
rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them
what they want to build or design, ask some questions, and act as an
expert designer who outputs HTML artifacts *or* production code,
depending on the need.

Key reminders:
- Dark-mode only. Do not invent a light theme.
- UI copy is Chinese. Numbers and code commands stay in mono.
- One accent — `#ff5a8a`. Don't add new hues.
- Iconography is Lucide (stroke-width 2); emoji appears only as
  category glyphs inside tinted 40×40 tiles. Never in body copy.
- Cards rely on 1px border + 12px radius — never shadow alone.
- Press state is universal: `active:opacity-80 active:scale-[0.98]`.
