import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ReminderForm = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [repeat, setRepeat] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Make your own Reminder</Text>
      <TextInput 
        style={styles.input}
        placeholder="Insert Title"
        value={title}
        onChangeText={setTitle}
      />
      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        <Picker.Item label="Select Category" value="" />
        <Picker.Item label="Work" value="work" />
        <Picker.Item label="Personal" value="personal" />
        {/* Add more categories as needed */}
      </Picker>
      <View style={styles.timeDateContainer}>
        <TextInput 
          style={[styles.input, styles.timeInput]}
          placeholder="00:00"
          value={time}
          onChangeText={setTime}
        />
        <TextInput 
          style={[styles.input, styles.dateInput]}
          placeholder="dd:mm:yyyy"
          value={date}
          onChangeText={setDate}
        />
      </View>
      <Picker
        selectedValue={repeat}
        style={styles.input}
        onValueChange={(itemValue, itemIndex) => setRepeat(itemValue)}
      >
        <Picker.Item label="Repeat" value="" />
        <Picker.Item label="Once" value="once" />
        <Picker.Item label="Daily" value="daily" />
        {/* Add more repeat options as needed */}
      </Picker>
      <TouchableOpacity 
        style={styles.viewReminderButton}
        onPress={() => navigation.navigate('ReminderView')}
      >
        <Text style={styles.viewReminderText}>View reminder</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        reminders are set based on your choice and after analysis of your daydreams over a period of time
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F4F4F4' },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
  timeDateContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  timeInput: { width: '48%' },
  dateInput: { width: '48%' },
  viewReminderButton: { backgroundColor: '#6D7A8B', padding: 15, borderRadius: 5, alignItems: 'center' },
  viewReminderText: { color: '#FFFFFF', fontSize: 16 },
  footerText: { marginTop: 20, fontSize: 12, color: '#666666' }
});

export default ReminderForm;
