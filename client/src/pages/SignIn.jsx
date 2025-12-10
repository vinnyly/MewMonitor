import { useState } from 'react';
import './SignIn.css';

function SignIn({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError(''); // Clear previous errors

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/signin/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Store the user ID for later use (e.g., fetching user's cats)
      localStorage.setItem('uid', data.uid);
      
      // Navigate to homepage on success
      onNavigate('homepage');
    } catch (e) {
      setError('Unable to connect to server');
      console.error(e);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <div className="signin-box">
          <h1 className="signin-title">Sign in to Mew Monitor</h1>
          <p className="signin-subtitle">For shelters and cat owners tracking health and feeding.</p>
          
          {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button" onClick={handleLogin}>
            Login
          </button>

          <p className="signup-link">
            Need an account? <a onClick={() => onNavigate('signup')}>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
