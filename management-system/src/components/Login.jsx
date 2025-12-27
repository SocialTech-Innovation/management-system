import React, { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/App.css';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" style={loginContainerStyles}>
      <div className="login-card" style={loginCardStyles}>
        <div className="logo" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1>Group<span></span></h1>
          <p style={{ color: 'var(--gray)' }}>Management System Login</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="alert" style={alertStyles}>
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyles}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={inputStyles}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={buttonStyles}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i> Login
              </>
            )}
          </button>
        </form>

        <div style={footerStyles}>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>
            <i className="fas fa-info-circle"></i> For admin access, please contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}

const loginContainerStyles = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
  padding: '20px',
};

const loginCardStyles = {
  backgroundColor: 'white',
  borderRadius: '15px',
  padding: '40px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
};

const alertStyles = {
  backgroundColor: 'rgba(231, 76, 60, 0.1)',
  color: 'var(--accent)',
  padding: '12px',
  borderRadius: '5px',
  marginBottom: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

const inputStyles = {
  width: '100%',
  padding: '12px 15px 12px 40px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  fontSize: '1rem',
};

const buttonStyles = {
  width: '100%',
  padding: '12px',
  fontSize: '1rem',
  marginTop: '20px',
};

const footerStyles = {
  marginTop: '30px',
  paddingTop: '20px',
  borderTop: '1px solid #eee',
  textAlign: 'center',
};

export default Login;