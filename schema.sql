-- 借书系统 D1 数据库初始化
-- 在 Cloudflare D1 控制台执行此 SQL

CREATE TABLE IF NOT EXISTS borrow_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  borrower_name TEXT NOT NULL,
  borrower_phone TEXT NOT NULL,
  book_name TEXT NOT NULL,
  borrow_date TEXT NOT NULL,
  return_date TEXT,
  status TEXT NOT NULL DEFAULT 'borrowed' -- 'borrowed' 或 'returned'
);
