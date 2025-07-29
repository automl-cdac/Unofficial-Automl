#!/bin/bash

set -e

echo "🚀 Setting up Reporting Phase..."

cd AutoML-Agentic-System

# === Step 1: Backend reporting structure ===
echo "📁 Creating backend/reporting structure..."
mkdir -p backend/reporting/charts
mkdir -p backend/reporting/reports

touch backend/reporting/__init__.py
touch backend/reporting/chart_generator.py
touch backend/reporting/pdf_generator.py
touch backend/reporting/report_routes.py

# === Step 2: Install dependencies ===
echo "📦 Installing Python libraries for reporting..."
cd backend
pip install matplotlib seaborn reportlab weasyprint pymongo gridfs

# Optional: Save to requirements.txt
pip freeze > requirements.txt
cd ..

# === Step 3: MongoDB folder for GridFS (optional) ===
echo "📁 Setting up optional MongoDB GridFS folder..."
mkdir -p database/mongodb
touch database/mongodb/store_pdf_gridfs.py

# === Step 4: Frontend Dashboard Components ===
echo "📁 Adding frontend dashboard components..."
cd frontend/react_dashboard/src
mkdir -p components/Dashboard
mkdir -p pages

# Chart Viewer Component
cat <<EOF > components/Dashboard/ChartViewer.jsx
import React from "react";
import { Line } from "react-chartjs-2";

const ChartViewer = ({ data, options }) => {
  return (
    <div className="p-4 shadow bg-white rounded-lg">
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartViewer;
EOF

# Report List Component
cat <<EOF > components/Dashboard/ReportList.jsx
import React from "react";

const ReportList = ({ reports }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Generated Reports</h2>
      <ul>
        {reports.map((report, idx) => (
          <li key={idx}>
            <a href={report.link} target="_blank" rel="noopener noreferrer">
              {report.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
EOF

# Dashboard Page Template
cat <<EOF > pages/DashboardPage.jsx
import React from "react";
import ChartViewer from "../components/Dashboard/ChartViewer";
import ReportList from "../components/Dashboard/ReportList";

const DashboardPage = () => {
  const chartData = {
    labels: ["A", "B", "C"],
    datasets: [{ label: "Example", data: [10, 20, 30], borderColor: "blue" }]
  };

  const reports = [
    { name: "Report July", link: "/api/reports/report_july.pdf" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ChartViewer data={chartData} />
      <ReportList reports={reports} />
    </div>
  );
};

export default DashboardPage;
EOF

echo "✅ Reporting folder and dependencies set up!"

