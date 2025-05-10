import { parse } from 'cookie';

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  if (!cookies.user) return res.status(401).json({ message: 'Not logged in' });

  try {
    const user = JSON.parse(cookies.user);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid cookie' });
  }
}
