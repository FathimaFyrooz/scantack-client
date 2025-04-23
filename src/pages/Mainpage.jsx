import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import Dashboard from "./Dashboard";
import "../styles/MainPage.css"; // Import refined CSS
import Expenses from "./Expenses";
import Receipts from "./Receipts";
import Reports from "./Reports";
import ReceiptUpload from "./ReceiptUpload";
import OCRExtractedData from "./OCRData";

const MainPage = () => {
  return (
    <div className="main-container">
      {/* Top Navigation (100% width) */}
      <header className="top-nav">
        <TopNav />
      </header>

      {/* Content Area (Sidebar + Main Content) */}
      <div className="content-area">
        {/* Sidebar (10% width) */}
        <aside className="sidebar">
          <Sidebar />
        </aside>

        {/* Main Content (90% width) */}
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/expenses' element={<Expenses/>}/>
            <Route path='/receipts' element={<Receipts/>}/>
            <Route path='/reports' element={<Reports/>}/>
            <Route path='/upload' element={<ReceiptUpload/>}/>
            <Route path='/ocr' element={<OCRExtractedData/>}/>
            {/* Add other routes like Expenses, Receipts, Reports here */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
