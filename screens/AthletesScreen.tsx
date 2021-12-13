import * as React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, Button } from 'react-native';
import Data from './../data/Data'
import ImageView from "react-native-image-view";

import { Text, View } from '../components/Themed';
import Bottom from '../components/Bottom';
import { RootTabScreenProps } from '../types';



export default function AthletesScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [data, setData] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [visible, setVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [preloader, setPreloader] = React.useState(true);
  
  React.useEffect( async () => {
    //Check if user_id is set or not
    //If not then send for Authentication
    //else send to Home Screen
  
    // const token = await AsyncStorage.getItem('token');
    // const rawdata = await fetch('https://expoapp.bodypower.com/public/api/guests', { 
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
    const newData = await data.getData('guests');
    if (newData != null){
      setData(newData);
      setPreloader(false);
    }
  });
  // console.log(d);
  console.log(data);
  // console.log(d);


  return (
    <View>
      {preloader && 
        <View style={{height: Dimensions.get('window').height}}>
          <ActivityIndicator style={{marginTop: Dimensions.get('window').height/3}} size="large" color="#dbdbdb" />
        </View>
      }
      {!preloader && 
        <View>
          <ImageView
            images={images}
            imageIndex={index}
            isVisible={visible}
            onClose={() => {
              setVisible(false);
            }}
          />
          <ScrollView>
            {data.map(d => (<View style={styles.separator} lightColor="#fff" darkColor="#242424">
                <View style={styles.container} lightColor="#fff" darkColor="#242424">
                  <TouchableOpacity
                    onPress={() => {
                      let imagedata = []
                      imagedata.push({source: {'uri': d.thumbnail}})
                      d.gallery_images.map(image => imagedata.push({source: {'uri': image.uri}}))
                      setImages(imagedata);
                      setVisible(true);
                      setIndex(0);
                      // console.log(index);
                    }}>
                    <Image source={{uri: d.thumbnail}} style={styles.image} />
                  </TouchableOpacity>
                  {d.gallery_images.length > 0 &&
                    <View style={styles.container} lightColor="#fff" darkColor="#242424">
                      <ScrollView horizontal={true} style={styles.eventcontainer}>
                        {d.gallery_images.map((image, index) =>
                          <TouchableOpacity
                            onPress={() => {
                              let imagedata = []
                              imagedata.push({'uri': d.thumbnail})
                              d.gallery_images.map(image => imagedata.push({'uri': image.uri}))
                              setImages(imagedata);
                              setVisible(true);
                              setIndex(index+1);
                              // console.log(index);
                            }}>
                            <Image source={{uri: image.uri}} style={styles.eventimage} />
                          </TouchableOpacity>
                          ) }
                      </ScrollView>
                    </View>
                  }
                  <View style={styles.textcontainer} lightColor="#fff" darkColor="#242424">
                    <View lightColor="#fff" darkColor="#242424">
                      <Text style={styles.title}>{d.name}</Text>
                    </View>
                    <Text numberOfLines={3}>{d.description}</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Schedule', d.schedule)}
                    >
                      <Text style={{ fontWeight: 'bold', marginTop: 10, color: "#a5a5a5"}}>View Schedule</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} lightColor="#fff" darkColor="#242424">
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Schedule', d.schedule)}
                    style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
                  >
                    <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Book a Meet</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Athlete', d)}
                    style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
                  >
                    <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Know More</Text>
                  </TouchableOpacity>
                </View>
            </View>))}
            <Bottom />
          </ScrollView>
        </View>
      }
    </View>
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
