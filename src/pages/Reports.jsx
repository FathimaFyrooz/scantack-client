import React, { useState } from 'react';
import { 
  MdFileDownload, 
  MdFilterList, 
  MdCalendarToday, 
  MdShare,
  MdOutlineDescription,
  MdCategory,
  MdPieChart,
  MdBarChart,
  MdTimeline,
  MdCompareArrows
} from "react-icons/md";
import '../styles/Reports.css';

const Reports = () => {
  // Sample data for charts
  const [timeRange, setTimeRange] = useState('lastMonth');
  const [activeReport, setActiveReport] = useState('expenses');
  
  // Sample category data
  const categoryData = [
    { category: 'Travel', amount: 2450.75, percentage: 32 },
    { category: 'Office Supplies', amount: 1875.25, percentage: 24 },
    { category: 'Meals', amount: 1265.50, percentage: 16 },
    { category: 'Equipment', amount: 950.80, percentage: 12 },
    { category: 'Transportation', amount: 650.25, percentage: 8 },
    { category: 'Other', amount: 625.45, percentage: 8 }
  ];
  
  // Sample monthly data
  const monthlyData = [
    { month: 'Jan', expenses: 3250.75 },
    { month: 'Feb', expenses: 4125.50 },
    { month: 'Mar', expenses: 3875.25 },
    { month: 'Apr', expenses: 5250.80 },
    { month: 'May', expenses: 4750.60 },
    { month: 'Jun', expenses: 3950.40 }
  ];

  // Time range options
  const timeRanges = [
    { value: 'thisMonth', label: 'This Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'last3Months', label: 'Last 3 Months' },
    { value: 'last6Months', label: 'Last 6 Months' },
    { value: 'ytd', label: 'Year to Date' },
    { value: 'custom', label: 'Custom Range' }
  ];

  // Report type options
  const reportTypes = [
    { id: 'expenses', label: 'Expense Analysis', icon: <MdPieChart /> },
    { id: 'categories', label: 'Category Breakdown', icon: <MdCategory /> },
    { id: 'trends', label: 'Monthly Trends', icon: <MdTimeline /> },
    { id: 'comparison', label: 'Period Comparison', icon: <MdCompareArrows /> }
  ];

  return (
    <div className="reports-container">
      <div className="reports-header">
        <div>
          <h1>Financial Reports</h1>
          <p>View and analyze expense trends and patterns</p>
        </div>
        <div className="reports-actions">
          <button className="btn btn-secondary">
            <MdFileDownload /> Export PDF
          </button>
          <button className="btn btn-secondary">
            <MdShare /> Share Report
          </button>
        </div>
      </div>

      <div className="reports-filters">
        <div className="filter-container">
          <MdCalendarToday className="filter-icon" />
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="filter-select"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
        
        {timeRange === 'custom' && (
          <div className="date-range-picker">
            <input type="date" className="date-input" />
            <span className="date-separator">to</span>
            <input type="date" className="date-input" />
          </div>
        )}
      </div>

      <div className="report-types">
        {reportTypes.map(report => (
          <div 
            key={report.id}
            className={`report-type-card ${activeReport === report.id ? 'active' : ''}`}
            onClick={() => setActiveReport(report.id)}
          >
            <div className="report-type-icon">
              {report.icon}
            </div>
            <span className="report-type-label">{report.label}</span>
          </div>
        ))}
      </div>

      {activeReport === 'expenses' && (
        <div className="report-content">
          <div className="report-section">
            <h2 className="report-title">Expense Overview</h2>
            <div className="report-summary-cards">
              <div className="summary-card">
                <h3>Total Expenses</h3>
                <p className="summary-value">$7,818.00</p>
                <p className="summary-comparison increase">+12.5% from previous period</p>
              </div>
              <div className="summary-card">
                <h3>Average Per Day</h3>
                <p className="summary-value">$259.25</p>
                <p className="summary-comparison increase">+5.2% from previous period</p>
              </div>
              <div className="summary-card">
                <h3>Highest Expense</h3>
                <p className="summary-value">$1,250.00</p>
                <p className="summary-comparison neutral">AirFly Airlines - Mar 15</p>
              </div>
              <div className="summary-card">
                <h3>Pending Approvals</h3>
                <p className="summary-value">5</p>
                <p className="summary-comparison decrease">-3 from previous period</p>
              </div>
            </div>
          </div>

          <div className="report-grid">
            <div className="report-chart-container">
              <h3>Expenses by Category</h3>
              <div className="chart-placeholder pie-chart">
                <div className="pie-segments">
                  {categoryData.map((item, index) => (
                    <div key={index} className={`pie-segment segment-${index}`} style={{ '--percentage': `${item.percentage}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="report-table-container">
              <h3>Top Categories</h3>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.category}</td>
                      <td>${item.amount.toFixed(2)}</td>
                      <td>{item.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="report-section">
            <h3>Monthly Expense Trend</h3>
            <div className="chart-placeholder bar-chart">
              {monthlyData.map((item, index) => (
                <div 
                  key={index} 
                  className="bar-column"
                  style={{ 
                    height: `${(item.expenses / 6000) * 100}%`,
                  }}
                >
                  <span className="bar-value">${(item.expenses / 1000).toFixed(1)}k</span>
                  <span className="bar-label">{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeReport === 'categories' && (
        <div className="report-content">
          <div className="report-section">
            <h2 className="report-title">Category Analysis</h2>
            <p className="report-description">Detailed breakdown of spending by category</p>
            {/* Category report content would go here */}
            <div className="placeholder-message">Category breakdown visualization would appear here</div>
          </div>
        </div>
      )}

      {activeReport === 'trends' && (
        <div className="report-content">
          <div className="report-section">
            <h2 className="report-title">Monthly Trends</h2>
            <p className="report-description">Expense trends over time</p>
            {/* Trends report content would go here */}
            <div className="placeholder-message">Monthly trends visualization would appear here</div>
          </div>
        </div>
      )}

      {activeReport === 'comparison' && (
        <div className="report-content">
          <div className="report-section">
            <h2 className="report-title">Period Comparison</h2>
            <p className="report-description">Compare expenses between different time periods</p>
            {/* Comparison report content would go here */}
            <div className="placeholder-message">Period comparison visualization would appear here</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;