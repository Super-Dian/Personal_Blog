# Git 版本管理

## 实验目的

学习使用 Git 管理项目代码，理解工作区、暂存区、提交和远程仓库的关系，并掌握团队协作中的推送、拉取和冲突处理基础。

## 实验环境

| 项目 | 内容 |
| --- | --- |
| 操作系统 | Windows 10/11 |
| 工具 | Git、VS Code |
| 远程平台 | GitHub |
| 项目仓库 | `Super-Dian/Personal_Blog` |

## 核心概念

| 概念 | 说明 |
| --- | --- |
| 工作区 | 当前正在编辑的文件 |
| 暂存区 | 准备进入下一次提交的修改 |
| 本地仓库 | 保存提交历史的 `.git` 目录 |
| 远程仓库 | GitHub 上的代码备份与协作空间 |

## 实验过程

### 配置 Git 用户信息

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --list
```

### 克隆项目

```bash
git clone https://github.com/Super-Dian/Personal_Blog.git
cd Personal_Blog
```

### 查看状态

```bash
git status
```

### 暂存与提交

```bash
git add .
git commit -m "docs: 补充实验报告页面"
```

### 推送到远程

```bash
git push origin main
```

### 获取远程更新

```bash
git fetch origin
git pull origin main
```

### 查看历史

```bash
git log --oneline
```

## `.gitignore` 配置

项目应忽略依赖目录和构建产物：

```gitignore
node_modules/
docs/.vitepress/dist/
docs/.vitepress/cache/
.DS_Store
Thumbs.db
```

## 实验结果

项目代码可以通过 Git 记录修改历史，并推送到 GitHub。GitHub Actions 会在推送到 `main` 分支后自动触发部署流程。

## 截图记录

| 截图项 | 说明 |
| --- | --- |
| Git 配置信息 | 展示用户名和邮箱 |
| `git status` | 展示工作区状态 |
| 提交历史 | 展示 `git log --oneline` |
| GitHub 仓库页面 | 展示远程代码 |
| Actions 运行记录 | 展示自动部署触发 |

## 问题与解决

| 问题 | 原因 | 解决方法 |
| --- | --- | --- |
| 推送失败 | 未登录或权限不足 | 登录 GitHub 或配置 Token |
| 本地落后远端 | 远端已有新提交 | 先 `git pull` 再推送 |
| 文件误提交 | `.gitignore` 不完整 | 补充忽略规则并清理缓存 |

## 实验总结

Git 是项目协作和部署自动化的基础。通过提交历史可以追踪每次修改，远程仓库保证代码备份和团队同步，GitHub Actions 则将代码推送与站点部署连接起来。
