import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Dimensions, Image, StyleSheet,TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';

export default function NotificationScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: "https://picsum.photos/1000/400"}} />
          <Text style={styles.title}>Hello World!</Text>
          <Text>Just add your desired image size (width & height) after our URL, and you'll get a random image.</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Participant', participant)}>
              <Text style={styles.btn}>View</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcontainer: {
    marginVertical: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: (Dimensions.get('window').width)-20,
    height: (Dimensions.get('window').width/5)*4,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
  },
  separator: {
    paddingVertical: 30,
  },
  btn:{
    marginVertical: 20,
    backgroundColor: '#ffe51e',
    borderRadius: 15,
    paddingHorizontal: 22,
    paddingVertical: 7,
    color: "#000",
    textAlign: 'center',
    marginLeft: 20
  }
});
