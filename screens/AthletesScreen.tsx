import * as React from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, Button } from 'react-native';

import { Text, View } from '../components/Themed';
import Bottom from '../components/Bottom';
import { RootTabScreenProps } from '../types';

const data = [
  {
    'thumbnail' : "https://picsum.photos/1000/800",  
    'name' : "Shashi Sharma",  
    'organizer' : "BodyPower",  
    'startint_at' : "3 PM, Day 1",  
    'zone' : "Mix Martial Arts Zone",  
    'description' : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",  
    'sort' : 1,
  },
]

export default function AthletesScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <ScrollView>
      {data.map(d => (<View style={styles.separator} lightColor="#fff" darkColor="#242424">
          <View style={styles.container} lightColor="#fff" darkColor="#242424">
            <TouchableOpacity
              onPress={() => navigation.navigate('Zone', d)}
            >
              <Image source={{uri: d.thumbnail}} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.container} lightColor="#fff" darkColor="#242424">
              <ScrollView horizontal={true} style={styles.eventcontainer}>
                <TouchableOpacity>
                  <Image source={{uri: 'https://picsum.photos/5000/4000'}} style={styles.eventimage} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={{uri: 'https://picsum.photos/1500/1200'}} style={styles.eventimage} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={{uri: 'https://picsum.photos/2500/2000'}} style={styles.eventimage} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={{uri: 'https://picsum.photos/3000/2400'}} style={styles.eventimage} />
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View style={styles.textcontainer} lightColor="#fff" darkColor="#242424">
              <View lightColor="#fff" darkColor="#242424">
                <Text style={styles.title}>{d.name}</Text>
              </View>
              <Text numberOfLines={3}>{d.description}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification', d)}
              >
                <Text style={{ fontWeight: 'bold', marginTop: 10 }}>View Schedule</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} lightColor="#fff" darkColor="#242424">
            <TouchableOpacity
              onPress={() => navigation.navigate('Zone', d)}
              style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
            >
              <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Book a Meet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Zone', d)}
              style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
            >
              <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Know More</Text>
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
    paddingVertical: 10,
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
