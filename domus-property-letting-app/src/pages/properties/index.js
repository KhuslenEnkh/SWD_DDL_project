import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../components/nav';
import Footer from '../../../components/footer';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(setProperties);
  }, []);

  return (
    <div>
      <Navbar />

      <main className="container py-5">
        <h2 className="mb-4">Available Properties</h2>

        {properties.length === 0 ? (
          <p className="text-muted">No properties available right now.</p>
        ) : (
          <div className="row">
            {properties.map(p => (
              <div className="col-md-6 col-lg-4 mb-4" key={p.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{p.title}</h5>
                    <p className="card-text">{p.address}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => router.push(`/properties/apply/${p.id}`)}
                    >
                      Apply
                    </button>
                  </div>
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
