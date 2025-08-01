import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EDAView.css';

const API_BASE_URL = 'http://localhost:8000/api';

function EDAView({ dataset, onClose, onTrainModel, onCompareModels }) {
  const [datasetDetails, setDatasetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModel, setSelectedModel] = useState('');
  const [targetColumn, setTargetColumn] = useState(dataset.target_column || '');
  const [showTrainForm, setShowTrainForm] = useState(false);
  const [showCompareForm, setShowCompareForm] = useState(false);
  const [intelligentSuggestions, setIntelligentSuggestions] = useState(null);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  useEffect(() => {
    fetchDatasetDetails();
  }, [dataset.id]);

  useEffect(() => {
    if (targetColumn) {
      fetchIntelligentSuggestions();
    }
  }, [targetColumn]);

  const fetchDatasetDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/ingestion/datasets/${dataset.id}/`);
      setDatasetDetails(response.data);
    } catch (error) {
      console.error('Error fetching dataset details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIntelligentSuggestions = async () => {
    if (!targetColumn) return;
    
    setLoadingSuggestions(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/modeling/suggestions/${dataset.id}/`);
      setIntelligentSuggestions(response.data.intelligent_suggestions);
    } catch (error) {
      console.error('Error fetching intelligent suggestions:', error);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleTrainModel = () => {
    if (!targetColumn) {
      alert('Please specify a target column');
      return;
    }
    onTrainModel(dataset.id, selectedModel, targetColumn);
    onClose();
  };

  const handleCompareModels = () => {
    if (!targetColumn) {
      alert('Please specify a target column');
      return;
    }
    const selectedModels = ['random_forest', 'xgboost', 'lightgbm'];
    onCompareModels(dataset.id, selectedModels, targetColumn);
    onClose();
  };

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="loading-spinner"></div>
          <p>Loading dataset details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content eda-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>Dataset Analysis: {dataset.name}</h2>
        
        {datasetDetails && (
          <div className="eda-content">
            <div className="dataset-overview">
              <h3>Overview</h3>
              <div className="overview-stats">
                <div className="stat">
                  <span className="stat-label">Rows:</span>
                  <span className="stat-value">{datasetDetails.dataset.rows}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Columns:</span>
                  <span className="stat-value">{datasetDetails.dataset.columns}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Target:</span>
                  <span className="stat-value">{datasetDetails.dataset.target_column || 'Not specified'}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Type:</span>
                  <span className="stat-value">{datasetDetails.dataset.problem_type || 'Unknown'}</span>
                </div>
              </div>
            </div>

            <div className="column-analysis">
              <h3>Column Analysis</h3>
              <div className="columns-grid">
                {datasetDetails.columns_info.map((col, index) => (
                  <div key={index} className="column-card">
                    <h4>{col.name}</h4>
                    <p><strong>Type:</strong> {col.data_type}</p>
                    <p><strong>Missing:</strong> {col.missing_count}</p>
                    <p><strong>Unique:</strong> {col.unique_count}</p>
                    {col.min_value !== null && (
                      <p><strong>Range:</strong> {col.min_value} - {col.max_value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="model-actions">
              <h3>Model Training</h3>
              
              <div className="form-group">
                <label>Target Column:</label>
                <input
                  type="text"
                  value={targetColumn}
                  onChange={(e) => setTargetColumn(e.target.value)}
                  placeholder="Enter target column name"
                />
              </div>

              {targetColumn && intelligentSuggestions && (
                <div className="intelligent-suggestions">
                  <h4>🤖 AI-Powered Model Recommendations</h4>
                  {loadingSuggestions ? (
                    <p>Analyzing your data with AI...</p>
                  ) : (
                    <div className="suggestions-content">
                      {intelligentSuggestions.final_recommendation && (
                        <div className="best-recommendation">
                          <h5>🎯 Best Model: {intelligentSuggestions.final_recommendation.best_model}</h5>
                          <p><strong>Confidence:</strong> {(intelligentSuggestions.final_recommendation.confidence * 100).toFixed(1)}%</p>
                          <p><strong>Reasoning:</strong> {intelligentSuggestions.final_recommendation.reasoning}</p>
                        </div>
                      )}
                      
                      {intelligentSuggestions.recommended_models && (
                        <div className="recommended-models">
                          <h5>📋 All Recommended Models:</h5>
                          <ul>
                            {intelligentSuggestions.recommended_models.map((model, index) => (
                              <li key={index}>
                                <strong>{model.name || model}</strong>
                                {model.reasoning && <p>{model.reasoning}</p>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="action-buttons">
                <button 
                  className="btn-primary"
                  onClick={() => setShowTrainForm(true)}
                >
                  Train Single Model
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => setShowCompareForm(true)}
                >
                  Compare Models
                </button>
              </div>
            </div>
          </div>
        )}

        {showTrainForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowTrainForm(false)}>×</button>
              <h3>Train Model</h3>
              
              <div className="form-group">
                <label>Model Type:</label>
                <select 
                  value={selectedModel} 
                  onChange={(e) => setSelectedModel(e.target.value)}
                >
                  <option value="">Select a model</option>
                  <option value="random_forest">Random Forest</option>
                  <option value="xgboost">XGBoost</option>
                  <option value="lightgbm">LightGBM</option>
                  <option value="logistic_regression">Logistic Regression</option>
                  <option value="svm">Support Vector Machine</option>
                </select>
              </div>

              <div className="form-actions">
                <button 
                  className="btn-primary"
                  onClick={handleTrainModel}
                  disabled={!selectedModel || !targetColumn}
                >
                  Train Model
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => setShowTrainForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showCompareForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowCompareForm(false)}>×</button>
              <h3>Compare Models</h3>
              <p>This will train and compare multiple models on your dataset.</p>
              
              <div className="form-actions">
                <button 
                  className="btn-primary"
                  onClick={handleCompareModels}
                  disabled={!targetColumn}
                >
                  Start Comparison
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => setShowCompareForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EDAView; 