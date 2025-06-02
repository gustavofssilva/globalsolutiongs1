// utils/weatherForecastAPI.js

export default async function getWeatherForecast(lat, lon) {
  const apiKey = 'c75cf95561c14803a4b190107252805';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=2&lang=pt`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar previsão do tempo');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}