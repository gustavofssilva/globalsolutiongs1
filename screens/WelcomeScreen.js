import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.replace('Main');
  };

  return (
    <LinearGradient
      colors={['#ffff00', '#ffb300']}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        
        <Text style={styles.subtitle}>
          Um app para te ajudar a se manter seguro e confortável em dias de calor extremo.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleStart}
          accessibilityLabel="Botão para começar o app"
          accessibilityHint="Vai para a tela principal"
        >
          <Text style={styles.buttonText}>Começar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 25,
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 240,
    height: 240,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#013055',
    marginBottom: 40,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#013055',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 22,
    textAlign: 'center',
  },
});
