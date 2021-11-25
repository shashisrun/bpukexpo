import * as React from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import Bottom from '../components/Bottom';
import { RootTabScreenProps } from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EventsScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [data, setData] = React.useState([]);
  
  React.useEffect( async () => {
    //Check if user_id is set or not
    //If not then send for Authentication
    //else send to Home Screen
  
    const token = await AsyncStorage.getItem('token');
    const rawdata = await fetch('https://expoapp.bodypower.com/public/api/events', { 
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
              onPress={() => navigation.navigate('Event', d)}
            >
              <Image source={{uri: d.thumbnail}} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.textcontainer} lightColor="#fff" darkColor="#242424">
              <View lightColor="#fff" darkColor="#242424">
                <TouchableOpacity
                  onPress={() => navigation.navigate('Organizer', d.organizer)}
                >
                  <Text>Organized by {d.organizer.name}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{d.name}</Text>
              </View>
              <Text numberOfLines={3}>{d.description}</Text>
              <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Event Time : {d.startint_at}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Zone', d.zone)}
              >
                <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Zone : {d.zone.name}</Text>
              </TouchableOpacity>
            </View>
          </View>
          { d.participants.length > 0 &&
          <View style={styles.container} lightColor="#fff" darkColor="#242424">
            <Text style={styles.title}>Participating Athletes</Text>
            <ScrollView horizontal={true} style={styles.eventcontainer}>
              {d.participants.map(participant =>
              <TouchableOpacity onPress={() => navigation.navigate('Athlete', participant)}>
                <Image source={{uri: participant.thumbnail}} style={styles.eventimage} />
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
