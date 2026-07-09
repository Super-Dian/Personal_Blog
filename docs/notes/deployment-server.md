# 实验八：软件部署——服务器部署实践

## 一、实验目标

1. 综合运用前七个实验所学的各类工具；
2. 构建和模拟一个完整的网络环境；
3. 完整体验和实现Web静态站点从**开发**到**部署**的全过程；
4. 掌握自动化部署（CI/CD）的基本概念与实践方法。

## 二、实验环境

- **操作系统**：Ubuntu 24.04.4 LTS
- **服务器IP**：10.1.107.20
- **Web服务器**：Nginx 1.24.0
- **Node.js版本**：v22.16.0
- **npm版本**：10.9.2
- **VitePress版本**：v1.6.4
- **站点目录**：/var/www/personal-blog

## 三、实验过程

### 步骤一：检查服务器环境

在部署前，首先检查服务器的基本环境信息：

```bash
# 查看系统信息
uname -a
# 输出：Linux VPS-10427 6.8.0-85-generic x86_64 GNU/Linux

# 查看Ubuntu版本
lsb_release -a
# 输出：Ubuntu 24.04.4 LTS

# 查看当前用户
whoami
# 输出：root

# 查看IP地址
hostname -I
# 输出：10.1.107.20

# 检查已安装的Web服务器
which nginx || echo "Nginx未安装"
which apache2 || echo "Apache未安装"
# 输出：Nginx未安装，Apache未安装

# 检查Node.js版本
node -v
# 输出：v22.16.0

# 检查端口占用情况
netstat -tlnp | grep -E ':80|:443|:8080|:5173'
# 输出：无输出，表示80、443、8080、5173端口未被占用
```

**环境检查结果**：
- 系统：Ubuntu 24.04.4 LTS
- 用户：root（具有管理员权限）
- Node.js：v22.16.0（已安装）
- Web服务器：未安装（需要安装Nginx）
- 端口：80端口可用

### 步骤二：安装Nginx Web服务器

```bash
# 更新包列表
sudo apt update
# 输出：Hit:1 https://mirrors.tuna.tsinghua.edu.cn/ubuntu noble InRelease
#        Reading package lists... Done

# 安装Nginx
sudo apt install -y nginx
# 输出：Reading package lists... Done
#        Building dependency tree... Done
#        The following NEW packages will be installed:
#          nginx nginx-common
#        0 upgraded, 2 newly installed, 0 to remove.
#        Need to get 568 kB of archives.
#        After this operation, 1599 kB of additional disk space will be used.

# 验证安装
nginx -v
# 输出：nginx version: nginx/1.24.0 (Ubuntu)
```

**安装过程说明**：
1. 使用`apt update`更新包列表，确保获取最新的软件包信息
2. 使用`apt install -y nginx`安装Nginx，`-y`参数自动确认安装
3. 安装完成后，Nginx服务会自动启动并设置为开机自启

### 步骤三：启动并配置Nginx服务

```bash
# 检查Nginx服务状态
sudo systemctl status nginx --no-pager
# 输出：● nginx.service - A high performance web server and a reverse proxy server
#        Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; preset: enabled)
#        Active: active (running) since Thu 2026-07-09 03:07:05 UTC; 10s ago

# 启动Nginx（如果未自动启动）
sudo systemctl start nginx

# 设置开机自启
sudo systemctl enable nginx
# 输出：Synchronizing state of nginx.service with SysV service script.
#        Executing: /usr/lib/systemd/systemd-sysv-install enable nginx

# 验证Nginx运行状态
sudo systemctl status nginx --no-pager | head -10
```

**服务配置说明**：
- Nginx安装后会自动启动并设置为开机自启
- 使用`systemctl`命令管理服务状态
- `active (running)`表示服务正在运行

### 步骤四：构建VitePress项目

```bash
# 进入项目目录
cd /root/Web/Personal_Blog

# 查看当前目录
pwd
# 输出：/root/Web/Personal_Blog

# 安装依赖
npm install
# 输出：added 127 packages in 12s

# 构建生产版本
npm run build
# 输出：vitepress v1.6.4
#        - building client + server bundles...
#        ✓ building client + server bundles...
#        - rendering pages...
#        ✓ rendering pages...
#        build complete in 13.55s.

# 查看构建输出目录
ls -la docs/.vitepress/dist/
# 输出：total 56
#        drwxr-xr-x 6 root root  4096 Jul  9 03:07 .
#        drwxr-xr-x 4 root root  4096 Jul  9 03:07 ..
#        -rw-r--r-- 1 root root  3089 Jul  9 03:07 404.html
#        drwxr-xr-x 3 root root  4096 Jul  9 03:07 assets
#        drwxr-xr-x 2 root root  4096 Jul  9 03:07 guide
#        -rw-r--r-- 1 root root   149 Jul  9 03:07 hashmap.json
#        drwxr-xr-x 2 root root  4096 Jul  9 03:07 icons
#        -rw-r--r-- 1 root root 12714 Jul  9 03:07 index.html
#        -rw-r--r-- 1 root root   641 Jul  9 03:07 logo.svg
#        drwxr-xr-x 2 root root  4096 Jul  9 03:07 notes
#        -rw-r--r-- 1 root root   900 Jul  9 03:07 vp-icons.css
```

**构建过程说明**：
1. `npm install`安装项目依赖（127个包）
2. `npm run build`执行VitePress构建命令
3. 构建完成后，静态文件生成在`docs/.vitepress/dist/`目录
4. 构建时间：13.55秒

### 步骤五：配置Nginx托管静态文件

```bash
# 创建站点目录
sudo mkdir -p /var/www/personal-blog

# 复制构建文件到站点目录
sudo cp -r /root/Web/Personal_Blog/docs/.vitepress/dist/* /var/www/personal-blog/

# 设置目录权限
sudo chown -R www-data:www-data /var/www/personal-blog
sudo chmod -R 755 /var/www/personal-blog

# 验证文件复制
ls -la /var/www/personal-blog/
# 输出：total 56
#        drwxr-xr-x 6 www-data www-data  4096 Jul  9 03:08 .
#        drwxr-xr-x 4 root     root      4096 Jul  9 03:08 ..
#        -rwxr-xr-x 1 www-data www-data  3089 Jul  9 03:08 404.html
#        drwxr-xr-x 3 www-data www-data  4096 Jul  9 03:07 assets
#        ...
```

**文件部署说明**：
1. 创建`/var/www/personal-blog`作为站点根目录
2. 将VitePress构建生成的静态文件复制到该目录
3. 设置目录所有者为`www-data`（Nginx运行用户）
4. 设置目录权限为755（所有者可读写执行，其他用户可读执行）

### 步骤六：创建Nginx配置文件

```bash
# 创建Nginx配置文件
cat > /tmp/personal-blog.conf << 'EOF'
server {
    listen 80;
    server_name _;
    root /var/www/personal-blog;
    index index.html;

    # 处理VitePress的路由
    location / {
        try_files $uri $uri/ $uri.html /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 禁止访问隐藏文件
    location ~ /\. {
        deny all;
    }
}
EOF

# 复制配置文件到sites-available
sudo cp /tmp/personal-blog.conf /etc/nginx/sites-available/personal-blog

# 创建符号链接到sites-enabled
sudo ln -sf /etc/nginx/sites-available/personal-blog /etc/nginx/sites-enabled/

# 删除默认配置
sudo rm -f /etc/nginx/sites-enabled/default

# 测试Nginx配置
sudo nginx -t
# 输出：nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
#        nginx: configuration file /etc/nginx/nginx.conf test is successful

# 重启Nginx
sudo systemctl restart nginx

# 验证Nginx状态
sudo systemctl status nginx --no-pager | head -10
# 输出：● nginx.service - A high performance web server and a reverse proxy server
#        Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; preset: enabled)
#        Active: active (running) since Thu 2026-07-09 03:08:36 UTC; 30ms ago
```

**Nginx配置说明**：
1. **监听80端口**：HTTP默认端口
2. **server_name _**：匹配所有域名
3. **root /var/www/personal-blog**：设置站点根目录
4. **try_files $uri $uri/ $uri.html /index.html**：处理VitePress的路由，支持SPA模式
5. **静态资源缓存**：为JS、CSS、图片等静态资源设置1年缓存
6. **禁止访问隐藏文件**：保护.htaccess等配置文件

### 步骤七：测试部署结果

```bash
# 测试本地访问
curl -I http://localhost
# 输出：HTTP/1.1 200 OK
#        Server: nginx/1.24.0 (Ubuntu)
#        Date: Thu, 09 Jul 2026 03:08:43 GMT
#        Content-Type: text/html
#        Content-Length: 12714

# 测试首页内容
curl -s http://localhost | head -20
# 输出：<!DOCTYPE html>
#        <html lang="zh-CN" dir="ltr">
#          <head>
#            <meta charset="utf-8">
#            <title>个人博客</title>
#            ...

# 测试静态资源文件
curl -I "http://localhost/assets/style.BJP0-Lrz.css"
# 输出：HTTP/1.1 200 OK
#        Content-Type: text/css
#        Cache-Control: public, immutable
#        Expires: Fri, 09 Jul 2027 03:08:49 GMT

# 测试内部页面
curl -I http://localhost/guide/
# 输出：HTTP/1.1 200 OK
#        Content-Type: text/html
#        Content-Length: 16170

# 测试笔记页面
curl -I http://localhost/notes/web-dev.html
# 输出：HTTP/1.1 200 OK
#        Content-Type: text/html
#        Content-Length: 24567

# 查看Nginx访问日志
sudo tail -5 /var/log/nginx/access.log
# 输出：127.0.0.1 - - [09/Jul/2026:03:08:43 +0000] "HEAD / HTTP/1.1" 200 0 "-" "curl/8.5.0"
#        127.0.0.1 - - [09/Jul/2026:03:08:43 +0000] "GET / HTTP/1.1" 200 12714 "-" "curl/8.5.0"
```

**测试结果**：
| 测试项 | URL | 状态码 | 说明 |
|--------|-----|--------|------|
| 首页访问 | http://localhost | 200 OK | ✅ 成功 |
| 静态资源 | http://localhost/assets/xxx.css | 200 OK | ✅ 成功 |
| Guide页面 | http://localhost/guide/ | 200 OK | ✅ 成功 |
| 笔记页面 | http://localhost/notes/web-dev.html | 200 OK | ✅ 成功 |

## 四、实验结果

### 部署成功验证

1. **本地访问测试**：通过`curl`命令测试本地访问，所有页面返回200状态码
2. **静态资源测试**：CSS、JS、图片等静态资源正常加载，缓存头设置正确
3. **路由测试**：VitePress的SPA路由正常工作，支持页面跳转

### 访问地址

- **本地访问**：http://localhost
- **局域网访问**：http://10.1.107.20
- **公网访问**：需要配置域名和防火墙规则

### 文件结构

```
/var/www/personal-blog/
├── 404.html              # 404错误页面
├── assets/               # 静态资源（CSS、JS、图片）
├── guide/                # 入门指南页面
├── hashmap.json          # 搜索索引
├── icons/                # 图标文件
├── index.html            # 首页
├── logo.svg              # 站点Logo
├── notes/                # 技术笔记页面
└── vp-icons.css          # VitePress图标样式
```

## 五、知识总结

### 核心概念对比

| 概念 | 说明 | 本实验应用 |
|------|------|-----------|
| **静态站点 vs 动态站点** | 静态站点在构建时生成HTML，动态站点在运行时生成 | VitePress生成静态站点 |
| **Web服务器** | 处理HTTP请求并返回响应的软件 | Nginx |
| **反向代理** | 代替客户端向服务器发起请求 | Nginx支持反向代理 |
| **静态资源缓存** | 通过HTTP头控制浏览器缓存静态文件 | 设置1年缓存 |

### Nginx配置要点

| 配置项 | 作用 | 值 |
|--------|------|-----|
| `listen` | 监听端口 | 80 |
| `server_name` | 域名匹配 | _（所有域名） |
| `root` | 站点根目录 | /var/www/personal-blog |
| `try_files` | 路由处理 | $uri $uri/ $uri.html /index.html |
| `expires` | 缓存时间 | 1y（1年） |

### 部署流程总结

```
┌─────────────────────────────────────────────────────────┐
│                     开发阶段                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│  │ VS Code  │───▶│ Markdown │───▶│ VitePress │          │
│  │ (编辑器) │    │ (写文章) │    │ (构建)   │          │
│  └──────────┘    └──────────┘    └────┬─────┘          │
└───────────────────────────────────────┼──────────────────┘
                                        ▼
┌─────────────────────────────────────────────────────────┐
│                     构建阶段                              │
│         npm install → npm run build                     │
│         输出静态文件到 docs/.vitepress/dist/              │
└───────────────────────────────────────┬──────────────────┘
                                        ▼
┌─────────────────────────────────────────────────────────┐
│                     部署阶段                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│  │  Nginx   │───▶│ 静态文件 │───▶│  HTTP    │          │
│  │ (服务器) │    │ (托管)   │    │ (80端口) │          │
│  └──────────┘    └──────────┘    └──────────┘          │
└─────────────────────────────────────────────────────────┘
```

## 六、出现问题

### 问题1：CSS样式无法加载（公网访问）

**现象**：通过公网访问站点时，页面显示正常但没有CSS样式，变成纯文本HTML

**原因**：VitePress配置中的`base: '/Personal_Blog/'`导致所有资源路径都以`/Personal_Blog/`开头，但Nginx服务器上没有对应的目录

**解决方案**：
```bash
# 在站点目录内创建符号链接
cd /var/www/personal-blog
sudo ln -s . Personal_Blog

# 验证链接
ls -la | grep Personal_Blog
# 输出：lrwxrwxrwx 1 root root 1 Jul  9 03:32 Personal_Blog -> .

# 测试CSS访问
curl -I "http://localhost/Personal_Blog/assets/style.BJP0-Lrz.css"
# 输出：HTTP/1.1 200 OK
```

**原理解释**：
- VitePress构建时使用`base: '/Personal_Blog/'`配置，所有资源路径都以`/Personal_Blog/`开头
- 这是为了兼容GitHub Pages部署（GitHub Pages会将项目放在`/项目名/`路径下）
- 在独立服务器部署时，需要创建符号链接来处理这个路径映射

### 问题2：Nginx默认页面未删除

**现象**：访问http://localhost显示Nginx默认欢迎页面

**原因**：Nginx安装后默认启用`/etc/nginx/sites-enabled/default`配置

**解决方案**：
```bash
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
```

## 七、公网访问配置

### 方案一：虚拟机端口转发（NAT模式）

**适用场景**：本地虚拟机环境，通过宿主机访问公网

**VirtualBox配置步骤**：
1. 打开VirtualBox → 设置 → 网络 → NAT
2. 点击"高级" → "端口转发"
3. 添加规则：
   - 名称：HTTP
   - 协议：TCP
   - 主机IP：127.0.0.1（或留空）
   - 主机端口：8080
   - 子系统IP：10.1.107.20（或留空）
   - 子系统端口：80

**访问方式**：
- 本地访问：http://127.0.0.1:8080
- 公网访问：需要配合内网穿透工具

### 方案二：内网穿透（推荐）

**适用场景**：无公网IP，需要临时公网访问

**使用cpolar**：
```bash
# 安装cpolar
curl -L https://www.cpolar.com/static/downloads/install-release-cpolar.sh | bash

# 注册并获取token
cpolar authtoken <your_token>

# 启动隧道
cpolar http 80

# 会生成一个公网地址，如：https://xxxx.cpolar.top
```

**使用frp（自建服务器）**：
```bash
# 客户端配置（frpc.ini）
[web]
type = http
local_port = 80
custom_domains = your-domain.com

# 启动
frpc -c frpc.ini
```

### 方案三：云服务器部署（生产环境）

**适用场景**：长期稳定运行，需要高可用性

**部署步骤**：
```bash
# 1. 购买云服务器（阿里云、腾讯云等）
# 2. 在云服务器上安装Nginx
sudo apt update
sudo apt install -y nginx

# 3. 上传构建文件
scp -r docs/.vitepress/dist/* root@<云服务器IP>:/var/www/personal-blog/

# 4. 配置Nginx
sudo nano /etc/nginx/sites-available/personal-blog

# 5. 启用配置
sudo ln -sf /etc/nginx/sites-available/personal-blog /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
```

### 公网访问验证

```bash
# 测试公网访问
curl -I http://hz-dx-1.dabaiyun.net:40037/
# 输出：HTTP/1.1 200 OK

# 测试CSS访问
curl -I http://hz-dx-1.dabaiyun.net:40037/Personal_Blog/assets/style.BJP0-Lrz.css
# 输出：HTTP/1.1 200 OK

# 测试JS访问
curl -I http://hz-dx-1.dabaiyun.net:40037/Personal_Blog/assets/app.0dRpRI9x.js
# 输出：HTTP/1.1 200 OK
```

## 八、补充：符号链接创建脚本

由于符号链接会在重新部署后丢失，可以创建一个脚本来自动创建：

```bash
#!/bin/bash
# deploy.sh - 自动部署脚本

# 进入项目目录
cd /root/Web/Personal_Blog

# 构建项目
echo "正在构建项目..."
npm run build

# 清理旧的部署文件
echo "正在清理旧的部署文件..."
sudo rm -rf /var/www/personal-blog/*

# 复制新的构建文件
echo "正在复制构建文件..."
sudo cp -r docs/.vitepress/dist/* /var/www/personal-blog/

# 设置权限
echo "正在设置权限..."
sudo chown -R www-data:www-data /var/www/personal-blog

# 创建符号链接（重要！）
echo "正在创建符号链接..."
cd /var/www/personal-blog
sudo ln -s . Personal_Blog

# 验证部署
echo "正在验证部署..."
ls -la | grep Personal_Blog
curl -I "http://localhost/Personal_Blog/assets/style.BJP0-Lrz.css" | head -3

echo "部署完成！"
echo "本地访问：http://localhost"
echo "公网访问：http://hz-dx-1.dabaiyun.net:40037/"
```

使用方法：
```bash
# 给脚本执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

**现象**：访问http://localhost显示Nginx默认欢迎页面

**原因**：Nginx安装后默认启用`/etc/nginx/sites-enabled/default`配置

**解决方案**：
```bash
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl restart nginx
```

### 问题2：静态资源目录返回403

**现象**：访问http://localhost/assets/返回403 Forbidden

**原因**：Nginx默认禁止目录浏览

**解决方案**：这是正常行为，需要访问具体的文件URL，如`http://localhost/assets/xxx.css`

### 问题3：notes目录返回403

**现象**：访问http://localhost/notes/返回403 Forbidden

**原因**：notes目录下没有index.html文件

**解决方案**：这是正常行为，需要访问具体的笔记页面，如`http://localhost/notes/web-dev.html`

## 七、心得体会

通过本次服务器部署实验，我深刻体会到了Web站点从开发到部署的完整流程。以下是我的主要收获：

### 技术层面

1. **Nginx配置实践**：掌握了Nginx的基本安装、配置和管理，理解了Web服务器的工作原理
2. **静态站点部署**：学会了将VitePress构建的静态文件部署到生产环境
3. **路由配置**：理解了SPA（单页应用）的路由配置，通过`try_files`实现前端路由
4. **性能优化**：学会了通过缓存头（Cache-Control）优化静态资源加载性能

### 思政层面

1. **开源软件的力量**：Nginx、VitePress、Node.js等开源工具让我能够零成本搭建个人博客，这体现了开源社区的共享精神
2. **技术责任感**：作为未来的软件工程师，我应当积极参与开源社区，为国产软件生态建设贡献力量
3. **实践的重要性**：理论知识只有通过实践才能真正掌握，本次实验让我对Web开发有了更深入的理解

### 总结

本次实验完成了VitePress博客在Ubuntu服务器上的Nginx部署，验证了从开发到部署的完整流程。通过实践操作，我不仅掌握了Web服务器的配置方法，更重要的是理解了静态站点部署的核心原理，为今后的Web开发工作打下了坚实的基础。

---

**实验日期**：2026年7月9日
**实验环境**：Ubuntu 24.04.4 LTS + Nginx 1.24.0 + VitePress v1.6.4
**访问地址**：http://10.1.107.20
