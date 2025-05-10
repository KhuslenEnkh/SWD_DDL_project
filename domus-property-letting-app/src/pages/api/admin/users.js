// pages/api/admin/users.js
import pool from '../../../../lib/db';
import { parse } from 'cookie';

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const user = cookies.user ? JSON.parse(cookies.user) : null;

  if (!user || user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

  if (req.method === 'GET') {
    const [rows] = await pool.execute('SELECT id, name, email, role FROM users');
    return res.status(200).json(rows);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
  
    // Check if user to delete is an admin
    const [rows] = await pool.execute('SELECT role FROM users WHERE id = ?', [id]);
    if (rows[0]?.role === 'admin') {
      return res.status(403).json({ message: "You can't delete an admin." });
    }
  
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    return res.status(200).json({ message: 'User deleted' });
  }
  

  if (req.method === 'PUT') {
    const { id, name, email, role } = req.body;
    await pool.execute(
      'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
      [name, email, role, id]
    );
    return res.status(200).json({ message: 'User updated' });
  }

  res.status(405).end();
}
