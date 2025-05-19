import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

class AuthService {
  // Store token in localStorage
  setToken(token) {
    localStorage.setItem('goshorty_token', token);
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('goshorty_token');
  }

  // Remove token from localStorage
  removeToken() {
    localStorage.removeItem('goshorty_token');
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getToken();
  }

  // Get authenticated axios instance with token
  getAuthAxios() {
    const token = this.getToken();
    return axios.create({
      baseURL: API_URL,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Login user
  async login(credentials) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      this.setToken(response.data.token);
      return {
        success: true,
        data: response.data.user
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  }

  // Logout user
  logout() {
    this.removeToken();
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await this.getAuthAxios().get('auth/profile');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch profile'
      };
    }
  }

  // Check if user exists
  async checkUser(params) {
    try {
      const response = await axios.post(`${API_URL}/users/check`, params);
      return {
        success: true,
        exists: response.data.user
      };
    } catch (error) {
      return {
        success: false,
        exists: false,
        error: error.response?.data?.message || 'Failed to check user'
      };
    }
  }
}

class PolicyService {
  constructor() {
    this.authService = new AuthService();
  }

  // Get policies by status (Live, Expired, all)
  async getPolicies(status = 'all') {
    try {
      console.log(`Fetching policies with status: ${status}`);
      const response = await this.authService.getAuthAxios().get('/policies', {
        params: { status }
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching policies:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch policies'
      };
    }
  }

  // Get policy by ID
  async getPolicyById(id) {
    try {
      const response = await this.authService.getAuthAxios().get(`/policies/${id}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch policy'
      };
    }
  }

  // Get document download URL
  async getDocumentDownloadUrl(documentId) {
    try {
      const response = await this.authService.getAuthAxios().get(`/policies/documents/${documentId}/download`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get document download URL'
      };
    }
  }

  // Get policy counts
  async getPolicyCounts() {
    try {
      const response = await this.authService.getAuthAxios().get('/policies/counts');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch policy counts'
      };
    }
  }
}

export const authService = new AuthService();
export const policyService = new PolicyService(); 