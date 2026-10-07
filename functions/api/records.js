export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status'); // 可选：'borrowed' 或 'returned'

    let query = 'SELECT * FROM borrow_records';
    const params = [];
    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    query += ' ORDER BY id DESC';

    const stmt = env.DB.prepare(query);
    const { results } = await stmt.bind(...params).all();

    return Response.json(results || []);
  } catch (e) {
    return Response.json([]);
  }
}
