# 虚拟机安装与使用

## 实验目的

使用 VirtualBox 安装 Ubuntu Server，配置 NAT 与 Host-Only 双网卡，并通过克隆方式构建可复用的 Linux 实验环境。

## 实验环境

| 项目 | 内容 |
| --- | --- |
| 宿主机 | Windows 10/11 |
| 虚拟机软件 | Oracle VirtualBox |
| 虚拟机系统 | Ubuntu Server 22.04 LTS |
| 网络方案 | NAT + Host-Only |
| 推荐资源 | 2 GB 内存、20 GB 动态磁盘 |

## 网络规划

| 设备 | 主机名 | Host-Only IP |
| --- | --- | --- |
| 模板机 | `template` | `192.168.56.101` |
| 节点 1 | `node1` | `192.168.56.102` |
| 节点 2 | `node2` | `192.168.56.103` |
| 节点 3 | `node3` | `192.168.56.104` |

NAT 网卡用于访问互联网，Host-Only 网卡用于宿主机与虚拟机、虚拟机与虚拟机之间通信。

## 实验过程

### 创建模板机

1. 新建虚拟机 `ubuntu-template`。
2. 选择 Ubuntu Server 22.04 LTS ISO。
3. 分配内存和磁盘。
4. 配置网卡 1 为 NAT。
5. 配置网卡 2 为 Host-Only Adapter。

### 安装 Ubuntu Server

安装过程中需要注意：

- 选择默认磁盘分区即可。
- 设置普通用户和密码。
- 勾选 Install OpenSSH server，方便后续远程登录。

### 配置静态 IP

查看网卡名称：

```bash
ip addr
```

编辑 Netplan 配置：

```bash
sudo nano /etc/netplan/50-cloud-init.yaml
```

示例配置：

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: yes
    enp0s8:
      dhcp4: no
      addresses:
        - 192.168.56.101/24
```

应用配置：

```bash
sudo netplan apply
```

### 配置主机名与 hosts

```bash
sudo hostnamectl set-hostname template
sudo nano /etc/hosts
```

添加：

```text
192.168.56.101 template
192.168.56.102 node1
192.168.56.103 node2
192.168.56.104 node3
```

### 克隆虚拟机

关闭模板机后，在 VirtualBox 中选择完整克隆，分别生成 `node1`、`node2`、`node3`。克隆后需要修改主机名和静态 IP，避免冲突。

## 实验结果

宿主机可以访问虚拟机，虚拟机可以通过 NAT 上网，多个克隆节点可以通过 Host-Only 网络互相通信。

验证命令：

```bash
ping -c 3 8.8.8.8
ping -c 3 192.168.56.1
ping -c 3 node2
```

## 截图记录

| 截图项 | 说明 |
| --- | --- |
| VirtualBox 双网卡配置 | 展示 NAT 与 Host-Only |
| Ubuntu 安装完成 | 展示登录界面或终端 |
| `ip addr` | 展示静态 IP |
| Windows `ping` 虚拟机 | 展示宿主机可访问 |
| 节点互 ping | 展示多机环境连通 |

## 问题与解决

| 问题 | 原因 | 解决方法 |
| --- | --- | --- |
| 提示 VT-x/AMD-V 未启用 | BIOS 未开启虚拟化 | 进入 BIOS 开启虚拟化 |
| 虚拟机不能上网 | NAT 网卡未启用 | 检查第一块网卡 |
| 宿主机访问不了虚拟机 | Host-Only 网卡或 IP 配置错误 | 检查网卡和网段 |
| 克隆机 IP 冲突 | 未修改静态 IP | 为每台虚拟机设置不同地址 |

## 实验总结

虚拟机让 Linux 实验环境与 Windows 宿主机隔离，既便于反复练习，也便于通过克隆快速构建多节点环境。双网卡方案兼顾上网和内网互通，是后续 SSH 管理与 Nginx 部署的基础。
