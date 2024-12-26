import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://saturnonotes-api.onrender.com'
});