import React, { useState } from 'react';
import { MdClose, MdAttachFile } from 'react-icons/md';
import '../styles/AddExpense.css';

const AddExpense = ({ isOpen, onClose, onSave }) => {
  const [expenseData, setExpenseData] = useState({
    date: new Date().toISOString().split('T')[0],
    merchant: '',
    amount: '',
    category: '',
    notes: '',
    receipt: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setExpenseData({
      ...expenseData,
      receipt: e.target.files[0]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(expenseData);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setExpenseData({
      date: new Date().toISOString().split('T')[0],
      merchant: '',
      amount: '',
      category: '',
      notes: '',
      receipt: null
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="add-expense-modal">
        <div className="modal-header">
          <h2>Add New Expense</h2>
          <button className="close-button" onClick={onClose}>
            <MdClose />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={expenseData.date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="merchant">Merchant</label>
            <input
              type="text"
              id="merchant"
              name="merchant"
              placeholder="Enter merchant name"
              value={expenseData.merchant}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount">Amount ($)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={expenseData.amount}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="travel">Travel</option>
              <option value="meals">Meals & Entertainment</option>
              <option value="office">Office Supplies</option>
              <option value="utilities">Utilities</option>
              <option value="rent">Rent</option>
              <option value="software">Software & Subscriptions</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Add any additional information"
              value={expenseData.notes}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="receipt">Receipt (Optional)</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="receipt"
                name="receipt"
                onChange={handleFileChange}
                accept="image/*,.pdf"
              />
              <div className="file-input-custom">
                <MdAttachFile /> {expenseData.receipt ? expenseData.receipt.name : 'Attach receipt'}
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;