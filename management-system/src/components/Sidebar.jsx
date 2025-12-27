import React from 'react';
import '../styles/App.css';

function Sidebar({ activeTab, onTabChange, onLogout, isExpanded }) {
  const menuItems = [
    { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
    { id: 'members', icon: 'fas fa-users', label: 'Members' },
    { id: 'staff', icon: 'fas fa-user-tie', label: 'Staff' },
    { id: 'groups', icon: 'fas fa-house', label: 'Groups' },
    { id: 'events', icon: 'fas fa-calendar-alt', label: 'Events' },
    { id: 'finance', icon: 'fas fa-donate', label: 'Finance' },
    { id: 'reports', icon: 'fas fa-chart-bar', label: 'Reports' },
    { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
  ];

  return (
    <nav className={`sidebar ${isExpanded ? 'expanded' : ''}`} id="sidebar">
      <div className="logo">
        <h1>Group<span></span></h1>
        <p>Management System</p>
      </div>
      
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li key={item.id}>
            <a 
              href="#" 
              className={activeTab === item.id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                onTabChange(item.id);
              }}
            >
              <i className={item.icon}></i> <span>{item.label}</span>
            </a>
          </li>
        ))}
        <li>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            onLogout();
          }}>
            <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;