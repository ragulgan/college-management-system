import axiosInstance from './axiosInstance';

export const loginUser = (credentials) => axiosInstance.post('/auth/login/admin', credentials);
export const userList = (credentials) => axiosInstance.get('/user', credentials);
export const userAdd = (credentials) => axiosInstance.post('/user', credentials);
export const userUpdate = (id, credentials) => axiosInstance.put(`/user/${id}`, credentials);