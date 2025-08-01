import React from 'react';
import './ChartDashboard.css';

function ChartDashboard({ model, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content chart-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>Model Analysis: {model.name}</h2>
        
        <div className="model-details">
          <div className="detail-section">
            <h3>Model Information</h3>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Model Type:</span>
                <span className="detail-value">{model.model_type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Dataset:</span>
                <span className="detail-value">{model.dataset_name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Target Column:</span>
                <span className="detail-value">{model.target_column}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value">{model.status}</span>
              </div>
              {model.training_duration && (
                <div className="detail-item">
                  <span className="detail-label">Training Time:</span>
                  <span className="detail-value">{model.training_duration.toFixed(2)}s</span>
                </div>
              )}
            </div>
          </div>

          <div className="chart-section">
            <h3>Performance Charts</h3>
            <div className="chart-placeholder">
              <p>Charts will be displayed here once the model evaluation is complete.</p>
              <div className="chart-grid">
                <div className="chart-card">
                  <h4>Accuracy Metrics</h4>
                  <div className="chart-content">
                    <p>Loading accuracy metrics...</p>
                  </div>
                </div>
                <div className="chart-card">
                  <h4>Feature Importance</h4>
                  <div className="chart-content">
                    <p>Loading feature importance...</p>
                  </div>
                </div>
                <div className="chart-card">
                  <h4>Confusion Matrix</h4>
                  <div className="chart-content">
                    <p>Loading confusion matrix...</p>
                  </div>
                </div>
                <div className="chart-card">
                  <h4>ROC Curve</h4>
                  <div className="chart-content">
                    <p>Loading ROC curve...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartDashboard; 