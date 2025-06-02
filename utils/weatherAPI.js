import axios from 'axios';

const API_KEY = '8262c3483df9b0d68d5b7719f74bb20d';

export default async function getWeatherData(lat, lon) {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`
    );
    const data = response.data;

    return {
      temp: data.main.temp,
      description: data.weather[0].description,
    };
  } catch (error) {
    console.error('Erro ao buscar clima:', error);
    return null;
  }
}
