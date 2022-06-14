import * as React from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

import { Text, View } from '../components/Themed';
import Data from './../data/Data'

export default function EventScreen({ route, navigation }) {
  const [zoneData, setZoneData] = React.useState([]);
  const d = route.params;
  

  React.useEffect(() => {
    const data = new Data;
    const unsubscribe = navigation.addListener('focus', async () => {
      // The screen is focused
      // Call any action
      const newZoneData = await data.getData('zones');
      if(newZoneData != null) {
        setZoneData(newZoneData);

    }
  })
})
  return (
    <ScrollView>
      <View style={styles.separator}>
            <View style={styles.container}>
                <Image source={{uri: d.thumbnail}} style={styles.image} />
                <View style={styles.textcontainer}>
                    {d.organizer != null &&
                      <TouchableOpacity onPress={() => navigation.navigate('Organizer', d.organizer)}>
                        <Text>Organized by {d.organizer.name}</Text>
                      </TouchableOpacity>
                    }
                    <Text style={styles.title}>{d.name}</Text>
                        <Text>{d.description}</Text>
                    <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Event Time : {d.time}</Text>
                      {d.zone_id != null && zoneData.length > 0 &&
                        <View>
                          {zoneData.map((zone) =>{
                            <View>
                              {zone.id == d.zone_id &&
                                <TouchableOpacity onPress={() => navigation.navigate('Zone', zone)}>
                                  <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Zone : {zone.name}</Text>
                                </TouchableOpacity>
                              }
                            </View>
                          })}
                        </View>
                      }
                </View>
                {d.participants != null &&
                  <View style={styles.container}>
                      <Text style={styles.title}>Participating Athletes</Text>
                      {d.participants.map(participant =>(
                        <View style={styles.list}>
                            <Image source={{uri: participant.thumbnail}} style={styles.participantimage} />
                            <View style={{width: 250, borderRadius: 20}}>
                                <Text style = {{marginHorizontal: 40, fontWeight: 'bold'}}>{participant.name}</Text>
                              <Text style={{marginVertical: 10}} numberOfLines={3}>{participant.description}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Participant', participant)}>
                                    <Text style={styles.btn}>View</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                      ))}
                  </View>
                }
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} lightColor="#fff" darkColor="#242424">
                <TouchableOpacity
                  onPress={async () => await WebBrowser.openBrowserAsync(d.register_link)}
                  style={{ marginTop: 10, paddingHorizontal: 5, paddingVertical: 10 }}
                >
                  <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Register Now</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => navigation.navigate('BuyTicket', d)}
                  style={{ marginTop: 10, paddingHorizontal: 5, paddingVertical: 10 }}
                >
                  <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Buy Tickets</Text>
                </TouchableOpacity> */}
              </View>
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
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width/5)*4,
  },
  separator: {
    paddingVertical: 30,
  },
  list: {
    marginVertical: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  participantimage: {
    width: Dimensions.get('window').width/4,
    marginRight: 20,
    marginVertical: 10,
    borderRadius: 20,
    height: ((Dimensions.get('window').width/5)*5)/4,
  },
  btn:{
    backgroundColor: '#ffe51e',
    borderRadius: 15,
    paddingHorizontal: 22,
    paddingVertical: 7,
    color: "#000",
    textAlign: 'center',
    marginLeft: 20
  }
});
