import React, { useState } from 'react';

// We pass the 'onUserCreated' function as a prop
// to refresh the user list after a new user is added.
function UserForm({ onUserCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null);

    const newUser = { name, email, password };

    try {
      // Assumes your backend is running on http://localhost:3000
      const response = await fetch('http://localhost:3000/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to create user');
      }

      // Clear the form
      setName('');
      setEmail('');
      setPassword('');

      // Notify the parent component to refresh the user list
      if (onUserCreated) {
        onUserCreated();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
      <h3>Create New User</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: '5px' }}>
        <label>Email: </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: '5px' }}>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          required
        />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Create User</button>
    </form>
  );
}

export default UserForm;