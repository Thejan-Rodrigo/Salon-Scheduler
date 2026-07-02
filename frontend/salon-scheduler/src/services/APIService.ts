// src/services/APIService.ts

import axios from "axios";

const APIService = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default APIService;