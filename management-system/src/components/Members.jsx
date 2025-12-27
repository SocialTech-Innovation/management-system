import React, { useState, useEffect } from 'react';
import AddMemberModal from './Modals/AddMemberModal';

function Members() {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const savedMembers = localStorage.getItem('churchMembers');
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    }
  }, []);

  const handleAddMember = (newMember) => {
    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    localStorage.setItem('churchMembers', JSON.stringify(updatedMembers));
    setShowAddModal(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const deleteMember = (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      const updatedMembers = members.filter(member => member.id !== id);
      setMembers(updatedMembers);
      localStorage.setItem('churchMembers', JSON.stringify(updatedMembers));
    }
  };

  const filteredMembers = members.filter(member => 
    `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="members-container">
      <div className="table-container">
        <div className="table-header">
          <h3>All Church Members</h3>
          <div>
            <button className="btn btn-success" onClick={() => alert('Export functionality would go here')}>
              <i className="fas fa-file-export"></i> Export
            </button>
            <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
              <i className="fas fa-user-plus"></i> Add Member
            </button>
          </div>
        </div>
        
        <div className="form-group" style={{marginBottom: '20px'}}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search members by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Birth Date</th>
              <th>Joining Date</th>
              <th>Group</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>
                  <div className="member-info">
                    <div className="member-name">{member.firstName} {member.lastName}</div>
                    <small className="member-join-date">Joined: {formatDate(member.joinDate)}</small>
                  </div>
                </td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>{member.birthDate ? formatDate(member.birthDate) : 'N/A'}</td>
                <td>{member.baptismDate ? formatDate(member.baptismDate) : 'N/A'}</td>
                <td>{member.group || 'Not Assigned'}</td>
                <td><span className={`status ${member.status.toLowerCase()}`}>{member.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-edit" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-delete" 
                      title="Delete"
                      onClick={() => deleteMember(member.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button className="btn btn-sm btn-view" title="View Details">
                      <i className="fas fa-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredMembers.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-users fa-3x"></i>
            <h4>No Members Found</h4>
            <p>Try adjusting your search or add a new member</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddMemberModal 
          onClose={() => setShowAddModal(false)}
          onSave={handleAddMember}
          nextId={members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1}
        />
      )}
    </div>
  );
}

export default Members;