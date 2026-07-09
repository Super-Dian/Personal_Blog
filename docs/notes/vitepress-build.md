# 实验四：Web站点构建

## 一、实验目标

1. 使用静态站点构建工具（VitePress）构建一个静态Web博客站点；
2. 了解和掌握Web应用开发的基本要素与流程：环境准备 → 项目初始化 → 内容编写 → 主题配置 → 本地预览 → 部署上线；
3. 理解静态站点生成器（SSG）的工作原理及其与动态站点的区别。

## 二、实验环境

- **操作系统**：Ubuntu 24.04.4 LTS
- **Node.js版本**：v22.16.0（通过nvm安装）
- **npm版本**：10.9.2
- **静态站点生成器**：VitePress v1.6.4
- **版本控制**：Git

## 三、实验过程

### 步骤一：环境准备

验证Node.js和npm是否已安装：
```bash
# 验证Node.js
node -v
# 输出：v22.16.0

# 验证npm
npm -v
# 输出：10.9.2

# 验证npm镜像源
npm config get registry
# 输出：https://mirrors.tuna.tsinghua.edu.cn/npm/
```

### 步骤二：初始化VitePress项目

**方法1：使用npm直接安装VitePress**
```bash
# 创建项目目录
mkdir my-blog
cd my-blog

# 初始化npm项目
npm init -y

# 安装VitePress
npm install -D vitepress

# 验证安装
npx vitepress --version
# 输出：vitepress v1.6.4
```

**方法2：使用VitePress官方模板（推荐）**
```bash
# 使用官方脚手架
npx vitepress init

# 按照提示配置：
# ✔ Where should VitePress initialize the config? ./docs
# ✔ Site title: 个人博客
# ✔ Site description: 一个记录技术学习历程的个人博客
# ✔ Theme: Default Theme
# ✔ Use TypeScript? No
# ✔ Add VitePress npm scripts? Yes
```

### 步骤三：了解项目结构

初始化完成后的目录结构：
```
my-blog/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts      # VitePress配置文件
│   │   └── theme/
│   │       └── index.ts    # 主题配置
│   ├── index.md            # 首页
│   ├── guide/
│   │   └── index.md        # 入门指南
│   └── public/
│       └── logo.svg        # 站点Logo
├── node_modules/           # 依赖目录
├── package.json            # 项目配置
└── package-lock.json       # 依赖锁定文件
```

### 步骤四：配置VitePress

编辑 `docs/.vitepress/config.mts` 文件：
```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '个人博客',
  description: '一个记录技术学习历程的个人博客',
  lang: 'zh-CN',
  base: '/Personal_Blog/',

  head: [
    ['link', { rel: 'icon', href: '/Personal_Blog/logo.svg' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '个人博客',

    nav: [
      { text: '首页', link: '/' },
      { text: '入门指南', link: '/guide/' },
      {
        text: '技术笔记',
        items: [
          { text: 'Web 开发', link: '/notes/web-dev' },
          { text: 'Linux 基础', link: '/notes/linux-basics' },
          { text: 'Git 使用', link: '/notes/git-usage' },
        ]
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: '开始使用', link: '/guide/' },
          ]
        }
      ],
      '/notes/': [
        {
          text: '技术笔记',
          items: [
            { text: 'Web 开发环境', link: '/notes/web-dev' },
            { text: 'Linux 基础操作', link: '/notes/linux-basics' },
            { text: 'Git 版本管理', link: '/notes/git-usage' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Super-Dian/Personal_Blog' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: '© 2026 个人博客'
    },

    search: {
      provider: 'local'
    },

    outline: {
      label: '页面导航',
      level: [2, 3]
    },
  }
})
```

### 步骤五：编写首页内容

编辑 `docs/index.md`：
```markdown
---
layout: home

hero:
  name: "个人博客"
  text: "技术学习笔记"
  tagline: 记录学习过程，分享技术心得
  actions:
    - theme: brand
      text: 开始探索
      link: /guide/
    - theme: alt
      text: GitHub
      link: https://github.com/Super-Dian/Personal_Blog

features:
  - icon:
      src: /icons/web.svg
    title: Web 开发
    details: 从零搭建 Web 开发环境，学习 HTML、CSS、JavaScript 等前端技术
  - icon:
      src: /icons/linux.svg
    title: Linux 基础
    details: 掌握 Linux 基本操作、Shell 命令、系统配置与权限管理
  - icon:
      src: /icons/git.svg
    title: Git 版本管理
    details: 使用 Git 进行代码版本控制，掌握分支管理与团队协作流程
  - icon:
      src: /icons/deploy.svg
    title: 项目部署
    details: 将静态站点部署到 GitHub Pages，实现从开发到上线的全流程
---
```

### 步骤六：创建笔记页面

创建 `docs/notes/web-dev.md`：
```markdown
# Web 开发环境搭建

## 实验目标

安装 Web 开发环境，构建一个静态站点，了解和实践 Web 服务器、软件包及管理器等工具和概念。

## 内容

### Node.js

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。

**安装步骤：**
1. 使用nvm安装Node.js 22 LTS版本
2. 配置npm镜像源

### VitePress

VitePress 是一个基于 Vue 3 的静态站点生成器。

**优势：**
- 开发体验极佳
- 构建速度快
- Markdown驱动
```

### 步骤七：本地预览

```bash
# 启动开发服务器
npm run dev

# 或者使用npx
npx vitepress dev docs
```

启动成功后会显示：
```
  VitePress v1.6.4

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

打开浏览器访问 `http://localhost:5173` 即可预览站点。

### 步骤八：构建生产版本

```bash
# 构建静态文件
npm run build

# 或者使用npx
npx vitepress build docs
```

构建完成后，静态文件会生成在 `docs/.vitepress/dist/` 目录：

```
docs/.vitepress/dist/
├── assets/
│   ├── style.BJP0-Lrz.css    # 样式文件
│   ├── app.0dRpRI9x.js       # 主脚本
│   └── chunks/               # 代码分割块
├── guide/
│   └── index.html            # 入门指南页面
├── icons/                    # 图标文件
├── notes/                    # 笔记页面
├── index.html                # 首页
├── logo.svg                  # Logo
└── 404.html                  # 404页面
```

### 步骤九：预览构建结果

```bash
# 预览构建结果
npm run preview

# 或者使用npx
npx vitepress preview docs
```

启动成功后会显示：
```
  VitePress v1.6.4

  ➜  Local:   http://localhost:4173/Personal_Blog/
```

## 四、实验结果

### 站点构建验证

```bash
# 验证构建输出
ls -la docs/.vitepress/dist/
# 输出：index.html、assets/、guide/、notes/等文件

# 验证文件大小
du -sh docs/.vitepress/dist/
# 输出：约1MB（包含所有静态文件）
```

### 站点功能验证

| 功能 | 状态 | 说明 |
|------|------|------|
| 首页访问 | ✅ | 显示Hero区域和Features卡片 |
| 导航菜单 | ✅ | 支持首页、入门指南、技术笔记 |
| 侧边栏 | ✅ | 支持多级菜单 |
| Markdown渲染 | ✅ | 支持标题、列表、代码块、表格 |
| 暗色模式 | ✅ | 支持亮色/暗色主题切换 |
| 搜索功能 | ✅ | 支持本地搜索 |
| 响应式布局 | ✅ | 支持移动端适配 |

### 项目配置总结

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `title` | 个人博客 | 站点标题 |
| `description` | 一个记录技术学习历程的个人博客 | 站点描述 |
| `base` | /Personal_Blog/ | 基础路径 |
| `lang` | zh-CN | 语言设置 |
| `themeConfig.nav` | 首页、入门指南、技术笔记 | 顶部导航 |
| `themeConfig.sidebar` | /guide/、/notes/ | 侧边栏配置 |

## 五、知识总结

### 静态站点生成器（SSG）原理

```
┌─────────────────────────────────────────────────────────┐
│                    SSG工作流程                            │
│                                                         │
│  Markdown文件  ──▶  模板引擎  ──▶  静态HTML文件         │
│       │               │               │                 │
│       ▼               ▼               ▼                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│  │ 内容源文件│    │ 主题模板 │    │ 构建产物 │          │
│  │ (.md)    │    │ (.vue)   │    │ (HTML)   │          │
│  └──────────┘    └──────────┘    └──────────┘          │
└─────────────────────────────────────────────────────────┘
```

**SSG的优势**：
- **构建时生成**：所有页面在构建时就生成好了，访问时直接返回静态文件
- **无需数据库**：内容存储在Markdown文件中，不需要数据库
- **高性能**：静态文件加载速度极快
- **高安全性**：没有后端代码，攻击面小

### VitePress核心概念

| 概念 | 说明 | 本实验应用 |
|------|------|-----------|
| **Frontmatter** | Markdown文件头部的YAML配置 | 定义页面布局、标题等 |
| **主题** | 控制站点外观和布局 | 使用默认主题 |
| **插件** | 扩展VitePress功能 | 使用内置插件 |
| **路由** | 页面URL映射 | 自动生成路由 |

### 目录结构约定

```
docs/
├── .vitepress/          # VitePress配置目录
│   ├── config.mts       # 主配置文件
│   └── theme/           # 主题配置
├── index.md             # 首页（特殊文件）
├── guide/               # 指南目录
│   └── index.md         # /guide/ 页面
├── notes/               # 笔记目录
│   ├── web-dev.md       # /notes/web-dev.html
│   └── linux-basics.md  # /notes/linux-basics.html
└── public/              # 静态资源
    └── logo.svg         # Logo文件
```

## 六、出现问题

### 问题1：VitePress安装速度慢

**现象**：执行`npm install -D vitepress`时下载速度极慢

**原因**：默认使用国外npm镜像源

**解决方案**：
```bash
# 配置清华TUNA镜像源
npm config set registry https://mirrors.tuna.tsinghua.edu.cn/npm/

# 重新安装
npm install -D vitepress
```

### 问题2：构建后图片不显示

**现象**：在本地开发时图片正常显示，但构建后图片不显示

**原因**：图片路径错误，使用了绝对路径而不是相对路径

**解决方案**：
```markdown
# 错误的写法（绝对路径）
![图片](/images/example.png)

# 正确的写法（相对路径）
![图片](../images/example.png)

# 或者使用public目录下的图片
![图片](/logo.svg)
```

### 问题3：路由404错误

**现象**：访问某些页面时出现404错误

**原因**：文件路径或配置错误

**解决方案**：
```bash
# 检查文件是否存在
ls -la docs/notes/

# 检查配置文件中的路径
cat docs/.vitepress/config.mts

# 重新构建
npm run build
```

## 七、心得体会

### 技术层面

通过本次实验，我掌握了：
1. **VitePress使用**：学会了使用VitePress构建静态站点
2. **配置管理**：掌握了VitePress的配置方法，包括导航、侧边栏、主题等
3. **Markdown编写**：能够使用Markdown编写结构化的技术文档
4. **构建流程**：理解了静态站点生成器的工作原理

### 思政层面

**开源生态的力量**：VitePress是Vue.js生态的一部分，拥有活跃的社区和丰富的插件。这体现了开源生态的价值——通过协作和共享，不断推动技术进步。

**标准化与规范化**：VitePress遵循了静态站点生成器的标准约定，使得开发者可以快速上手。这体现了软件工程中标准化和规范化的重要性。

**实践出真知**：只有通过实际操作，才能真正掌握工具的使用。本次实验让我对静态站点生成器有了深入的了解，为后续的开发工作打下了基础。

---

**实验日期**：2026年7月9日
**实验环境**：Ubuntu 24.04.4 LTS + VitePress v1.6.4
