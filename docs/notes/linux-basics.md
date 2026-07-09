# 实验六：Linux环境配置

## 一、实验目标

1. 使用命令行进行Linux系统的基础操作；
2. 了解和简单管理常用系统配置文件（`/etc/passwd`、`/etc/group`、`/etc/profile`等）；
3. 了解和简单管理用户配置文件（`~/.bashrc`、`~/.profile`等）；
4. 掌握环境变量的查看、设置与管理方法。

## 二、实验环境

- **操作系统**：Ubuntu 24.04.4 LTS
- **Shell**：Bash
- **终端工具**：SSH客户端

## 三、实验过程

### 步骤一：登录与查看系统信息

```bash
# 查看当前用户
whoami
# 输出：root

# 查看内核与架构信息
uname -a
# 输出：Linux VPS-10427 6.8.0-85-generic x86_64 GNU/Linux

# 查看Ubuntu版本
lsb_release -a
# 输出：
# Distributor ID: Ubuntu
# Description:    Ubuntu 24.04.4 LTS
# Release:        24.04
# Codename:       noble

# 查看主机名
hostname
# 输出：VPS-10427

# 查看当前工作目录
pwd
# 输出：/root
```

### 步骤二：文件与目录的基本操作

```bash
# 列出文件（详细信息，易读大小）
ls -lh
# 输出：
# total 56K
# drwxr-x--- 5 root root 4.0K Jul  9 03:07 .
# drwxr-xr-x 6 root root 4.0K Jul  9 02:40 ..
# ...

# 切换到主目录
cd ~

# 创建目录
mkdir test_dir

# 创建空文件
touch test.txt

# 复制文件
cp test.txt test_copy.txt

# 移动文件
mv test.txt /tmp/

# 删除文件
rm -f test.txt

# 删除目录
rm -rf test_dir
```

**⚠️ 警告**：`rm -rf`命令会永久删除文件且不可恢复，请谨慎使用！

### 步骤三：查看系统资源状态

```bash
# 查看内存使用
free -h
# 输出：
#                total        used        free      shared  buff/cache   available
# Mem:           3.8Gi       1.2Gi       1.5Gi        45Mi       1.1Gi       2.3Gi
# Swap:          2.0Gi          0B       2.0Gi

# 查看磁盘使用
df -h
# 输出：
# Filesystem      Size  Used Avail Use% Mounted on
# /dev/sda1        50G   12G   36G  25% /

# 查看进程和资源占用
top
# 按q退出

# 查看当前目录下各子目录的大小
du -sh *
# 输出：
# 12K     Personal_Blog
# 4.0K    test
```

### 步骤四：查看用户与组配置文件

```bash
# 查看用户账户信息
cat /etc/passwd | head -5
# 输出：
# root:x:0:0:root:/root:/bin/bash
# daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
# bin:x:2:2:bin:/bin:/usr/sbin/nologin
# sys:x:3:3:sys:/dev:/usr/sbin/nologin
# sync:x:4:65534:sync:/bin:/bin/sync

# 查看用户组信息
cat /etc/group | head -5
# 输出：
# root:x:0:
# daemon:x:1:
# bin:x:2:
# sys:x:3:
# adm:x:4:

# 查看当前用户ID信息
id
# 输出：uid=0(root) gid=0(root) groups=0(root)
```

**`/etc/passwd`文件格式**：
```
用户名:密码占位符:UID:GID:用户描述:主目录:登录Shell
```

### 步骤五：创建和管理用户

```bash
# 创建新用户
sudo adduser testuser
# 按照提示设置密码和用户信息

# 设置密码
sudo passwd testuser

# 赋予sudo权限
sudo usermod -aG sudo testuser

# 查看用户所属组
groups testuser
# 输出：testuser : testuser sudo

# 切换用户
su - testuser

# 删除用户
sudo deluser -r testuser
```

### 步骤六：文件权限管理

**权限数字对照表**：

| 数字 | 权限 | 含义 |
|------|------|------|
| 7 | rwx | 读+写+执行 |
| 6 | rw- | 读+写 |
| 5 | r-x | 读+执行 |
| 4 | r-- | 只读 |
| 0 | --- | 无权限 |

```bash
# 创建测试文件
touch testfile.txt

# 数字法修改权限
chmod 755 testfile.txt    # rwxr-xr-x

# 符号法：所有者增加执行权限
chmod u+x testfile.txt

# 符号法：去掉组的写权限
chmod g-w testfile.txt

# 修改所有者和组
sudo chown root:root testfile.txt

# 仅修改所属组
sudo chgrp www-data testfile.txt

# 查看权限
ls -la testfile.txt
# 输出：-rwxr-xr-x 1 root www-data 0 Jul  9 03:15 testfile.txt
```

### 步骤七：查看环境变量

```bash
# 查看所有环境变量
env

# 查看PATH变量
echo $PATH
# 输出：/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:...

# 查看主目录
echo $HOME
# 输出：/root

# 查看当前用户名
echo $USER
# 输出：root

# 查看当前Shell
echo $SHELL
# 输出：/bin/bash
```

### 步骤八：临时设置环境变量

```bash
# 临时添加PATH
export PATH=$PATH:/home/dev/mybin

# 临时创建变量
export MY_VAR="Hello World"

# 验证变量
echo $MY_VAR
# 输出：Hello World

# 删除变量
unset MY_VAR
```

### 步骤九：永久设置环境变量（用户级）

**配置文件加载时机**：

| 配置文件 | 加载时机 | 作用范围 |
|----------|----------|----------|
| `~/.bashrc` | 每次打开新终端时执行 | 当前用户 |
| `~/.profile` | 用户登录时执行一次 | 当前用户 |
| `~/.bash_profile` | 用户登录时执行（优先于.profile） | 当前用户 |

**编辑 `~/.bashrc`**：
```bash
# 打开编辑器
nano ~/.bashrc

# 在末尾添加
export PATH=$PATH:/home/dev/mybin
export MY_CUSTOM_VAR="自定义变量"
alias ll='ls -alF'

# 保存后生效
source ~/.bashrc
```

### 步骤十：永久设置环境变量（系统级）

**方法一：`/etc/environment`**（所有用户生效，需要重启）：
```bash
sudo nano /etc/environment
# 添加（不使用export）
PATH="/usr/local/sbin:...:/my/custom/path"
```

**方法二：`/etc/profile`**（所有用户登录时执行）：
```bash
sudo nano /etc/profile
# 在末尾添加
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export PATH=$PATH:$JAVA_HOME/bin

# 生效
source /etc/profile
```

**方法三（推荐）：`/etc/profile.d/`**：
```bash
sudo nano /etc/profile.d/myenv.sh
# 添加
export MY_GLOBAL_VAR="全局变量"

# 生效
source /etc/profile.d/myenv.sh
```

## 四、实验结果

### 系统信息验证

```bash
# 验证系统信息
uname -a
# 输出：Linux VPS-10427 6.8.0-85-generic x86_64 GNU/Linux

lsb_release -a
# 输出：Ubuntu 24.04.4 LTS

# 验证用户信息
whoami
# 输出：root

id
# 输出：uid=0(root) gid=0(root) groups=0(root)
```

### 环境变量验证

```bash
# 查看PATH
echo $PATH
# 输出：/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# 查看HOME
echo $HOME
# 输出：/root

# 查看自定义变量
echo $MY_CUSTOM_VAR
# 输出：自定义变量
```

### 文件权限验证

```bash
# 创建测试文件
touch testfile.txt
chmod 755 testfile.txt

# 验证权限
ls -la testfile.txt
# 输出：-rwxr-xr-x 1 root root 0 Jul  9 03:20 testfile.txt
```

## 五、知识总结

### Linux命令分类

| 类别 | 常用命令 | 功能 |
|------|----------|------|
| **文件操作** | ls, cd, mkdir, rm, cp, mv | 文件和目录管理 |
| **文本查看** | cat, less, head, tail | 查看文件内容 |
| **系统信息** | uname, whoami, id, hostname | 查看系统和用户信息 |
| **资源监控** | free, df, du, top | 监控系统资源 |
| **用户管理** | adduser, usermod, deluser | 用户账户管理 |
| **权限管理** | chmod, chown, chgrp | 文件权限管理 |
| **环境变量** | export, echo, env | 环境变量管理 |

### 配置文件作用域

```
┌─────────────────────────────────────────────────────────┐
│                    配置文件作用域                         │
│                                                         │
│  用户级配置                     系统级配置               │
│  ┌──────────┐                 ┌──────────┐              │
│  │~/.bashrc │                 │/etc/profile│             │
│  │~/.profile│                 │/etc/environment│         │
│  │~/.bash_profile│            │/etc/profile.d/│          │
│  └──────────┘                 └──────────┘              │
│       │                           │                     │
│       ▼                           ▼                     │
│  当前用户生效                   所有用户生效             │
└─────────────────────────────────────────────────────────┘
```

### 权限管理要点

| 权限位 | 含义 | 说明 |
|--------|------|------|
| r (4) | 读 | 查看文件内容、列出目录 |
| w (2) | 写 | 修改文件、创建/删除目录内文件 |
| x (1) | 执行 | 执行文件、进入目录 |

**常见权限组合**：
- `755`：rwxr-xr-x（所有者完全控制，其他人可读可执行）
- `644`：rw-r--r--（所有者可读写，其他人只读）
- `700`：rwx------（仅所有者可访问）

## 六、出现问题

### 问题1：sudo命令不可用

**现象**：执行`sudo`命令提示"sudo: command not found"

**原因**：用户不在sudo组中

**解决方案**：
```bash
# 以root用户登录
su - root

# 将用户添加到sudo组
usermod -aG sudo username

# 或者直接编辑/etc/sudoers文件
visudo
```

### 问题2：环境变量修改后不生效

**现象**：修改`~/.bashrc`后，新终端中变量未生效

**原因**：未执行`source`命令

**解决方案**：
```bash
# 方法1：重新加载配置
source ~/.bashrc

# 方法2：关闭终端重新打开

# 方法3：执行完整路径
. ~/.bashrc
```

### 问题3：rm -rf误删文件

**现象**：不小心删除了重要文件

**原因**：使用`rm -rf`命令时未仔细确认

**解决方案**：
```bash
# 预防措施
# 1. 使用rm前先ls确认
ls -la directory/
rm -rf directory/

# 2. 使用-i选项交互确认
rm -ri directory/

# 3. 使用-trash工具（可选）
# 安装：sudo apt install trash-cli
# 使用：trash-put file.txt
```

## 七、心得体会

### 技术层面

通过本次实验，我掌握了：
1. **Linux基础命令**：学会了文件操作、系统信息查看、资源监控等基本命令
2. **用户管理**：掌握了用户创建、权限设置、组管理等操作
3. **环境变量**：理解了环境变量的概念，学会了临时和永久设置环境变量
4. **配置文件**：了解了系统配置文件和用户配置文件的区别和作用

### 思政层面

**开源操作系统的价值**：Linux作为开源操作系统的代表，被广泛应用于服务器、嵌入式设备等领域。掌握Linux技能，对于从事IT行业非常重要。

**命令行的力量**：虽然图形界面更加直观，但命令行在自动化、远程管理等场景下具有不可替代的优势。作为技术人员，应该熟练掌握命令行操作。

**安全意识**：在使用`rm -rf`等危险命令时，一定要谨慎确认，避免误删重要文件。这体现了操作规范和安全意识的重要性。

---

**实验日期**：2026年7月9日
**实验环境**：Ubuntu 24.04.4 LTS + Bash Shell
