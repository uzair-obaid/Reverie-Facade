import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ScrollView, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';

const FocusTimer = () => {
  // State variables for focus timer
  const [focusDuration, setFocusDuration] = useState('25');  // Default to 25 minutes
  const [breakDuration, setBreakDuration] = useState('5');  // Default to 5 minutes
  const [time, setTime] = useState(focusDuration * 60);  // Convert minutes to seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true);  // Start in focus mode
  const [intervalId, setIntervalId] = useState(null);

  // State variables for alarm options
  const [enableAlarms, setEnableAlarms] = useState(false);
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [attentionSpan, setAttentionSpan] = useState('');
  const [alarmDuration, setAlarmDuration] = useState('');

  // Request permissions
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please enable notifications to use this feature.');
      }
    })();

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }, []);

  // Handle focus and break mode switching
  useEffect(() => {
    if (time === 0) {
      if (isFocusMode) {
        // Switch to break mode
        notifyUser('Focus session complete! Time for a break.');
        setIsFocusMode(false);
        setTime(breakDuration * 60);  // Set the break duration
      } else {
        // Switch to focus mode
        notifyUser('Break time over! Back to work.');
        setIsFocusMode(true);
        setTime(focusDuration * 60);  // Set the focus duration
      }
    }
  }, [time]);

  // Handle timer updates
  useEffect(() => {
    if (isTimerActive) {
      const id = setInterval(() => {
        setTime(prevTime => prevTime - 1);  // Decrease the time by 1 second
      }, 1000);
      setIntervalId(id);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isTimerActive]);

  // Notify the user based on focus or break mode
  const notifyUser = (message) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: message,
        body: message,
      },
      trigger: null,
    });
  };

  // Set up daily alarms based on the user’s attention span
  const handleSetAlarms = () => {
    if (attentionSpan && alarmDuration && enableAlarms) {
      // Parse attentionSpan and alarmDuration to numbers
      const span = parseInt(attentionSpan, 10);
      const duration = parseInt(alarmDuration, 10);

      // Generate alarms based on the attention span and duration
      for (let i = 0; i < duration / span; i++) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Focus Time!',
            body: `It’s time to focus for ${span} minutes.`,
          },
          trigger: {
            seconds: span * 60 * (i + 1),
            repeats: true,
          },
        });
      }

      Alert.alert('Alarms Set', `Alarms scheduled based on your attention span of ${attentionSpan} minutes.`);
    } else {
      Alert.alert('Error', 'Please enable alarms, set your attention span, and duration for the day.');
    }
  };

  // Handle start/pause button press
  const handleStartPause = () => {
    setIsTimerActive(!isTimerActive);
  };

  // Handle reset button press
  const handleReset = () => {
    setIsTimerActive(false);
    setIsFocusMode(true);
    setTime(focusDuration * 60);
  };

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Focus Timer</Text>
      
      <Text style={styles.label}>Focus Duration (minutes)</Text>
      <TextInput 
        style={styles.input}
        keyboardType='numeric'
        value={focusDuration}
        onChangeText={text => setFocusDuration(text)}
      />
      
      <Text style={styles.label}>Break Duration (minutes)</Text>
      <TextInput 
        style={styles.input}
        keyboardType='numeric'
        value={breakDuration}
        onChangeText={text => setBreakDuration(text)}
      />

      <Text style={styles.timer}>
        {formatTime(time)}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleStartPause}
        >
          <Text style={styles.buttonText}>{isTimerActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Attention Span (minutes)</Text>
      <TextInput 
        style={styles.input}
        keyboardType='numeric'
        value={attentionSpan}
        onChangeText={text => setAttentionSpan(text)}
      />

      <Text style={styles.label}>Daily Alarm Duration (minutes)</Text>
      <TextInput 
        style={styles.input}
        keyboardType='numeric'
        value={alarmDuration}
        onChangeText={text => setAlarmDuration(text)}
      />

      <Text style={styles.label}>Enable Alarms</Text>
      <Picker
        selectedValue={enableAlarms}
        style={styles.input}
        onValueChange={(itemValue) => setEnableAlarms(itemValue)}
      >
        <Picker.Item label="No" value={false} />
        <Picker.Item label="Yes" value={true} />
      </Picker>

      {enableAlarms && (
        <>
          <Text style={styles.label}>Wake Up Time (HH:MM)</Text>
          <TextInput 
            style={styles.input}
            placeholder="HH:MM"
            value={wakeUpTime}
            onChangeText={setWakeUpTime}
          />

          <Text style={styles.label}>Sleep Time (HH:MM)</Text>
          <TextInput 
            style={styles.input}
            placeholder="HH:MM"
            value={sleepTime}
            onChangeText={setSleepTime}
          />

          <TouchableOpacity 
            style={styles.button}
            onPress={handleSetAlarms}
          >
            <Text style={styles.buttonText}>Set Alarms</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F4F4F4' },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  button: { backgroundColor: '#6D7A8B', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16 },
  timer: { fontSize: 48, textAlign: 'center', marginBottom: 20 },
});

export default FocusTimer;
