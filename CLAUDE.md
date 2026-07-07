# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal technical learning blog built with VitePress, deployed to GitHub Pages. Course assignment for a Web development class. All content is in Chinese.

## Commands

```bash
npm install          # Install dependencies (only vitepress)
npm run dev          # Local dev server at http://localhost:5173
npm run build        # Production build → docs/.vitepress/dist/
npm run preview      # Preview production build locally
```

## Architecture

- **VitePress** static site generator, Vue 3 + Vite under the hood
- **Single devDependency**: `vitepress` — no other packages
- **Config**: `docs/.vitepress/config.mts` — site title, nav, sidebar, search, all in Chinese
- **Theme**: `docs/.vitepress/theme/index.ts` extends default theme, imports `custom.css`
- **Custom CSS**: `docs/.vitepress/theme/custom.css` — frosted glass design system with indigo brand colors, animations, dark mode support
- **Content**: Markdown files under `docs/` — `index.md` (homepage), `guide/`, `notes/`
- **Static assets**: `docs/public/` — logo.svg, icon SVGs
- **Deployment**: GitHub Actions pushes to GitHub Pages on merge to `main`

## Content Convention

Note pages follow a standard structure:
- Frontmatter with title
- `## 实验目标` (Experiment Objective)
- Content sections with code blocks
- `## 实验总结` (Experiment Summary)

## CSS Design System

The custom theme uses CSS custom properties for the frosted glass effect:
- `--glass-bg`, `--glass-bg-strong`, `--glass-border`, `--glass-blur`, `--glass-shadow`
- Light/dark mode variants via `.dark` selector
- Brand colors: indigo palette (`#4f46e5` / `#6366f1` / `#818cf8`)
- Hero section: centered layout, gradient text, hidden hero image
- Animations: `fadeInUp` keyframes with staggered delays, `prefers-reduced-motion` respected

## Adding New Content

1. Create a `.md` file under `docs/notes/`
2. Add it to the sidebar in `docs/.vitepress/config.mts` under the `/notes/` section
3. Optionally add a nav dropdown entry in the `技术笔记` menu

## Local Development Environment

### Browser Testing (browser-use skill)

The blog can be tested live in Edge via CDP. Setup:

1. Launch Edge with remote debugging:
   ```bash
   "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
     --remote-debugging-port=9222 \
     --user-data-dir=/c/Users/Y90000P/edge-debug-profile &
   ```
2. Set env: `export BU_CDP_URL="http://localhost:9222"`
3. Use browser-use to navigate, screenshot, and interact:
   ```bash
   uv run --python 3.12 --with browser-use browser-use <<'PY'
   new_tab("http://localhost:5173/")
   wait_for_load()
   capture_screenshot(path="d:/Code/Web/Personal_Blog/screenshot.png")
   PY
   ```

Key browser-use helpers: `page_info()`, `capture_screenshot(path)`, `click_at_xy(x,y)`, `js(expression)`, `new_tab(url)`, `wait_for_load()`.

### CSS Debugging Workflow

When fixing layout issues:
1. **Inspect DOM first** — use `js()` to check computed styles before writing CSS
2. VitePress Hero uses `display: flex` on `.heading` — use `align-items: center`, not `text-align: center`
3. Block-level elements need `width: 100%` to respond to parent's `text-align`
4. Always test both light and dark mode
