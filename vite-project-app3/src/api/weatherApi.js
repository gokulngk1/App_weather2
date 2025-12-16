const API_KEY = "4e8a86f79d5484ae4cda8af753e9e97f";

export const fetchWeatherByCity = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    const data = await response.json();
    if (data.cod !== 200) return null;

    return data;
  } catch (err) {
    console.error("Weather API error:", err);
    return null;
  }
};
