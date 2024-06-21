import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../assets/leftArrow';
import BackGr from '../assets/cloudIcon';

const questions = [
  { id: '1', question: 'How often do you find yourself daydreaming?' },
  { id: '2', question: 'Do you feel a strong emotional attachment to the characters or stories in your daydreams?' },
  { id: '3', question: 'Are your daydreams vivid and immersive, often lasting a long time?' },
  { id: '4', question: 'How often do you daydream when you should be focused, like at work or while driving?' },
  { id: '5', question: 'Do you daydream in stressful situations?' },
  { id: '6', question: 'How often do you listen to music?' },
  { id: '7', question: 'How often do you daydream while listening to music?' },
  { id: '8', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '9', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '10', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '11', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '12', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '13', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '14', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '15', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '16', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '17', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '18', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '19', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '20', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '21', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '22', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '23', question: 'Do you find it easy to stay focused on tasks?' },
  { id: '24', question: 'Do you find it easy to stay focused on tasks?' },
];

const options = ['Very often', 'Often', 'Sometimes', 'Rarely or never'];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const navigation = useNavigation();

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitAnswers();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitAnswers = () => {
    fetch('http://127.0.0.1:5000/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    })
      .then((response) => response.json())
      .then((data) => {
        Alert.alert('Success', 'Your answers have been submitted!');
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'There was an error submitting your answers.');
      });
  };

  const renderQuestion = () => {
    return (
      <>
        <View style={styles.graphicContainer}>
          <BackGr />
          <TouchableOpacity style={styles.navigateHomeArrow} onPress={() => { navigation.navigate('Home') }}>
            <Arrow color='#FFFFFF' />
          </TouchableOpacity>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionHeader}>Question {currentQuestionIndex + 1}/{questions.length}</Text>
          <Text style={styles.questionText}>{questions[currentQuestionIndex].question}</Text>
        </View>
        <View style={styles.optionContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                answers[currentQuestionIndex] === option && styles.selectedOption,
              ]}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.navigationContainer}>
          {currentQuestionIndex > 0 && (
            <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <TouchableOpacity style={styles.navButton} onPress={handleNext}>
              <Text style={styles.navButtonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.navButton} onPress={submitAnswers}>
              <Text style={styles.navButtonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {renderQuestion()}
    </View>
  );
}

const styles = StyleSheet.create({
  graphicContainer: {
    height: 100,
    width: '95%',
    borderRadius: 25,
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: '#E6F0F1',
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    backgroundColor: '#CBDEE1',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
  },
  questionHeader: {
    fontSize: 14,
    color: '#5D6277',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#2E456F',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#5A81A7',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  navButton: {
    backgroundColor: '#2E456F',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '27%',
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50,
    // height: 45,
  },
  navButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionContainer: {
    alignItems: 'center',
    marginTop: 40,
    width: 200,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navigateHomeArrow: {
    position: 'absolute',
    top: 0, 
    left: 0, 
    padding: 10, 
  },
});
