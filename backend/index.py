"""
Vercel serverless function entry point for FastAPI backend.
"""
import sys
import os

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(__file__))

# Import the FastAPI app
from main import app

# Vercel looks for 'app' or 'handler'
# The app is already defined in main.py, we just re-export it
