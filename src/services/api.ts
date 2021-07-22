import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dry-crag-31377.herokuapp.com',
});

export default api;
