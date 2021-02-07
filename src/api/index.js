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

export const getAllItrees = payload => api.get(`/items`, payload);
export const getTreeById = id => api.get(`/item/${id}`);
export const insertTree = payload => api.post(`/item`, payload);
export const updateTreeById = (id, payload) => api.put(`/item/${id}`, payload);
export const deleteTreeById = id => api.delete(`/item/${id}`);

const apis = {
    getAllItrees,
    getTreeById,
    insertTree,
    updateTreeById,
    deleteTreeById,
};

export default apis;