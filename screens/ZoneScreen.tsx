import * as React from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
// import Data from './../data/Data'

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ZonesScreen({ route, navigation }: RootTabScreenProps<'TabOne'>) {
  // const [data, setData] = React.useState({});
  // const [preloader, setPreloader] = React.useState(true);
  const d = route.params;
  
  // React.useEffect( async () => {
  //   //Check if user_id is set or not
  //   //If not then send for Authentication
  //   //else send to Home Screen
  
  //   // const token = await AsyncStorage.getItem('token');
  //   // const rawdata = await fetch('https://expoapp.bodypower.com/public/api/zones/'+ d.id, { 
  //   //   method: 'GET',
  //   //   headers: {
  //   //     //Header Defination
  //   //     'Content-Type':
  //   //     'application/json',
  //   //     'Authorization':
  //   //     'Bearer ' + token,
  //   //   },
  //   // });
  //   // const json = await rawdata.json();
  //   // // console.log(json);
  //   // setData(json);
  //   const data = new Data;
  //   const newData = await data.getData('zone_'+ d.id);
  //   if(newData != null) {
  //     setData(newData);
  //     setPreloader(false);
  //   }
  // });
  // console.log(d);
  // console.log(data);
  // console.log(d);
  return (
    <ScrollView>
      <View style={styles.separator}>
          <View style={styles.container}>
            <Image source={{uri: d.thumbnail}} style={styles.image} />
            <View style={styles.textcontainer}>
              <Text style={styles.title}>{d.name}</Text>
              <Text>{d.description}</Text>
            </View>
          </View>
          { 
            d.events != null &&
              d.events.length > 0 &&
                <View style={styles.container} lightColor="#fff" darkColor="#242424">
                  <Text style={styles.title}>Events</Text>
                  {d.events.map(e =>(
                    <View style={styles.list}>
                        <Image source={{uri: e.thumbnail}} style={styles.eventimage} />
                        <View style={{width: Dimensions.get('window').width/1.7}}>
                            <Text style = {{fontWeight: 'bold'}}>{e.name}</Text>
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
  },
  list: {
    width: Dimensions.get('window').width-12,
    marginVertical: 5,
    marginHorizontal: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  eventimage: {
    width: Dimensions.get('window').width/4,
    height: ((Dimensions.get('window').width/5)*5)/4,
    marginRight: 20,
    marginVertical: 10,
    borderRadius: 25,
  },
});
