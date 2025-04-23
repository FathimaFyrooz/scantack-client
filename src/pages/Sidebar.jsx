import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';
import { 
  MdDocumentScanner, 
  MdDashboard, 
  MdAttachMoney, 
  MdReceipt, 
  MdAssessment, 
  MdPerson, 
  MdSettings,
} from "react-icons/md";
import { BsClipboardDataFill } from "react-icons/bs";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="side-nav-container">
      <div className="side-nav-logo">
        <h1>
          <MdDocumentScanner className="side-nav-logo-icon" /> ScanTrack
        </h1>
      </div>
      <nav className="side-nav-menu">
        <ul className="side-nav-list">
          <li className="side-nav-item" onClick={() => handleNavigation("/mainpage/dashboard")}>
            <span className="side-nav-link">
              <MdDashboard className="side-nav-icon" /> Dashboard
            </span>
          </li>
          <li className="side-nav-item" onClick={() => handleNavigation("/mainpage/ocr")}>
            <span className="side-nav-link">
              <BsClipboardDataFill className="side-nav-icon" /> OCR Extracted Data
            </span>
          </li>
          <li className="side-nav-item" onClick={() => handleNavigation("/mainpage/expenses")}>
            <span className="side-nav-link">
              <MdAttachMoney className="side-nav-icon" /> Expenses
            </span>
          </li>
          <li className="side-nav-item" onClick={() => handleNavigation("/mainpage/receipts")}>
            <span className="side-nav-link">
              <MdReceipt className="side-nav-icon" /> Receipts
            </span>
          </li>
          <li className="side-nav-item" onClick={() => handleNavigation("/mainpage/reports")}>
            <span className="side-nav-link">
              <MdAssessment className="side-nav-icon" /> Reports
            </span>
          </li>
          <li className="side-nav-item" onClick={() => handleNavigation("/mainpage/profile")}>
            <span className="side-nav-link">
              <MdPerson className="side-nav-icon" /> Profile
            </span>
          </li>
          <li className="side-nav-item" onClick={() => handleNavigation("/mainpage/settings")}>
            <span className="side-nav-link">
              <MdSettings className="side-nav-icon" /> Settings
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
