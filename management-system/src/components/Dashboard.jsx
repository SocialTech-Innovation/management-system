import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import Chart from 'chart.js/auto';
import Sidebar from './Sidebar';
import Members from './Members';
import Staff from './Staff';
import Groups from './Groups';
import Events from './Events';
import Finance from './Finance';
import Reports from './Reports';
import Settings from './Settings';
import '../styles/App.css';

function Dashboard({ user }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const navigate = useNavigate();

  // Dashboard specific state
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalStaff: 0,
    upcomingEvents: 0,
    monthlyDonations: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    currentBalance: 0
  });

  const [recentMembers, setRecentMembers] = useState([]);
  const [staffOnDuty, setStaffOnDuty] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const staffDistributionChartRef = useRef(null);
  const staffAttendanceChartRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadDashboardData();
      setTimeout(() => {
        initCharts();
      }, 500);
    }
    
    // Cleanup charts on unmount
    return () => {
      if (staffDistributionChartRef.current) {
        staffDistributionChartRef.current.destroy();
      }
      if (staffAttendanceChartRef.current) {
        staffAttendanceChartRef.current.destroy();
      }
    };
  }, [activeTab]);

  const loadDashboardData = () => {
    try {
      setLoading(true);
      
      // Load data from localStorage
      const members = JSON.parse(localStorage.getItem('churchMembers')) || [];
      const staff = JSON.parse(localStorage.getItem('churchStaff')) || [];
      const events = JSON.parse(localStorage.getItem('churchEvents')) || [];
      const transactions = JSON.parse(localStorage.getItem('churchTransactions')) || [];

      // Calculate statistics
      const totalMembers = members.length;
      const totalStaff = staff.length;
      
      const today = new Date();
      const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
      }).length;
      
      // Calculate monthly donations (current month)
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      
      const monthlyDonations = transactions
        .filter(t => t.type === 'Income' && 
          new Date(t.date).getMonth() === currentMonth && 
          new Date(t.date).getFullYear() === currentYear)
        .reduce((sum, t) => sum + (t.amount || 0), 0);

      // Calculate financial stats for current month
      const monthlyIncome = transactions
        .filter(t => t.type === 'Income' && 
          new Date(t.date).getMonth() === currentMonth && 
          new Date(t.date).getFullYear() === currentYear)
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      
      const monthlyExpenses = transactions
        .filter(t => t.type === 'Expense' && 
          new Date(t.date).getMonth() === currentMonth && 
          new Date(t.date).getFullYear() === currentYear)
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      
      // Calculate total balance
      const totalIncome = transactions
        .filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      
      const totalExpenses = transactions
        .filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + (t.amount || 0), 0);
      
      const currentBalance = totalIncome - totalExpenses;

      // Get recent members (last 5)
      const recentMembersList = [...members]
        .sort((a, b) => new Date(b.joinDate || b.createdAt || Date.now()) - new Date(a.joinDate || a.createdAt || Date.now()))
        .slice(0, 5);

      // Get staff on duty (first 5 for demo)
      const staffOnDutyList = staff.slice(0, 5);

      // Generate recent activities
      const activities = [
        {
          id: 1,
          icon: 'user-plus',
          type: 'success',
          title: 'New Member Added',
          description: 'John Doe joined ',
          time: '2 hours ago'
        },
        {
          id: 2,
          icon: 'donate',
          type: 'primary',
          title: 'Donation Recorded',
          description: 'Monday fund: $5,200',
          time: 'Yesterday'
        },
        {
          id: 3,
          icon: 'calendar-plus',
          type: 'warning',
          title: 'Event Created',
          description: 'Youth program scheduled for Friday',
          time: '2 days ago'
        },
        {
          id: 4,
          icon: 'user-tie',
          type: 'purple',
          title: 'Staff Updated',
          description: 'Sarah Johnson promoted to Director',
          time: '3 days ago'
        }
      ];

      setStats({
        totalMembers,
        totalStaff,
        upcomingEvents,
        monthlyDonations,
        monthlyIncome,
        monthlyExpenses,
        currentBalance
      });

      setRecentMembers(recentMembersList);
      setStaffOnDuty(staffOnDutyList);
      setRecentActivities(activities);
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setLoading(false);
    }
  };

  const initCharts = () => {
    // Clean up existing charts
    if (staffDistributionChartRef.current) {
      staffDistributionChartRef.current.destroy();
    }
    if (staffAttendanceChartRef.current) {
      staffAttendanceChartRef.current.destroy();
    }

    // Staff Distribution Chart
    const distributionCtx = document.getElementById('staffDistributionChart');
    if (distributionCtx) {
      const staff = JSON.parse(localStorage.getItem('churchStaff')) || [];
      
      const departments = ['Department1', 'Administration', 'Department2', 'Youth', 'Children', 'Outreach', 'Facilities'];
      const departmentCounts = departments.map(dept => 
        staff.filter(s => s.department === dept).length
      );
      
      staffDistributionChartRef.current = new Chart(distributionCtx, {
        type: 'doughnut',
        data: {
          labels: departments,
          datasets: [{
            data: departmentCounts,
            backgroundColor: [
              'rgba(52, 152, 219, 0.8)',
              'rgba(46, 204, 113, 0.8)',
              'rgba(155, 89, 182, 0.8)',
              'rgba(241, 196, 15, 0.8)',
              'rgba(230, 126, 34, 0.8)',
              'rgba(231, 76, 60, 0.8)',
              'rgba(149, 165, 166, 0.8)'
            ],
            borderColor: [
              'rgba(52, 152, 219, 1)',
              'rgba(46, 204, 113, 1)',
              'rgba(155, 89, 182, 1)',
              'rgba(241, 196, 15, 1)',
              'rgba(230, 126, 34, 1)',
              'rgba(231, 76, 60, 1)',
              'rgba(149, 165, 166, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Staff by Department',
              font: {
                size: 14
              }
            }
          }
        }
      });
    }

    // Staff Attendance Chart
    const attendanceCtx = document.getElementById('staffAttendanceChart');
    if (attendanceCtx) {
      const staff = JSON.parse(localStorage.getItem('churchStaff')) || [];
      
      // Get first 6 staff members for the chart
      const chartStaff = staff.slice(0, 6);
      const staffNames = chartStaff.map(s => `${s.firstName} ${s.lastName}`);
      
      // Generate random attendance rates for demo
      const attendanceRates = staffNames.map(() => Math.floor(Math.random() * 30) + 70);
      
      staffAttendanceChartRef.current = new Chart(attendanceCtx, {
        type: 'bar',
        data: {
          labels: staffNames,
          datasets: [{
            label: 'Attendance Rate (%)',
            data: attendanceRates,
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Staff Attendance (This Month)',
              font: {
                size: 14
              }
            }
          }
        }
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('demoUser');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAddMember = () => {
    setActiveTab('members');
    // You could add logic here to open the add member modal directly
  };

  const handleAddStaff = () => {
    setActiveTab('staff');
    // You could add logic here to open the add staff modal directly
  };

  const handleRecordOffering = () => {
    setActiveTab('finance');
    // You could add logic here to open the add income modal directly
  };

  const handleScheduleEvent = () => {
    setActiveTab('events');
    // You could add logic here to open the add event modal directly
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('en-US', options);
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const renderDashboardContent = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <i className="fas fa-spinner fa-spin fa-2x"></i>
          <p>Loading dashboard data...</p>
        </div>
      );
    }

    return (
      <div className="dashboard-content">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="welcome-content">
            <h1>Welcome back, {user?.displayName || user?.email?.split('@')[0] || 'Administrator'}!</h1>
            <p>Here's what's happening with your organization today.</p>
          </div>
          <div className="welcome-actions">
            <button className="btn btn-primary" onClick={handleAddMember}>
              <i className="fas fa-user-plus"></i> Add Member
            </button>
            <button className="btn btn-success" onClick={handleRecordOffering}>
              <i className="fas fa-donate"></i> Record Finances
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="dashboard-cards">
          <div className="card">
            <div className="card-icon members">
              <i className="fas fa-users"></i>
            </div>
            <h3>{stats.totalMembers}</h3>
            <p>Total Members</p>
            <div className="card-trend positive">
              <i className="fas fa-arrow-up"></i> 12% from last month
            </div>
          </div>
          
          <div className="card">
            <div className="card-icon staff">
              <i className="fas fa-user-tie"></i>
            </div>
            <h3>{stats.totalStaff}</h3>
            <p> Staff</p>
            <div className="card-trend">
              <i className="fas fa-minus"></i> No change
            </div>
          </div>
          
          <div className="card">
            <div className="card-icon events">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3>{stats.upcomingEvents}</h3>
            <p>Upcoming Events</p>
            <div className="card-trend positive">
              <i className="fas fa-arrow-up"></i> 3 new events
            </div>
          </div>
          
          <div className="card">
            <div className="card-icon finance">
              <i className="fas fa-donate"></i>
            </div>
            <h3>${stats.monthlyDonations.toLocaleString()}</h3>
            <p>Monthly Donations</p>
            <div className="card-trend positive">
              <i className="fas fa-arrow-up"></i> 8% from last month
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleAddMember}>
              <i className="fas fa-user-plus"></i> Add Member
            </button>
            <button className="btn btn-success" onClick={handleRecordOffering}>
              <i className="fas fa-plus-circle"></i> Record Finances
            </button>
            <button className="btn btn-warning" onClick={handleScheduleEvent}>
              <i className="fas fa-calendar-plus"></i> Schedule Event
            </button>
            <button className="btn btn-purple" onClick={handleAddStaff}>
              <i className="fas fa-user-plus"></i> Add Staff
            </button>
            <button className="btn btn-secondary" onClick={loadDashboardData}>
              <i className="fas fa-sync-alt"></i> Refresh Dashboard
            </button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="chart-row">
          <div className="chart-box">
            <h4>Staff Distribution</h4>
            <div className="chart-container">
              <canvas id="staffDistributionChart" height="250"></canvas>
            </div>
          </div>
          
          <div className="chart-box">
            <h4>Staff Attendance</h4>
            <div className="chart-container">
              <canvas id="staffAttendanceChart" height="250"></canvas>
            </div>
          </div>
        </div>

        {/* Recent Members Table */}
        <div className="table-container">
          <div className="table-header">
            <h3>Recent Members</h3>
            <div>
              <button className="btn btn-outline" onClick={() => setActiveTab('members')}>
                <i className="fas fa-list"></i> View All
              </button>
              <button className="btn btn-primary" onClick={handleAddMember}>
                <i className="fas fa-user-plus"></i> Add Member
              </button>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Join Date</th>
                <th>Group</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentMembers.map(member => (
                <tr key={member.id}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {member.firstName?.charAt(0) || 'U'}{member.lastName?.charAt(0) || 'K'}
                      </div>
                      <div className="user-details">
                        <div className="user-name">{member.firstName} {member.lastName}</div>
                        <small className="user-id">ID: #{member.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div><i className="fas fa-envelope"></i> {member.email || 'N/A'}</div>
                      <div><i className="fas fa-phone"></i> {member.phone || 'N/A'}</div>
                    </div>
                  </td>
                  <td>{formatDate(member.joinDate)}</td>
                  <td>{member.group || 'Not Assigned'}</td>
                  <td><span className={`status ${(member.status || 'active').toLowerCase()}`}>{member.status || 'Active'}</span></td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn btn-sm btn-view" title="View">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-edit" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {recentMembers.length === 0 && (
            <div className="empty-state">
              <i className="fas fa-users fa-2x"></i>
              <h4>No Members Yet</h4>
              <p>Add your first member to get started</p>
              <button className="btn btn-primary" onClick={handleAddMember}>
                <i className="fas fa-user-plus"></i> Add First Member
              </button>
            </div>
          )}
        </div>

        {/* Staff On Duty Table */}
        <div className="table-container">
          <div className="table-header">
            <h3>Staff On Duty Today</h3>
            <div>
              <button className="btn btn-outline" onClick={() => setActiveTab('staff')}>
                <i className="fas fa-list"></i> View All
              </button>
              <button className="btn btn-purple" onClick={handleAddStaff}>
                <i className="fas fa-user-plus"></i> Add Staff
              </button>
            </div>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Schedule</th>
                <th>Contact</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {staffOnDuty.map(staffMember => (
                <tr key={staffMember.id}>
                  <td>
                    <div className="user-info">
                      <img 
                        src={staffMember.avatar || `https://ui-avatars.com/api/?name=${staffMember.firstName}+${staffMember.lastName}&background=3498db&color=fff`} 
                        alt={staffMember.firstName} 
                        className="staff-avatar-sm" 
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${staffMember.firstName}+${staffMember.lastName}&background=3498db&color=fff`;
                        }}
                      />
                      <div className="user-details">
                        <div className="user-name">{staffMember.firstName} {staffMember.lastName}</div>
                        <small className="user-type">{staffMember.type || 'Staff'}</small>
                      </div>
                    </div>
                  </td>
                  <td>{staffMember.position || 'N/A'}</td>
                  <td>{staffMember.department || 'N/A'}</td>
                  <td>9:00 AM - 5:00 PM</td>
                  <td>
                    <div className="contact-info">
                      <div><i className="fas fa-phone"></i> {staffMember.phone || 'N/A'}</div>
                      <div><i className="fas fa-envelope"></i> {staffMember.email || 'N/A'}</div>
                    </div>
                  </td>
                  <td>
                    <span className="status active">On Duty</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {staffOnDuty.length === 0 && (
            <div className="empty-state">
              <i className="fas fa-user-tie fa-2x"></i>
              <h4>No Staff Members</h4>
              <p>Add staff members to see them here</p>
              <button className="btn btn-purple" onClick={handleAddStaff}>
                <i className="fas fa-user-plus"></i> Add First Staff
              </button>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="table-container">
          <div className="table-header">
            <h3>Recent Activity</h3>
            <button className="btn btn-outline">
              <i className="fas fa-history"></i> View Full History
            </button>
          </div>
          
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div className="activity-item" key={activity.id}>
                <div className={`activity-icon ${activity.type}`}>
                  <i className={`fas fa-${activity.icon}`}></i>
                </div>
                <div className="activity-content">
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-desc">{activity.description}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const getPageTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'members': return 'Members';
      case 'staff': return 'Staff';
      case 'groups': return 'Groups';
      case 'events': return 'Events';
      case 'finance': return 'Finance';
      case 'reports': return 'Reports';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'dashboard': return renderDashboardContent();
      case 'members': return <Members />;
      case 'staff': return <Staff />;
      case 'groups': return <Groups />;
      case 'events': return <Events />;
      case 'finance': return <Finance />;
      case 'reports': return <Reports />;
      case 'settings': return <Settings />;
      default: return renderDashboardContent();
    }
  };

  return (
    <div className="container">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={handleLogout}
        isExpanded={isSidebarExpanded}
      />
      
      <main className="main-content">
        <header>
          <div className="header-left">
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars"></i>
            </button>
            <h2>{getPageTitle()}</h2>
          </div>
          
          <div className="header-right">
            <div className="user-profile">
              <img 
                src={user?.photoURL || "https://randomuser.me/api/portraits/men/32.jpg"} 
                alt="User" 
                onError={(e) => {
                  e.target.src = "https://ui-avatars.com/api/?name=Admin+User&background=3498db&color=fff";
                }}
              />
              <span>{user?.displayName || user?.email?.split('@')[0] || 'Admin User'}</span>
            </div>
          </div>
        </header>
        
        <div className="content-area">
          {renderActiveTab()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;