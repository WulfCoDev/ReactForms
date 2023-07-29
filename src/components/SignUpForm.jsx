
import React, { useState } from 'react';
import './styles.css';

const SignUpForm = ({setToken}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (username.length < 8) {
      setError('Username must be at least 8 characters long.');
      return;
    }
    try {
      const response = await fetch ('https://fsa-jwt-practice.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify ({username, password}),
      });
      const data = await response.json();
      setToken (data.token);
    } catch (error) {
      setError (error.message);
    }
  
  };

  return (
    <div className='container'>
      <h2>Sign Up</h2>
      {error && <p className='error-message'>Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <label className='form-input'>
          Username:  
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label className='form-input'>
          Password:  
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;