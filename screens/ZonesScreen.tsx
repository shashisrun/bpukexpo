import * as React from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import Bottom from '../components/Bottom';
import { RootTabScreenProps } from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ZonesScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [data, setData] = React.useState([]);
  
  React.useEffect( async () => {
    //Check if user_id is set or not
    //If not then send for Authentication
    //else send to Home Screen
  
    const token = await AsyncStorage.getItem('token');
    const rawdata = await fetch('https://expoapp.bodypower.com/public/api/zones', { 
          method: 'GET',
          headers: {
            //Header Defination
            'Content-Type':
            'application/json',
            'Authorization':
            'Bearer ' + token,
          },
        });
    const json = await rawdata.json();
    // console.log(json);
    setData(json);
  });
  // console.log(data);
  return (
    <ScrollView>
      {data.map(d => (<View style={styles.separator} lightColor="#fff" darkColor="#242424">
          <View style={styles.container} lightColor="#fff" darkColor="#242424">
            <TouchableOpacity
              onPress={() => navigation.navigate('Zone', d)}
            >
              <Image source={{uri: d.thumbnail}} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.textcontainer} lightColor="#fff" darkColor="#242424">
              <Text style={styles.title}>{d.name}</Text>
              <Text numberOfLines={3}>{d.description}</Text>
            </View>
          </View>
          { d.events.length > 0 &&
                <View style={styles.container} lightColor="#fff" darkColor="#242424">
                  <Text style={styles.title}>Events</Text>
                  <ScrollView horizontal={true} style={styles.eventcontainer}>
                    {d.events.map(event =>
                      <TouchableOpacity
                      onPress={() => navigation.navigate('Event', event)}
                      >
                        <Image source={{uri: event.thumbnail}} style={styles.eventimage} />
                        <Text style={styles.eventtitle}>Mr. BodyPower UK StrongMan Mr. BodyPower UK StrongMan</Text>
                      </TouchableOpacity>
                      ) }
                  </ScrollView>
                </View>
          }
          <View style={styles.container} lightColor="#fff" darkColor="#242424">
            <TouchableOpacity
              onPress={() => navigation.navigate('Zone', d)}
              style={{ marginTop: 50, borderRadius: 5, paddingHorizontal: 50, paddingVertical: 10 }}
            >
              <Text style={{backgroundColor: '#ffe51e', width: '100%', borderRadius: 15, paddingHorizontal: 50, paddingVertical: 10, color: "#000"}}>Read More</Text>
            </TouchableOpacity>
          </View>
      </View>))}
      <Bottom />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventcontainer: {
    flexDirection: 'row'
  },
  textcontainer: {
    marginVertical: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  eventtitle: {
    width: Dimensions.get('window').width/3,
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 11,
    fontWeight: 'bold',
  },
  image: {
    width: Dimensions.get('window').width - 25,
    height: ((Dimensions.get('window').width/5)*4)- 20,
    borderRadius: 25,
  },
  eventimage: {
    width: Dimensions.get('window').width/3,
    marginHorizontal: 5,
    borderRadius: 25,
    height: ((Dimensions.get('window').width/5)*4)/3,
  },
  separator: {
    borderRadius: 25,
    paddingVertical: 30,
    marginVertical: 20,
    marginHorizontal: 5,
  },
});
