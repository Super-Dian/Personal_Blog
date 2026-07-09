# 入门指南

欢迎来到“软件开发工具实践”课程成果站点。本项目使用 VitePress 构建，用于展示课程实验记录、部署流程和小组分工。

## 如何阅读本站

建议按课程实验顺序阅读：

1. [网络软件基础](/notes/network-basics)
2. [Web 开发环境](/notes/web-dev)
3. [代码编辑器与 Markdown](/notes/vscode-markdown)
4. [Web 静态站点构建](/notes/site-build)
5. [虚拟机安装与使用](/notes/virtualbox-ubuntu)
6. [Linux 环境配置](/notes/linux-basics)
7. [远程登录管理](/notes/ssh-remote)
8. [软件部署](/notes/deploy)

补充专题：

- [Git 版本管理](/notes/git-usage)
- [小组分工与成果说明](/guide/team)

## 本地运行

```bash
git clone https://github.com/Super-Dian/Personal_Blog.git
cd Personal_Blog
npm install
npm run dev
```

默认访问：

```text
http://localhost:5173/
```

## 构建与部署

```bash
npm run build
```

构建产物位于：

```text
docs/.vitepress/dist/
```

项目推送到 `main` 分支后，GitHub Actions 会自动部署到 GitHub Pages。虚拟机部署流程见 [软件部署](/notes/deploy)。

## 提交前准备

最终提交前建议完成：

- 替换小组成员真实姓名。
- 补充实际实验截图。
- 检查 GitHub Pages 是否能访问。
- 检查虚拟机 Nginx 部署页面是否能访问。
- 整理或导出最终 PDF 实验报告。
