import React from "react";
import "../styles/Dashboard.css";
import ReceiptUpload from "./ReceiptUpload";

const Dashboard = () => {
  // Example data (replace with actual)
  const totalIncome = 7500.0;
  const totalExpenses = 2547.8;
  const receiptsProcessed = 32;
  const budgetRemaining = 1452.2;

  return (
    <>
    <div className="dashboard-container">
      <div className="card">
        <h3 className="card-title">Total Income</h3>
        <p className="card-amount">${totalIncome.toLocaleString()}</p>
        <p className="card-diff positive">+4.5% from last month</p>
      </div>

      <div className="card">
        <h3 className="card-title">Total Expenses</h3>
        <p className="card-amount">${totalExpenses.toLocaleString()}</p>
        <p className="card-diff positive">+2.3% from last month</p>
      </div>

      <div className="card">
        <h3 className="card-title">Receipts Processed</h3>
        <p className="card-amount">{receiptsProcessed}</p>
        <p className="card-diff positive">+3.1% from last month</p>
      </div>

      <div className="card">
        <h3 className="card-title">Budget Remaining</h3>
        <p className="card-amount">${budgetRemaining.toLocaleString()}</p>
        <p className="card-diff negative">-2.7% from last month</p>
      </div>
    </div>
    <div>
      <ReceiptUpload/>

    </div>
    </>
  );
};

export default Dashboard;
