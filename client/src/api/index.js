import https from 'https';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    hostname: 'http://localhost:3000/',
    httpsAgent: https.Agent({
        rejectUnauthorized: false,
    }),
});

// TODO - use interceptors for better error handling: https://masteringjs.io/tutorials/axios/interceptors#error-handling

export const getAllTrees = payload => api.get(`/trees`, payload);
export const getTreeById = id => api.get(`/tree/${id}`);
export const insertTree = payload => api.post(`/tree`, payload);
export const updateTreeById = (id, payload) => api.put(`/tree/${id}`, payload);
export const deleteTreeById = id => api.delete(`/tree/${id}`);
export const getUsers = payload => api.get(`/users/all`, payload);

const apis = {
    getAllTrees,
    getTreeById,
    insertTree,
    updateTreeById,
    deleteTreeById,
    getUsers
};

export default apis;