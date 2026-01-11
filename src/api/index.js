import axios from 'axios';

// Use relative path to leverage Vite proxy
const API_URL = '';

const getAuthToken = () => {
    const stored = localStorage.getItem('authData');
    if (!stored) return null;
    try {
        const parsed = JSON.parse(stored);
        return parsed.token;
    } catch (e) {
        console.error("Failed to parse auth data", e);
        return null;
    }
};

const getHeaders = () => {
    const token = getAuthToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const api = {
    register: (data) => {
        // body: { name, email, password, role }
        return axios.post(`${API_URL}/sign-up`, data);
    },

    login: (data) => {
        // body: { username, password }
        return axios.post(`${API_URL}/login`, data);
    },

    getAllTasks: () => {
        return axios.get(`${API_URL}/All-Task`, { headers: getHeaders() });
    },

    createTask: (data) => {
        // body: { name, description, timestamp: { time } }
        return axios.post(`${API_URL}/create-task`, data, { headers: getHeaders() });
    },

    updateTask: (id, data) => {
        // body: { name, description }
        return axios.patch(`${API_URL}/update-task/${id}`, data, { headers: getHeaders() });
    },

    deleteTask: (id) => {
        return axios.delete(`${API_URL}/delete-task/${id}`, { headers: getHeaders() });
    }
};
