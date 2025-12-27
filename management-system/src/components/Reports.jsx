import React, { useState } from 'react';
import Chart from 'chart.js/auto';

function Reports() {
  const [reports, setReports] = useState([
    { id: 1, name: "Monthly Financial Report", generatedDate: "2023-09-30", type: "Financial", period: "September 2023", size: "2.4 MB" },
    { id: 2, name: "Membership Directory", generatedDate: "2023-09-28", type: "Members", period: "Q3 2023", size: "1.8 MB" },
    { id: 3, name: "Staff Attendance Report", generatedDate: "2023-09-25", type: "Staff", period: "September 2023", size: "0.9 MB" },
    { id: 4, name: "Annual Budget Report", generatedDate: "2023-08-31", type: "Financial", period: "2023 Budget", size: "3.2 MB" },
    { id: 5, name: "Event Participation Report", generatedDate: "2023-08-15", type: "Events", period: "Summer 2023", size: "1.5 MB" },
  ]);

  const [selectedReportType, setSelectedReportType] = useState('all');

  const generateReport = (type) => {
    const reportName = `${type.charAt(0).toUpperCase() + type.slice(1)} Report`;
    const newReport = {
      id: reports.length + 1,
      name: reportName,
      generatedDate: new Date().toISOString().split('T')[0],
      type: type.charAt(0).toUpperCase() + type.slice(1),
      period: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
      size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`
    };
    
    setReports([newReport, ...reports]);
    alert(`${reportName} has been generated successfully!`);
  };

  const filteredReports = selectedReportType === 'all' 
    ? reports 
    : reports.filter(report => report.type.toLowerCase() === selectedReportType);

  const downloadReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    alert(`Downloading ${report.name}...`);
  };

  const deleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      setReports(reports.filter(report => report.id !== reportId));
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="reports-container">
      <div className="table-container">
        <div className="table-header">
          <h3>Generate Reports</h3>
          <div>
            <button className="btn btn-primary" onClick={() => generateReport('quick')}>
              <i className="fas fa-file-pdf"></i> Generate PDF
            </button>
          </div>
        </div>
        
        <div className="report-cards">
          <div className="report-card" onClick={() => generateReport('members')}>
            <div className="report-card-icon members">
              <i className="fas fa-users"></i>
            </div>
            <h4>Members Report</h4>
            <p>Generate detailed members list with demographics</p>
            <div className="report-card-footer">
              <span className="report-type">Members</span>
              <button className="btn btn-sm btn-generate">Generate</button>
            </div>
          </div>
          
          <div className="report-card" onClick={() => generateReport('staff')}>
            <div className="report-card-icon staff">
              <i className="fas fa-user-tie"></i>
            </div>
            <h4>Staff Report</h4>
            <p>Staff directory, attendance, and performance</p>
            <div className="report-card-footer">
              <span className="report-type">Staff</span>
              <button className="btn btn-sm btn-generate">Generate</button>
            </div>
          </div>
          
          <div className="report-card" onClick={() => generateReport('financial')}>
            <div className="report-card-icon finance">
              <i className="fas fa-donate"></i>
            </div>
            <h4>Financial Report</h4>
            <p>Income, expenses, and balance sheet</p>
            <div className="report-card-footer">
              <span className="report-type">Financial</span>
              <button className="btn btn-sm btn-generate">Generate</button>
            </div>
          </div>
          
          <div className="report-card" onClick={() => generateReport('attendance')}>
            <div className="report-card-icon attendance">
              <i className="fas fa-chart-line"></i>
            </div>
            <h4>Attendance Report</h4>
            <p>Weekly/monthly attendance trends</p>
            <div className="report-card-footer">
              <span className="report-type">Attendance</span>
              <button className="btn btn-sm btn-generate">Generate</button>
            </div>
          </div>
          
          <div className="report-card" onClick={() => generateReport('events')}>
            <div className="report-card-icon events">
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h4>Events Report</h4>
            <p>Event participation and feedback</p>
            <div className="report-card-footer">
              <span className="report-type">Events</span>
              <button className="btn btn-sm btn-generate">Generate</button>
            </div>
          </div>
          
          <div className="report-card" onClick={() => generateReport('groups')}>
            <div className="report-card-icon groups">
              <i className="fas fa-house"></i>
            </div>
            <h4>Groups Report</h4>
            <p>Group membership and activities</p>
            <div className="report-card-footer">
              <span className="report-type">Groups</span>
              <button className="btn btn-sm btn-generate">Generate</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="table-container">
        <div className="table-header">
          <h3>Report History</h3>
          <div className="report-filters">
            <select 
              className="form-control" 
              style={{width: 'auto'}}
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
            >
              <option value="all">All Reports</option>
              <option value="members">Members Reports</option>
              <option value="staff">Staff Reports</option>
              <option value="financial">Financial Reports</option>
              <option value="attendance">Attendance Reports</option>
              <option value="events">Events Reports</option>
            </select>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Generated Date</th>
              <th>Type</th>
              <th>Period</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(report => (
              <tr key={report.id}>
                <td>
                  <div className="report-info">
                    <div className="report-name">
                      <i className={`fas fa-file-${report.type === 'Financial' ? 'invoice-dollar' : 'clipboard'}`}></i>
                      {report.name}
                    </div>
                    <small className="report-id">ID: #{report.id}</small>
                  </div>
                </td>
                <td>{formatDate(report.generatedDate)}</td>
                <td><span className={`report-type-badge ${report.type.toLowerCase()}`}>{report.type}</span></td>
                <td>{report.period}</td>
                <td>{report.size}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn btn-sm btn-download" 
                      title="Download"
                      onClick={() => downloadReport(report.id)}
                    >
                      <i className="fas fa-download"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-view" 
                      title="View"
                      onClick={() => alert(`Preview: ${report.name}`)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-delete" 
                      title="Delete"
                      onClick={() => deleteReport(report.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredReports.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-file-alt fa-3x"></i>
            <h4>No Reports Found</h4>
            <p>Generate a report to see it here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;