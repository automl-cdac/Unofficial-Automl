#!/usr/bin/env python3
"""
Utility functions for the Unofficial-Automl system
"""

import os
import sys
import subprocess
import json
import requests
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8+ is required")
        return False
    print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor} detected")
    return True

def check_dependencies():
    """Check if required dependencies are installed"""
    required_packages = [
        'django',
        'djangorestframework',
        'pandas',
        'numpy',
        'scikit-learn',
        'plotly',
        'google-generativeai',
        'langchain',
        'langchain-google-genai'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print(f"❌ Missing packages: {', '.join(missing_packages)}")
        print("Run: pip install -r backend/requirements.txt")
        return False
    
    print("✅ All required packages are installed")
    return True

def check_api_keys():
    """Check if API keys are configured"""
    env_file = Path("backend/.env")
    if not env_file.exists():
        print("⚠️  .env file not found in backend directory")
        print("Please create backend/.env with your API keys")
        return False
    
    # Read .env file
    try:
        with open(env_file, 'r') as f:
            content = f.read()
            if 'GOOGLE_API_KEY=your-google-gemini-api-key-here' in content:
                print("⚠️  GOOGLE_API_KEY not configured")
                return False
    except Exception as e:
        print(f"❌ Error reading .env file: {e}")
        return False
    
    print("✅ API keys are configured")
    return True

def check_database():
    """Check if database is properly set up"""
    try:
        # Try to run Django check
        result = subprocess.run(
            ['python', 'backend/manage.py', 'check'],
            capture_output=True,
            text=True,
            cwd=Path.cwd()
        )
        
        if result.returncode == 0:
            print("✅ Database is properly configured")
            return True
        else:
            print(f"❌ Database check failed: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Error checking database: {e}")
        return False

def check_frontend():
    """Check if frontend dependencies are installed"""
    package_json = Path("frontend/react_dashboard/package.json")
    if not package_json.exists():
        print("❌ Frontend package.json not found")
        return False
    
    node_modules = Path("frontend/react_dashboard/node_modules")
    if not node_modules.exists():
        print("⚠️  Frontend node_modules not found")
        print("Run: cd frontend/react_dashboard && npm install")
        return False
    
    print("✅ Frontend dependencies are installed")
    return True

def run_health_check():
    """Run a comprehensive health check of the system"""
    print("🔍 Running AutoML System Health Check")
    print("=" * 40)
    
    checks = [
        ("Python Version", check_python_version),
        ("Dependencies", check_dependencies),
        ("API Keys", check_api_keys),
        ("Database", check_database),
        ("Frontend", check_frontend)
    ]
    
    all_passed = True
    for name, check_func in checks:
        print(f"\n{name}:")
        if not check_func():
            all_passed = False
    
    print("\n" + "=" * 40)
    if all_passed:
        print("✅ All health checks passed!")
        print("You can now run: ./scripts/run_all.sh")
    else:
        print("❌ Some health checks failed")
        print("Please fix the issues above before running the system")
    
    return all_passed

def create_env_template():
    """Create a template .env file"""
    env_template = """# Django Settings
SECRET_KEY=django-insecure-r!hz5rx)@#l5@bju6=n&_5+ll9@!#oxsyo6c8&vr7z-)3mpdna
DEBUG=True

# Google Gemini API
GOOGLE_API_KEY=your-google-gemini-api-key-here

# Optional: Other LLM APIs
OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here
"""
    
    env_file = Path("backend/.env")
    if env_file.exists():
        print("⚠️  .env file already exists")
        return False
    
    try:
        with open(env_file, 'w') as f:
            f.write(env_template)
        print("✅ Created backend/.env template")
        print("Please update the API keys in the file")
        return True
    except Exception as e:
        print(f"❌ Error creating .env file: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1:
        command = sys.argv[1]
        if command == "health":
            run_health_check()
        elif command == "create-env":
            create_env_template()
        else:
            print("Usage: python utils.py [health|create-env]")
    else:
        run_health_check()
