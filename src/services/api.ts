const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const WEATHER_API_KEY = "282a05a3c8db9d58f5af2a852898e86e";

export const fetchWeatherData = async (lat: number, lng: number) => {
  const response = await fetch(
    `${WEATHER_API_URL}?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
  );
  const data = await response.json();

  if (data.cod === 200) {
    return {
      temperature: data?.main.temp,
      feelsLike: data?.main.feels_like,
      description: data?.weather[0].description,
      weatherIcon: data?.weather[0].icon,
    };
  } else {
    throw new Error(data.message);
  }
};
