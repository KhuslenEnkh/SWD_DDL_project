import pool from '../../../../lib/db';
import { parse } from 'cookie';

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const user = cookies.user ? JSON.parse(cookies.user) : null;

  if (!user || user.role !== 'tenant') return res.status(403).json({ message: 'Forbidden' });

  if (req.method === 'GET') {
    const [rows] = await pool.execute(`
      SELECT a.id, p.title, a.status, a.applied_at
      FROM applications a
      JOIN properties p ON a.property_id = p.id
      WHERE a.tenant_id = ?`, [user.id]);
    return res.status(200).json(rows);
  }

  if (req.method === 'POST') {
    const { property_id, phone, note } = req.body;
    await pool.execute(
      'INSERT INTO applications (tenant_id, property_id, phone, note) VALUES (?, ?, ?, ?)',
      [user.id, property_id, phone, note]
    );
    return res.status(201).json({ message: 'Application submitted' });
  }

  res.status(405).end();
}
