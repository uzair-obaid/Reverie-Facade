import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PasswordScreen from './passwordScreen';
import axios from 'axios';
import EyeclosedIcon from'../assets/eyeclosed';
import EyeopenIcon from'../assets/eyeopen';
import MailIcon from'../assets/mailIcon';
import LockIcon from'../assets/lockIcon';

const Tab = createMaterialTopTabNavigator();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const handleLogin = async() =>{
    try {
      const response = await axios.post('http://192.168.0.104:5000/api/auth/login', {email,password});
      console.log('done');
      // console.log(response);
      const token = response.data.token;
      console.log(token);
      if(response.status === 201){
        setPassword('');
      setEmail('');
      }
      
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('dreamLogFlag','1');
      await AsyncStorage.setItem('analyticFlag','1');

    } catch (error) {
      
      console.error(error);
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      

      <TouchableOpacity style={styles.externalButton}>
        <Text style={styles.externalButtonText}>Login with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.externalButton}>
        <Text style={styles.externalButtonText}>Login with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or continue with email</Text>
      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <MailIcon/>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <LockIcon/>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
          {showPassword?
          (<EyeclosedIcon/>):
          (<EyeopenIcon/>)}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText} >Login</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>Forgot password?</Text>

      <Text style={styles.termsText}>
        By signing in with an account, you agree to our{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
        <Text style={styles.linkText}>Terms of Service</Text>  
        </TouchableOpacity>and{' '}
        <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
        <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const storeEmail = async (email) => {
    try {
        await AsyncStorage.setItem('userEmail', email);
    } catch (error) {
        console.error('Error storing email:', error);
    }
};
  const handleSignUp = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      setEmailError('');
      storeEmail(email);
      navigation.navigate('PasswordScreen');
    } else {
      setEmailError('Please enter a valid email address');
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.subtitle}>Create an account</Text>
      <Text style={styles.instruction}>Enter your email to sign up for this app</Text>
      <View style={styles.inputContainer}>
        <View style={styles.icon}>
          <MailIcon/>
        </View>
        <TextInput
          style={styles.input}
          placeholder="email@domain.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign up with email</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or continue with</Text>

      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Google</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By clicking continue, you agree to our{' '}
        <TouchableOpacity  onPress={() => navigation.navigate('Terms')}>
        <Text style={styles.linkText}>Terms of Service</Text>  
        </TouchableOpacity> and {' '}
        <TouchableOpacity  onPress={() => navigation.navigate('Privacy')}>
        <Text style={styles.linkText}>Privacy Policy</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const App = () => {
  return (
  <>
  <View style={styles.content}>
  <Image source={require('../assets/logo.png')} style={styles.logo} />
  <Text style={styles.title}>REVERIE FACADE</Text>
  <Text style={styles.orText}>Login or Sign up to access your account</Text>
  </View>
    <Tab.Navigator
    screenOptions={{ 
      tabBarIndicatorStyle: {
        backgroundColor: '#0A1366', 
        height: 4, 
      },
      tabBarLabelStyle: {
        fontSize: 15, 
      },
      tabBarStyle: {
        backgroundColor: '#E7EDF1', 
      },
    }}
  >
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Sign Up" component={SignUpScreen} />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  content:{
    alignItems:'center',
    marginTop:30
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  iconContainer: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    width: 'auto',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7EDF1',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius:20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#1F1F1F',
    marginBottom: 5,
  },
  instruction: {
    fontSize: 14,
    color: '#1F1F1F',
    marginBottom: 10,
    textAlign: 'center',
  },
  icon: {
    padding: 10,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0A1366',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  externalButton: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  externalButtonText: {
    fontSize: 16,
    color: '#1F1F1F',
  },
  orText: {
    fontSize: 14,
    color: '#1F1F1F',
    marginBottom: 10,
  },
  googleButton: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  googleButtonText: {
    fontSize: 16,
    color: '#1F1F1F',
  },
  linkText: {
    color: '#4D6175',
    textDecorationLine: 'underline',
    fontSize:12
  },
  termsText: {
    fontSize: 12,
    color: '#4D6175',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default App;
