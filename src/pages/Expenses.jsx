import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAdd, MdSearch, MdDelete, MdEdit } from "react-icons/md";
import '../styles/Expenses.css';
import AddExpense from './Addexpense';
import EditExpense from './Editexpense';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isEditExpenseOpen, setIsEditExpenseOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

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

  const handleSaveExpense = async (newExpense) => {
    try {
      // In a real app, you would send this to your API
      // const response = await axios.post('http://localhost:8000/api/expenses/add_expense', newExpense);
      
      // For now, just add it to the local state with a fake ID
      const expenseWithId = {
        ...newExpense,
        id: Date.now(), // Use timestamp as temporary ID
        // Convert string amount to number for consistency
        amount: parseFloat(newExpense.amount)
      };
      
      setExpenses([expenseWithId, ...expenses]);
    } catch (err) {
      console.error('Failed to save expense:', err);
      // You could set an error state here to display to the user
    }
  };

  const handleEditClick = (expense) => {
    setCurrentExpense(expense);
    setIsEditExpenseOpen(true);
  };

  const handleUpdateExpense = async (updatedExpense) => {
    try {
      // In a real app, you would send this to your API
      // const response = await axios.put(`http://localhost:8000/api/expenses/update_expense/${updatedExpense.id}`, updatedExpense);
      
      // Update the expense in the local state
      const updatedExpenses = expenses.map(expense => 
        expense.id === updatedExpense.id ? {
          ...updatedExpense,
          // Convert string amount to number for consistency
          amount: parseFloat(updatedExpense.amount)
        } : expense
      );
      
      setExpenses(updatedExpenses);
    } catch (err) {
      console.error('Failed to update expense:', err);
      // You could set an error state here to display to the user
    }
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        // In a real app, you would send this to your API
        // await axios.delete(`http://localhost:8000/api/expenses/delete_expense/${id}`);
        
        // Remove the expense from the local state
        const updatedExpenses = expenses.filter(expense => expense.id !== id);
        setExpenses(updatedExpenses);
      } catch (err) {
        console.error('Failed to delete expense:', err);
        // You could set an error state here to display to the user
      }
    }
  };

  return (
    <div className="expenses-container">
      <div className="expenses-header">
        <h1>Expense Management</h1>
        <p>Track, manage, and analyze your business expenses</p>
      </div>
      
      <div className="expenses-actions">
        <button 
          className="btn btn-primary"
          onClick={() => setIsAddExpenseOpen(true)}
        >
          <MdAdd /> Add New Expense
        </button>
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
        ) : filteredExpenses.length === 0 ? (
          <p className="no-results">No expenses found</p>
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
                    <button 
                      className="action-btn edit"
                      onClick={() => handleEditClick(expense)}
                    >
                      <MdEdit />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteExpense(expense.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Add Expense Modal */}
      <AddExpense 
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onSave={handleSaveExpense}
      />

      {/* Edit Expense Modal */}
      <EditExpense 
        isOpen={isEditExpenseOpen}
        onClose={() => setIsEditExpenseOpen(false)}
        onSave={handleUpdateExpense}
        expenseData={currentExpense}
      />
    </div>
  );
};

export default Expenses;