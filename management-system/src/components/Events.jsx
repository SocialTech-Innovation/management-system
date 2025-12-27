import React, { useState, useEffect } from 'react';

function Events() {
  const [events, setEvents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const savedEvents = localStorage.getItem('churchEvents');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  const handleAddEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const newEvent = {
      id: events.length + 1,
      name: form.eventName.value,
      date: form.eventDate.value,
      time: form.eventTime.value,
      location: form.eventLocation.value,
      type: form.eventType.value,
      description: form.eventDescription.value,
      participants: parseInt(form.eventParticipants.value) || 0,
      status: "Upcoming"
    };
    
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem('churchEvents', JSON.stringify(updatedEvents));
    setShowAddModal(false);
    form.reset();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getEventStatus = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    
    if (event < today) return 'Completed';
    if (event.toDateString() === today.toDateString()) return 'Today';
    return 'Upcoming';
  };

  return (
    <div className="events-container">
      <div className="table-container">
        <div className="table-header">
          <h3>All  Events</h3>
          <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
            <i className="fas fa-plus"></i> Add Event
          </button>
        </div>
        
        <div className="events-summary">
          <div className="summary-card">
            <div className="summary-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <div className="summary-content">
              <h4>{events.filter(e => getEventStatus(e.date) === 'Upcoming').length}</h4>
              <p>Upcoming Events</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">
              <i className="fas fa-calendar-day"></i>
            </div>
            <div className="summary-content">
              <h4>{events.filter(e => getEventStatus(e.date) === 'Today').length}</h4>
              <p>Events Today</p>
            </div>
          </div>
          
          <div className="summary-card">
            <div className="summary-icon">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <div className="summary-content">
              <h4>{events.length}</h4>
              <p>Total Events</p>
            </div>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Type</th>
              <th>Participants</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.sort((a, b) => new Date(a.date) - new Date(b.date)).map(event => (
              <tr key={event.id}>
                <td>
                  <div className="event-info">
                    <div className="event-name">{event.name}</div>
                    <small className="event-description">{event.description}</small>
                  </div>
                </td>
                <td>
                  <div className="event-datetime">
                    <div>{formatDate(event.date)}</div>
                    <small>{event.time}</small>
                  </div>
                </td>
                <td>{event.location}</td>
                <td>{event.type}</td>
                <td>
                  <div className="participants-count">
                    <span className="count-number">{event.participants}</span>
                    <button className="btn btn-sm btn-view-participants" title="View Participants">
                      <i className="fas fa-list"></i>
                    </button>
                  </div>
                </td>
                <td>
                  <span className={`status ${getEventStatus(event.date).toLowerCase()}`}>
                    {getEventStatus(event.date)}
                  </span>
                </td>
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
        
        {events.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-calendar-alt fa-3x"></i>
            <h4>No Events Scheduled</h4>
            <p>Add your first event to get started</p>
          </div>
        )}
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="modal" style={{display: 'flex'}}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Add New Event</h3>
              <button className="close-modal" onClick={() => setShowAddModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddEvent}>
                <div className="form-group">
                  <label htmlFor="eventName">Event Name</label>
                  <input type="text" id="eventName" className="form-control" required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventDate">Event Date</label>
                    <input type="date" id="eventDate" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventTime">Event Time</label>
                    <input type="time" id="eventTime" className="form-control" required />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="eventLocation">Location</label>
                  <input type="text" id="eventLocation" className="form-control" required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventType">Event Type</label>
                    <select id="eventType" className="form-control" required>
                      <option value="">Select Type</option>
                      <option value="Service">Service</option>
                      <option value="Meeting">Meeting</option>
                      <option value="Outreach">Outreach</option>
                      <option value="Social">Social</option>
                      <option value="Training">Training</option>
                      <option value="Prayer">Prayer</option>
                      <option value="Study">Bible Study</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="eventParticipants">Expected Participants</label>
                    <input type="number" id="eventParticipants" className="form-control" min="0" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="eventDescription">Description</label>
                  <textarea id="eventDescription" className="form-control" rows="3" placeholder="Describe the event..."></textarea>
                </div>
                
                <div className="form-group" style={{textAlign: 'right', marginTop: '30px'}}>
                  <button type="button" className="btn" style={{marginRight: '10px'}} onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add Event</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Events;