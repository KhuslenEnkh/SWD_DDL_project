import { useEffect, useState } from 'react';
import Navbar from '../../../../components/nav';
import Footer from '../../../../components/footer';

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch('/api/applications')
      .then(res => res.json())
      .then(setApps);
  }, []);

  return (
    <div>
      <Navbar />

      <main className="container py-5">
        <h2 className="mb-4">My Applications</h2>

        {apps.length === 0 ? (
          <p className="text-muted">You have not applied for any properties yet.</p>
        ) : (
          <ul className="list-group">
            {apps.map(app => (
              <li key={app.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{app.title}</div>
                  Status:{' '}
                  <span className={`badge bg-${app.status === 'approved' ? 'success' : app.status === 'declined' ? 'danger' : 'secondary'}`}>
                    {app.status}
                  </span>
                </div>
                <small className="text-muted">{new Date(app.applied_at).toLocaleDateString()}</small>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
