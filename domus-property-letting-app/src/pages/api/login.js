import pool from "../../../lib/db";
import bcrypt from "bcryptjs";
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];

  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  // Set cookie with role and id
  res.setHeader('Set-Cookie', serialize('user', JSON.stringify({ id: user.id, role: user.role }), {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24
  }));

  return res.status(200).json({ message: 'Login successful', role: user.role });
}
