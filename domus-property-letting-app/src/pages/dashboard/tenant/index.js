import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/nav';
import Footer from '../../../../components/footer';
import Link from 'next/link';

export default function TenantDashboard() {
  const router = useRouter();
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
        <h2 className="mb-3">Welcome{user?.name ? `, ${user.name}` : ''}!</h2>
        <p className="lead">This is your tenant dashboard. You can:</p>

        <ul className="list-group mb-4">
          <li className="list-group-item">
            <Link href="/properties" className="btn btn-link">🏠 Browse Available Properties</Link>
          </li>
          <li className="list-group-item">
            <Link href="/dashboard/tenant/myApplications" className="btn btn-link">📄 View My Applications</Link>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
