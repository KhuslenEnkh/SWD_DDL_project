import pool from '../../../../lib/db';
import { parse } from 'cookie';

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const user = cookies.user ? JSON.parse(cookies.user) : null;

  if (!user || user.role !== 'landlord') return res.status(403).json({ message: 'Forbidden' });

  const { id } = req.query;

  if (req.method === 'PUT') {
    const { title, description, address } = req.body;
    await pool.execute(
      'UPDATE properties SET title = ?, description = ?, address = ? WHERE id = ? AND landlord_id = ?',
      [title, description, address, id, user.id]
    );
    return res.status(200).json({ message: 'Property updated' });
  }

  if (req.method === 'DELETE') {
    await pool.execute('DELETE FROM properties WHERE id = ? AND landlord_id = ?', [id, user.id]);
    return res.status(200).json({ message: 'Property deleted' });
  }

  res.status(405).end();
}
