# Web 建站作业任务清单

## 课程目标

以小组为单位，完成一个 Web 静态站点从开发、构建到部署的全过程。站点内容用于展示课程实验过程总结、工具配置记录、Linux 虚拟机部署记录和小组分工说明。

## 考核要求对照

| 要求 | 当前状态 | 说明 |
| --- | --- | --- |
| VS Code 开发 | 已覆盖 | 见代码编辑器与 Markdown 页面 |
| 静态站点生成工具 | 已覆盖 | 本项目使用 VitePress |
| Git 版本管理 | 已覆盖 | 见 Git 版本管理页面 |
| GitHub Pages 部署 | 已覆盖 | 已配置 GitHub Actions |
| Linux 虚拟机环境 | 已补充文档 | 需要补充真实截图 |
| SSH 远程管理 | 已补充文档 | 需要补充真实截图 |
| Nginx 虚拟机部署 | 已补充文档 | 需要补充真实截图 |
| 项目源码包 | 已具备 | 当前仓库可打包提交 |
| 小组分工说明 | 已建页面 | 需要替换真实姓名 |
| 最终 PDF 报告 | 待整理 | 可由现有 Markdown 页面整合导出 |

## 实验内容覆盖

| 序号 | 实验名称 | 页面 | 状态 |
| --- | --- | --- | --- |
| 1 | 网络软件基础 | `docs/notes/network-basics.md` | 已补充 |
| 2 | Web 开发环境 | `docs/notes/web-dev.md` | 已补充 |
| 3 | 代码编辑器 | `docs/notes/vscode-markdown.md` | 已补充 |
| 4 | Web 站点构建 | `docs/notes/site-build.md` | 已补充 |
| 5 | 虚拟机安装与使用 | `docs/notes/virtualbox-ubuntu.md` | 已补充 |
| 6 | Linux 环境配置 | `docs/notes/linux-basics.md` | 已补充 |
| 7 | 远程登录管理 | `docs/notes/ssh-remote.md` | 已补充 |
| 8 | 软件部署 | `docs/notes/deploy.md` | 已补充 |
| 补充 | Git 版本管理 | `docs/notes/git-usage.md` | 已补充 |

## 核心任务清单

- [x] 开发环境搭建：Node.js、npm、VS Code、VitePress
- [x] 内容编写：Markdown 页面与实验记录
- [x] 版本管理：Git 与 GitHub
- [x] 自动部署：GitHub Actions + GitHub Pages
- [x] 虚拟机部署文档：VirtualBox、Ubuntu、Nginx
- [x] 远程管理文档：SSH、SCP、rsync
- [x] 小组分工页面
- [ ] 替换小组成员真实姓名
- [ ] 补充实际操作截图
- [ ] 补充朋友虚拟机部署的真实 IP 和访问截图
- [ ] 整合导出最终 PDF 实验报告

## 截图建议

截图统一放到：

```text
docs/public/screenshots/
```

建议补充：

1. 本地 `npm run dev` 成功截图。
2. GitHub Actions 成功截图。
3. GitHub Pages 在线访问截图。
4. VirtualBox 双网卡配置截图。
5. Ubuntu `ip addr` 静态 IP 截图。
6. Windows SSH 登录虚拟机截图。
7. Nginx 服务状态截图。
8. `scp` 或 `rsync` 上传截图。
9. 虚拟机 IP 访问站点截图。

## 提交前检查

```bash
npm ci
npm run build
git status
```
