# 实验六：Linux环境配置

## 一、实验目标

1. 使用命令行进行Linux系统的基础操作；
2. 了解和管理常用系统配置文件和环境变量；
3. **重点掌握Linux文件权限系统**，理解不同权限设置导致的不同后果。

## 二、实验环境

- **操作系统**：Ubuntu 24.04.4 LTS
- **Shell**：Bash
- **当前用户**：root

## 三、实验过程

### 步骤一：系统信息查看

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
```

### 步骤二：文件权限系统演示（重点）

#### 2.1 创建演示文件

```bash
# 创建演示目录
mkdir -p /tmp/permission_demo
cd /tmp/permission_demo

# 创建测试文件
echo "这是可执行脚本" > script.sh
echo "这是普通文件" > normal.txt
echo "这是敏感数据" > secret.txt

# 查看初始权限
ls -la
# 输出：
# total 12
# -rw-r--r-- 1 root root 18 Jul  9 04:15 normal.txt
# -rw-r--r-- 1 root root 18 Jul  9 04:15 script.sh
# -rw-r--r-- 1 root root 18 Jul  9 04:15 secret.txt
```

#### 2.2 权限数字对照表

| 数字 | 权限 | 含义 |
|------|------|------|
| 7 | rwx | 读+写+执行 |
| 6 | rw- | 读+写 |
| 5 | r-x | 读+执行 |
| 4 | r-- | 只读 |
| 0 | --- | 无权限 |

#### 2.3 演示不同权限的效果

**演示1：设置可执行权限**
```bash
# 给script.sh添加执行权限
chmod +x script.sh

# 查看权限变化
ls -la script.sh
# 输出：-rwxr-xr-x 1 root root 18 Jul  9 04:15 script.sh

# 现在可以执行脚本
./script.sh
# 输出：这是可执行脚本
```

**演示2：设置只读权限**
```bash
# 给normal.txt设置只读权限（所有者可写，其他人只读）
chmod 644 normal.txt

# 查看权限
ls -la normal.txt
# 输出：-rw-r--r-- 1 root root 18 Jul  9 04:15 normal.txt

# 验证：所有者可以写入
echo "追加内容" >> normal.txt
cat normal.txt
# 输出：
# 这是普通文件
# 追加内容

# 验证：其他人只能读取
chmod 644 normal.txt
su - testuser -c "cat /tmp/permission_demo/normal.txt"
# 输出：这是普通文件\n追加内容

# 验证：其他人不能写入
su - testuser -c "echo 'test' >> /tmp/permission_demo/normal.txt"
# 输出：bash: /tmp/permission_demo/normal.txt: Permission denied
```

**演示3：设置无权限**
```bash
# 给secret.txt设置无权限
chmod 000 secret.txt

# 查看权限
ls -la secret.txt
# 输出：---------- 1 root root 18 Jul  9 04:15 secret.txt

# 验证：所有人无法访问
cat secret.txt
# 输出：cat: secret.txt: Permission denied

# 验证：所有者也无法访问
su - root -c "cat /tmp/permission_demo/secret.txt"
# 输出：cat: /tmp/permission_demo/secret.txt: Permission denied

# 恢复权限
chmod 644 secret.txt
```

**演示4：修改所有者和组**
```bash
# 创建测试用户
sudo adduser testuser 2>/dev/null

# 修改文件所有者
chown testuser:testuser normal.txt

# 查看权限变化
ls -la normal.txt
# 输出：-rw-r--r-- 1 testuser testuser 26 Jul  9 04:15 normal.txt

# 验证：原用户（root）仍可访问（因为是root）
cat normal.txt
# 输出：正常显示内容

# 验证：新所有者可以完全控制
su - testuser -c "chmod 777 /tmp/permission_demo/normal.txt"
ls -la normal.txt
# 输出：-rwxrwxrwx 1 testuser testuser 26 Jul  9 04:15 normal.txt
```

#### 2.4 权限设置的最佳实践

```bash
# 脚本文件：所有者可执行，其他人只读
chmod 755 script.sh
# 输出：-rwxr-xr-x

# 配置文件：所有者可读写，其他人只读
chmod 644 config.txt
# 输出：-rw-r--r--

# 敏感文件：仅所有者可访问
chmod 600 secret.txt
# 输出：-rw-------

# 目录：所有者可完全控制，其他人可进入和列表
chmod 755 /tmp/permission_demo
# 输出：drwxr-xr-x
```

### 步骤三：环境变量配置

```bash
# 查看PATH变量
echo $PATH
# 输出：/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:...

# 临时设置环境变量
export MY_VAR="Hello World"
echo $MY_VAR
# 输出：Hello World

# 永久设置（用户级）
echo 'export MY_VAR="Hello World"' >> ~/.bashrc
source ~/.bashrc

# 永久设置（系统级）
echo 'export MY_GLOBAL_VAR="Global Value"' | sudo tee /etc/profile.d/myenv.sh
source /etc/profile.d/myenv.sh
```

### 步骤四：用户管理

```bash
# 创建新用户
sudo adduser testuser

# 赋予sudo权限
sudo usermod -aG sudo testuser

# 查看用户信息
id testuser
# 输出：uid=1001(testuser) gid=1001(testuser) groups=1001(testuser),27(sudo)

# 删除用户
sudo deluser -r testuser
```

## 四、实验结果

### 权限演示结果汇总

| 文件 | 权限 | 所有者(root) | 其他用户 | 说明 |
|------|------|-------------|----------|------|
| script.sh | 755 (rwxr-xr-x) | ✅ 可执行 | ✅ 可执行 | 脚本文件，所有人可执行 |
| normal.txt | 644 (rw-r--r--) | ✅ 可读写 | ✅ 只读 | 普通文件，其他人只读 |
| secret.txt | 600 (rw-------) | ✅ 可读写 | ❌ 不可访问 | 敏感文件，仅所有者可访问 |
| permission_demo/ | 755 (rwxr-xr-x) | ✅ 完全控制 | ✅ 可进入 | 目录，其他人可列表 |

### 权限修改验证

```bash
# 验证所有修改
ls -la /tmp/permission_demo/
# 输出：
# total 12
# drwxr-xr-x 2 root      root      4096 Jul  9 04:15 .
# -rw-r--r-- 1 testuser  testuser    26 Jul  9 04:15 normal.txt
# -rwxr-xr-x 1 root      root        18 Jul  9 04:15 script.sh
# -rw------- 1 root      root        18 Jul  9 04:15 secret.txt
```

### 环境变量验证

```bash
# 验证用户级环境变量
echo $MY_VAR
# 输出：Hello World

# 验证系统级环境变量
echo $MY_GLOBAL_VAR
# 输出：Global Value
```

## 五、知识总结

### 文件权限三要素

```
┌─────────────────────────────────────────────────────────┐
│                    文件权限三要素                         │
│                                                         │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│  │  所有者   │    │   组     │    │  其他人   │          │
│  │ (User)   │    │ (Group)  │    │ (Other)  │          │
│  │ rwx      │    │ rwx      │    │ rwx      │          │
│  │ 4 2 1    │    │ 4 2 1    │    │ 4 2 1    │          │
│  └──────────┘    └──────────┘    └──────────┘          │
│                                                         │
│  例：-rwxr-xr-x = 755                                  │
│      -rw-r--r-- = 644                                  │
│      -rw------- = 600                                  │
└─────────────────────────────────────────────────────────┘
```

### 常用权限设置速查

| 场景 | 权限 | 命令 | 说明 |
|------|------|------|------|
| 脚本文件 | 755 | `chmod 755 script.sh` | 所有人可执行 |
| 配置文件 | 644 | `chmod 644 config.txt` | 所有人可读 |
| 敏感文件 | 600 | `chmod 600 secret.txt` | 仅所有者可访问 |
| 私钥文件 | 600 | `chmod 600 ~/.ssh/id_rsa` | 仅所有者可读写 |
| SSH目录 | 700 | `chmod 700 ~/.ssh` | 仅所有者可进入 |
| Web目录 | 755 | `chmod 755 /var/www` | 所有人可访问 |

### 危险命令警示

```bash
# ❌ 极其危险！删除整个系统
rm -rf /

# ❌ 非常危险！删除当前目录所有内容
rm -rf *

# ⚠️ 危险！删除前不确认
rm -f important_file.txt

# ✅ 安全！交互式删除
rm -i file.txt

# ✅ 安全！查看后再删除
ls -la directory/
rm -rf directory/
```

## 六、出现问题

### 问题1：chmod权限设置无效

**现象**：执行chmod后权限未改变

**原因**：文件系统不支持权限（如FAT32）或文件被锁定

**解决方案**：
```bash
# 检查文件系统类型
df -T /path/to/file

# 如果是FAT32，需要重新格式化为ext4
# 或者使用ACL（访问控制列表）
sudo setfacl -m u:testuser:rwx file.txt
```

### 误删文件恢复

**现象**：不小心删除了重要文件

**解决方案**：
```bash
# 使用extundelete恢复（仅ext3/ext4）
sudo apt install extundelete
sudo extundelete /dev/sda1 --restore-file /path/to/file

# 预防措施
# 1. 使用trash-cli代替rm
sudo apt install trash-cli
trash-put file.txt

# 2. 使用-i选项交互确认
rm -i file.txt

# 3. 重要文件先备份
cp important_file.txt important_file.txt.bak
```

## 七、心得体会

### 技术层面

通过本次实验，我深入理解了：
1. **文件权限系统**：掌握了rwx权限的含义和设置方法
2. **权限的实际影响**：通过演示看到了不同权限设置导致的不同后果
3. **安全意识**：理解了为什么敏感文件需要设置严格的权限
4. **最佳实践**：学会了常见场景下的权限设置规范

### 实践价值

**权限管理的重要性**：文件权限是Linux安全的基础。错误的权限设置可能导致：
- 敏感数据泄露
- 系统被恶意修改
- 服务无法正常运行

**安全开发习惯**：
- 敏感文件（如私钥、密码）设置600权限
- 脚本文件设置755权限
- 配置文件设置644权限
- 定期检查关键文件的权限

### 思政层面

**网络安全意识**：在当今数字化时代，数据安全至关重要。掌握文件权限管理，是保护信息安全的基本技能。作为未来的IT从业者，应当树立正确的安全观念，为构建安全的网络环境贡献力量。

---

**实验日期**：2026年7月9日
**实验环境**：Ubuntu 24.04.4 LTS + Bash Shell
