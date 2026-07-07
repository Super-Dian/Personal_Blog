# 个人技术学习博客

一个基于 [VitePress](https://vitepress.dev/) 构建的静态博客站点，记录课程学习过程中的技术笔记和实践总结。

## 在线访问

🔗 **博客地址：** [https://super-dian.github.io/Personal_Blog/](https://super-dian.github.io/Personal_Blog/)

## 本地运行

### 环境要求

- Node.js >= 18
- npm

### 安装与启动

```bash
# 克隆仓库
git clone https://github.com/Super-Dian/Personal_Blog.git
cd Personal_Blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

启动后访问终端显示的地址（默认 `http://localhost:5173`）即可预览站点。

### 构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
Personal_Blog/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts          # VitePress 配置
│   │   └── theme/
│   │       ├── index.ts        # 主题入口
│   │       └── custom.css      # 自定义样式
│   ├── index.md                # 首页
│   ├── guide/
│   │   └── index.md            # 入门指南
│   ├── notes/
│   │   ├── web-dev.md          # Web 开发笔记
│   │   ├── linux-basics.md     # Linux 基础笔记
│   │   └── git-usage.md        # Git 使用笔记
│   └── public/
│       └── logo.svg            # 站点 Logo
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages 自动部署
├── package.json
└── README.md
```

## 技术栈

- [VitePress](https://vitepress.dev/) — 静态站点生成器
- [Vue 3](https://vuejs.org/) — 前端框架
- [Vite](https://vitejs.dev/) — 构建工具
- [GitHub Pages](https://pages.github.com/) — 静态站点托管

## 部署说明

本项目通过 GitHub Actions 自动部署。推送到 `main` 分支后，会自动构建并部署到 GitHub Pages。

**启用 GitHub Pages 的步骤：**
1. 进入仓库 Settings → Pages
2. Source 选择 **GitHub Actions**
3. 推送代码后，Actions 会自动运行部署流程

## 许可证

MIT