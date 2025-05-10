import pool from '../../../../lib/db';
import { parse } from 'cookie';

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const user = cookies.user ? JSON.parse(cookies.user) : null;
  if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  if (req.method === 'GET') {
    const [rows] = await pool.execute(`
      SELECT a.id, u.name AS tenant_name, p.title AS property_title, a.status, a.applied_at
      FROM applications a
      JOIN users u ON a.tenant_id = u.id
      JOIN properties p ON a.property_id = p.id
    `);
    return res.status(200).json(rows);
  }

  if (req.method === 'PUT') {
    const { id, status } = req.body;
    await pool.execute('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
    return res.status(200).json({ message: 'Application updated' });
  }

  res.status(405).end();
}
