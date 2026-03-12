import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000'
});

export const getDashboard = async () => (await api.get('/dashboard')).data;
export const getLesson = async (day) => (await api.get(`/lesson/${day}`)).data;
export const submitAssignment = async (payload) => (await api.post('/assignment/submit', payload)).data;
export const getProgress = async () => (await api.get('/progress')).data;
export const saveReflection = async (payload) => (await api.post('/reflection', payload)).data;

export default api;
