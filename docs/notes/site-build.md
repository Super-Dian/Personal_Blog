# Web 静态站点构建

## 实验目的

使用静态站点生成器构建课程实践网站，理解从 Markdown 内容到 HTML 静态页面的生成流程，并掌握本地预览、构建和发布的基本命令。

## 实验环境

| 项目 | 内容 |
| --- | --- |
| 操作系统 | Windows 10/11 |
| 运行环境 | Node.js 18+ |
| 包管理器 | npm |
| 静态站点生成器 | VitePress |
| 项目仓库 | `Super-Dian/Personal_Blog` |

## 选型说明

资料包示例中使用 Hexo 构建静态博客。本项目采用 VitePress，同样属于静态站点生成器，核心流程一致：

1. 使用 Markdown 编写内容。
2. 使用构建工具生成静态 HTML、CSS 和 JavaScript。
3. 将构建产物部署到 GitHub Pages 或 Nginx。

## 实验过程

### 安装依赖

```bash
npm install
```

或在 CI/干净环境中使用：

```bash
npm ci
```

### 本地开发预览

```bash
npm run dev
```

默认访问地址：

```text
http://localhost:5173/
```

### 编写页面

课程实验内容主要放在 `docs/notes/` 目录下，每个 `.md` 文件对应一个页面。导航与侧边栏在 `docs/.vitepress/config.mts` 中配置。

### 构建静态文件

```bash
npm run build
```

构建产物目录：

```text
docs/.vitepress/dist/
```

## 实验结果

项目可以在本地启动预览，构建命令能够生成完整静态文件。站点首页、实验记录页面、导航、搜索和侧边栏均由 VitePress 统一管理。

## 截图记录

| 截图项 | 说明 |
| --- | --- |
| `npm install` 或 `npm ci` | 展示依赖安装完成 |
| `npm run dev` | 展示本地服务启动 |
| 浏览器本地预览 | 展示站点首页 |
| `npm run build` | 展示构建成功 |
| `docs/.vitepress/dist/` | 展示静态产物目录 |

## 问题与解决

| 问题 | 原因 | 解决方法 |
| --- | --- | --- |
| 依赖安装慢 | npm 默认源访问慢 | 切换镜像源或重试 |
| 页面资源 404 | GitHub Pages 子路径配置错误 | 设置 `base: '/Personal_Blog/'` |
| 端口占用 | 5173 被其他程序使用 | 使用 `npm run dev -- --port 5174` |

## 实验总结

静态站点构建把课程实验报告从单独文档扩展为可访问的网站。VitePress 让内容编写保持 Markdown 的简洁，同时提供导航、搜索、主题和自动部署能力，适合课程实践成果展示。
