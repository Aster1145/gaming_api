import React, { useState, useEffect, useCallback } from 'react';
import UserForm from '/components/UserForm';
import ScoreForm from '/components/ScoreForm';
import './App.css';

// Base URL for your API
const API_URL = 'http://localhost:3000/api';

function App() {
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- Data Fetching Functions ---

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/users/all`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  const fetchScores = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/games/all`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setScores(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // --- Initial Data Load ---

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchScores()]);
      setLoading(false);
    };
    loadData();
  }, [fetchUsers, fetchScores]);

  // --- Render Logic ---

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App" style={{ display: 'flex', padding: '20px' }}>
      
      {/* User Column */}
      <div style={{ flex: 1, paddingRight: '10px' }}>
        <h2>User Management</h2>
        <UserForm onUserCreated={fetchUsers} />
        
        <h3>All Users</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li key={user._id} style={{ border: '1px solid #eee', padding: '8px', marginBottom: '5px' }}>
              <strong>{user.name}</strong> ({user.email})
              <br />
              <small>ID: {user._id}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Scores Column */}
      <div style={{ flex: 1, paddingLeft: '10px', borderLeft: '1px solid #ccc' }}>
        <h2>Score Management</h2>
        <ScoreForm onScoreCreated={fetchScores} />

        <h3>All Scores</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {scores.map((score) => (
            <li key={score._id} style={{ border: '1px solid #eee', padding: '8px', marginBottom: '5px' }}>
              <strong>{score.games_name}: {score.score}</strong> (Level: {score.level})
              <br />
              <small>User ID: {score.user_id}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;