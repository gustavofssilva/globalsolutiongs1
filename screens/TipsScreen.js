import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const dicas = [
  { emoji: '💧', titulo: 'Beba muita água', descricao: 'Hidrate-se constantemente, mesmo sem sede.' },
  { emoji: '🧴', titulo: 'Use protetor solar', descricao: 'Reaplique a cada 2 horas se estiver exposto ao sol.' },
  { emoji: '🧢', titulo: 'Proteja-se do sol', descricao: 'Use boné, óculos escuros e roupas leves.' },
  { emoji: '🏠', titulo: 'Evite sair no pico do calor', descricao: 'Prefira sair antes das 10h ou após as 16h.' },
  { emoji: '🧊', titulo: 'Mantenha ambientes frescos', descricao: 'Use ventiladores ou panos úmidos para refrescar.' },
  { emoji: '🥗', titulo: 'Alimente-se leve', descricao: 'Prefira frutas, saladas e refeições leves.' },
  { emoji: '🚰', titulo: 'Evite bebidas alcoólicas', descricao: 'Elas podem causar desidratação.' },
  { emoji: '🛑', titulo: 'Fique atento aos sinais', descricao: 'Tontura, dor de cabeça e cansaço podem ser sinais de insolação.' },
  { emoji: '🛏️', titulo: 'Descanse em local fresco', descricao: 'Evite esforços físicos intensos durante o calor.' },
  { emoji: '👶', titulo: 'Cuide de crianças e idosos', descricao: 'Eles são mais vulneráveis ao calor extremo.' },
  { emoji: '🐶', titulo: 'Não esqueça dos animais', descricao: 'Forneça sombra e água fresca para pets.' },
];

export default function TipsScreen() {
  return (
    <LinearGradient
      colors={['#fceabb', '#f8b500']} // gradiente suave e quentinho
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Cuide-se e aproveite o calor com responsabilidade! Sua saúde agradece. 
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 25,
    paddingTop: 120,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
    color: '#4a3000',
    textAlign: 'center',
    textShadowColor: '#f0d58c',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#5a3e00',
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: '500',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    width: '100%',
    shadowColor: '#b37b00',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
  emoji: {
    fontSize: 32,
    marginRight: 18,
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
    color: '#5a3e00',
  },
  cardDesc: {
    fontSize: 16,
    color: '#6b4c00',
    lineHeight: 22,
  },
  footer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a3000',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
