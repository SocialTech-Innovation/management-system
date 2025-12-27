import React, { useState } from 'react';

function AddStaffModal({ onClose, onSave, nextId }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    type: 'Full-time',
    salary: '',
    hireDate: new Date().toISOString().split('T')[0],
    birthDate: '',
    address: '',
    emergencyName: '',
    emergencyPhone: '',
    notes: ''
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
    const newStaff = {
      id: nextId,
      ...formData,
      salary: parseFloat(formData.salary) || 0,
      emergencyContact: `${formData.emergencyName} ${formData.emergencyPhone}`,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
    };
    onSave(newStaff);
  };

  return (
    <div className="modal" style={{display: 'flex'}}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Staff Member</h3>
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
                <label htmlFor="phone">Phone Number *</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  className="form-control" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="position">Position *</label>
                <input 
                  type="text" 
                  id="position"
                  name="position"
                  className="form-control" 
                  required
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g., Leader, Administrator"
                />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department *</label>
                <select 
                  id="department"
                  name="department"
                  className="form-control" 
                  required
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="Pastoral">Leadership</option>
                  <option value="Administration">Administration</option>
                  <option value="Worship">Department 2</option>
                  <option value="Youth">Youth</option>
                  <option value="Children">Children</option>
                  <option value="Outreach">Outreach</option>
                  <option value="Facilities">Facilities</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Employment Type *</label>
                <select 
                  id="type"
                  name="type"
                  className="form-control" 
                  required
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Volunteer">Volunteer</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="salary">Salary/Stipend</label>
                <input 
                  type="number" 
                  id="salary"
                  name="salary"
                  className="form-control" 
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hireDate">Hire Date *</label>
                <input 
                  type="date" 
                  id="hireDate"
                  name="hireDate"
                  className="form-control" 
                  required
                  value={formData.hireDate}
                  onChange={handleChange}
                />
              </div>
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
            
            <div className="form-group">
              <label htmlFor="emergencyName">Emergency Contact</label>
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    id="emergencyName"
                    name="emergencyName"
                    className="form-control" 
                    value={formData.emergencyName}
                    onChange={handleChange}
                    placeholder="Contact Name"
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="tel" 
                    id="emergencyPhone"
                    name="emergencyPhone"
                    className="form-control" 
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    placeholder="Contact Phone"
                  />
                </div>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea 
                id="notes"
                name="notes"
                className="form-control" 
                rows="3" 
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any additional information..."
              ></textarea>
            </div>
            
            <div className="form-group" style={{textAlign: 'right', marginTop: '30px'}}>
              <button type="button" className="btn" style={{marginRight: '10px'}} onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-purple">Add Staff Member</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddStaffModal;