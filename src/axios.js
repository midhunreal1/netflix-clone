import axios from "axios";
import { baseUrl } from "./constants/constants";

// CORS proxy services to bypass regional restrictions
const proxyServers = [
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/get?url=',
  'https://corsproxy.io/?'
];

// Create axios instance with proxy support
const instance = axios.create({
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor to handle proxy
instance.interceptors.request.use(
    (config) => {
        // Use CORS proxy for TMDB API requests
        if (!config.url.startsWith('http')) {
            // Use corsproxy.io as it's more reliable
            config.url = `https://corsproxy.io/?${encodeURIComponent(baseUrl + config.url)}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle proxy response
instance.interceptors.response.use(
    (response) => {
        // If using allorigins, extract contents
        if (response.data && response.data.contents) {
            try {
                response.data = JSON.parse(response.data.contents);
            } catch (e) {
                // If parsing fails, use as is
            }
        }
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // If request fails with current proxy, try fallback
        if (error.response?.status >= 400 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            // Try direct request as fallback
            try {
                originalRequest.url = originalRequest.url.replace(/https:\/\/corsproxy\.io\/\?[^&]*/, baseUrl);
                return instance(originalRequest);
            } catch (fallbackError) {
                console.warn('API request failed with proxy and direct access:', fallbackError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default instance;