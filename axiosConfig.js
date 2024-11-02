// axiosConfig.js
import axios from 'axios';
import { myip, mydbAPI } from './IP';  // Chemin vers le fichier de config

// Configuration globale
const api = axios.create({

  baseURL: `http://${myip}:80/${mydbAPI}/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
