import { useEffect, useState } from 'react';
import Navbar from '../../../../components/nav';
import Footer from '../../../../components/footer';

export default function AdminApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    fetch('/api/admin/applications')
      .then(res => res.json())
      .then(setApps);
  }, []);

  const updateStatus = async (id, status) => {
    await fetch('/api/admin/applications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    setApps(apps.map(app => app.id === id ? { ...app, status } : app));
  };

  return (
    <div>
      <Navbar />

      <main className="container py-5">
        <h2 className="mb-4">All Applications</h2>

        {apps.length === 0 ? (
          <p className="text-muted">No applications found.</p>
        ) : (
          <div className="list-group">
            {apps.map(app => (
              <div key={app.id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{app.property_title}</div>
                  <p className="mb-1">By: {app.tenant_name}</p>
                  <span className={`badge bg-${app.status === 'approved' ? 'success' : app.status === 'declined' ? 'danger' : 'secondary'}`}>
                    {app.status}
                  </span>
                </div>
                <div className="btn-group">
                  <button className="btn btn-outline-success btn-sm" onClick={() => updateStatus(app.id, 'approved')}>
                    Approve
                  </button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => updateStatus(app.id, 'declined')}>
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
