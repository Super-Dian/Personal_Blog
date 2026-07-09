# 软件部署

## 实验目的

综合使用 VitePress、Git、GitHub Actions、SSH、rsync 和 Nginx，完成静态站点从开发、构建到上线访问的完整流程。

## 实验环境

| 项目 | 内容 |
| --- | --- |
| 本地系统 | Windows 10/11 |
| 静态站点 | VitePress |
| 源码仓库 | GitHub |
| 自动部署 | GitHub Actions + GitHub Pages |
| 虚拟机部署 | Ubuntu Server + Nginx |
| 传输方式 | SCP 或 rsync |

## 部署路线一：GitHub Pages

### 配置 base 路径

由于仓库名是 `Personal_Blog`，站点部署到 GitHub Pages 后路径为 `/Personal_Blog/`，因此需要在 `docs/.vitepress/config.mts` 中配置：

```ts
base: '/Personal_Blog/'
```

### 配置 GitHub Actions

项目已经在 `.github/workflows/deploy.yml` 中配置自动部署流程：

1. 检出代码。
2. 安装 Node.js。
3. 执行 `npm ci`。
4. 执行 `npm run build`。
5. 上传 `docs/.vitepress/dist`。
6. 部署到 GitHub Pages。

推送到 `main` 分支后，Actions 会自动构建并发布。

访问地址：

```text
https://super-dian.github.io/Personal_Blog/
```

## 部署路线二：Ubuntu 虚拟机 + Nginx

### 构建本地静态文件

```bash
npm ci
npm run build
```

构建产物目录：

```text
docs/.vitepress/dist/
```

### 虚拟机安装 Nginx

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 创建站点目录

由于项目配置了 `/Personal_Blog/` 子路径，虚拟机上也按同样路径部署：

```bash
sudo mkdir -p /var/www/blog/Personal_Blog
sudo chown -R $USER:$USER /var/www/blog
```

### 配置 Nginx

```bash
sudo nano /etc/nginx/sites-available/blog
```

配置内容：

```nginx
server {
    listen 80;
    server_name _;

    root /var/www/blog;
    index index.html;

    location /Personal_Blog/ {
        try_files $uri $uri/ /Personal_Blog/index.html;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/blog
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### 上传构建产物

使用 SCP：

```powershell
scp -r docs/.vitepress/dist/* 用户名@192.168.56.101:/var/www/blog/Personal_Blog/
```

或使用 rsync：

```bash
rsync -avz --delete docs/.vitepress/dist/ 用户名@192.168.56.101:/var/www/blog/Personal_Blog/
```

访问地址：

```text
http://192.168.56.101/Personal_Blog/
```

## 实验结果

站点可以通过 GitHub Pages 在线访问，也可以通过虚拟机 IP 在局域网内访问。两种部署方式都使用同一份静态构建产物，体现了静态站点可移植、部署简单的特点。

## 截图记录

| 截图项 | 说明 |
| --- | --- |
| GitHub Actions 成功 | 展示自动部署通过 |
| GitHub Pages 页面 | 展示公网访问成功 |
| `npm run build` | 展示构建成功 |
| Nginx 状态 | 展示 Web 服务运行 |
| SCP/rsync 上传 | 展示文件同步成功 |
| 虚拟机 IP 访问 | 展示局域网部署成功 |

## 问题与解决

| 问题 | 原因 | 解决方法 |
| --- | --- | --- |
| GitHub Pages 样式丢失 | `base` 配置不正确 | 设置 `base: '/Personal_Blog/'` |
| Nginx 显示默认页 | 默认站点未禁用 | 删除 `sites-enabled/default` |
| 页面 404 | 部署路径与 base 不一致 | 部署到 `/var/www/blog/Personal_Blog/` |
| rsync 连接失败 | SSH 未启动或 IP 错误 | 检查 SSH 服务和虚拟机 IP |

## 实验总结

部署实验把前面学习的开发环境、版本控制、Linux、SSH 和 Web 服务串联起来。GitHub Pages 适合公开展示，虚拟机 Nginx 部署适合理解真实服务器的目录、权限和服务配置。
