import axios from "axios";
import { useAuthStore } from "../store/authStore";

// Helper to get token from Zustand (or localStorage as fallback)
function getToken() {
  try {
    const { token } = useAuthStore.getState();
    if (token) return token;
  } catch {
    return localStorage.getItem("token");
  }
  return null;
}

const instance = axios.create({
  baseURL: "https://api.usecompass.co",
  withCredentials: true,
});

import { getFullDeviceInfo } from "./device-info";

let cachedDeviceInfo: { fingerprint: string; deviceInfo: string } | null = null;

async function getHeadersInfo() {
  if (cachedDeviceInfo) return cachedDeviceInfo;
  cachedDeviceInfo = await getFullDeviceInfo();
  return cachedDeviceInfo;
}

// Request interceptor: attach JWT if present
instance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add device info, fingerprint and current URL to headers
    try {
      const { fingerprint, deviceInfo } = await getHeadersInfo();
      config.headers["x-fingerprint"] = fingerprint;
      config.headers["x-device-info"] = deviceInfo;
      if (typeof window !== "undefined") {
        config.headers["x-current-url"] = window.location.href;
      }
    } catch (err) {
      console.error("Failed to attach extra headers", err);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: handle errors globally
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: logout on 401 Unauthorized
    if (error.response && error.response.status === 401) {
      try {
        // FIX: Use 'clearUser' instead of 'logout'
        const { clearUser } = useAuthStore.getState();
        clearUser();
      } catch {
        // fallback: clear localStorage
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
