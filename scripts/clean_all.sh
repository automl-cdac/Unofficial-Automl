#!/bin/bash

# AutoML Clean Script
# This script cleans temporary files, cache, and resets the environment

echo "🧹 Cleaning Unofficial-Automl System"
echo "===================================="

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Clean Python cache files
echo "🗑️  Cleaning Python cache files..."
find . -type f -name "*.pyc" -delete
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true

# Clean Django cache
echo "🗑️  Cleaning Django cache..."
if [ -d "backend" ]; then
    cd backend
    if command_exists python3; then
        python3 manage.py flush --noinput 2>/dev/null || true
    fi
    cd ..
fi

# Clean Node.js cache
echo "🗑️  Cleaning Node.js cache..."
if [ -d "frontend/react_dashboard" ]; then
    cd frontend/react_dashboard
    if command_exists npm; then
        rm -rf node_modules package-lock.json 2>/dev/null || true
    fi
    cd ../..
fi

# Clean database (optional - uncomment if needed)
# echo "🗑️  Cleaning database..."
# if [ -f "backend/db.sqlite3" ]; then
#     rm backend/db.sqlite3
# fi

# Clean media files (optional - uncomment if needed)
# echo "🗑️  Cleaning media files..."
# if [ -d "backend/media" ]; then
#     rm -rf backend/media/*
# fi

echo "✅ Cleanup completed!"
echo ""
echo "To reinstall dependencies:"
echo "  Backend: cd backend && pip install -r requirements.txt"
echo "  Frontend: cd frontend/react_dashboard && npm install"
