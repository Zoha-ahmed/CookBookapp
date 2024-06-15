import React, { useState } from "react";

const FileUploader = ({ name, description }) => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    setFile(uploadedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <div
        style={{
          border: "2px dashed #aaa",
          padding: "80px",
          textAlign: "center",
          marginTop: ".75em;",
        }}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <div>
            <p>File uploaded: {file.name}</p>
            <p>Size: {file.size} bytes</p>
          </div>
        ) : (
          <p>Drag & drop your file here, or click to select a file</p>
        )}
        <input
          type="file"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <button
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          Select File
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
