const WEATHER_API_URL = "https://api.openweathermap.org/data/3.0/onecall";

export const fetchWeatherData = async (lat: number, lng: number) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const {
      current: {
        temp,
        feels_like,
        weather: [{ description, icon }],
      },
    } = await response.json();

    return {
      temperature: temp,
      feelsLike: feels_like,
      description: description,
      weatherIcon: icon,
    };
  } catch (error) {
    return null;
  }
};
