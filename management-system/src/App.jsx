import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase/config';
import { signOut } from 'firebase/auth';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage onAdminClick={() => window.location.href = '/login'} />} />
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/admin" />
            ) : (
              <Login onLoginSuccess={handleLogin} />
            )
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <Dashboard user={auth.currentUser} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;