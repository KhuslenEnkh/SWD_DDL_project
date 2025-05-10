import { useState } from 'react';
import Navbar from '../../components/nav';
import Footer from '../../components/footer';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'tenant',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <Navbar />
      <main className="container py-5">
        <h2 className="mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '500px' }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="John Doe"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="example@email.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter a strong password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">Register as</label>
            <select
              name="role"
              className="form-select"
              onChange={handleChange}
              required
            >
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success">Register</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
