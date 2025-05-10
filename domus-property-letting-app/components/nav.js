import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/cookies')
      .then(res => res.ok ? res.json() : null)
      .then(setUser);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout');
    window.location.href = '/?loggedOut=true'; // full reload and sets flag
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" href="/">
        <Image src="/Logo_white.png" alt="Domus Dublin Logo" width={50} height={50} />
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {/* ✅ New: Always show "Landlord" link */}
          {user?.role === 'landlord' && (
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/landlord">Landlord</Link>
            </li>
          )}

          {user?.role === 'admin' && (
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/admin">Admin</Link>
            </li>
          )}

          {user?.role === 'tenant' && (
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/tenant">Tenant</Link>
            </li>
          )}
     
            <li className="nav-item">
              <Link className="nav-link" href="/properties">Properties</Link>
            </li>
          
          {user?.role === 'landlord' && (
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/landlord/myProperties">My Properties</Link>
            </li>
          )}

          {user?.role === 'tenant' && (
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/tenant/myApplications">My Applications</Link>
            </li>
          )}

          {user?.role === 'admin' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/admin/allApplications">All Applications</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/dashboard/admin/users">Manage Users</Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav ms-auto">
          {user ? (
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" href="/loginform">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/registrationform">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
