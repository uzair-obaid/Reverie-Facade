import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Modal, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Journal() {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [events, setEvents] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [daydreams, setDaydreams] = useState([]);

  useEffect(() => {
    loadDaydreams();
  }, []);

  const loadDaydreams = async () => {
    try {
      const storedDaydreams = await AsyncStorage.getItem('daydreams');
      if (storedDaydreams !== null) {
        setDaydreams(JSON.parse(storedDaydreams));
      }
    } catch (error) {
      console.error('Error loading daydreams:', error);
    }
  };

  const saveDaydreams = async () => {
    try {
      await AsyncStorage.setItem('daydreams', JSON.stringify(daydreams));
    } catch (error) {
      console.error('Error saving daydreams:', error);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const resetform = () => {
    setDate(new Date());
    setStartTime('');
    setDuration('');
    setEvents('');
  };

  const handleSubmit = () => {
    resetform();
    const newDaydream = {
      date: date.toDateString(),
      startTime,
      duration,
      events
    };
    setDaydreams([...daydreams, newDaydream]);
    saveDaydreams();
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
        <FlatList
        data={daydreams}
        renderItem={({ item }) => (
          <View style={styles.daydreamItem}>
            <Text>Date: {item.date}</Text>
            <Text>Start Time: {item.startTime}</Text>
            <Text>Duration: {item.duration} minutes</Text>
            <Text>Events: {item.events}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text>Select Date: {date.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Start Time (e.g. 10:00 AM)"
        value={startTime}
        onChangeText={text => setStartTime(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (in minutes)"
        keyboardType="numeric"
        value={duration}
        onChangeText={text => setDuration(text)}
      />
      
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="What were you supposedly doing while you were daydreaming?"
        multiline={true}
        value={events}
        onChangeText={text => setEvents(text)}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Events before daydreaming"
        multiline={true}
        value={events}
        onChangeText={text => setEvents(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Daydreaming recorded!</Text>
          <TouchableOpacity
            style={[styles.button, styles.modalButton]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  daydreamItem: {
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    color: 'white',
  },
  modalButton: {
    backgroundColor: 'gray',
  }
});

export default Journal;
