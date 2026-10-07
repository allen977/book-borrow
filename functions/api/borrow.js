export async function onRequestPost({ request, env }) {
  try {
    const { name, phone, book } = await request.json();

    if (!name || !phone || !book) {
      return Response.json({ ok: false, error: '信息不完整' });
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const stmt = env.DB.prepare(
      'INSERT INTO borrow_records (borrower_name, borrower_phone, book_name, borrow_date, status) VALUES (?, ?, ?, ?, ?)'
    );
    await stmt.bind(name, phone, book, dateStr, 'borrowed').run();

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: e.message });
  }
}
