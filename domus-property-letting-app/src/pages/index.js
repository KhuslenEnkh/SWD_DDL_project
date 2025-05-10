import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../../components/nav';
import Footer from '../../components/footer';

export default function Home() {
  const router = useRouter();
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);

  useEffect(() => {
    if (router.query.loggedOut === 'true') {
      setShowLogoutMsg(true);

      // Optionally hide the message after 3 seconds
      const timer = setTimeout(() => setShowLogoutMsg(false), 3000);

      // Clean URL
      const { loggedOut, ...rest } = router.query;
      router.replace({ pathname: '/', query: rest }, undefined, { shallow: true });

      return () => clearTimeout(timer);
    }
  }, [router]);

  return (
    <div>
      <Navbar />

      <main className="container py-5">
        {/* ✅ Logout Alert */}
        {showLogoutMsg && (
          <div className="alert alert-success" role="alert">
            You have been successfully logged out.
          </div>
        )}

        <h1 className="display-4 mb-3">Welcome to Domus Dublin Lettings</h1>
        <p className="lead mb-4">Your trusted partner in finding the perfect rental in Dublin.</p>

        <div className="mb-4">
          <Link href="/properties" className="btn btn-primary me-2">View Properties</Link>
        </div>

        <section className="mt-5">
          <h3>Why Choose Us?</h3>
          <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item">✔ Verified landlords and tenants</li>
            <li className="list-group-item">✔ Easy application process</li>
            <li className="list-group-item">✔ Secure platform with role-based access</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
