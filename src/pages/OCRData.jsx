import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdSearch, MdVisibility, MdDownload } from "react-icons/md";
import '../styles/OCRExtractedData.css';

const OCRExtractedData = () => {
  const [ocrData, setOcrData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch OCR extracted data from API
  useEffect(() => {
    const fetchOCRData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/ocr/ocr_data', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setOcrData(response.data);
      } catch (err) {
        setError('Failed to fetch OCR data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchOCRData();
  }, []);
  

  // Filter OCR data based on search term (by merchant)
  const filteredOCRData = ocrData.filter(data => 
    data.extracted_merchant && data.extracted_merchant.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle view details
  const handleViewDetails = (data) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format datetime for display
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const dateTime = new Date(dateTimeString);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedData(null);
  };

  return (
    <div className="ocr-data-container">
      <div className="expenses-header">
        <h1>OCR Extracted Data</h1>
        <p>View and analyze data extracted from your receipt scans</p>
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
          <p className="loading-message">Loading OCR data...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredOCRData.length === 0 ? (
          <p className="no-results">No OCR data found</p>
        ) : (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Receipt ID</th>
                <th>Merchant</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Processed At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOCRData.map(data => (
                <tr key={data.id}>
                  <td>{data.receipt}</td>
                  <td>{data.extracted_merchant || 'N/A'}</td>
                  <td className="amount">
                    {data.extracted_amount ? `$${parseFloat(data.extracted_amount).toFixed(2)}` : 'N/A'}
                  </td>
                  <td>{formatDate(data.extracted_date)}</td>
                  <td>{formatDateTime(data.processed_at)}</td>
                  <td className="actions">
                    <button 
                      className="action-btn view"
                      onClick={() => handleViewDetails(data)}
                      title="View Details"
                    >
                      <MdVisibility />
                    </button>
                    <button 
                      className="action-btn download"
                      title="Download Raw Text"
                      onClick={() => {
                        // Create a file download for the raw text
                        const element = document.createElement("a");
                        const file = new Blob([data.raw_text], {type: 'text/plain'});
                        element.href = URL.createObjectURL(file);
                        element.download = `receipt-ocr-${data.receipt}.txt`;
                        document.body.appendChild(element);
                        element.click();
                        document.body.removeChild(element);
                      }}
                    >
                      <MdDownload />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Detail Modal */}
      {isModalOpen && selectedData && (
        <div className="modal-overlay">
          <div className="ocr-detail-modal">
            <div className="modal-header">
              <h2>OCR Extracted Details</h2>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <div className="modal-content">
              <div className="detail-group">
                <h3>Receipt Information</h3>
                <div className="detail-row">
                  <span className="detail-label">Receipt ID:</span>
                  <span className="detail-value">{selectedData.receipt}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Processed At:</span>
                  <span className="detail-value">{formatDateTime(selectedData.processed_at)}</span>
                </div>
              </div>
              
              <div className="detail-group">
                <h3>Extracted Data</h3>
                <div className="detail-row">
                  <span className="detail-label">Merchant:</span>
                  <span className="detail-value">{selectedData.extracted_merchant || 'Not detected'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount:</span>
                  <span className="detail-value">
                    {selectedData.extracted_amount ? 
                      `$${parseFloat(selectedData.extracted_amount).toFixed(2)}` : 
                      'Not detected'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{formatDate(selectedData.extracted_date) || 'Not detected'}</span>
                </div>
              </div>
              
              <div className="detail-group raw-text">
                <h3>Raw OCR Text</h3>
                <pre>{selectedData.raw_text}</pre>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRExtractedData;