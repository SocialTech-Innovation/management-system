import React, { useState } from 'react';

function AddMemberModal({ onClose, onSave, nextId }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    baptismDate: '',
    address: '',
    group: '',
    status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      id: nextId,
      ...formData,
      joinDate: new Date().toISOString().split('T')[0]
    };
    onSave(newMember);
  };

  return (
    <div className="modal" style={{display: 'flex'}}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Member</h3>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  className="form-control" 
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  className="form-control" 
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  className="form-control" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  className="form-control" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="birthDate">Birth Date</label>
                <input 
                  type="date" 
                  id="birthDate"
                  name="birthDate"
                  className="form-control" 
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="baptismDate">Joining Date </label>
                <input 
                  type="date" 
                  id="baptismDate"
                  name="baptismDate"
                  className="form-control" 
                  value={formData.baptismDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input 
                type="text" 
                id="address"
                name="address"
                className="form-control" 
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="group">Group</label>
                <select 
                  id="group"
                  name="group"
                  className="form-control" 
                  value={formData.group}
                  onChange={handleChange}
                >
                  <option value="">Select a group</option>
                  <option value="Youth Group">Youth Group</option>
                  <option value="Women's Fellowship">Women's Group</option>
                  <option value="Men's Prayer">Men's Group</option>
                  <option value="Sunday School"> School</option>
                  <option value="Choir">Choir</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select 
                  id="status"
                  name="status"
                  className="form-control" 
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Visitor">Visitor</option>
                </select>
              </div>
            </div>
            
            <div className="form-group" style={{textAlign: 'right', marginTop: '30px'}}>
              <button type="button" className="btn" style={{marginRight: '10px'}} onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Member</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;