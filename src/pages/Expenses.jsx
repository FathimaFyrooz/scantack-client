import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAdd, MdSearch, MdFileUpload, MdDelete, MdEdit } from "react-icons/md";
import '../styles/Expenses.css';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch expenses from API
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/expenses/get_expenses');
        setExpenses(response.data);
      } catch (err) {
        setError('Failed to fetch expenses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchExpenses();
  }, []);

  // Filter expenses based on search term (only by merchant)
  const filteredExpenses = expenses.filter(expense =>
    expense.merchant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="expenses-container">
      <div className="expenses-header">
        <h1>Expense Management</h1>
        <p>Track, manage, and analyze your business expenses</p>
      </div>

      <div className="expenses-actions">
        <button className="btn btn-primary">
          <MdAdd /> Add New Expense
        </button>
        {/* <button className="btn btn-secondary">
          <MdFileUpload /> Scan Receipt
        </button> */}
      </div>

      <div className="expenses-filters">
        <div className="search-container">
          <MdSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by Merchant..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input" 
          />
        </div>
      </div>

      <div className="expenses-table-container">
        {loading ? (
          <p>Loading expenses...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Merchant</th>
                <th>Amount</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map(expense => (
                <tr key={expense.id}>
                  <td>{expense.date}</td>
                  <td>{expense.merchant}</td>
                  <td className="amount">${expense.amount.toFixed(2)}</td>
                  <td>{expense.notes || 'N/A'}</td>
                  <td className="actions">
                    <button className="action-btn edit">
                      <MdEdit />
                    </button>
                    <button className="action-btn delete">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Expenses;
