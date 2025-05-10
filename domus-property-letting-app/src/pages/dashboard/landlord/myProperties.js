import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/nav';
import Footer from '../../../../components/footer';

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(setProperties);
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this property?')) {
      await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <Navbar />

      <main className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My Properties</h2>
          <button className="btn btn-primary" onClick={() => router.push('/dashboard/landlord/addProperty')}>
            Add Property
          </button>
        </div>

        {properties.length === 0 ? (
          <p className="text-muted">You haven't listed any properties yet.</p>
        ) : (
          <div className="list-group">
            {properties.map(p => (
              <div key={p.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{p.title}</h5>
                  <p className="mb-1 text-muted">{p.address}</p>
                </div>
                <div className="btn-group">
                  <button className="btn btn-outline-secondary" onClick={() => router.push(`/dashboard/landlord/editProperty/${p.id}`)}>Edit</button>
                  <button className="btn btn-outline-danger" onClick={() => handleDelete(p.id)}>Delete</button>
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
