import React from 'react';
import '../styles/App.css';

function Homepage({ onAdminClick }) {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <div className="logo">
          <h1>Organisation<span>Management</span> </h1>
        </div>
        <nav className="homepage-nav">
          <a href="#about">About Us</a>
          <a href="#events">Events</a>
          <a href="#contact">Contact</a>
          <button className="btn btn-primary" onClick={onAdminClick}>
            <i className="fas fa-lock"></i> Admin Login
          </button>
        </nav>
      </header>

      <main className="homepage-main">
        <section className="homepage-hero">
          <h2>Welcome to Organisational management</h2>
          <p>A place for growth and community</p>
        </section>

        <section className="homepage-features">
          <div className="card">
            <div className="card-icon members">
              <i className="fas fa-users"></i>
            </div>
            <h3>Connect With Us</h3>
            <p>Mondays at 10:00 AM</p>
          </div>

          <div className="card">
            <div className="card-icon groups">
              <i className="fas fa-house"></i>
            </div>
            <h3>Join a Group</h3>
            <p>Connect with others in small groups</p>
          </div>

          <div className="card">
            <div className="card-icon events">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3>Upcoming Events</h3>
            <p>Check out our calendar</p>
          </div>
        </section>
      </main>

      <footer className="homepage-footer">
        <p>&copy; 2023 Organisation Management. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;