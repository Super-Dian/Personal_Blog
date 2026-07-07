# AGENTS.md

Project instructions for AI coding agents (Codex, Claude Code, Cursor, etc.).

## Project

VitePress static blog. Single devDependency: `vitepress ^1.6.4`. No runtime deps. Node >= 18.

## Commands

```bash
npm run dev          # Dev server → http://localhost:5173
npm run build        # Build → docs/.vitepress/dist/
npm run preview      # Preview production build
```

No test runner. No linter. No formatter configured.

## Architecture

```
docs/
├── .vitepress/
│   ├── config.mts       # Site config: nav, sidebar, search, zh-CN locale
│   └── theme/
│       ├── index.ts     # Extends default VitePress theme
│       └── custom.css   # Frosted glass + indigo brand design system
├── public/              # Static assets: logo.svg, icons/*.svg
├── index.md             # Homepage: hero section + feature cards
├── guide/index.md       # Getting started page
└── notes/               # Lab notes in Markdown
    ├── web-dev.md
    ├── linux-basics.md
    └── git-usage.md
```

## Key Files

### `docs/.vitepress/config.mts`
Site configuration. Navigation, sidebar, search, all UI labels in Chinese. Edit this to add new pages or reorganize navigation.

### `docs/.vitepress/theme/custom.css`
Design system using CSS custom properties:
- `--glass-bg`, `--glass-bg-strong`, `--glass-border`, `--glass-blur`, `--glass-shadow`
- Light mode: white glass on lavender gradient
- Dark mode: `.dark` selector with dark glass on purple gradient
- Brand: indigo `#4f46e5` / `#6366f1` / `#818cf8`
- Hero: centered layout, gradient title text, `.VPHero .image { display: none }`
- Animations: `fadeInUp` keyframes, staggered delays on hero and cards
- **Do not add animations that ignore `prefers-reduced-motion`**

### `.github/workflows/deploy.yml`
Triggers on push to `main`. Runs `npm ci && npm run build`, deploys `docs/.vitepress/dist` to GitHub Pages.

## Adding a Note Page

1. Create `docs/notes/<name>.md`
2. Add sidebar entry in `config.mts` under `sidebar['/notes/'].items`
3. Optionally add to nav dropdown under `技术笔记`

Note page format:

```markdown
---
title: 标题
---

# 标题

## 实验目标
...

## 内容
...

## 实验总结
1. ...
```

## CSS Conventions

- All glass effects use the CSS variables above — never hardcode rgba values for glass
- Dark mode must be tested: add `.dark` variant for any new color
- Keep selectors scoped to VitePress classes (`.VP*`, `.vp-doc`, etc.)
- Feature cards use `.VPFeature` class — style via this selector

## Deployment

Push to `main` → GitHub Actions builds and deploys. Site URL: https://super-dian.github.io/Personal_Blog/

## Do Not

- Do not modify `docs/.vitepress/dist/` manually — it's a build output
- Do not add npm packages without checking if VitePress already provides the functionality
- Do not change the zh-CN locale or Chinese UI labels
