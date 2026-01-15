// API Configuration
// This file centralizes all API endpoint URLs

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
    analyze: `${API_BASE_URL}/api/analyze`,
    createCheckoutSession: `${API_BASE_URL}/api/create-checkout-session`,
    documents: `${API_BASE_URL}/api/documents`,
    document: (id: number) => `${API_BASE_URL}/api/documents/${id}`,
    health: `${API_BASE_URL}/health`,
};

export default API_BASE_URL;
