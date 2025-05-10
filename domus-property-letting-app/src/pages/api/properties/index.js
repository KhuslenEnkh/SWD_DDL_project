// /pages/api/properties/index.js
import pool from '../../../../lib/db';
import { parse } from 'cookie';

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const user = cookies.user ? JSON.parse(cookies.user) : null;

  if (req.method === 'GET') {
    // ✅ If landlord is logged in AND requesting "My Properties"
    if (user?.role === 'landlord' && req.headers.referer?.includes('/dashboard/landlord')) {
      const [rows] = await pool.execute('SELECT * FROM properties WHERE landlord_id = ?', [user.id]);
      return res.status(200).json(rows);
    }

    // ✅ Otherwise, return ALL properties (public + tenant + admin views)
    const [rows] = await pool.execute('SELECT * FROM properties');
    return res.status(200).json(rows);
  }

  // 🛡 Restrict POST to landlords
  if (!user || user.role !== 'landlord') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (req.method === 'POST') {
    const { title, description, address } = req.body;
    await pool.execute(
      'INSERT INTO properties (title, description, address, landlord_id) VALUES (?, ?, ?, ?)',
      [title, description, address, user.id]
    );
    return res.status(201).json({ message: 'Property added' });
  }

  res.status(405).end();
}
