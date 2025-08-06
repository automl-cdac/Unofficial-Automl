#!/bin/bash

# AutoML Run Script
# This script starts both the backend and frontend servers with proper setup

echo "🚀 Starting Unofficial-Automl System"
echo "======================================"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Python
if ! command_exists python3; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+"
    exit 1
fi

# Check Node.js
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 16+"
    exit 1
fi

# Check npm
if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Check if .env file exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: .env file not found in backend directory"
    echo "📝 Please create backend/.env with your API keys:"
    echo "   GOOGLE_API_KEY=your-gemini-api-key"
    echo "   SECRET_KEY=your-django-secret-key"
    echo ""
    echo "You can copy from backend/env_example.txt"
    echo ""
fi

# Start backend
echo ""
echo "🔧 Starting Django Backend..."
cd backend

# Activate virtual environment if it exists
if [ -d ".backend_venv" ]; then
    echo "📦 Activating virtual environment..."
    source .backend_venv/bin/activate 2>/dev/null || source .backend_venv/Scripts/activate 2>/dev/null
fi

# Install Python dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "📦 Installing Python dependencies..."
    pip install -r requirements.txt
fi

# Run migrations
echo "🗄️  Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Start Django server in background
echo "🌐 Starting Django server on http://localhost:8000"
python manage.py runserver 0.0.0.0:8000 &
DJANGO_PID=$!

# Wait a moment for Django to start
sleep 3

# Check if Django started successfully
if ! kill -0 $DJANGO_PID 2>/dev/null; then
    echo "❌ Failed to start Django server"
    exit 1
fi

echo "✅ Django server started successfully"

# Start frontend
echo ""
echo "🎨 Starting React Frontend..."
cd ../frontend/react_dashboard

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Start React development server
echo "🌐 Starting React server on http://localhost:3000"
npm start &
REACT_PID=$!

# Wait a moment for React to start
sleep 5

# Check if React started successfully
if ! kill -0 $REACT_PID 2>/dev/null; then
    echo "❌ Failed to start React server"
    kill $DJANGO_PID 2>/dev/null
    exit 1
fi

echo "✅ React server started successfully"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $DJANGO_PID 2>/dev/null
    kill $REACT_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

echo ""
echo "🎉 AutoML System is running!"
echo "📊 Backend API: http://localhost:8000"
echo "🎨 Frontend Dashboard: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for both processes
wait
