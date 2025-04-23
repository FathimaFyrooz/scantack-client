import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  MdAdd, MdFilterList, MdSearch, MdFileUpload, MdDelete, 
  MdOutlineRemoveRedEye, MdOutlineFileDownload, MdOutlineLink, 
  MdDocumentScanner 
} from "react-icons/md";
import '../styles/Receipts.css';
import ReactModal from 'react-modal';
import ReceiptUpload from './ReceiptUpload'; // adjust path as needed


const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const openUploadModal = () => setUploadModalOpen(true);
const closeUploadModal = () => setUploadModalOpen(false);



  // Fetch receipts from API
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/ocr/ocr_data/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        });

        const transformedData = response.data.map(item => ({
          id: item.id,
          date: item.extracted_date,
          merchant: item.extracted_merchant || 'Unknown Merchant',
          total: parseFloat(item.extracted_amount) || 0,
          status: 'Processed', // or use logic to infer status
          attachment: 'placeholder.pdf', // replace with actual URL if available
          expenseId: null,
          tags: ['ocr']
        }));

        setReceipts(transformedData);
      } catch (error) {
        console.error("Failed to fetch receipts:", error);
      }
    };

    fetchReceipts();
  }, []);

  const statuses = ['All', 'Processed', 'Unprocessed', 'Processing Error'];

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
      <button className="btn btn-primary" onClick={openUploadModal}>
  <MdFileUpload /> Upload Receipt
</button>

        {/* <button className="btn btn-highlight">
          <MdDocumentScanner /> Scan New Receipt
        </button>
        <button className="btn btn-secondary">
          <MdAdd /> Create Manual Entry
        </button> */}
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
      <ReactModal
  isOpen={uploadModalOpen}
  onRequestClose={closeUploadModal}
  contentLabel="Upload Receipt Modal"
  className="upload-modal-content"
  overlayClassName="upload-modal-overlay"
  ariaHideApp={false} // Or set ReactModal.setAppElement('#root') in main app
>
  <ReceiptUpload />
  <button onClick={closeUploadModal} className="modal-close-btn">Close</button>
</ReactModal>

    </div>
    
  );
};

export default Receipts;