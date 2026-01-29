# API Integration Quick Reference

## Import the Refactored API

```javascript
import { 
  fetchWeatherByCity, 
  fetchForecastByCity, 
  fetchCitySuggestions 
} from "./api/weatherApi";

import { API_CONFIG, UNIT_CONVERSIONS } from "./api/config";
import { useUnit } from "./context/UnitContext";
```

---

## Common Usage Patterns

### 1. Fetch Weather for a City
```javascript
const { unit } = useUnit();
const apiUnit = unit === "C" ? "metric" : "imperial";

const weather = await fetchWeatherByCity("Paris", apiUnit);
if (weather) {
  console.log(`Temperature: ${weather.main.temp}°`);
  console.log(`City: ${weather.name}, ${weather.sys.country}`);
}
```

### 2. Get City Suggestions (Autocomplete)
```javascript
const suggestions = await fetchCitySuggestions("New");
// Returns: [{ name: "New York", country: "US", ... }, ...]
```

### 3. Fetch Forecast Data
```javascript
const forecast = await fetchForecastByCity("Tokyo", "metric");
if (forecast && forecast.list) {
  // forecast.list is array of 5-day/40-entry forecast
  const nextHours = forecast.list.slice(0, 8);
}
```

### 4. Convert Units Dynamically
```javascript
const celsius = 25;
const fahrenheit = UNIT_CONVERSIONS.imperial.temp(celsius); // 77

const kmh = 10;
const mph = UNIT_CONVERSIONS.imperial.speed(kmh); // 5.6

const meters = 10000;
const miles = UNIT_CONVERSIONS.imperial.distance(meters); // 6.21
```

### 5. Build Custom API URLs
```javascript
import { buildURL, API_CONFIG } from "./api/config";

const url = buildURL(API_CONFIG.ENDPOINTS.WEATHER, {
  q: "London",
  units: "metric"
});
// "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=..."
```

---

## API Configuration

### Change Default City
```javascript
// In src/api/config.js
export const API_CONFIG = {
  ...
  DEFAULT_CITY: "New York", // Changed from "Chennai"
  ...
};
```

### Add Major Cities
```javascript
// In src/api/config.js
export const API_CONFIG = {
  ...
  MAJOR_CITIES: ["London", "Paris", "Tokyo", "Delhi", "Sydney"], // Added Sydney
  ...
};
```

### Change API Timeout
```javascript
// In src/api/config.js
export const API_CONFIG = {
  ...
  TIMEOUT: 15000, // Increased from 10000ms
  ...
};
```

---

## Component Integration Example

### Using in a React Component
```javascript
import { useEffect, useState } from "react";
import { fetchWeatherByCity } from "./api/weatherApi";
import { useUnit } from "./context/UnitContext";

function WeatherCard({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const { unit } = useUnit();

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      const apiUnit = unit === "C" ? "metric" : "imperial";
      const data = await fetchWeatherByCity(city, apiUnit);
      setWeather(data);
      setLoading(false);
    };
    
    loadWeather();
  }, [city, unit]);

  if (loading) return <div>Loading...</div>;
  if (!weather) return <div>No data</div>;

  return (
    <div>
      <h2>{weather.name}</h2>
      <p>Temperature: {Math.round(weather.main.temp)}°{unit}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {Math.round(weather.wind.speed)} {unit === "C" ? "m/s" : "mph"}</p>
    </div>
  );
}

export default WeatherCard;
```

---

## API Response Structure

### Weather Response
```javascript
{
  cod: 200,
  name: "London",
  sys: { country: "GB", ... },
  main: {
    temp: 15.5,
    feels_like: 14.2,
    humidity: 72,
    pressure: 1013,
    ...
  },
  weather: [{
    id: 803,
    main: "Clouds",
    description: "broken clouds",
    icon: "04d"
  }],
  wind: {
    speed: 6.5,      // m/s
    deg: 230,        // degrees
    gust: 12.1
  },
  clouds: {
    all: 75          // percentage
  },
  visibility: 10000, // meters
  ...
}
```

### Forecast Response
```javascript
{
  cod: "200",
  list: [
    {
      dt: 1234567890,
      main: { temp: 15.5, humidity: 72, ... },
      weather: [{ ... }],
      wind: { speed: 6.5, deg: 230, ... },
      clouds: { all: 75 },
      pop: 0.2,              // probability of precipitation
      rain: { "3h": 0.5 },   // optional, if rain expected
      ...
    },
    // ... 40 entries total (5 days × 8 entries per day)
  ],
  ...
}
```

### City Suggestions Response
```javascript
[
  {
    name: "London",
    state: "",
    country: "GB",
    lat: 51.5085,
    lon: -0.1257
  },
  {
    name: "London",
    state: "Kentucky",
    country: "US",
    lat: 38.1299,
    lon: -83.4494
  },
  // ... up to 6 results
]
```

---

## Error Handling

```javascript
import { fetchWeatherByCity } from "./api/weatherApi";

const loadWeather = async (city) => {
  try {
    const weather = await fetchWeatherByCity(city, "metric");
    
    if (!weather) {
      console.error("City not found or API error");
      // Show user-friendly error message
      setError(`Could not find weather for ${city}`);
      return;
    }
    
    setWeather(weather);
    setError(null);
  } catch (err) {
    console.error("Network error:", err);
    setError("Network error. Please try again.");
  }
};
```

---

## Unit Conversion Reference

### Temperature
```javascript
// Celsius to Fahrenheit
F = (C × 9/5) + 32

// Fahrenheit to Celsius
C = (F - 32) × 5/9
```

### Wind Speed
```javascript
// Meters/sec to km/h
kmh = m/s × 3.6

// Meters/sec to mph
mph = m/s × 2.237

// Meters/sec to knots
knots = m/s × 1.944
```

### Distance/Visibility
```javascript
// Meters to kilometers
km = m ÷ 1000

// Meters to miles
mi = m ÷ 1609.34
```

### Pressure
```javascript
// hPa to inHg
inHg = hPa × 0.02953

// hPa to mmHg
mmHg = hPa × 0.75006
```

---

## Debugging Tips

### Check API Response
```javascript
const weather = await fetchWeatherByCity("London", "metric");
console.log(JSON.stringify(weather, null, 2));
```

### Verify Unit Conversion
```javascript
const original = 25;
const converted = UNIT_CONVERSIONS.imperial.temp(original);
console.log(`${original}°C = ${converted}°F`);
```

### Test API Config
```javascript
import { API_CONFIG, buildURL } from "./api/config";
console.log("API Key:", API_CONFIG.API_KEY);
console.log("Base URL:", API_CONFIG.BASE_URL);
console.log("Default City:", API_CONFIG.DEFAULT_CITY);
console.log("Built URL:", buildURL(API_CONFIG.ENDPOINTS.WEATHER, { q: "Paris" }));
```

---

## Performance Notes

- All API calls are async and non-blocking
- Use loading states while fetching data
- Consider caching responses to reduce API calls
- API has rate limits (~60 calls/min for free tier)
- Forecast data refreshes every 3 hours
- Weather data updates every 10 minutes

---

## Related Files

- API Functions: [src/api/weatherApi.js](./src/api/weatherApi.js)
- Configuration: [src/api/config.js](./src/api/config.js)
- Unit Context: [src/context/UnitContext.jsx](./src/context/UnitContext.jsx)
- Main App: [src/App.jsx](./src/App.jsx)
