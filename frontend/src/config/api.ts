// API Configuration
// This file centralizes all API endpoint URLs

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '');

export const API_ENDPOINTS = {
    analyze: `${API_BASE_URL}/api/analyze`,
    createCheckoutSession: `${API_BASE_URL}/api/create-checkout-session`,
    documents: `${API_BASE_URL}/api/documents`,
    document: (id: number) => `${API_BASE_URL}/api/documents/${id}`,
    health: `${API_BASE_URL}/health`,
    userStatus: `${API_BASE_URL}/api/user/status`,
    negotiate: `${API_BASE_URL}/api/negotiate`,
    chat: `${API_BASE_URL}/api/chat`,
    export: (id: number) => `${API_BASE_URL}/api/export/${id}`,
};

export default API_BASE_URL;
