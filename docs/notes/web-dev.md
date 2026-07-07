# Web 开发环境搭建

## 实验目标

安装 Web 开发环境，构建一个静态站点，了解和实践 Web 服务器、软件包及管理器等工具和概念。

## 开发工具

### VS Code

Visual Studio Code 是一款由微软开发的免费、开源的代码编辑器，支持多种编程语言和扩展。

**安装步骤：**
1. 访问 [VS Code 官网](https://code.visualstudio.com/)
2. 下载对应操作系统的安装包
3. 安装并启动

**推荐扩展：**
- Live Server — 本地开发服务器
- Prettier — 代码格式化
- ESLint — JavaScript 代码检查

### Node.js

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

**安装方式：**
```bash
# Windows（使用 Chocolatey）
choco install nodejs-lts

# macOS（使用 Homebrew）
brew install node

# 验证安装
node --version
npm --version
```

## 静态站点生成

静态站点生成器可以将 Markdown 文件转换为完整的静态网站。本项目使用 **VitePress**。

**VitePress 的优势：**
- 基于 Vue 3 和 Vite，开发体验极佳
- 默认主题美观，支持暗色模式
- Markdown 驱动，专注于内容创作
- 构建速度快，部署简单

## Web 服务器基础

### 什么是 Web 服务器？

Web 服务器是处理 HTTP 请求并返回响应的软件。常见的 Web 服务器包括：
- **Nginx** — 高性能的反向代理服务器
- **Apache** — 经典的 HTTP 服务器
- **Node.js** — 可以作为 Web 服务器运行

### 本地开发服务器

在开发阶段，我们使用本地开发服务器来预览站点：

```bash
# VitePress 开发服务器
npm run dev
```

启动后，站点会在本地运行（默认端口 5173），支持热模块替换（HMR），修改代码后页面会自动更新。

## 软件包管理器

### npm

npm 是 Node.js 的默认包管理器，用于安装和管理项目依赖。

```bash
# 初始化项目
npm init -y

# 安装依赖
npm install <package-name>

# 安装开发依赖
npm install -D <package-name>

# 全局安装
npm install -g <package-name>
```

### package.json

`package.json` 是项目的核心配置文件，记录了项目信息、依赖和脚本：

```json
{
  "name": "personal_blog",
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "preview": "vitepress preview docs"
  }
}
```

## 实验总结

通过本次实验，我了解了：
1. Web 开发的基本工具链（编辑器、运行环境、包管理器）
2. 静态站点生成器的工作原理
3. 本地开发服务器的使用方法
4. npm 包管理器的基本操作