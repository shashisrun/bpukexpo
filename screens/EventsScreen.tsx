import * as React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, Button } from 'react-native';
import Data from './../data/Data'

import { Text, View } from '../components/Themed';
import Bottom from '../components/Bottom';
import { RootTabScreenProps } from '../types';


export default function EventsScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [data, setData] = React.useState([]);
  const [zoneData, setZoneData] = React.useState([]);
  const [preloader, setPreloader] = React.useState(true);
  
  React.useEffect( async () => {
    //Check if user_id is set or not
    //If not then send for Authentication
    //else send to Home Screen
  
    // const token = await AsyncStorage.getItem('token');
    // const rawdata = await fetch('https://expoapp.bodypower.com/public/api/events', { 
    //       method: 'GET',
    //       headers: {
    //         //Header Defination
    //         'Content-Type':
    //         'application/json',
    //         'Authorization':
    //         'Bearer ' + token,
    //       },
    //     });
    // const json = await rawdata.json();
    // // console.log(json);
    // setData(json);
    const data = new Data;
    const newData = await data.getData('events');
    if(newData != null) {
      setData(newData);
    }
    const newZoneData = await data.getData('zones');
    if(newZoneData != null) {
      setZoneData(newZoneData);
      setPreloader(false);
    }
  });
  // console.log(data);
  // console.log(zoneData[1].id);
  return (
    <View>
      {preloader && 
        <View style={{height: Dimensions.get('window').height}}>
          <ActivityIndicator style={{marginTop: Dimensions.get('window').height/3}} size="large" color="#dbdbdb" />
        </View>
      }
      {!preloader && 
        <ScrollView>
          {data.map(d => (<View style={styles.separator} lightColor="#fff" darkColor="#242424">
              <View style={styles.container} lightColor="#fff" darkColor="#242424">
                <TouchableOpacity
                  onPress={() => navigation.navigate('Event', d)}
                >
                  <Image source={{uri: d.thumbnail}} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.textcontainer} lightColor="#fff" darkColor="#242424">
                  <View lightColor="#fff" darkColor="#242424">
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Organizer', d.organizer)}
                    >
                      <Text style={{color: "#a5a5a5"}}>Organized by {d.organizer.name}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>{d.name}</Text>
                  </View>
                  <Text numberOfLines={3}>{d.description}</Text>
                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Event Time : {d.time}</Text>
                  {zoneData.map(zone => (
                    <View lightColor="#fff" darkColor="#242424">
                      {zone.id == d.zone_id &&
                        <TouchableOpacity
                          onPress={() => navigation.navigate('Zone', zone)}
                        >
                          <Text style={{ fontWeight: 'bold', marginTop: 10, color: "#a5a5a5"}}>Zone : {zone.name}</Text>
                        </TouchableOpacity>
                      }
                    </View>
                  ))}
                </View>
              </View>
              { d.participants.length > 0 &&
              <View style={styles.container} lightColor="#fff" darkColor="#242424">
                <Text style={styles.title}>Participating Athletes</Text>
                <ScrollView horizontal={true} style={styles.eventcontainer}>
                  {d.participants.map(participant =>
                  <TouchableOpacity onPress={() => navigation.navigate('Participant', participant)}>
                    <Image source={{uri: participant.thumbnail}} style={styles.eventimage} />
                    <Text style={styles.eventtitle}>{participant.name}</Text>
                  </TouchableOpacity>
                    ) }
                </ScrollView>
              </View>
              }
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} lightColor="#fff" darkColor="#242424">
                <TouchableOpacity
                  onPress={() => navigation.navigate('Event', d)}
                  style={{ marginTop: 30, paddingHorizontal: 5, paddingVertical: 10 }}
                >
                  <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000", textAlign: 'center'}}>Know More</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} lightColor="#fff" darkColor="#242424">
                <TouchableOpacity
                  onPress={() => navigation.navigate('BuyTicket', d)}
                  style={{ marginTop: 10, paddingHorizontal: 5, paddingVertical: 10 }}
                >
                  <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Buy Tickets</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Participate', d)}
                  style={{ marginTop: 10, paddingHorizontal: 5, paddingVertical: 10 }}
                >
                  <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Participate</Text>
                </TouchableOpacity>
              </View>
          </View>))}
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
