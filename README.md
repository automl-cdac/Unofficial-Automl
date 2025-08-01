# Unofficial-Automl

A comprehensive FullStack Machine Learning platform with intelligent model selection using LangGraph and Gemini API.

## 🚀 Features

### 🤖 Intelligent Model Selection
- **LangGraph Workflow**: Multi-step intelligent model selection process
- **Gemini API Integration**: AI-powered analysis and recommendations
- **Data Analysis**: Automatic dataset analysis and problem type detection
- **Model Recommendations**: Intelligent suggestions based on data characteristics
- **Hyperparameter Optimization**: LLM-driven hyperparameter tuning

### 📊 Data Preprocessing
- **Automated Cleaning**: Handle missing values, outliers, and data quality issues
- **Feature Engineering**: Encoding, scaling, and dimensionality reduction
- **Data Analysis**: Comprehensive EDA with statistical insights
- **Preprocessing Suggestions**: AI-powered preprocessing recommendations

### 🎯 Model Training & Evaluation
- **Multiple Algorithms**: Support for 15+ ML algorithms
- **Cross-validation**: Robust model evaluation
- **Performance Metrics**: Comprehensive evaluation metrics
- **Model Comparison**: Side-by-side model performance analysis

### 📈 Reporting & Visualization
- **Interactive Charts**: Plotly-powered visualizations
- **Comprehensive Reports**: Detailed analysis reports
- **Model Explanations**: AI-powered model choice explanations
- **Performance Tracking**: Historical model performance tracking

## 🏗️ Architecture

### Backend (Django + Python)
- **Django REST Framework**: RESTful API endpoints
- **LangGraph**: Intelligent workflow orchestration
- **Gemini API**: AI-powered model selection
- **Scikit-learn**: Core ML algorithms
- **XGBoost/LightGBM/CatBoost**: Advanced ML libraries
- **Optuna**: Hyperparameter optimization

### Frontend (React)
- **Modern UI**: Beautiful, responsive dashboard
- **Real-time Updates**: Live model training progress
- **Interactive Charts**: Plotly.js visualizations
- **File Upload**: Drag-and-drop dataset upload

## 🛠️ Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google Gemini API key

### Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Set up environment variables
cp env_example.txt .env
# Edit .env with your API keys

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start the server
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend/react_dashboard
npm install
npm start
```

## 🔧 Configuration

### API Keys Setup
1. Get a Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a `.env` file in the backend directory
3. Add your API key: `GOOGLE_API_KEY=your-api-key-here`

### Environment Variables
```bash
# Required
GOOGLE_API_KEY=your-gemini-api-key

# Optional
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
```

## 📖 Usage

### 1. Upload Dataset
- Navigate to the dashboard
- Click "Upload Dataset"
- Select your CSV/Excel file
- Specify target column and metadata

### 2. AI-Powered Analysis
- The system automatically analyzes your data
- LangGraph workflow processes dataset characteristics
- Gemini API provides intelligent model recommendations
- Get detailed reasoning for each recommendation

### 3. Model Training
- Choose from AI-recommended models
- Use optimized hyperparameters
- Train single model or compare multiple models
- Monitor training progress in real-time

### 4. Evaluation & Reports
- View comprehensive performance metrics
- Generate detailed reports
- Export results and visualizations
- Get AI explanations for model choices

## 🔍 API Endpoints

### Data Ingestion
- `POST /api/ingestion/upload/` - Upload dataset
- `GET /api/ingestion/datasets/` - List datasets
- `GET /api/ingestion/datasets/{id}/` - Dataset details

### Model Training
- `POST /api/modeling/train/` - Train model
- `GET /api/modeling/models/` - List models
- `GET /api/modeling/models/{id}/` - Model details
- `POST /api/modeling/compare/` - Compare models

### Intelligent Selection
- `GET /api/modeling/suggestions/{dataset_id}/` - AI model suggestions
- `POST /api/modeling/hyperparameters/` - Optimized hyperparameters
- `POST /api/modeling/explain/` - Model choice explanations

### Reporting
- `POST /api/reporting/generate/` - Generate reports
- `GET /api/reporting/reports/` - List reports
- `GET /api/reporting/reports/{id}/` - Report details

## 🤖 Intelligent Features

### LangGraph Workflow
1. **Data Analysis**: Analyze dataset characteristics
2. **Model Suggestion**: Recommend appropriate models
3. **Model Evaluation**: Evaluate each model's suitability
4. **Final Recommendation**: Select best model with confidence

### Gemini API Integration
- **Dataset Analysis**: Understand data patterns and quality
- **Model Selection**: Intelligent algorithm recommendations
- **Hyperparameter Tuning**: Optimized parameter suggestions
- **Explanation Generation**: Clear reasoning for model choices

## 📊 Supported Models

### Classification
- Random Forest
- XGBoost
- LightGBM
- CatBoost
- Logistic Regression
- Support Vector Machine
- K-Nearest Neighbors
- Decision Tree
- Gradient Boosting
- AdaBoost

### Regression
- Random Forest
- XGBoost
- LightGBM
- CatBoost
- Linear Regression
- Ridge Regression
- Lasso Regression
- Elastic Net
- Support Vector Regression
- K-Nearest Neighbors

## 🎯 Key Benefits

1. **Intelligent Selection**: AI-powered model recommendations
2. **Automated Preprocessing**: Smart data cleaning and feature engineering
3. **Comprehensive Evaluation**: Multiple metrics and cross-validation
4. **Beautiful UI**: Modern, responsive dashboard
5. **Detailed Reports**: Comprehensive analysis and visualizations
6. **Scalable Architecture**: Easy to extend and customize

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- LangGraph for workflow orchestration
- Google Gemini API for intelligent analysis
- Scikit-learn for core ML algorithms
- React for the frontend framework
- Plotly for interactive visualizations