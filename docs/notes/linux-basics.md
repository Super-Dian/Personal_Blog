# Linux 基础操作

## 实验目标

使用命令行进行文件导航、软件包安装等操作，了解和实践命令行的基本使用。

## 常用命令

### 文件与目录操作

```bash
# 查看当前目录
pwd

# 列出文件
ls          # 基本列表
ls -la      # 详细列表（包含隐藏文件）

# 切换目录
cd /path/to/directory
cd ~        # 回到家目录
cd ..       # 回到上级目录

# 创建与删除
mkdir mydir         # 创建目录
rmdir mydir         # 删除空目录
rm -rf mydir        # 强制删除目录（慎用！）

# 复制与移动
cp file1 file2      # 复制文件
mv file1 file2      # 重命名/移动文件
```

### 文件内容查看

```bash
# 查看文件内容
cat file.txt        # 显示全部内容
less file.txt       # 分页查看
head -n 10 file.txt # 查看前 10 行
tail -n 10 file.txt # 查看后 10 行

# 搜索内容
grep "keyword" file.txt
grep -r "keyword" /path/to/dir    # 递归搜索
```

### 权限管理

```bash
# 查看权限
ls -la

# 修改权限
chmod 755 file.sh    # rwxr-xr-x
chmod +x file.sh     # 添加执行权限
chmod -R 644 dir/    # 递归修改

# 修改所有者
chown user:group file.txt
```

## 软件包管理

### Ubuntu/Debian（apt）

```bash
# 更新包列表
sudo apt update

# 安装软件
sudo apt install nginx

# 卸载软件
sudo apt remove nginx

# 搜索软件
apt search nginx
```

### CentOS/RHEL（yum/dnf）

```bash
# 安装软件
sudo yum install nginx

# 卸载软件
sudo yum remove nginx
```

## 文本编辑器

### Vim

Vim 是 Linux 系统中最常用的文本编辑器之一。

```bash
# 打开文件
vim file.txt

# 常用操作
i           # 进入插入模式
Esc         # 退出插入模式
:wq         # 保存并退出
:q!         # 不保存退出
/dd         # 搜索 dd
```

## 实验总结

通过本次实验，我掌握了：
1. Linux 命令行的基本操作
2. 文件和目录的管理方法
3. 软件包管理器的使用
4. 文本编辑器的基本操作