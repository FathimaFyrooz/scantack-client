import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/ReceiptUpload.css";

const ReceiptUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("access_token");
  
  if (!token) {
    console.error("No JWT token found. User may not be authenticated.");
    return <div>Please log in</div>;
  }
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("receipt", file);

    try {
      console.log("Sending token:", token);
      const response = await axios.post("http://127.0.0.1:8000/api/expenses/upload/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Upload successful!");

      // Clear the file and preview after successful upload
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Upload error:", error.response ? error.response.data : error.message);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="receipt-upload">
      <h2>Upload Receipt</h2>
      <div 
        className="drop-area" 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={handleDrop}
        onClick={handleClick} 
      >
        {preview ? (
          <img src={preview} alt="Receipt Preview" className="preview-image" />
        ) : (
          <p>Drag & Drop your receipt here or click to upload</p>
        )}
      </div>
      <input 
        type="file" 
        accept="image/*,application/pdf" 
        onChange={handleFileChange} 
        ref={fileInputRef} 
        style={{ display: "none" }} 
      />
      <button className="upload-button" onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ReceiptUpload;
