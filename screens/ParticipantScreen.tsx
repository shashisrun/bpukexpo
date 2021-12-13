import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';

import { Text, View } from '../components/Themed';

export default function AthleteScreen({ route }) {
    const d = route.params;
  return (
      <ScrollView>
        <View style={styles.container}>
        <Image style={styles.thumbnail} source={{uri: d.thumbnail}} />
        <View style={styles.textcontainer}>
            <Text style={styles.title}>{d.name}</Text>
            <Text>{d.description}</Text>
        </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  textcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  thumbnail: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width/5)*4,
  },
});
