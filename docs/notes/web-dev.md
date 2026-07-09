# 实验二：Web软件开发环境

## 一、实验目标

1. 安装并运行一个Web博客软件（本实验选用 **VitePress** 静态博客框架）；
2. 了解和掌握Web开发环境的基础安装与配置（Node.js、npm、Git）；
3. 理解Web软件的B/S架构特点以及静态站点与动态站点的区别。

## 二、实验环境

- **操作系统**：Ubuntu 24.04.4 LTS（服务器）+ Windows（本地开发）
- **Node.js版本**：v22.16.0（通过nvm安装）
- **npm版本**：10.9.2
- **Git版本**：2.43.0
- **静态站点生成器**：VitePress v1.6.4
- **代码编辑器**：Visual Studio Code

## 三、实验过程

### 步骤一：安装nvm和Node.js

nvm（Node Version Manager）是一个Node.js版本管理工具，可以方便地安装和切换不同版本的Node.js。

**安装nvm**：
```bash
# 下载并安装nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载shell配置
source ~/.bashrc

# 验证nvm安装
nvm --version
# 输出：0.39.0
```

**使用nvm安装Node.js**：
```bash
# 查看可用的Node.js版本
nvm ls-remote | grep v22

# 安装Node.js 22 LTS版本
nvm install 22

# 使用Node.js 22
nvm use 22

# 验证安装
node -v
# 输出：v22.16.0

npm -v
# 输出：10.9.2
```

### 步骤二：配置npm镜像源

为了加速npm包的下载速度，配置使用清华TUNA镜像源。

```bash
# 使用清华TUNA镜像源
npm config set registry https://mirrors.tuna.tsinghua.edu.cn/npm/

# 验证配置
npm config get registry
# 输出：https://mirrors.tuna.tsinghua.edu.cn/npm/
```

### 步骤三：安装Git版本控制

```bash
# 更新包列表
sudo apt update

# 安装Git
sudo apt install git -y

# 验证安装
git --version
# 输出：git version 2.43.0

# 配置用户信息
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### 步骤四：了解静态站点与动态站点

| 对比维度 | 静态站点 | 动态站点 |
|----------|----------|----------|
| **页面生成时机** | 构建时预先生成 | 用户访问时实时生成 |
| **数据库** | 不需要 | 通常需要 |
| **访问速度** | 极快（纯静态文件） | 较慢（需执行后端代码） |
| **安全性** | 高（无后端攻击面） | 需额外防护 |
| **部署方式** | 上传静态文件即可 | 需配置服务器环境 |
| **适用场景** | 博客、文档站、个人网站 | 电商、社交、CMS |

**本实验选择VitePress的原因**：
- 基于Vue 3和Vite，开发体验极佳
- 默认主题美观，支持暗色模式
- Markdown驱动，专注于内容创作
- 构建速度快，部署简单

## 四、实验结果

### 环境验证

```bash
# 验证nvm、Node.js和npm
nvm --version && node -v && npm -v
# 输出：0.39.0、v22.16.0、10.9.2

# 验证Git
git --version
# 输出：git version 2.43.0

# 验证npm镜像源
npm config get registry
# 输出：https://mirrors.tuna.tsinghua.edu.cn/npm/
```

### 开发环境架构

```
┌─────────────────────────────────────────────────────────┐
│                    开发环境架构                           │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│  │ VS Code  │───▶│ nvm      │───▶│ Node.js  │          │
│  │ (编辑器) │    │ (版本)   │    │ (运行时) │          │
│  └──────────┘    └──────────┘    └──────────┘          │
│        │               │               │                │
│        ▼               ▼               ▼                │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│  │Markdown  │    │VitePress │    │ Git      │          │
│  │ (内容)   │    │ (构建)   │    │ (版本)   │          │
│  └──────────┘    └──────────┘    └──────────┘          │
└─────────────────────────────────────────────────────────┘
```

## 五、知识总结

### 核心工具对比

| 工具 | 作用 | 本实验应用 |
|------|------|-----------|
| **nvm** | Node.js版本管理 | 安装和切换Node.js版本 |
| **Node.js** | JavaScript运行环境 | 运行VitePress |
| **npm** | 包管理器 | 安装项目依赖 |
| **Git** | 版本控制 | 管理代码版本 |
| **VitePress** | 静态站点生成器 | 构建博客站点 |
| **VS Code** | 代码编辑器 | 编写Markdown |

### B/S架构理解

**B/S架构（Browser/Server）**：
- 用户通过浏览器访问Web应用
- 核心功能在服务器端处理
- 本实验的VitePress生成静态站点，通过Nginx提供服务

**与C/S架构对比**：
- C/S架构需要安装客户端软件
- B/S架构只需浏览器即可访问
- 本实验的博客站点属于B/S架构

## 六、出现问题

### 问题1：nvm安装后命令不可用

**现象**：安装nvm后，执行`nvm`命令提示"command not found"

**原因**：shell配置未重新加载

**解决方案**：
```bash
# 重新加载bash配置
source ~/.bashrc

# 或者重启终端
```

### 问题2：npm安装速度慢

**现象**：执行`npm install`时下载速度极慢

**原因**：默认使用国外npm镜像源

**解决方案**：
```bash
# 切换为清华TUNA镜像源
npm config set registry https://mirrors.tuna.tsinghua.edu.cn/npm/

# 验证配置
npm config get registry
# 输出：https://mirrors.tuna.tsinghua.edu.cn/npm/
```

## 七、心得体会

### 技术层面

通过本次实验，我掌握了：
1. **nvm使用**：学会了使用nvm管理Node.js版本，可以方便地切换不同版本
2. **npm配置**：掌握了配置npm镜像源的方法，大大提升了包下载速度
3. **静态站点概念**：理解了静态站点与动态站点的区别和适用场景
4. **版本控制基础**：了解了Git的基本配置和使用方法

### 思政层面

**开源软件的力量**：nvm、Node.js、npm、Git、VitePress等开源工具让我能够零成本搭建个人博客，这体现了开源社区的共享精神。作为未来的软件工程师，我应当积极参与开源社区，为国产软件生态建设贡献力量。

**实践的重要性**：理论知识只有通过实践才能真正掌握。本次实验让我对Web开发有了更深入的理解，为后续的实验打下了坚实的基础。

---

**实验日期**：2026年7月9日
**实验环境**：Ubuntu 24.04.4 LTS + Node.js v22.16.0（nvm）+ VitePress v1.6.4
