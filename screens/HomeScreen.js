import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import * as Location from 'expo-location';
import getWeatherData from '../utils/weatherAPI';
import getInmetAlert from '../utils/inmetAPI';
import getWeatherForecast from '../utils/weatherForecastAPI';

const backgroundImages = {
  Clear: require('../assets/clear.jpg'),
  Clouds: require('../assets/clouds.jpg'),
  Rain: require('../assets/rain.jpg'),
  Thunderstorm: require('../assets/thunder.jpg'),
  Snow: require('../assets/snow.jpg'),
  Night: require('../assets/night.jpg'),
  Default: require('../assets/default.jpg'),
};

const regionToUF = {
  Acre: 'AC',
  Alagoas: 'AL',
  Amapá: 'AP',
  Amazonas: 'AM',
  Bahia: 'BA',
  Ceará: 'CE',
  'Distrito Federal': 'DF',
  'Espírito Santo': 'ES',
  Goiás: 'GO',
  Maranhão: 'MA',
  'Mato Grosso': 'MT',
  'Mato Grosso do Sul': 'MS',
  'Minas Gerais': 'MG',
  Pará: 'PA',
  Paraíba: 'PB',
  Paraná: 'PR',
  Pernambuco: 'PE',
  Piauí: 'PI',
  'Rio de Janeiro': 'RJ',
  'Rio Grande do Norte': 'RN',
  'Rio Grande do Sul': 'RS',
  Rondônia: 'RO',
  Roraima: 'RR',
  'Santa Catarina': 'SC',
  'São Paulo': 'SP',
  Sergipe: 'SE',
  Tocantins: 'TO',
};

export default function HomeScreen({ navigation }) {
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [loadingInmet, setLoadingInmet] = useState(true);
  const [weather, setWeather] = useState(null);
  const [locationInfo, setLocationInfo] = useState(null);
  const [inmetAlert, setInmetAlert] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeather = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});

      const weatherData = await getWeatherData(
        location.coords.latitude,
        location.coords.longitude
      );
      setWeather(weatherData);

      const forecastData = await getWeatherForecast(
        location.coords.latitude,
        location.coords.longitude
      );
      setForecast(forecastData);

      const [address] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocationInfo(address);

      setLoadingWeather(false);
      setErrorMsg(null);

      const uf = regionToUF[address.region];
      if (uf) {
        const alertData = await getInmetAlert(uf);
        setInmetAlert(alertData);
      }
      setLoadingInmet(false);
    } catch (error) {
      setErrorMsg('Erro ao atualizar clima.');
      setLoadingWeather(false);
      setLoadingInmet(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setLoadingInmet(true);
    await fetchWeather();
    setRefreshing(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão negada para acessar localização.');
        setLoadingWeather(false);
        setLoadingInmet(false);
        return;
      }

      await fetchWeather();
    })();
  }, []);

  const getBackgroundImage = (desc) => {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;

    if (isNight) {
      return backgroundImages.Night;
    }

    if (!desc) return backgroundImages.Default;

    const key = desc.toLowerCase();

    if (key.includes('nublado')) return backgroundImages.Clouds;
    if (key.includes('chuva')) return backgroundImages.Rain;
    if (key.includes('limpo')) return backgroundImages.Clear;
    if (key.includes('neve')) return backgroundImages.Snow;
    if (key.includes('trovoada')) return backgroundImages.Thunderstorm;

    return backgroundImages.Default;
  };

  if (loadingWeather) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#013055" />
        <Text style={styles.loadingText}>Carregando clima...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={getBackgroundImage(weather?.description)}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={styles.overlay}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ff6600']}
          />
        }
      >
        {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}

        {locationInfo && (
          <Text style={styles.location}>
            {locationInfo.district}, {locationInfo.city} - {locationInfo.region}
          </Text>
        )}

        {weather && (
          <>
            <Text style={styles.temp}>{Math.round(weather.temp)}°C</Text>
            <Text style={styles.description}>{weather.description}</Text>
            {weather.temp >= 30 && (
              <View style={styles.heatAlertBox}>
                <Text style={styles.heatAlertText}>
                  ⚠️ Temperatura alta! Cuide-se do calor! 🌞
                </Text>
              </View>
            )}
          </>
        )}

        {forecast?.forecast?.forecastday?.[1] && (
          <View style={styles.forecastContainer}>
            <View key={forecast.forecast.forecastday[1].date} style={styles.forecastDay}>
              <Text style={styles.forecastDate}>
                {new Date(forecast.forecast.forecastday[1].date).toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'short',
                })}
              </Text>
              <Text style={styles.forecastTemp}>
                Máx: {Math.round(forecast.forecast.forecastday[1].day.maxtemp_c)}°C / Mín:{' '}
                {Math.round(forecast.forecast.forecastday[1].day.mintemp_c)}°C
              </Text>
            </View>
          </View>
        )}

        {!loadingInmet && inmetAlert && (
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>{inmetAlert.title}</Text>
            <Text style={styles.alertMessage}>{inmetAlert.description}</Text>
          </View>
        )}

        <Text style={styles.swipeHint}>
          Deslize para acessar as dicas de prevenção ao calor extremo →
        </Text>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 25,
    paddingTop: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#013055',
  },
  error: {
    color: '#ffcccc',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  location: {
    fontSize: 18,
    color: '#eee',
    marginBottom: 8,
    textAlign: 'center',
  },
  temp: {
    fontSize: 96,
    fontWeight: '200',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 22,
    fontStyle: 'italic',
    color: '#eee',
    marginBottom: 8,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  heatAlertBox: {
    backgroundColor: '#cc0000',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    maxWidth: '90%',
    alignItems: 'center',
  },
  heatAlertText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  forecastContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  forecastDay: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
    paddingBottom: 8,
  },
  forecastDate: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  forecastCondition: {
    fontSize: 18,
    color: '#ddd',
    marginVertical: 4,
    textAlign: 'center',
  },
  forecastTemp: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
  },
  alertBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
    maxWidth: '90%',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#cc0000',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#333',
  },
  swipeHint: {
    fontSize: 14,
    color: '#ffffffaa',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
