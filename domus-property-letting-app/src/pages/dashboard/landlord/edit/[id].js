import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../../../components/nav';
import Footer from '../../../../../components/footer';

export default function EditProperty() {
  const [form, setForm] = useState({ title: '', description: '', address: '' });
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch('/api/properties')
        .then(res => res.json())
        .then(data => {
          const property = data.find(p => p.id == id);
          if (property) setForm(property);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/properties/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/dashboard/landlord');
    } else {
      const data = await res.json();
      alert(data.message || 'Failed to update property.');
    }
  };

  return (
    <div>
      <Navbar />
      <main className="container py-5">
        <h2 className="mb-4">Edit Property</h2>
        <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '600px' }}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Property Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              name="address"
              type="text"
              className="form-control"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="4"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-success">Update Property</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
