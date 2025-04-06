import React, { useState } from 'react';
import { 
  MdAdd, 
  MdFilterList, 
  MdSearch, 
  MdFileUpload, 
  MdDelete, 
  MdOutlineRemoveRedEye, 
  MdOutlineFileDownload,
  MdOutlineLink,
  MdDocumentScanner
} from "react-icons/md";
import '../styles/Receipts.css';

const Receipts = () => {
  // Sample receipts data
  const [receipts, setReceipts] = useState([
    { 
      id: 1, 
      date: '2025-03-10', 
      merchant: 'Office Supplies Co.', 
      total: 124.99, 
      status: 'Processed',
      attachment: 'receipt-001.pdf',
      expenseId: 'EXP-2025-001',
      tags: ['office', 'quarterly']
    },
    { 
      id: 2, 
      date: '2025-03-08', 
      merchant: 'AirFly Airlines', 
      total: 349.50, 
      status: 'Processed',
      attachment: 'receipt-002.pdf',
      expenseId: 'EXP-2025-002',
      tags: ['travel', 'client-meeting']
    },
    { 
      id: 3, 
      date: '2025-03-05', 
      merchant: 'Downtown Cafe', 
      total: 42.75, 
      status: 'Unprocessed',
      attachment: 'receipt-003.jpg',
      expenseId: null,
      tags: ['meals']
    },
    { 
      id: 4, 
      date: '2025-03-02', 
      merchant: 'Metro Transport', 
      total: 25.00, 
      status: 'Processing Error',
      attachment: 'receipt-004.jpg',
      expenseId: null,
      tags: ['transport']
    },
    { 
      id: 5, 
      date: '2025-02-28', 
      merchant: 'Tech Hardware Inc.', 
      total: 899.99, 
      status: 'Processed',
      attachment: 'receipt-005.pdf',
      expenseId: 'EXP-2025-003',
      tags: ['equipment', 'it-department']
    },
  ]);

  // States for filter and search
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter statuses
  const statuses = ['All', 'Processed', 'Unprocessed', 'Processing Error'];
  
  // Filtered receipts
  const filteredReceipts = receipts.filter(receipt => {
    const matchesSearch = receipt.merchant.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          receipt.attachment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || receipt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="receipts-container">
      <div className="receipts-header">
        <div className="receipts-title">
          <h1>Receipt Management</h1>
          <p>Scan, store, and process your receipts using OCR technology</p>
        </div>
        <div className="receipts-stats">
          <div className="stats-item">
            <span className="stats-count">{receipts.filter(r => r.status === 'Processed').length}</span>
            <span className="stats-label">Processed</span>
          </div>
          <div className="stats-item">
            <span className="stats-count">{receipts.filter(r => r.status === 'Unprocessed').length}</span>
            <span className="stats-label">Pending</span>
          </div>
          <div className="stats-item">
            <span className="stats-count">{receipts.filter(r => r.status === 'Processing Error').length}</span>
            <span className="stats-label">Errors</span>
          </div>
        </div>
      </div>

      <div className="receipts-actions">
        <button className="btn btn-primary">
          <MdFileUpload /> Upload Receipt
        </button>
        <button className="btn btn-highlight">
          <MdDocumentScanner /> Scan New Receipt
        </button>
        <button className="btn btn-secondary">
          <MdAdd /> Create Manual Entry
        </button>
      </div>

      <div className="receipts-filters">
        <div className="search-container">
          <MdSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search receipts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input" 
          />
        </div>
        
        <div className="filter-container">
          <MdFilterList className="filter-icon" />
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="receipt-gallery">
        {filteredReceipts.map(receipt => (
          <div key={receipt.id} className={`receipt-card status-${receipt.status.toLowerCase().replace(' ', '-')}`}>
            <div className="receipt-preview">
              <div className="receipt-image">
                {receipt.attachment.endsWith('.pdf') ? (
                  <div className="pdf-placeholder">PDF</div>
                ) : (
                  <div className="img-placeholder">IMG</div>
                )}
              </div>
              <span className={`receipt-status ${receipt.status.toLowerCase().replace(' ', '-')}`}>
                {receipt.status}
              </span>
            </div>
            <div className="receipt-details">
              <h3 className="receipt-merchant">{receipt.merchant}</h3>
              <p className="receipt-date">{receipt.date}</p>
              <p className="receipt-amount">${receipt.total.toFixed(2)}</p>
              
              {receipt.expenseId && (
                <div className="receipt-linked">
                  <MdOutlineLink className="linked-icon" />
                  <span className="linked-text">{receipt.expenseId}</span>
                </div>
              )}
              
              <div className="receipt-tags">
                {receipt.tags.map(tag => (
                  <span key={tag} className="receipt-tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="receipt-actions">
              <button className="action-btn view" title="View Receipt">
                <MdOutlineRemoveRedEye />
              </button>
              <button className="action-btn download" title="Download">
                <MdOutlineFileDownload />
              </button>
              <button className="action-btn delete" title="Delete">
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="receipts-empty-state" style={{ display: filteredReceipts.length > 0 ? 'none' : 'flex' }}>
        <MdDocumentScanner className="empty-icon" />
        <h3>No receipts found</h3>
        <p>Upload or scan receipts to get started</p>
        <button className="btn btn-primary">
          <MdFileUpload /> Upload Receipt
        </button>
      </div>
    </div>
  );
};

export default Receipts;