import React, { useState } from 'react';

function AddTransactionModal({ type, onClose, onSave, nextId }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    category: type === 'income' ? 'Offering' : 'Utilities',
    amount: '',
    source: '',
    vendor: '',
    status: type === 'expense' ? 'Pending' : 'Paid',
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
    const newTransaction = {
      id: nextId,
      type: type === 'income' ? 'Income' : 'Expense',
      ...formData,
      amount: parseFloat(formData.amount) || 0
    };
    onSave(newTransaction);
  };

  const incomeCategories = ['Offering', 'Category', 'Donation', 'Event', 'Other'];
  const expenseCategories = ['Utilities', 'Salaries', 'Maintenance', 'Outreach', 'Supplies', 'Other'];

  return (
    <div className="modal" style={{display: 'flex'}}>
      <div className="modal-content">
        <div className="modal-header">
          <h3>{type === 'income' ? 'Record Income' : 'Record Expense'}</h3>
          <button className="close-modal" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input 
                type="date" 
                id="date"
                name="date"
                className="form-control" 
                required
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <input 
                type="text" 
                id="description"
                name="description"
                className="form-control" 
                required
                value={formData.description}
                onChange={handleChange}
                placeholder={type === 'income' ? "e.g., Gift, Donation from John" : "e.g., Utility Bill, Office Supplies"}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select 
                  id="category"
                  name="category"
                  className="form-control" 
                  required
                  value={formData.category}
                  onChange={handleChange}
                >
                  {(type === 'income' ? incomeCategories : expenseCategories).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="amount">Amount ($) *</label>
                <input 
                  type="number" 
                  id="amount"
                  name="amount"
                  className="form-control" 
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                />
              </div>
            </div>
            
            {type === 'income' ? (
              <div className="form-group">
                <label htmlFor="source">Source</label>
                <input 
                  type="text" 
                  id="source"
                  name="source"
                  className="form-control" 
                  value={formData.source}
                  onChange={handleChange}
                  placeholder="e.g., General Donation, John Doe"
                />
              </div>
            ) : (
              <div className="form-group">
                <label htmlFor="vendor">Vendor/Payee</label>
                <input 
                  type="text" 
                  id="vendor"
                  name="vendor"
                  className="form-control" 
                  value={formData.vendor}
                  onChange={handleChange}
                  placeholder="e.g., Electric Company, Office Depot"
                />
              </div>
            )}
            
            {type === 'expense' && (
              <div className="form-group">
                <label htmlFor="status">Payment Status</label>
                <select 
                  id="status"
                  name="status"
                  className="form-control" 
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Unpaid">Unpaid</option>
                </select>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea 
                id="notes"
                name="notes"
                className="form-control" 
                rows="3" 
                value={formData.notes}
                onChange={handleChange}
                placeholder="Additional information about this transaction..."
              ></textarea>
            </div>
            
            <div className="form-group" style={{textAlign: 'right', marginTop: '30px'}}>
              <button type="button" className="btn" style={{marginRight: '10px'}} onClick={onClose}>Cancel</button>
              <button type="submit" className={`btn ${type === 'income' ? 'btn-success' : 'btn-warning'}`}>
                {type === 'income' ? 'Record Income' : 'Record Expense'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTransactionModal;