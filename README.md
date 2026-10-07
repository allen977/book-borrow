# 扫码借书系统 - 多人共享版

## 架构
- 前端：`public/index.html`（纯静态页面）
- 后端：Cloudflare Pages Functions（无服务器函数）
- 数据库：Cloudflare D1（SQLite，云端共享）

## 部署步骤（30分钟）

### 1. 注册 Cloudflare 账号
访问 https://dash.cloudflare.com/sign-up 注册（免费）

### 2. 创建 D1 数据库
1. 登录 Cloudflare 控制台
2. 左侧菜单 → **Workers & Pages** → **D1**
3. 点击 **Create database**
4. 名称填：`book-borrow-db`
5. 创建完成后，复制 **database_id**（后面要用）

### 3. 初始化数据库表
在 D1 控制台的 **Console** 标签中执行 `schema.sql` 中的 SQL：

```sql
CREATE TABLE IF NOT EXISTS borrow_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  borrower_name TEXT NOT NULL,
  borrower_phone TEXT NOT NULL,
  book_name TEXT NOT NULL,
  borrow_date TEXT NOT NULL,
  return_date TEXT,
  status TEXT NOT NULL DEFAULT 'borrowed'
);
```

### 4. 上传代码到 GitHub
1. 在 GitHub 新建一个仓库（比如 `book-borrow-system`）
2. 把整个项目文件夹推送到仓库

### 5. 在 Cloudflare Pages 中部署
1. Cloudflare 控制台 → **Workers & Pages** → **Create application** → **Pages**
2. 选择 **Connect to Git** → 连接 GitHub → 选择刚创建的仓库
3. 构建配置：
   - Framework preset：**None**
   - Build command：留空
   - Build output directory：`public`
4. 点击 **Environment variables** → 添加：
   - Variable name: `DB`
   - Value: 选择你的 D1 数据库 `book-borrow-db`
5. 点击 **Save and Deploy**

### 6. 获取访问地址
部署完成后，Cloudflare 会给你一个地址：
```
https://book-borrow-system.pages.dev
```

### 7. 生成二维码
用草料二维码（https://cli.im）把上面的地址生成二维码，打印贴在书架上。

---

## 功能说明
- **借书**：填写姓名、手机号、书名 → 确认借书
- **还书**：看到自己借的书 → 选择 → 确认还书
- **借阅记录**：管理员/任何人都能看到所有人的借还记录

## 数据管理
- 所有数据存在 Cloudflare D1 云端数据库
- 任何人扫码操作都会写入同一份数据
- 在 D1 控制台可以查看、导出所有数据

## 注意事项
- 免费档额度：D1 每天 500 万行读、10 万行写，完全够用
- 数据没有登录验证，适合信任环境（班级/公司内部）
- 如需限制权限，可以后续加密码保护
