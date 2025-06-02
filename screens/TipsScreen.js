import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const dicas = [
  { emoji: '💧', titulo: 'Beba muita água', descricao: 'Hidrate-se constantemente, mesmo sem sede.' },
  { emoji: '🧴', titulo: 'Use protetor solar', descricao: 'Reaplique a cada 2 horas se estiver exposto ao sol.' },
  { emoji: '🧢', titulo: 'Proteja-se do sol', descricao: 'Use boné, óculos e roupas leves.' },
  { emoji: '🏠', titulo: 'Evite sair no pico do calor', descricao: 'Prefira sair antes das 10h ou após as 16h.' },
  { emoji: '🧊', titulo: 'Mantenha ambientes frescos', descricao: 'Use ventiladores ou resfrie com panos úmidos.' },
];

export default function TipsScreen() {
  return (
    <LinearGradient
      colors={['#ffcc70', '#ff8177']} // gradiente suave e agradável
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Como se Proteger do Calor Extremo</Text>
        <Text style={styles.subtitle}>
          Em dias muito quentes, é essencial tomar cuidados para manter a saúde e o bem-estar. Veja abaixo algumas recomendações importantes:
        </Text>

        {dicas.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardDesc}>{item.descricao}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.8)', // fundo semi-transparente
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  emoji: {
    fontSize: 28,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },
  cardDesc: {
    fontSize: 15,
    color: '#555',
  },
});
