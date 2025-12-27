import React, { useState, useEffect } from 'react';
import AddStaffModal from './Modals/AddStaffModal';

function Staff() {
  const [staff, setStaff] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const savedStaff = localStorage.getItem('churchStaff');
    if (savedStaff) {
      setStaff(JSON.parse(savedStaff));
    }
  }, []);

  const handleAddStaff = (newStaff) => {
    const updatedStaff = [...staff, newStaff];
    setStaff(updatedStaff);
    localStorage.setItem('churchStaff', JSON.stringify(updatedStaff));
    setShowAddModal(false);
  };

  const deleteStaff = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      const updatedStaff = staff.filter(staffMember => staffMember.id !== id);
      setStaff(updatedStaff);
      localStorage.setItem('churchStaff', JSON.stringify(updatedStaff));
    }
  };

  const filteredStaff = staff.filter(staffMember => 
    `${staffMember.firstName} ${staffMember.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staffMember.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staffMember.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStaffStats = () => {
    const total = staff.length;
    const pastors = staff.filter(s => s.department === 'Pastoral').length;
    const admin = staff.filter(s => s.department === 'Administration').length;
    const volunteers = staff.filter(s => s.type === 'Volunteer').length;
    
    return { total, pastors, admin, volunteers };
  };

  const stats = getStaffStats();

  return (
    <div className="staff-container">
      <div className="staff-cards">
        <div className="staff-card total">
          <h3>{stats.total}</h3>
          <p>Total Staff</p>
          <small>All Departments</small>
        </div>
        
        <div className="staff-card pastors">
          <h3>{stats.pastors}</h3>
          <p>Leadership Staff</p>
          <small>Ministry Leaders</small>
        </div>
        
        <div className="staff-card administrative">
          <h3>{stats.admin}</h3>
          <p>Administrative</p>
          <small>Office & Support</small>
        </div>
        
        <div className="staff-card volunteers">
          <h3>{stats.volunteers}</h3>
          <p>Volunteers</p>
          <small>Service Teams</small>
        </div>
      </div>
      
      <div className="table-container">
        <div className="table-header">
          <h3> Staff Directory</h3>
          <div>
            <button className="btn btn-success" onClick={() => alert('Export functionality would go here')}>
              <i className="fas fa-file-export"></i> Export
            </button>
            <button className="btn btn-purple" onClick={() => setShowAddModal(true)}>
              <i className="fas fa-user-plus"></i> Add Staff
            </button>
          </div>
        </div>
        
        <div className="form-group" style={{marginBottom: '20px'}}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search staff by name, position, or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map(staffMember => (
              <tr key={staffMember.id}>
                <td>{staffMember.id}</td>
                <td>
                  <div className="staff-info">
                    <div className="staff-name">{staffMember.firstName} {staffMember.lastName}</div>
                    <small className="staff-hire-date">Hired: {staffMember.hireDate}</small>
                  </div>
                </td>
                <td>{staffMember.position}</td>
                <td>{staffMember.department}</td>
                <td>{staffMember.email}</td>
                <td>{staffMember.phone}</td>
                <td><span className={`status ${staffMember.type.toLowerCase().replace('-', '')}`}>{staffMember.type}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-edit" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-delete" 
                      title="Delete"
                      onClick={() => deleteStaff(staffMember.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="staff-grid">
        {staff.slice(0, 8).map(staffMember => (
          <div className="staff-profile-card" key={staffMember.id}>
            <div className="staff-avatar">
              <img src={staffMember.avatar} alt={`${staffMember.firstName} ${staffMember.lastName}`} />
            </div>
            <div className="staff-name">{staffMember.firstName} {staffMember.lastName}</div>
            <div className="staff-position">{staffMember.position}</div>
            <div className="staff-department">{staffMember.department}</div>
            <div className="staff-contact">
              <i className="fas fa-envelope"></i> {staffMember.email}
            </div>
            <div className="staff-contact">
              <i className="fas fa-phone"></i> {staffMember.phone}
            </div>
            <div style={{marginTop: '15px'}}>
              <span className={`status ${staffMember.type.toLowerCase().replace('-', '')}`}>{staffMember.type}</span>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddStaffModal 
          onClose={() => setShowAddModal(false)}
          onSave={handleAddStaff}
          nextId={staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1}
        />
      )}
    </div>
  );
}

export default Staff;