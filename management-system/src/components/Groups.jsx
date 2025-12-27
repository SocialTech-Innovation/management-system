import React, { useState } from 'react';

function Groups() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Youth Group",
      type: "Youth ",
      leader: "Michael Chen",
      members: 45,
      schedule: "Friday, 7:00 PM",
      status: "Active",
      description: "A group for youth aged 13-18 to grow "
    },
    {
      id: 2,
      name: "Women's Group",
      type: "Women ",
      leader: "Sarah Johnson",
      members: 32,
      schedule: "Tuesday, 6:30 PM",
      status: "Active",
      description: "Women gathering for  study, and mutual support"
    },
    {
      id: 3,
      name: "Men's Group",
      type: "Men ",
      leader: "Robert Davis",
      members: 28,
      schedule: "Saturday, 8:00 AM",
      status: "Active",
      description: "Men coming together  accountability"
    },
    {
      id: 4,
      name: "School",
      type: "Education",
      leader: "Jennifer Brown",
      members: 60,
      schedule: "Sunday, 9:00 AM",
      status: "Active",
      description: "Education for all age groups"
    },
    {
      id: 5,
      name: "Choir",
      type: "Worship",
      leader: "Sarah Johnson",
      members: 25,
      schedule: "Thursday, 7:00 PM",
      status: "Active",
      description: "Music and song"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddGroup = (e) => {
    e.preventDefault();
    const form = e.target;
    const newGroup = {
      id: groups.length + 1,
      name: form.groupName.value,
      type: form.groupType.value,
      leader: form.groupLeader.value,
      members: parseInt(form.groupMembers.value) || 0,
      schedule: form.groupSchedule.value,
      status: form.groupStatus.value,
      description: form.groupDescription.value
    };
    
    setGroups([...groups, newGroup]);
    setShowAddModal(false);
    form.reset();
  };

  return (
    <div className="groups-container">
      <div className="dashboard-cards">
        <div className="card">
          <h3>Youth Group</h3>
          <p><i className="fas fa-user-friends"></i> 45 Members</p>
          <p><i className="fas fa-user"></i> Leader: Michael Chen</p>
          <p><i className="fas fa-calendar"></i> Meets every Friday</p>
        </div>
        
        <div className="card">
          <h3>Women's Group</h3>
          <p><i className="fas fa-user-friends"></i> 32 Members</p>
          <p><i className="fas fa-user"></i> Leader: Sarah Johnson</p>
          <p><i className="fas fa-calendar"></i> Meets every Tuesday</p>
        </div>
        
        <div className="card">
          <h3>Men's Group</h3>
          <p><i className="fas fa-user-friends"></i> 28 Members</p>
          <p><i className="fas fa-user"></i> Leader: Robert Davis</p>
          <p><i className="fas fa-calendar"></i> Meets every Saturday</p>
        </div>
      </div>
      
      <div className="table-container">
        <div className="table-header">
          <h3>All  Groups</h3>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <i className="fas fa-plus"></i> Add Group
          </button>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Type</th>
              <th>Leader</th>
              <th>Members</th>
              <th>Meeting Schedule</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(group => (
              <tr key={group.id}>
                <td>
                  <div className="group-info">
                    <div className="group-name">{group.name}</div>
                    <small className="group-description">{group.description}</small>
                  </div>
                </td>
                <td>{group.type}</td>
                <td>{group.leader}</td>
                <td>
                  <div className="member-count">
                    <span className="count-number">{group.members}</span>
                    <button className="btn btn-sm btn-view-members" title="View Members">
                      <i className="fas fa-list"></i>
                    </button>
                  </div>
                </td>
                <td>{group.schedule}</td>
                <td><span className={`status ${group.status.toLowerCase()}`}>{group.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-edit" title="Edit">
                      <i className="fas fa-edit"></i>
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
      </div>

      {/* Add Group Modal */}
      {showAddModal && (
        <div className="modal" style={{display: 'flex'}}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Group</h3>
              <button className="close-modal" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddGroup}>
                <div className="form-group">
                  <label htmlFor="groupName">Group Name</label>
                  <input type="text" id="groupName" className="form-control" required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="groupType">Group Type</label>
                    <select id="groupType" className="form-control" required>
                      <option value="">Select Type</option>
                      <option value="Youth Ministry">Youth </option>
                      <option value="Women Ministry">Women </option>
                      <option value="Men Ministry">Men </option>
                      <option value="Worship">Association</option>
                      <option value="Education">Education</option>
                      <option value="Outreach">Outreach</option>
                      <option value="Prayer">Discussion</option>
                      <option value="Fellowship">Learning</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="groupLeader">Group Leader</label>
                    <input type="text" id="groupLeader" className="form-control" required />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="groupMembers">Number of Members</label>
                    <input type="number" id="groupMembers" className="form-control" min="0" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="groupStatus">Status</label>
                    <select id="groupStatus" className="form-control" required>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Planning">Planning</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="groupSchedule">Meeting Schedule</label>
                  <input type="text" id="groupSchedule" className="form-control" placeholder="e.g., Every Friday at 7:00 PM" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="groupDescription">Description</label>
                  <textarea id="groupDescription" className="form-control" rows="3" placeholder="Describe the purpose and activities of this group..."></textarea>
                </div>
                
                <div className="form-group" style={{textAlign: 'right', marginTop: '30px'}}>
                  <button type="button" className="btn" style={{marginRight: '10px'}} onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Group</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Groups;