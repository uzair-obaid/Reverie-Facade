import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native';

const Quiz = () => {
  const questions = [
    "How often do you find yourself daydreaming?",
    "Do you feel a strong emotional attachment to the characters or stories in your daydreams?",
    "Are your daydreams vivid and immersive, often lasting for extended periods?",
    "How often you daydream in situations where you should be focused, such as during work or while driving?",
    "Have you noticed yourself daydreaming in stressful situations?",
    ["How often do you listen to music?", "How often do you daydream while listening to music?"],
    "Do you feel restlessness in your body, especially legs?",
    "What triggers your daydreaming episodes?"
  ];

  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleResponseChange = (value) => {
    setResponses(prevResponses => {
      const updatedResponses = [...prevResponses];
      updatedResponses[currentQuestion] = value;
      return updatedResponses;
    });
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(prevQuestion => prevQuestion - 1);
  };

  const handleSubmit = () => {
    console.log('Submitted responses:', responses);
  };

  return (
    <View style={styles.container} >
      <Text >Maladaptive Daydreaming Habits Quiz</Text>
      <View style={styles.container1} >
        <Text>{questions[currentQuestion]}</Text>
        {currentQuestion === 4 ? (
          <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
            value={responses[currentQuestion]}
            onChangeText={handleResponseChange}
          />
        ) : (
          <View style={styles.container1}>
            <TouchableOpacity onPress={() => handleResponseChange("Rarely or never")}>
              <Text>Rarely or never</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleResponseChange("Sometimes")}>
              <Text>Sometimes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleResponseChange("Often")}>
              <Text>Often</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleResponseChange("Very often")}>
              <Text>Very often</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {currentQuestion !== 0 && <TouchableOpacity style={styles.container1} onPress={handlePreviousQuestion}><Text>Previous</Text></TouchableOpacity>}

      {currentQuestion !== questions.length - 1 ? (
        <TouchableOpacity style={styles.container1} onPress={handleNextQuestion}><Text>Next</Text></TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.container1} onPress={handleSubmit}><Text>Submit</Text></TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    alignItems:'center'
  },
  container1:{
    marginLeft:10
  }
})
export default Quiz;
