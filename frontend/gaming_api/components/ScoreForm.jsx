import React, { useState } from 'react';

function ScoreForm({ onScoreCreated }) {
  const [userId, setUserId] = useState('');
  const [score, setScore] = useState(0);
  const [gameName, setGameName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const newScore = {
      user_id: userId,
      score: Number(score),
      games_name: gameName,
    };

    try {
      const response = await fetch('http://localhost:3000/api/games/create-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newScore),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to create score');
      }

      // Clear the form
      setUserId('');
      setScore(0);
      setGameName('');

      // Notify parent to refresh
      if (onScoreCreated) {
        onScoreCreated();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
      <h3>Create New Score</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>User ID: </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: '5px' }}>
        <label>Score: </label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />
      </div>
      <div style={{ marginTop: '5px' }}>
        <label>Game Name: </label>
        <input
          type="text"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
          required
        />
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>Add Score</button>
    </form>
  );
}

export default ScoreForm;