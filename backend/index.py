"""
Vercel serverless function entry point for FastAPI backend.
This file is required for Vercel to properly deploy the FastAPI application.
"""
from main import app

# Vercel expects a variable named 'app' or a handler function
# Since we already have 'app' from main.py, we just re-export it
__all__ = ['app']
