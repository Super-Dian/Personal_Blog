# 实验三：代码编辑器

## 一、实验目标

1. 安装Visual Studio Code（VS Code）文本代码编辑器；
2. 安装和配置Markdown相关插件，掌握代码编辑器插件的基本概念；
3. 学习Markdown基础语法，使用VS Code完成Markdown文档的编辑和渲染任务。

## 二、实验环境

- **操作系统**：Windows 11
- **代码编辑器**：Visual Studio Code 1.89.0
- **Markdown插件**：Markdown All in One、Markdown Preview Enhanced
- **其他插件**：Paste Image、markdownlint

## 三、实验过程

### 步骤一：安装Visual Studio Code

1. 访问VS Code官网：https://code.visualstudio.com/
2. 下载Windows版本安装包
3. 运行安装程序，勾选以下选项：
   - ✅ 创建桌面快捷方式
   - ✅ 将"通过Code打开"操作添加到Windows资源管理器文件上下文菜单
   - ✅ 将"通过Code打开"操作添加到Windows资源管理器目录上下文菜单
   - ✅ 将Code注册为受支持的文件类型的编辑器
   - ✅ 添加到PATH（必须勾选）

**安装完成后验证**：
```bash
# 在命令行中执行
code --version
# 输出：1.89.0 (user setup)
```

### 步骤二：熟悉VS Code界面

VS Code的主要界面区域：

| 区域 | 位置 | 功能 |
|------|------|------|
| **活动栏** | 最左侧竖条 | 切换不同视图（资源管理器、搜索、源代码管理等） |
| **侧边栏** | 活动栏右侧 | 显示当前活动视图的具体内容 |
| **编辑器区域** | 中央 | 编辑文件的主要区域 |
| **面板** | 底部 | 显示终端、输出、问题等 |
| **状态栏** | 最底部 | 显示当前文件信息、Git分支等 |

### 步骤三：安装Markdown相关插件

**打开扩展面板**：
- 点击左侧活动栏中的扩展图标（四个小方块）
- 或使用快捷键：`Ctrl + Shift + X`

**安装核心插件**：

**插件1：Markdown All in One**
- 搜索并安装 `Markdown All in One`
- 功能：目录生成、快捷键支持、自动完成、列表自动延续等
- 常用快捷键：
  - `Ctrl+Shift+]`：增加标题级别
  - `Ctrl+Shift+[`：减少标题级别
  - `Ctrl+B`：加粗
  - `Ctrl+I`：斜体

**插件2：Markdown Preview Enhanced**
- 搜索并安装 `Markdown Preview Enhanced`
- 功能：数学公式（LaTeX）、流程图（Mermaid）、导出为PDF/HTML等
- 使用方法：右键点击编辑器 → "Markdown Preview Enhanced: Open Preview to the Side"

**插件3：Paste Image**
- 搜索并安装 `Paste Image`
- 功能：直接粘贴剪贴板中的图片到Markdown文件
- 使用方法：`Ctrl+Alt+V` 粘贴图片

**插件4：markdownlint**
- 搜索并安装 `markdownlint`
- 功能：检查Markdown语法错误和格式规范

### 步骤四：配置编辑器优化写作体验

```json
// settings.json
{
  // 开启自动保存
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,

  // 开启单词折行
  "editor.wordWrap": "on",

  // 配置图片粘贴路径
  "pasteImage.pathType": "relative",
  "pasteImage.basePath": "${currentFileDir}",

  // Markdown预览配置
  "markdown-preview-enhanced.usePuppeteer": false,
  "markdown-preview-enhanced.markdownItOptions": {
    "html": true
  }
}
```

### 步骤五：学习Markdown基础语法

**创建测试文件**：
```bash
# 在VS Code中新建文件
Ctrl + N

# 保存为
test.md
```

**Markdown语法示例**：

```markdown
# 一级标题

## 二级标题

### 三级标题

这是一个普通段落，包含**加粗**和*斜体*文本。

## 列表

### 无序列表
- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2

### 有序列表
1. 第一步
2. 第二步
3. 第三步

## 链接和图片

[链接文本](https://example.com)

![图片描述](./images/example.png)

## 代码

### 行内代码
使用 `console.log()` 输出日志。

### 代码块
```javascript
function hello() {
    console.log("Hello, Markdown!");
}
```

## 表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| A1  | B1  | C1  |
| A2  | B2  | C2  |

## 引用

> 这是一段引用文本。
> 可以包含多行。

## 分割线

---

## 任务列表

- [x] 已完成任务
- [ ] 未完成任务
```

### 步骤六：使用VS Code预览Markdown

**方法1：侧边预览**
- 快捷键：`Ctrl+K V`
- 或右键点击编辑器 → "Markdown Preview Enhanced: Open Preview to the Side"

**方法2：在浏览器中预览**
- 安装Live Server插件
- 右键点击Markdown文件 → "Open with Live Server"

**预览效果**：
- 实时同步滚动
- 支持语法高亮
- 支持表格渲染
- 支持任务列表

### 步骤七：导出为PDF

使用Markdown Preview Enhanced插件导出：

1. 打开Markdown预览
2. 右键点击预览区域
3. 选择 "Markdown Preview Enhanced: HTML"
4. 选择保存位置
5. 在浏览器中打开HTML文件
6. 使用浏览器的打印功能导出为PDF

## 四、实验结果

### 插件安装验证

```
已安装的Markdown相关插件：
✅ Markdown All in One (v3.6.2)
✅ Markdown Preview Enhanced (v0.5.14)
✅ Paste Image (v0.5.5)
✅ markdownlint (v0.37.0)
```

### Markdown文档示例

创建了一个完整的Markdown测试文档，包含：
- 标题层级（H1-H3）
- 文本格式（加粗、斜体）
- 列表（有序、无序）
- 链接和图片
- 代码块
- 表格
- 引用
- 任务列表

### 预览效果验证

| 功能 | 状态 | 说明 |
|------|------|------|
| 实时预览 | ✅ | 修改Markdown后预览自动更新 |
| 语法高亮 | ✅ | 代码块正确高亮显示 |
| 表格渲染 | ✅ | 表格正确对齐显示 |
| 任务列表 | ✅ | 复选框可交互 |
| 图片粘贴 | ✅ | 使用Ctrl+Alt+V可粘贴图片 |
| PDF导出 | ✅ | 可导出为HTML和PDF |

## 五、知识总结

### Markdown核心语法

| 语法 | 示例 | 效果 |
|------|------|------|
| 标题 | `# 标题` | **标题** |
| 加粗 | `**文本**` | **文本** |
| 斜体 | `*文本*` | *文本* |
| 链接 | `[文本](URL)` | [文本](URL) |
| 图片 | `![描述](路径)` | 图片 |
| 代码 | `` `代码` `` | `代码` |
| 列表 | `- 项目` | • 项目 |
| 引用 | `> 文本` | > 文本 |

### VS Code常用快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl+Shift+P` | 命令面板 |
| `Ctrl+P` | 快速打开文件 |
| `Ctrl+Shift+X` | 扩展面板 |
| `Ctrl+`` | 切换终端 |
| `Ctrl+K V` | Markdown预览 |
| `Ctrl+B` | 切换侧边栏 |
| `Ctrl+/` | 注释 |

### 插件生态系统

VS Code的插件生态系统非常丰富，通过安装不同的插件，可以为编辑器增加各种功能：

- **语言支持**：Python、JavaScript、TypeScript等
- **代码格式化**：Prettier、ESLint
- **版本控制**：GitLens、Git History
- **主题美化**：One Dark Pro、Dracula
- **工具集成**：Docker、Remote SSH

## 六、出现问题

### 问题1：Markdown预览不显示图片

**现象**：在Markdown中插入的图片在预览中不显示

**原因**：图片路径错误或图片文件不存在

**解决方案**：
```bash
# 检查图片路径是否正确
# 建议使用相对路径
![图片描述](./images/example.png)

# 确保图片文件存在于指定路径
ls -la ./images/
```

### 问题2：代码块语法高亮不正确

**现象**：代码块没有正确高亮显示

**原因**：未指定代码语言或语言名称错误

**解决方案**：
```markdown
# 正确指定语言
```javascript
function hello() {
    console.log("Hello!");
}
```

# 常见语言标识符
- JavaScript: javascript, js
- Python: python, py
- HTML: html
- CSS: css
- Bash: bash, sh
```

## 七、心得体会

### 技术层面

通过本次实验，我掌握了：
1. **VS Code使用**：熟悉了VS Code的界面布局和基本操作
2. **插件管理**：学会了安装、配置和管理VS Code插件
3. **Markdown语法**：掌握了Markdown的基础语法，能够编写结构化的文档
4. **文档编写**：能够使用VS Code高效地编写技术文档

### 思政层面

**开源软件的价值**：VS Code是微软开源的代码编辑器，拥有庞大的插件生态系统。这体现了开源软件的价值——通过社区协作，不断丰富和完善软件功能。

**标准化的重要性**：Markdown作为一种轻量级标记语言，已经成为技术文档的标准格式。掌握Markdown语法，能够提高文档编写的效率和质量。

**实践出真知**：只有通过实际操作，才能真正掌握工具的使用。本次实验让我对VS Code和Markdown有了深入的了解，为后续的开发工作打下了基础。

---

**实验日期**：2026年7月9日
**实验环境**：Windows 11 + VS Code 1.89.0 + Markdown插件
