import { useEffect, useState } from 'react';
import Navbar from '../../../../components/nav';
import Footer from '../../../../components/footer';
import Link from 'next/link';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/cookies')
      .then(res => res.ok ? res.json() : null)
      .then(setUser);
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container py-5">
        <h2 className="mb-4">Welcome{user?.name ? `, ${user.name}` : ''} (Admin)</h2>
        <p className="lead">This is your admin dashboard. You can:</p>

        <ul className="list-group mb-4">
          <li className="list-group-item">
            <Link href="/dashboard/admin/allApplications" className="btn btn-link">📄 View All Applications</Link>
          </li>
          <li className="list-group-item">
            <Link href="/dashboard/admin/users" className="btn btn-link">👥 Manage Users</Link>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
