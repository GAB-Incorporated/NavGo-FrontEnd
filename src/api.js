import axios from 'axios';

const api = axios.create({
    baseURL: "https://navgo-api-120458826340.southamerica-east1.run.app"
});

export default api;