import React, { useState, useEffect } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    churchName: "Grace Community Church",
    churchAddress: "123 Faith Avenue, Springfield, ST 12345",
    pastorName: "Pastor John Smith",
    churchEmail: "info@gracechurch.org",
    churchPhone: "(555) 123-4567",
    churchWebsite: "www.gracechurch.org",
    
    // Staff Settings
    defaultSalaryDate: "15",
    workingHours: "9:00 AM - 5:00 PM",
    staffNotifications: true,
    autoAttendance: true,
    vacationDays: 20,
    
    // System Settings
    emailNotifications: true,
    autoBackup: true,
    darkMode: false,
    backupFrequency: "weekly",
    language: "english",
    timezone: "America/New_York",
    
    // Financial Settings
    currency: "USD",
    fiscalYearStart: "January",
    taxRate: 0.1,
    
    // Member Settings
    autoWelcomeEmail: true,
    memberRenewalReminder: true,
    visitorFollowupDays: 7,
  });

  const [activeSection, setActiveSection] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('churchSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('churchSettings', JSON.stringify(settings));
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      const defaultSettings = {
        churchName: "Grace Community Church",
        churchAddress: "123 Faith Avenue, Springfield, ST 12345",
        pastorName: "Pastor John Smith",
        churchEmail: "info@gracechurch.org",
        churchPhone: "(555) 123-4567",
        churchWebsite: "www.gracechurch.org",
        defaultSalaryDate: "15",
        workingHours: "9:00 AM - 5:00 PM",
        staffNotifications: true,
        autoAttendance: true,
        vacationDays: 20,
        emailNotifications: true,
        autoBackup: true,
        darkMode: false,
        backupFrequency: "weekly",
        language: "english",
        timezone: "America/New_York",
        currency: "USD",
        fiscalYearStart: "January",
        taxRate: 0.1,
        autoWelcomeEmail: true,
        memberRenewalReminder: true,
        visitorFollowupDays: 7,
      };
      setSettings(defaultSettings);
    }
  };

  const sections = [
    { id: 'general', label: 'General', icon: 'fas fa-cog' },
    { id: 'staff', label: 'Staff Management', icon: 'fas fa-user-tie' },
    { id: 'system', label: 'System', icon: 'fas fa-sliders-h' },
    { id: 'finance', label: 'Financial', icon: 'fas fa-coins' },
    { id: 'members', label: 'Members', icon: 'fas fa-users' },
    { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
  ];

  const renderGeneralSettings = () => (
    <div className="settings-section">
      <h3><i className="fas fa-cog"></i> General Settings</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="churchName">Organisation Name</label>
          <input 
            type="text" 
            id="churchName" 
            name="churchName"
            className="form-control" 
            value={settings.churchName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pastorName">Leader's Name</label>
          <input 
            type="text" 
            id="pastorName" 
            name="pastorName"
            className="form-control" 
            value={settings.pastorName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="churchAddress">Address</label>
        <input 
          type="text" 
          id="churchAddress" 
          name="churchAddress"
          className="form-control" 
          value={settings.churchAddress}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="churchEmail">Email</label>
          <input 
            type="email" 
            id="churchEmail" 
            name="churchEmail"
            className="form-control" 
            value={settings.churchEmail}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="churchPhone"> Phone</label>
          <input 
            type="tel" 
            id="churchPhone" 
            name="churchPhone"
            className="form-control" 
            value={settings.churchPhone}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="churchWebsite"> Website</label>
        <input 
          type="url" 
          id="churchWebsite" 
          name="churchWebsite"
          className="form-control" 
          value={settings.churchWebsite}
          onChange={handleInputChange}
          placeholder="https://www.yourchurch.org"
        />
      </div>
    </div>
  );

  const renderStaffSettings = () => (
    <div className="settings-section">
      <h3><i className="fas fa-user-tie"></i> Staff Management</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="defaultSalaryDate">Default Salary Date</label>
          <select 
            id="defaultSalaryDate" 
            name="defaultSalaryDate"
            className="form-control" 
            value={settings.defaultSalaryDate}
            onChange={handleInputChange}
          >
            <option value="1">1st of each month</option>
            <option value="15">15th of each month</option>
            <option value="last">Last day of month</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="workingHours">Default Working Hours</label>
          <input 
            type="text" 
            id="workingHours" 
            name="workingHours"
            className="form-control" 
            value={settings.workingHours}
            onChange={handleInputChange}
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="vacationDays">Annual Vacation Days</label>
          <input 
            type="number" 
            id="vacationDays" 
            name="vacationDays"
            className="form-control" 
            value={settings.vacationDays}
            onChange={handleInputChange}
            min="0"
            max="365"
          />
        </div>
        <div className="form-group">
          <label htmlFor="timezone">System Timezone</label>
          <select 
            id="timezone" 
            name="timezone"
            className="form-control" 
            value={settings.timezone}
            onChange={handleInputChange}
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
      </div>
      
      <div className="toggle-settings">
        <div className="settings-item">
          <label htmlFor="staffNotifications">
            <div>
              <strong>Staff Notifications</strong>
              <small>Send notifications for schedule changes</small>
            </div>
          </label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              id="staffNotifications" 
              name="staffNotifications"
              checked={settings.staffNotifications}
              onChange={handleInputChange}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="settings-item">
          <label htmlFor="autoAttendance">
            <div>
              <strong>Auto Attendance Tracking</strong>
              <small>Automatically track staff attendance</small>
            </div>
          </label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              id="autoAttendance" 
              name="autoAttendance"
              checked={settings.autoAttendance}
              onChange={handleInputChange}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="settings-section">
      <h3><i className="fas fa-sliders-h"></i> System Preferences</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select 
            id="language" 
            name="language"
            className="form-control" 
            value={settings.language}
            onChange={handleInputChange}
          >
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="backupFrequency">Backup Frequency</label>
          <select 
            id="backupFrequency" 
            name="backupFrequency"
            className="form-control" 
            value={settings.backupFrequency}
            onChange={handleInputChange}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>
      
      <div className="toggle-settings">
        <div className="settings-item">
          <label htmlFor="emailNotifications">
            <div>
              <strong>Email Notifications</strong>
              <small>Receive email alerts</small>
            </div>
          </label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              id="emailNotifications" 
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleInputChange}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="settings-item">
          <label htmlFor="autoBackup">
            <div>
              <strong>Automatic Backup</strong>
              <small>Automatically backup system data</small>
            </div>
          </label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              id="autoBackup" 
              name="autoBackup"
              checked={settings.autoBackup}
              onChange={handleInputChange}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="settings-item">
          <label htmlFor="darkMode">
            <div>
              <strong>Dark Mode</strong>
              <small>Use dark theme interface</small>
            </div>
          </label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              id="darkMode" 
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleInputChange}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderFinancialSettings = () => (
    <div className="settings-section">
      <h3><i className="fas fa-coins"></i> Financial Settings</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="currency">Currency</label>
          <select 
            id="currency" 
            name="currency"
            className="form-control" 
            value={settings.currency}
            onChange={handleInputChange}
          >
            <option value="USD">US Dollar ($)</option>
            <option value="EUR">Euro (€)</option>
            <option value="GBP">British Pound (£)</option>
            <option value="CAD">Canadian Dollar (C$)</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="fiscalYearStart">Fiscal Year Start</label>
          <select 
            id="fiscalYearStart" 
            name="fiscalYearStart"
            className="form-control" 
            value={settings.fiscalYearStart}
            onChange={handleInputChange}
          >
            <option value="January">January</option>
            <option value="April">April</option>
            <option value="July">July</option>
            <option value="October">October</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="taxRate">Tax Rate (%)</label>
        <input 
          type="number" 
          id="taxRate" 
          name="taxRate"
          className="form-control" 
          value={settings.taxRate}
          onChange={handleInputChange}
          min="0"
          max="100"
          step="0.01"
        />
      </div>
    </div>
  );

  const renderMemberSettings = () => (
    <div className="settings-section">
      <h3><i className="fas fa-users"></i> Member Settings</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="visitorFollowupDays">Visitor Follow-up Days</label>
          <input 
            type="number" 
            id="visitorFollowupDays" 
            name="visitorFollowupDays"
            className="form-control" 
            value={settings.visitorFollowupDays}
            onChange={handleInputChange}
            min="1"
            max="30"
          />
          <small>Days to follow up with new visitors</small>
        </div>
      </div>
      
      <div className="toggle-settings">
        <div className="settings-item">
          <label htmlFor="autoWelcomeEmail">
            <div>
              <strong>Auto Welcome Email</strong>
              <small>Send welcome email to new members</small>
            </div>
          </label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              id="autoWelcomeEmail" 
              name="autoWelcomeEmail"
              checked={settings.autoWelcomeEmail}
              onChange={handleInputChange}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="settings-item">
          <label htmlFor="memberRenewalReminder">
            <div>
              <strong>Member Renewal Reminder</strong>
              <small>Send reminders before membership expires</small>
            </div>
          </label>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              id="memberRenewalReminder" 
              name="memberRenewalReminder"
              checked={settings.memberRenewalReminder}
              onChange={handleInputChange}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch(activeSection) {
      case 'general': return renderGeneralSettings();
      case 'staff': return renderStaffSettings();
      case 'system': return renderSystemSettings();
      case 'finance': return renderFinancialSettings();
      case 'members': return renderMemberSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-layout">
        <div className="settings-sidebar">
          <h3>Settings</h3>
          <ul className="settings-menu">
            {sections.map(section => (
              <li key={section.id}>
                <button 
                  className={`settings-menu-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <i className={section.icon}></i>
                  <span>{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
          
          <div className="settings-info">
            <div className="info-card">
              <i className="fas fa-info-circle"></i>
              <p>Changes are saved automatically when you switch sections.</p>
            </div>
          </div>
        </div>
        
        <div className="settings-content">
          {renderActiveSection()}
          
          <div className="settings-actions">
            <button 
              className="btn btn-secondary" 
              onClick={handleReset}
              disabled={isSaving}
            >
              <i className="fas fa-undo"></i> Reset to Default
            </button>
            <button 
              className="btn btn-primary" 
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;