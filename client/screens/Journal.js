import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Checkbox from 'expo-checkbox';

const MoodJournalScreen = () => {
  const [moodText, setMoodText] = useState('');
  const [checkedItems, setCheckedItems] = useState({
    option1: false,
    option2: false,
    option3: false,
    option4: false,
  });

  const handleCheckboxChange = (name, value) => {
    setCheckedItems({
      ...checkedItems,
      [name]: value,
    });
  };

  
  const moodImages = [
    require('../assets/mood1-icon.jpg'),  
    require('../assets/mood2-icon.jpg'),  
    require('../assets/mood3-icon.jpg'),  
    require('../assets/mood4-icon.jpg'),  
    require('../assets/mood5-icon.jpg'),  
      
    
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mood Journal</Text>
      <View style={styles.moodIcons}>
        {moodImages.map((image, index) => (
          <Image key={index} source={image} style={styles.moodIcon} />
        ))}
      </View>
      <Text style={styles.subtitle}>What's affecting your mood?</Text>
      <View style={styles.checkboxContainer}>
        {Object.keys(checkedItems).map((item, index) => (
          <View key={index} style={styles.checkboxItem}>
            <Checkbox
              value={checkedItems[item]}
              onValueChange={(newValue) => handleCheckboxChange(item, newValue)}
            />
            <Text style={styles.checkboxLabel}>Option {index + 1}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.subtitle}>Let's write about it</Text>
      <TextInput
        style={styles.textInput}
        placeholder="How is your day going? How has it affected your mood? Or anything else..."
        multiline
        value={moodText}
        onChangeText={setMoodText}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log mood</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EDF1',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 10,
  },
  moodIcons: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  moodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#1F1F1F',
    marginBottom: 10,
  },
  checkboxContainer: {
    width: '100%',
    marginBottom: 20,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#1F1F1F',
  },
  textInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#1F1F1F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default MoodJournalScreen;
