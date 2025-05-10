import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../../../components/nav';
import Footer from '../../../../components/footer';

export default function AddProperty() {
  const [form, setForm] = useState({ title: '', description: '', address: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/dashboard/landlord');
    } else {
      const data = await res.json();
      alert(data.message || 'Failed to add property.');
    }
  };

  return (
    <div>
      <Navbar />

      <main className="container py-5">
        <h2 className="mb-4">Add New Property</h2>
        <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '600px' }}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Property Title</label>
            <input
              name="title"
              type="text"
              className="form-control"
              placeholder="e.g. Modern 2-Bed Apartment"
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
              placeholder="123 Example Street, Dublin"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              placeholder="Enter a detailed description of the property"
              rows="4"
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Add Property</button>
        </form>
      </main>

      <Footer />
    </div>
  );
}
