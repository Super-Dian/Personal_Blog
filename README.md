# 软件开发工具实践静态站点

这是一个基于 [VitePress](https://vitepress.dev/) 构建的课程实践站点，用于整理“软件开发工具实践”课程中的实验过程、工具配置、Linux 虚拟机部署和小组成果说明。

## 在线访问

[https://super-dian.github.io/Personal_Blog/](https://super-dian.github.io/Personal_Blog/)

## 项目内容

站点目前覆盖以下内容：

| 模块 | 页面 |
| --- | --- |
| 网络软件基础 | `docs/notes/network-basics.md` |
| Web 开发环境 | `docs/notes/web-dev.md` |
| 代码编辑器与 Markdown | `docs/notes/vscode-markdown.md` |
| Web 静态站点构建 | `docs/notes/site-build.md` |
| 虚拟机安装与使用 | `docs/notes/virtualbox-ubuntu.md` |
| Linux 环境配置 | `docs/notes/linux-basics.md` |
| 远程登录管理 | `docs/notes/ssh-remote.md` |
| 软件部署 | `docs/notes/deploy.md` |
| Git 版本管理 | `docs/notes/git-usage.md` |
| 小组分工与成果说明 | `docs/guide/team.md` |

## 本地运行

### 环境要求

- Node.js >= 18
- npm

### 安装依赖

```bash
npm install
```

在 CI 或干净环境中也可以使用：

```bash
npm ci
```

### 启动开发服务器

```bash
npm run dev
```

默认访问：

```text
http://localhost:5173/
```

### 构建

```bash
npm run build
```

构建产物输出到：

```text
docs/.vitepress/dist/
```

## 部署说明

### GitHub Pages

项目通过 GitHub Actions 自动部署。推送到 `main` 分支后会自动执行：

1. `npm ci`
2. `npm run build`
3. 上传 `docs/.vitepress/dist`
4. 发布到 GitHub Pages

由于仓库部署在子路径 `/Personal_Blog/`，VitePress 已配置：

```ts
base: '/Personal_Blog/'
```

### Ubuntu 虚拟机 + Nginx

虚拟机部署时建议保持同样的子路径：

```text
/var/www/blog/Personal_Blog/
```

构建后可使用 SCP 或 rsync 上传：

```bash
scp -r docs/.vitepress/dist/* 用户名@192.168.56.101:/var/www/blog/Personal_Blog/
```

访问：

```text
http://192.168.56.101/Personal_Blog/
```

详细步骤见 `docs/notes/deploy.md`。

## 项目结构

```text
Personal_Blog/
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts
│   │   └── theme/
│   ├── guide/
│   │   ├── index.md
│   │   └── team.md
│   ├── notes/
│   │   ├── network-basics.md
│   │   ├── web-dev.md
│   │   ├── vscode-markdown.md
│   │   ├── site-build.md
│   │   ├── virtualbox-ubuntu.md
│   │   ├── linux-basics.md
│   │   ├── ssh-remote.md
│   │   ├── deploy.md
│   │   └── git-usage.md
│   └── public/
├── .github/workflows/deploy.yml
├── package.json
└── README.md
```

## 后续需要补充

- 将成员 A-G 替换为真实小组成员姓名。
- 添加实际实验截图，建议放到 `docs/public/screenshots/`。
- 根据朋友已部署的虚拟机信息补充真实 IP、Nginx 访问截图和 SSH/rsync 记录。
- 最终提交前导出或整理一份整合版 PDF 实验报告。

## 许可证

MIT
