import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../../../components/nav';
import Footer from '../../../../components/footer';

export default function ApplyProperty() {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);
  const [form, setForm] = useState({ phone: '', note: '' });

  useEffect(() => {
    if (id) {
      fetch('/api/properties')
        .then(res => res.json())
        .then(data => {
          const p = data.find(p => p.id == id);
          setProperty(p);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        property_id: id,
        phone: form.phone,
        note: form.note
      }),
    });

    if (res.ok) {
      alert('Application submitted!');
      router.push('/dashboard/tenant/myApplications');
    } else {
      alert('Submission failed.');
    }
  };

  if (!property) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div>
      <Navbar />
      <main className="container py-5">
        <div className="card mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h3 className="card-title">Apply for: {property.title}</h3>
            <p className="text-muted">{property.address}</p>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="note" className="form-label">Note or Message</label>
                <textarea
                  name="note"
                  className="form-control"
                  rows="3"
                  placeholder="Tell the landlord something..."
                  value={form.note}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-success">Submit Application</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
