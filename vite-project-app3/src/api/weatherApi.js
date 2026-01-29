import { API_CONFIG, buildURL } from "./config";

/**
 * Fetch current weather by city name
 * @param {string} city - City name
 * @param {string} units - 'metric' or 'imperial'
 * @returns {Promise<Object|null>} - Weather data or null on error
 */
export const fetchWeatherByCity = async (city, units = API_CONFIG.DEFAULT_UNITS) => {
  try {
    const url = buildURL(API_CONFIG.ENDPOINTS.WEATHER, {
      q: encodeURIComponent(city),
      units,
    });

    const response = await fetch(url, { timeout: API_CONFIG.TIMEOUT });
    const data = await response.json();

    if (data.cod !== 200) {
      console.warn(`Weather API returned code: ${data.cod}`);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Weather API error:", err);
    return null;
  }
};

/**
 * Fetch weather by coordinates (latitude, longitude)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - 'metric' or 'imperial'
 * @returns {Promise<Object|null>} - Weather data or null on error
 */
export const fetchWeatherByCoords = async (lat, lon, units = API_CONFIG.DEFAULT_UNITS) => {
  try {
    const url = buildURL(API_CONFIG.ENDPOINTS.WEATHER, {
      lat,
      lon,
      units,
    });

    const response = await fetch(url, { timeout: API_CONFIG.TIMEOUT });
    const data = await response.json();

    if (data.cod !== 200) {
      console.warn(`Weather API returned code: ${data.cod}`);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Weather by coordinates API error:", err);
    return null;
  }
};

/**
 * Fetch forecast by city name
 * @param {string} city - City name
 * @param {string} units - 'metric' or 'imperial'
 * @returns {Promise<Object|null>} - Forecast data or null on error
 */
export const fetchForecastByCity = async (city, units = API_CONFIG.DEFAULT_UNITS) => {
  try {
    const url = buildURL(API_CONFIG.ENDPOINTS.FORECAST, {
      q: encodeURIComponent(city),
      units,
    });

    const response = await fetch(url, { timeout: API_CONFIG.TIMEOUT });
    const data = await response.json();

    if (data.cod !== "200") {
      console.warn(`Forecast API returned code: ${data.cod}`);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Forecast API error:", err);
    return null;
  }
};

/**
 * Fetch forecast by coordinates
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} units - 'metric' or 'imperial'
 * @returns {Promise<Object|null>} - Forecast data or null on error
 */
export const fetchForecastByCoords = async (lat, lon, units = API_CONFIG.DEFAULT_UNITS) => {
  try {
    const url = buildURL(API_CONFIG.ENDPOINTS.FORECAST, {
      lat,
      lon,
      units,
    });

    const response = await fetch(url, { timeout: API_CONFIG.TIMEOUT });
    const data = await response.json();

    if (data.cod !== "200") {
      console.warn(`Forecast API returned code: ${data.cod}`);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Forecast by coordinates API error:", err);
    return null;
  }
};

/**
 * Fetch city suggestions from Geocoding API
 * @param {string} query - City search query
 * @param {number} limit - Maximum results to return
 * @returns {Promise<Array>} - Array of city suggestions
 */
export const fetchCitySuggestions = async (query, limit = API_CONFIG.GEOCODING_LIMIT) => {
  try {
    const url = buildURL(API_CONFIG.ENDPOINTS.GEOCODING, {
      q: encodeURIComponent(query),
      limit,
    });

    const response = await fetch(url, { timeout: API_CONFIG.TIMEOUT });
    const data = await response.json();

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("City suggestions API error:", err);
    return [];
  }
};

/**
 * Fetch reverse geocoding (coordinates to city)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} limit - Maximum results to return
 * @returns {Promise<Array>} - Array of location suggestions
 */
export const fetchReverseGeocoding = async (lat, lon, limit = 1) => {
  try {
    const url = buildURL(API_CONFIG.ENDPOINTS.GEOCODING, {
      lat,
      lon,
      limit,
    });

    const response = await fetch(url, { timeout: API_CONFIG.TIMEOUT });
    const data = await response.json();

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Reverse geocoding API error:", err);
    return [];
  }
};
