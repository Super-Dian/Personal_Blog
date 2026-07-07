# Git 版本管理

## 实验目标

学习使用 Git 进行代码版本管理，掌握分支管理、远程仓库协作等核心技能。

## Git 基础

### 什么是 Git？

Git 是一个分布式版本控制系统，用于跟踪文件的更改历史，支持多人协作开发。

### 基本配置

```bash
# 设置用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 查看配置
git config --list
```

## 基本工作流

### 初始化仓库

```bash
# 初始化新仓库
git init

# 克隆远程仓库
git clone https://github.com/user/repo.git
```

### 三区概念

Git 有三个重要的区域：
1. **工作区（Working Directory）** — 你编辑文件的地方
2. **暂存区（Staging Area）** — 准备提交的更改
3. **仓库（Repository）** — 提交后的永久记录

### 提交流程

```bash
# 查看状态
git status

# 添加到暂存区
git add file.txt          # 添加单个文件
git add .                 # 添加所有更改

# 提交到仓库
git commit -m "描述信息"

# 查看提交历史
git log
git log --oneline         # 简洁模式
```

## 分支管理

### 分支操作

```bash
# 查看分支
git branch                # 本地分支
git branch -a             # 所有分支（含远程）

# 创建分支
git branch feature-1      # 创建新分支

# 切换分支
git checkout feature-1    # 切换到 feature-1
git checkout -b new-branch  # 创建并切换

# 合并分支
git checkout main
git merge feature-1

# 删除分支
git branch -d feature-1   # 删除已合并的分支
git branch -D feature-1   # 强制删除
```

### 分支策略

推荐的分支命名规范：
- `main` / `master` — 主分支
- `feature/xxx` — 功能分支
- `fix/xxx` — 修复分支
- `docs/xxx` — 文档分支

## 远程协作

### 远程仓库操作

```bash
# 查看远程仓库
git remote -v

# 添加远程仓库
git remote add origin https://github.com/user/repo.git

# 推送更改
git push origin main
git push -u origin main    # 首次推送并设置上游

# 拉取更新
git pull origin main

# 获取远程更新（不合并）
git fetch origin
```

## .gitignore

在项目根目录创建 `.gitignore` 文件，指定不需要版本控制的文件：

```gitignore
# 依赖目录
node_modules/

# 构建输出
docs/.vitepress/dist/
docs/.vitepress/cache/

# 系统文件
.DS_Store
Thumbs.db

# 编辑器配置
.vscode/
.idea/
```

## 实验总结

通过本次实验，我掌握了：
1. Git 的基本配置和初始化
2. 文件的添加、提交和查看历史
3. 分支的创建、切换和合并
4. 远程仓库的协作流程
5. `.gitignore` 文件的使用