import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image
} from 'react-native';
import * as Network from 'expo-network';
import { View } from '../components/Themed';

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(async () => {
    setAnimating(false);
    //Check if user_id is set or not
    //If not then send for Authentication
    //else send to Home Screen
    await AsyncStorage.getItem('token').then(async (token) => {
      if(token != null){
        navigation.replace('Root')
      }else{
        navigation.replace('Auth')
      }
  })
});

  

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});