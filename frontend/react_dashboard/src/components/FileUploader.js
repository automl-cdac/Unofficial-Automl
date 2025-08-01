import React, { useState } from 'react';
import './FileUploader.css';

function FileUploader({ onUpload }) {
  const [showForm, setShowForm] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [targetColumn, setTargetColumn] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!name) {
        setName(selectedFile.name.replace(/\.[^/.]+$/, '')); // Remove extension
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!file) {
      alert('Please select a file');
      return;
    }

    if (!name.trim()) {
      alert('Please enter a dataset name');
      return;
    }

    setLoading(true);
    
    try {
      await onUpload(file, name.trim(), description.trim(), targetColumn.trim());
      // Reset form
      setFile(null);
      setName('');
      setDescription('');
      setTargetColumn('');
      setShowForm(false);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setName('');
    setDescription('');
    setTargetColumn('');
    setShowForm(false);
  };

  return (
    <div className="file-uploader">
      {!showForm ? (
        <button 
          className="upload-button"
          onClick={() => setShowForm(true)}
        >
          + Upload Dataset
        </button>
      ) : (
        <div className="upload-form">
          <h3>Upload Dataset</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="file">Dataset File *</label>
              <input
                type="file"
                id="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                required
              />
              <small>Supported formats: CSV, Excel (.xlsx, .xls)</small>
            </div>

            <div className="form-group">
              <label htmlFor="name">Dataset Name *</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter dataset name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter dataset description"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="targetColumn">Target Column</label>
              <input
                type="text"
                id="targetColumn"
                value={targetColumn}
                onChange={(e) => setTargetColumn(e.target.value)}
                placeholder="Enter target column name"
              />
              <small>Leave empty if you want to specify later</small>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading || !file}
              >
                {loading ? 'Uploading...' : 'Upload Dataset'}
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FileUploader; 