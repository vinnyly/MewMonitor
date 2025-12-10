import { useState } from 'react';
import './CreateAccount.css';

function CreateAccount({ onNavigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCreateAccount = async () => {
    setError('');

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/temp/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account');
        return;
      }

      // Navigate to sign in page after successful creation
      onNavigate('signin');
    } catch (e) {
      setError('Unable to connect to server');
      console.error(e);
    }
  };

  return (
    <div className="create-account-page">
      <div className="create-account-container">
        <div className="create-account-box">
          <h1 className="create-account-title">Create an account</h1>
          <p className="create-account-subtitle">Set up access for your shelter</p>
          
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-input" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
            <label className="form-label">Phone Number</label>
            <input 
              type="tel" 
              className="form-input" 
              placeholder="xxx-xxx-xxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

          <button className="create-button" onClick={handleCreateAccount}>
            Create Account
          </button>

          <p className="login-link">
            Already registered? <a onClick={() => onNavigate('signin')}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
