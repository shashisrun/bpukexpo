import * as React from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ZonesScreen({ route, navigation }: RootTabScreenProps<'TabOne'>) {
  const [data, setData] = React.useState({});
  const d = route.params;
  
  React.useEffect( async () => {
    //Check if user_id is set or not
    //If not then send for Authentication
    //else send to Home Screen
  
    const token = await AsyncStorage.getItem('token');
    const rawdata = await fetch('https://expoapp.bodypower.com/public/api/zones/'+ d.id, { 
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
  // console.log(d);
  console.log(data);
  // console.log(d);
  return (
    <ScrollView>
      <View style={styles.separator}>
          <View style={styles.container}>
            <Image source={{uri: data.thumbnail}} style={styles.image} />
            <View style={styles.textcontainer}>
              <Text style={styles.title}>{data.name}</Text>
              <Text>{data.description}</Text>
            </View>
          </View>
          { 
            data.events != null &&
              data.events.length > 0 &&
                <View style={styles.container} lightColor="#fff" darkColor="#242424">
                  <Text style={styles.title}>Events</Text>
                  {data.events.map(e =>(
                    <View style={styles.list}>
                        <Image source={{uri: e.thumbnail}} style={styles.eventimage} />
                        <View style={{backgroundColor:"#e9e9e9", width: 250, borderRadius: 20}}>
                            <Text style = {{marginHorizontal: 40, fontWeight: 'bold'}}>{e.name}</Text>
                            <Text style={{marginVertical: 10}} numberOfLines={2} >{e.description}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Event', e)}>
                                <Text style={styles.btn}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                  ))}
                </View>
          }
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
    marginVertical: 10,
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
  btn:{
    backgroundColor: '#ffe51e',
    borderRadius: 15,
    paddingHorizontal: 22,
    paddingVertical: 7,
    color: "#000",
    textAlign: 'center',
    marginLeft: 20
  },
  list: {
    marginVertical: 5,
    marginHorizontal: 6,
    padding: 10,
    backgroundColor: "#e9e9e9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  eventimage: {
    width: Dimensions.get('window').width/4,
    marginRight: 20,
    marginVertical: 10,
    borderRadius: 25,
    height: ((Dimensions.get('window').width/5)*5)/4,
  },
});
