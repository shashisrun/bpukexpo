import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { ActivityIndicator, Dimensions, Image, StyleSheet,TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Data from './../data/Data'

import { Text, View } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import Bottom from '../components/Bottom';

export default function NotificationScreen({navigation}) {
  const [data, setData] = React.useState([]);
  const [preloader, setPreloader] = React.useState(true);


  React.useEffect(() => {
    const data = new Data;
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      const newData = await data.getData('feeds');
      if(newData != null) {
        setData(newData);
        setPreloader(false);
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  console.log(data);
  return (
    <View>
      {preloader && 
        <View style={{height: Dimensions.get('window').height}}>
          <ActivityIndicator style={{marginTop: Dimensions.get('window').height/3}} size="large" color="#dbdbdb" />
        </View>
      }
      {!preloader && 
        <ScrollView>
          {data.map(d => (
            <View style={styles.container}>
              <Image style={styles.image} source={{uri: d.thumbnail}} />
                <Text style={styles.title}>{d.name}</Text>
                <Text numberOfLines={2}>{d.description}</Text>
                {d.type == 'zone' &&
                  <TouchableOpacity onPress={() => navigation.navigate('Zone', d.zone)}>
                      <Text style={styles.btn}>View</Text>
                  </TouchableOpacity>
                }
                {d.type == 'event' &&
                  <TouchableOpacity onPress={() => navigation.navigate('Event', d.event)}>
                      <Text style={styles.btn}>View</Text>
                  </TouchableOpacity>
                }
                {d.type == 'guest' &&
                  <TouchableOpacity onPress={() => navigation.navigate('Athlete', d.guest)}>
                      <Text style={styles.btn}>View</Text>
                  </TouchableOpacity>
                }
                {d.type == 'company' &&
                  <TouchableOpacity onPress={async () => await WebBrowser.openBrowserAsync(d.ref_id)}>
                      <Text style={styles.btn}>View</Text>
                  </TouchableOpacity>
                }
            </View>
          ))}
          <Bottom />
        </ScrollView>
      }
    </View>
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
