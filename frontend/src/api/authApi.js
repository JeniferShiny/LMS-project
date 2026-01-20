const BASE_URL = 'http://localhost:5000/api/auth';

/**
 * Common handler for fetch responses to reduce code repetition
 */
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

export const authApi = {
  // 1. User Login
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  // 2. Forgot Password Request
  ForgotPassword: async (email) => {
    const response = await fetch(`${BASE_URL}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  // 3. Reset Password with Token
  resetPassword: async (token,password) => {
    const response = await fetch(`${BASE_URL}/reset-password/${token}`,{
      method: 'PUT',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({password}),
    });return handleResponse(response);
  },

  // 3. Admin: Get all users
  getAllUsers: async (token) => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
    });
    return handleResponse(response);
  },

  // 4. Admin: Create a new user
  createUser: async (userData, token) => {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // 5. Admin: Toggle user activation
  // NOTE: Matches the .put('/users/:id/status') route in your backend
  updateUserStatus: async (userId, isActive, token) => {
    const response = await fetch(`${BASE_URL}/users/${userId}/status`, {
      method: 'PUT', 
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ isActive }), // Using isActive to match your Model
    });
    return handleResponse(response);
  }
};