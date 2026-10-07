export async function onRequestPost({ request, env }) {
  try {
    const { id } = await request.json();

    if (!id) {
      return Response.json({ ok: false, error: '请选择要还的书' });
    }

    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // 先检查记录是否存在且未归还
    const check = env.DB.prepare('SELECT status FROM borrow_records WHERE id = ?');
    const record = await check.bind(id).first();
    if (!record) {
      return Response.json({ ok: false, error: '记录不存在' });
    }
    if (record.status === 'returned') {
      return Response.json({ ok: false, error: '该书已归还' });
    }

    const stmt = env.DB.prepare('UPDATE borrow_records SET status = ?, return_date = ? WHERE id = ?');
    await stmt.bind('returned', dateStr, id).run();

    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false, error: e.message });
  }
}
