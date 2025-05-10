import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/nav';
import Footer from '../../components/footer';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', overflow: 'hidden', position: 'relative' }}>
      
  
      {/* Background Image Fullscreen */}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: "url('/House1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100%',
          position: 'relative',
        }}
      >

        {/* Login Box */}
        <div
          className="position-relative z-2 text-center"
          style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '2rem',
            padding: '2rem',
            marginTop: '-100px', // move it up
          }}
        >
          <div className="mb-4">
            {/* Placeholder for logo */}
            <img src="/logo_blue.png" alt="Logo" style={{ height: '100px' }} />
          </div>
  
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control rounded-pill"
                id="email"
                name="email"
                placeholder="name@example.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <label htmlFor="email">Email</label>
            </div>
  
            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control rounded-pill"
                id="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
  
            <button
              type="submit"
              className="btn w-100 rounded-pill py-2 text-white"
              style={{ backgroundColor: '#0013de', border: 'none' }}
            >
              Login
            </button>
          </form>
  
          <div className="d-flex justify-content-between mt-4">
            <a href="/registrationform" className="small text-black text-decoration-none"> Create Account </a>
            <a href="#" className="small text-black text-decoration-none"> Need Help? </a>
          </div>
        </div>
      </div>
  
      <Footer />
    </div>
  );
}  