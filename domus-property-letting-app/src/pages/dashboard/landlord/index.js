import { useEffect, useState } from 'react';
import Navbar from '../../../../components/nav';
import Footer from '../../../../components/footer';
import Link from 'next/link';

export default function LandlordDashboard() {
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
        <h2 className="mb-4">Welcome{user?.name ? `, ${user.name}` : ''}!</h2>
        <p className="lead">This is your landlord dashboard. You can:</p>

        <ul className="list-group mb-4">
          <li className="list-group-item">
            <Link href="/dashboard/landlord/myProperties" className="btn btn-link">🏠 Manage My Properties</Link>
          </li>
          <li className="list-group-item">
            <Link href="/dashboard/landlord/add" className="btn btn-link">➕ Add New Property</Link>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}
