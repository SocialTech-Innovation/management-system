import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import AddTransactionModal from './Modals/AddTransactionModal';

function Finance() {
  const [transactions, setTransactions] = useState([]);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const incomeChartRef = useRef(null);
  const expenseChartRef = useRef(null);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('churchTransactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
    
    // Initialize charts
    setTimeout(() => {
      initCharts();
    }, 100);
  }, []);

  const initCharts = () => {
    // Income by Category Chart
    if (incomeChartRef.current) {
      const ctx = incomeChartRef.current.getContext('2d');
      
      const incomeData = transactions.filter(t => t.type === 'Income');
      const categories = [...new Set(incomeData.map(t => t.category))];
      const amounts = categories.map(category => 
        incomeData.filter(t => t.category === category).reduce((sum, t) => sum + t.amount, 0)
      );
      
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: categories,
          datasets: [{
            data: amounts,
            backgroundColor: [
              'rgba(39, 174, 96, 0.8)',
              'rgba(46, 204, 113, 0.8)',
              'rgba(26, 188, 156, 0.8)',
              'rgba(52, 152, 219, 0.8)',
              'rgba(155, 89, 182, 0.8)'
            ],
            borderColor: [
              'rgba(39, 174, 96, 1)',
              'rgba(46, 204, 113, 1)',
              'rgba(26, 188, 156, 1)',
              'rgba(52, 152, 219, 1)',
              'rgba(155, 89, 182, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            title: {
              display: true,
              text: 'Income by Category'
            }
          }
        }
      });
    }
  };

  const handleAddTransaction = (newTransaction) => {
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('churchTransactions', JSON.stringify(updatedTransactions));
    setShowIncomeModal(false);
    setShowExpenseModal(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getFinanceStats = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = transactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const currentBalance = totalIncome - totalExpenses;
    
    const monthlyIncome = transactions
      .filter(t => t.type === 'Income' && new Date(t.date).getMonth() === new Date().getMonth())
      .reduce((sum, t) => sum + t.amount, 0);
    
    const monthlyExpenses = transactions
      .filter(t => t.type === 'Expense' && new Date(t.date).getMonth() === new Date().getMonth())
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { totalIncome, totalExpenses, currentBalance, monthlyIncome, monthlyExpenses };
  };

  const stats = getFinanceStats();

  return (
    <div className="finance-container">
      <div className="finance-cards">
        <div className="finance-card income">
          <h3>${stats.monthlyIncome.toLocaleString()}</h3>
          <p>Monthly Income</p>
          <small>This Month</small>
        </div>
        
        <div className="finance-card expenses">
          <h3>${stats.monthlyExpenses.toLocaleString()}</h3>
          <p>Monthly Expenses</p>
          <small>This Month</small>
        </div>
        
        <div className="finance-card balance">
          <h3>${stats.currentBalance.toLocaleString()}</h3>
          <p>Current Balance</p>
          <small>Net Position</small>
        </div>
        
        <div className="finance-card total-income">
          <h3>${stats.totalIncome.toLocaleString()}</h3>
          <p>Total Income</p>
          <small>All Time</small>
        </div>
      </div>
      
      <div className="chart-row">
        <div className="chart-box">
          <h4>Income Distribution</h4>
          <canvas ref={incomeChartRef}></canvas>
        </div>
        
        <div className="chart-box">
          <h4>Monthly Trends</h4>
          <canvas ref={expenseChartRef}></canvas>
        </div>
      </div>
      
      <div className="table-container">
        <div className="table-header">
          <h3>Recent Transactions</h3>
          <div>
            <button className="btn btn-warning" onClick={() => setShowExpenseModal(true)}>
              <i className="fas fa-minus-circle"></i> Add Expense
            </button>
            <button className="btn btn-success" onClick={() => setShowIncomeModal(true)}>
              <i className="fas fa-plus-circle"></i> Add Income
            </button>
          </div>
        </div>
        
        <div className="transaction-filters">
          <div className="filter-buttons">
            <button className="btn btn-sm active">All</button>
            <button className="btn btn-sm">Income</button>
            <button className="btn btn-sm">Expenses</button>
            <button className="btn btn-sm">This Month</button>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10).map(transaction => (
              <tr key={transaction.id}>
                <td>{formatDate(transaction.date)}</td>
                <td>
                  <div className="transaction-info">
                    <div className="transaction-description">{transaction.description}</div>
                    {transaction.source && (
                      <small className="transaction-source">From: {transaction.source}</small>
                    )}
                    {transaction.vendor && (
                      <small className="transaction-vendor">To: {transaction.vendor}</small>
                    )}
                  </div>
                </td>
                <td>{transaction.category}</td>
                <td>
                  <span className={`transaction-type ${transaction.type.toLowerCase()}`}>
                    {transaction.type}
                  </span>
                </td>
                <td>
                  <span className={`amount ${transaction.type.toLowerCase()}`}>
                    {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </span>
                </td>
                <td><span className={`status ${transaction.status.toLowerCase()}`}>{transaction.status}</span></td>
                <td>
                  <div className="action-buttons">
                    <button className="btn btn-sm btn-edit" title="Edit">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-sm btn-view" title="View Details">
                      <i className="fas fa-receipt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {transactions.length === 0 && (
          <div className="empty-state">
            <i className="fas fa-donate fa-3x"></i>
            <h4>No Transactions Recorded</h4>
            <p>Add your first income or expense transaction</p>
          </div>
        )}
      </div>

      {showIncomeModal && (
        <AddTransactionModal 
          type="income"
          onClose={() => setShowIncomeModal(false)}
          onSave={handleAddTransaction}
          nextId={transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1}
        />
      )}

      {showExpenseModal && (
        <AddTransactionModal 
          type="expense"
          onClose={() => setShowExpenseModal(false)}
          onSave={handleAddTransaction}
          nextId={transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1}
        />
      )}
    </div>
  );
}
 
export default Finance;