# 远程登录管理

## 实验目的

安装并配置 OpenSSH 服务，实现 Windows 宿主机与 Ubuntu 虚拟机之间的远程登录，并掌握 SSH 密钥认证、SCP 文件传输和 rsync 增量同步。

## 实验环境

| 项目 | 内容 |
| --- | --- |
| 服务端 | Ubuntu Server 22.04 LTS |
| 客户端 | Windows PowerShell 或 VS Code 终端 |
| 网络 | Host-Only 网络 `192.168.56.0/24` |
| 工具 | OpenSSH、SCP、rsync |

## 实验过程

### 安装并启动 SSH 服务

```bash
sudo apt update
sudo apt install openssh-server -y
sudo systemctl enable ssh
sudo systemctl start ssh
sudo systemctl status ssh
```

### 配置 SSH 服务

编辑配置文件：

```bash
sudo nano /etc/ssh/sshd_config
```

建议配置：

```text
PermitRootLogin no
PubkeyAuthentication yes
PasswordAuthentication yes
```

重启服务：

```bash
sudo systemctl restart ssh
```

### 从 Windows 登录虚拟机

```powershell
ssh 用户名@192.168.56.101
```

首次连接时输入 `yes` 接受主机指纹，然后输入虚拟机用户密码。

### 配置密钥认证

在 Windows 端生成密钥：

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

复制公钥到虚拟机：

```powershell
ssh-copy-id 用户名@192.168.56.101
```

如果 Windows 没有 `ssh-copy-id`，可以手动把 `id_ed25519.pub` 内容追加到虚拟机的 `~/.ssh/authorized_keys`。

### 使用 SCP 传输文件

```powershell
scp ./test.txt 用户名@192.168.56.101:/home/用户名/
scp -r ./project 用户名@192.168.56.101:/home/用户名/
```

### 使用 rsync 同步目录

在虚拟机安装 rsync：

```bash
sudo apt install rsync -y
```

从本地同步到虚拟机：

```bash
rsync -avz --delete ./dist/ 用户名@192.168.56.101:/var/www/blog/Personal_Blog/
```

## 实验结果

Windows 可以通过 SSH 登录 Ubuntu 虚拟机，文件可以通过 SCP 或 rsync 从本地传输到虚拟机。配置密钥后，日常登录和部署可以减少重复输入密码。

## 截图记录

| 截图项 | 说明 |
| --- | --- |
| `systemctl status ssh` | 展示 SSH 服务运行 |
| Windows SSH 登录 | 展示远程登录成功 |
| `.ssh` 目录 | 展示密钥文件 |
| SCP 上传结果 | 展示文件传输成功 |
| rsync 同步结果 | 展示部署目录同步 |

## 问题与解决

| 问题 | 原因 | 解决方法 |
| --- | --- | --- |
| `Connection refused` | SSH 服务未启动 | 启动并检查 `ssh` 服务 |
| `Permission denied` | 密码错误或密钥权限不对 | 检查用户、密码和 `authorized_keys` |
| 无法连接 IP | Host-Only 网络不通 | 检查虚拟机 IP 和宿主机网卡 |
| rsync 命令不存在 | 未安装 rsync | 执行 `sudo apt install rsync -y` |

## 实验总结

SSH 是远程管理 Linux 服务器的基础能力。通过 SSH、SCP 和 rsync，可以完成远程登录、文件传输和自动化部署，为后续将静态网站发布到虚拟机提供通道。
