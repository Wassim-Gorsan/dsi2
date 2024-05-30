import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:8009/api/images/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      alert('Image uploaded successfully');
      navigate("/admin");

    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert('Failed to upload image');
    }
  };

  const divStyle = {
    width: '80%',
    margin: '50px auto',
    backgroundColor: '#fff',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px'
  };

  const buttonStyle = {
    display: 'block',
    width: '150px',
    padding: '10px',
    margin: '20px auto',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049'
  };

  return (
    <div style={divStyle}>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button
        style={buttonStyle}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
};

export default ImageUpload;
