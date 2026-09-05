const API_BASE_URL = 'http://localhost:3000';

// Helper function to handle fetch requests with Authorization headers
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('voting_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || `Request failed (${res.status})`);
    }
    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
};

export const api = {
  // Auth APIs
  signup: (userData) => request('/user/signup', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => request('/user/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getProfile: () => request('/user/profile'),
  changePassword: (passwordData) => request('/user/profile/password', { method: 'PUT', body: JSON.stringify(passwordData) }),

  // Candidate APIs
  getCandidates: () => request('/candidate'),
  voteCandidate: (candidateId) => request(`/candidate/vote/${candidateId}`, { method: 'POST' }),
  getVoteCounts: () => request('/candidate/vote/count'),

  // Admin Candidate Management APIs
  addCandidate: (candidateData) => request('/candidate', { method: 'POST', body: JSON.stringify(candidateData) }),
  updateCandidate: (candidateId, data) => request(`/candidate/${candidateId}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCandidate: (candidateId) => request(`/candidate/${candidateId}`, { method: 'DELETE' }),
};
