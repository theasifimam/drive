"use client";

import axios from "axios";
import { toast } from "sonner";

const API_BASE_URL = "http://localhost:5000/api";

// RETRY CONFIGURATION
const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
};

class APIClient {
  constructor() {
    this.requestQueue = new Map();

    this.client = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: true,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // REQUEST INTERCEPTOR
    this.client.interceptors.request.use(
      (config) => {
        config.headers["X-Request-ID"] = this.generateRequestId();
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR WITH RETRY
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config;

        if (!config) return Promise.reject(error);

        config._retryCount = config._retryCount || 0;

        const shouldRetry =
          config._retryCount < RETRY_CONFIG.maxRetries &&
          error.response?.status &&
          RETRY_CONFIG.retryableStatuses.includes(error.response.status);

        if (shouldRetry) {
          config._retryCount++;
          const delay =
            RETRY_CONFIG.retryDelay * Math.pow(2, config._retryCount - 1);

          await new Promise((resolve) => setTimeout(resolve, delay));
          return this.client(config);
        }

        this.handleError(error);
        return Promise.reject(error);
      }
    );
  }

  handleError(error) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    switch (status) {
      case 401:
        toast.error("Session expired. Please log in again.");
        break;
      case 403:
        toast.error("Access denied");
        break;
      case 413:
        toast.error("File too large");
        break;
      case 429:
        toast.error("Too many requests. Please slow down.");
        break;
      case 500:
      case 502:
      case 503:
        toast.error("Server error. Please try again later.");
        break;
      default:
        if (message && status !== 404) toast.error(message);
    }
  }

  generateRequestId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // REQUEST DEDUPLICATION
  async dedupeRequest(key, request) {
    if (this.requestQueue.has(key)) {
      return this.requestQueue.get(key);
    }

    const promise = request().finally(() => {
      this.requestQueue.delete(key);
    });

    this.requestQueue.set(key, promise);
    return promise;
  }

  async get(url, config) {
    const key = `GET:${url}:${JSON.stringify(config?.params)}`;
    return this.dedupeRequest(key, async () => {
      const response = await this.client.get(url, config);
      return response.data;
    });
  }

  async post(url, data, config) {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  async patch(url, data, config) {
    const response = await this.client.patch(url, data, config);
    return response.data;
  }
  async put(url, data, config) {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  async delete(url, config) {
    const response = await this.client.delete(url, config);
    return response.data;
  }
}

export const apiClient = new APIClient();
