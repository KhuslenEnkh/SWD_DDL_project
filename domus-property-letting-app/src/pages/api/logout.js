// /pages/api/logout.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  // Expire the 'user' cookie immediately
  const expiredCookie = serialize('user', '', {
    path: '/',
    httpOnly: true,      // optional but good practice (if you used it in login)
    sameSite: 'lax',     // good default for modern security
    maxAge: -1,          // ⛔ expires immediately
  });

  res.setHeader('Set-Cookie', expiredCookie);
  res.status(200).json({ message: 'Logged out' });
}
