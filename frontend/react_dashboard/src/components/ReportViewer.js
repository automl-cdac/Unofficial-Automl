import React from 'react';
import './ReportViewer.css';

function ReportViewer({ report, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content report-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>{report.title}</h2>
        
        <div className="report-content">
          <div className="report-header">
            <div className="report-meta">
              <p><strong>Type:</strong> {report.report_type}</p>
              {report.dataset_name && (
                <p><strong>Dataset:</strong> {report.dataset_name}</p>
              )}
              {report.model_name && (
                <p><strong>Model:</strong> {report.model_name}</p>
              )}
              <p><strong>Generated:</strong> {new Date(report.created_at).toLocaleString()}</p>
            </div>
          </div>

          <div className="report-summary">
            <h3>Summary</h3>
            <p>{report.summary}</p>
          </div>

          <div className="report-sections">
            <div className="section">
              <h3>Report Content</h3>
              <div className="content-placeholder">
                <p>Detailed report content will be displayed here.</p>
                <p>This includes:</p>
                <ul>
                  <li>Data analysis results</li>
                  <li>Model performance metrics</li>
                  <li>Feature importance analysis</li>
                  <li>Recommendations</li>
                </ul>
              </div>
            </div>

            <div className="section">
              <h3>Charts & Visualizations</h3>
              <div className="charts-placeholder">
                <p>Interactive charts and visualizations will be displayed here.</p>
                <div className="chart-grid">
                  <div className="chart-card">
                    <h4>Data Distribution</h4>
                    <div className="chart-content">
                      <p>Loading distribution chart...</p>
                    </div>
                  </div>
                  <div className="chart-card">
                    <h4>Correlation Matrix</h4>
                    <div className="chart-content">
                      <p>Loading correlation matrix...</p>
                    </div>
                  </div>
                  <div className="chart-card">
                    <h4>Model Performance</h4>
                    <div className="chart-content">
                      <p>Loading performance metrics...</p>
                    </div>
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

export default ReportViewer; 