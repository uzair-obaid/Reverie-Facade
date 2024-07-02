import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const handleStartQuiz = () => {
    navigation.navigate('Quiz');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to the REVERIE FACADE - A Daydream Analyzer</Text>
      <Text style={styles.subtitle}>
        Take a quick quiz to help us examine your daydreaming habits.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleStartQuiz}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
      <View style={styles.tipsContainer}>
        <Text style={styles.tipTitle}>Quick Tips:</Text>
        <Text style={styles.tip}>1. Stay hydrated.</Text>
        <Text style={styles.tip}>2. Take regular breaks.</Text>
        <Text style={styles.tip}>3. Maintain a balanced diet.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tipsContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tip: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Home;
