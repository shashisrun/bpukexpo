import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import ImageView from "react-native-image-viewing";

import { Text, View } from '../components/Themed';

export default function AthleteScreen({ route, navigation}) {
    const [images, setImages] = React.useState([]);
    const [visible, setVisible] = React.useState(false);
    const [index, setIndex] = React.useState(0);
    const d = route.params;
  return (
      <ScrollView>
           <ImageView
                images={images}
                imageIndex={index}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            />
        <View style={styles.container}>
        <TouchableOpacity
                onPress={() => {
                  let imagedata = []
                  imagedata.push({'uri': d.thumbnail})
                  d.gallery_images.map(image => imagedata.push({'uri': image.uri}))
                  setImages(imagedata);
                  setVisible(true);
                  setIndex(0);
                  // console.log(index);
                }}>
                    <Image style={styles.thumbnail} source={{uri: d.thumbnail}} />
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
        <View style={styles.textcontainer}>
            <Text style={styles.title}>{d.name}</Text>
            <Text>{d.description}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Schedule', d.schedule)}
            >
              <Text style={{ fontWeight: 'bold', marginTop: 10 }}>View Schedule</Text>
            </TouchableOpacity>
            <View style={styles.social}>
              <Text>Website: {d.website}</Text>
              <Text>Instagram: {d.instagram}</Text>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Schedule', d.schedule)}
                style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
              >
                <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Book a Meet</Text>
              </TouchableOpacity>
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
  eventimage: {
    width: Dimensions.get('window').width/3,
    marginHorizontal: 5,
    borderRadius: 25,
    height: ((Dimensions.get('window').width/5)*4)/3,
  },
  social: {
    marginTop: 15,
    textAlign: 'left',
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
