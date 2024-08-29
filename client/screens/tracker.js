import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform, Switch, Vibration} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';
import TaskCompleteScreen from './taskComplete';

const FocusTimer = () => {
  const [focusDuration, setFocusDuration] = useState('25');  
  const [breakDuration, setBreakDuration] = useState('5');  
  const [time, setTime] = useState(focusDuration * 60);  
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(true);  
  const [intervalId, setIntervalId] = useState(null);
  const [enableAlarms, setEnableAlarms] = useState(false);
  const [wakeUpTime, setWakeUpTime] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [attentionSpan, setAttentionSpan] = useState('');
  const [alarmDuration, setAlarmDuration] = useState('');
  const [frequency, setFrequency] = useState(null);
  const [editAlarms, setEditAlarms] = useState(false);
  const [editTimer, setEditTimer] = useState(false);
  const [taskDuration, setTaskDuration] = useState('60');
  const [totalTaskTime, setTotalTaskTime] = useState(taskDuration * 60);
  const [isTaskComplete, setIsTaskComplete] = useState(false);


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

  useEffect(() => {
    if (time === 0) {
      if (totalTaskTime > 0) {
        Vibration.vibrate(500);
        if (isFocusMode) {
          notifyUser('Focus session complete! Time for a break.');
          setIsFocusMode(false);
          console.log(totalTaskTime);
          // setTotalTaskTime(totalTaskTime - focusDuration * 60);
          if(totalTaskTime > breakDuration * 60) {
            setTime(breakDuration * 60);
          } else {
            setTime(totalTaskTime);
          }
        } else {
          notifyUser('Break time over! Back to work.');
          setIsFocusMode(true);
          console.log(totalTaskTime);
          // setTotalTaskTime(totalTaskTime - breakDuration * 60);
          if(totalTaskTime > focusDuration * 60) {
            setTime(focusDuration * 60);
          } else {
            setTime(totalTaskTime);
            setIsTaskComplete(true);
          }
        }
      } else {
        setIsTimerActive(false);
        notifyUser('Task complete!');
        clearInterval(intervalId);
      }
    }
  }, [time, totalTaskTime]);

  useEffect(() => {
    if (isTimerActive) {
      const id = setInterval(() => {
        setTime(prevTime => prevTime - 1);
        setTotalTaskTime(prevTime => prevTime - 1);
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else {
      clearInterval(intervalId);
    }
  }, [isTimerActive]);

  const notifyUser = (message) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: message,
        body: message,
      },
      trigger: {
        seconds: 1, // Triggers immediately for testing; adjust as needed
      },
    });
  };

  const handleSetAlarms = () => {
    if (frequency && enableAlarms) {
      const span = parseInt(frequency, 10);
      const duration = parseInt(sleepTime- wakeUpTime, 10);

      for (let i = 0; i < duration / span; i++) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Focus Time!',
            body: `It's time to focus for ${span} minutes.`,
          },
          trigger: {
            seconds: span * 60 * (i + 1),
            repeats: true,
          },
        });
      }
      setEditAlarms(false);
      Alert.alert('Alarms Set', `Alarms scheduled based on your attention span of ${frequency} minutes.`);
    } else {
      Alert.alert('Error', 'Please enable alarms, set your attention span, and duration for the day.');
    }
  };

  const handleStartPause = () => {
    setIsTimerActive(!isTimerActive);
  };

  // const handleReset = () => {
  //   setIsTimerActive(false);
  //   setIsFocusMode(true);
  //   setTime(focusDuration * 60);
  //   setTotalTaskTime(taskDuration * 60);
  // };
  const handleReset = () => {
    setIsTimerActive(false);
    setIsFocusMode(true);
    setTime(focusDuration * 60);
    setTotalTaskTime(taskDuration * 60);
    setIsTaskComplete(false); 
  };
  const handleEditTimer =() =>{
    setIsTimerActive(false);
    setIsFocusMode(true);
    setTime(focusDuration * 60);
    setEditTimer(!editTimer);
    setTotalTaskTime(taskDuration * 60);
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (isTaskComplete) {
    return <TaskCompleteScreen onReset={handleReset} />;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.enableAlarmContainer}>
          <Text style={styles.enableAlarmText}>Enable Alarms</Text>
          <Switch
            style={styles.enableAlarmSwitch}
            trackColor={{ false: "#767577", true: "#4D6175" }}
            thumbColor={enableAlarms ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={() => setEnableAlarms(!enableAlarms)}
            value={enableAlarms}
          />
        </View>
        {enableAlarms && editAlarms ? (
          <View>
            <TouchableOpacity>
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

              <Text style={styles.label}>Set Frequency</Text>
              <TextInput
                style={styles.input}
                placeholder="Every MM mins"
                value={frequency}
                onChangeText={text => setFrequency(text)}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSetAlarms}
              >
                <Text style={styles.buttonText}>Set Alarms</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        ) : enableAlarms && !editAlarms ? (
          <View style={styles.enableAlarmContainer}>
            <Text style={styles.editAlarmText}>Frequency:  {frequency === null?'not set':`Every ${frequency} min`}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setEditAlarms(true)}>
              <Text style={styles.buttonText}>Edit Alarm</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <View>
        <Text style={styles.heading}>Focus Timer:</Text>
        <Text style={styles.label}>{isFocusMode?'Focus Time':'Break Time'}</Text>
      {
        editTimer?
        (<><Text style={styles.label}>Task Duration (minutes)</Text>
        <TextInput 
          style={styles.input}
          keyboardType='numeric'
          value={taskDuration}
          onChangeText={text => setTaskDuration(text)}
        />
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
  
        </>):
        (<Text style={styles.timer}>
          {formatTime(time)}
        </Text>)
      }

      <View style={styles.buttonContainer}>
        {
          !editTimer?(<TouchableOpacity 
            style={styles.button}
            onPress={handleStartPause}
          >
            <Text style={styles.buttonText}>{isTimerActive ? 'Pause' : 'Start'}</Text>
          </TouchableOpacity>):(<></>)
        }
        <TouchableOpacity
            style={styles.button}
            onPress={handleEditTimer}>
          <Text style={styles.buttonText}>{editTimer ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
        {
          !editTimer?(<TouchableOpacity 
            style={styles.button}
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>):(
            <></>
          )
        }
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F4F4F4' },
  enableAlarmContainer:{flex:1, flexDirection:'row',justifyContent:'space-between'},
  enableAlarmText:{flexDirection:'column',alignSelf:'center',fontSize:18},
  editAlarmText:{flexDirection:'column',alignSelf:'center',fontSize:16},
  enableAlarmSwitch:{alignContent:'flex-end'},
  heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, marginTop:70 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10, borderRadius: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  button: { backgroundColor: '#6D7A8B', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 16 },
  timer: { fontSize: 48, textAlign: 'center', marginBottom: 20 },
});

export default FocusTimer;
