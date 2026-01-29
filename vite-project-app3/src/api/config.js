/**
 * API Configuration
 * Centralized configuration for all API calls
 */

export const API_CONFIG = {
  API_KEY: "4e8a86f79d5484ae4cda8af753e9e97f",
  BASE_URL: "https://api.openweathermap.org",
  
  // Default settings
  DEFAULT_CITY: "Chennai",
  DEFAULT_UNITS: "metric",
  
  // Major cities for quick access
  MAJOR_CITIES: ["London", "Paris", "Tokyo", "Delhi"],
  
  // API Endpoints paths
  ENDPOINTS: {
    WEATHER: "/data/2.5/weather",
    FORECAST: "/data/2.5/forecast",
    GEOCODING: "/geo/1.0/direct",
  },
  
  // Request timeouts (in ms)
  TIMEOUT: 10000,
  
  // Pagination limits
  GEOCODING_LIMIT: 6,
};

/**
 * Build complete API URL
 * @param {string} endpoint - API endpoint path
 * @param {Object} params - Query parameters
 * @returns {string} - Complete API URL
 */
export const buildURL = (endpoint, params = {}) => {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  
  // Add API key if not already present
  if (!params.appid && !params.api_key) {
    params.appid = API_CONFIG.API_KEY;
  }
  
  // Add all parameters
  Object.keys(params).forEach((key) => {
    if (params[key] !== null && params[key] !== undefined) {
      url.searchParams.append(key, params[key]);
    }
  });
  
  return url.toString();
};

/**
 * Unit conversion utilities
 */
export const UNIT_CONVERSIONS = {
  metric: {
    temp: (value) => value, // Celsius
    speed: (value) => value, // m/s
    distance: (value) => value, // meters
    pressure: (value) => value, // hPa
    symbol: {
      temp: "°C",
      speed: "m/s",
      distance: "km",
      pressure: "hPa",
    },
  },
  imperial: {
    temp: (value) => (value * 9) / 5 + 32, // Fahrenheit
    speed: (value) => value * 2.237, // mph
    distance: (value) => value / 1609.34, // miles
    pressure: (value) => value * 0.02953, // inHg
    symbol: {
      temp: "°F",
      speed: "mph",
      distance: "mi",
      pressure: "inHg",
    },
  },
};
