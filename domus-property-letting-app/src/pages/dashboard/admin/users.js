import { useEffect, useState } from 'react';
import Navbar from '../../../../components/nav';
import Footer from '../../../../components/footer';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  const deleteUser = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const startEdit = (user) => {
    setEditUserId(user.id);
    setForm({ name: user.name, email: user.email, role: user.role });
  };

  const cancelEdit = () => {
    setEditUserId(null);
    setForm({ name: '', email: '', role: '' });
  };

  const saveEdit = async () => {
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editUserId, ...form }),
    });

    if (res.ok) {
      setUsers(users.map(u => u.id === editUserId ? { ...u, ...form } : u));
      cancelEdit();
    } else {
      alert('Failed to update user.');
    }
  };

  return (
    <div>
      <Navbar />

      <main className="container py-5">
        <h2 className="mb-4">All Users</h2>

        {users.length === 0 ? (
          <p className="text-muted">No users found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    {editUserId === user.id ? (
                      <>
                        <td>
                          <input
                            className="form-control"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </td>
                        <td>
                          <input
                            className="form-control"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                        </td>
                        <td>
                          <select
                            className="form-select"
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                          >
                            <option value="tenant">Tenant</option>
                            <option value="landlord">Landlord</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td>
                          <button className="btn btn-success btn-sm me-2" onClick={saveEdit}>Save</button>
                          <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge bg-${user.role === 'admin' ? 'primary' : user.role === 'landlord' ? 'info' : 'secondary'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => startEdit(user)}>Edit</button>

                          {/* Disable delete for admins */}
                          {user.role === 'admin' ? (
                            <span className="text-muted small">Protected</span>
                          ) : (
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteUser(user.id)}
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
