import  React,{useState} from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import { Text, View} from '../components/Themed';
import { RootTabScreenProps } from '../types';


export default function ScheduleScreen({ route, navigation }){
    const d = route.params;
        return(
          <ScrollView>
            <View style={styles. More_Tab_view}>
              <View style={styles. More_Tab_profile1} >
              <Text style={styles.More_Tab_text}>Location</Text>
                  <Text style={styles.More_Tab_text2}>12:30 - 1:00 PM</Text>
                </View>
                <View style={styles. More_Tab_profile2} >
                <TouchableOpacity
                      onPress={() => navigation.navigate('Zone', d)}
                      style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
                    >
                      <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Book a Meet</Text>
                    </TouchableOpacity>
              </View>
              </View>
              <View style={styles. More_Tab_view}>
              <View style={styles. More_Tab_profile1} >
              <Text style={styles.More_Tab_text}>Location</Text>
                  <Text style={styles.More_Tab_text2}>12:30 - 1:00 PM</Text>
                </View>
                <View style={styles. More_Tab_profile2} >
                <TouchableOpacity
                      onPress={() => navigation.navigate('Zone', d)}
                      style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
                    >
                      <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Book a Meet</Text>
                    </TouchableOpacity>
              </View>
              </View>
              <View style={styles. More_Tab_view}>
              <View style={styles. More_Tab_profile1} >
              <Text style={styles.More_Tab_text}>Location</Text>
                  <Text style={styles.More_Tab_text2}>12:30 - 1:00 PM</Text>
                </View>
                <View style={styles. More_Tab_profile2} >
                <TouchableOpacity
                      onPress={() => navigation.navigate('Zone', d)}
                      style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
                    >
                      <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Book a Meet</Text>
                    </TouchableOpacity>
              </View>
              </View>
              <View style={styles. More_Tab_view}>
              <View style={styles. More_Tab_profile1} >
              <Text style={styles.More_Tab_text}>Location</Text>
                  <Text style={styles.More_Tab_text2}>12:30 - 1:00 PM</Text>
                </View>
                <View style={styles. More_Tab_profile2} >
                <TouchableOpacity
                      onPress={() => navigation.navigate('Zone', d)}
                      style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
                    >
                      <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Book a Meet</Text>
                    </TouchableOpacity>
              </View>
              </View>
              <View style={styles. More_Tab_view}>
              <View style={styles. More_Tab_profile1} >
              <Text style={styles.More_Tab_text}>Location</Text>
                  <Text style={styles.More_Tab_text2}>12:30 - 1:00 PM</Text>
                </View>
                <View style={styles. More_Tab_profile2} >
                <TouchableOpacity
                      onPress={() => navigation.navigate('Zone', d)}
                      style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
                    >
                      <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Book a Meet</Text>
                    </TouchableOpacity>
              </View>
              </View>
              <View style={styles. More_Tab_view}>
              <View style={styles. More_Tab_profile1} >
              <Text style={styles.More_Tab_text}>Location</Text>
                  <Text style={styles.More_Tab_text2}>12:30 - 1:00 PM</Text>
                </View>
                <View style={styles. More_Tab_profile2} >
                <TouchableOpacity
                      onPress={() => navigation.navigate('Zone', d)}
                      style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
                    >
                      <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Book a Meet</Text>
                    </TouchableOpacity>
              </View>
              </View>
              <View style={styles. More_Tab_view}>
              <View style={styles. More_Tab_profile1} >
              <Text style={styles.More_Tab_text}>Location</Text>
                  <Text style={styles.More_Tab_text2}>12:30 - 1:00 PM</Text>
                </View>
                <View style={styles. More_Tab_profile2} >
                <TouchableOpacity
                      onPress={() => navigation.navigate('Zone', d)}
                      style={{ marginTop: 5, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 10 }}
                    >
                      <Text style={{backgroundColor: '#ffe51e', borderRadius: 15, paddingHorizontal: 30, paddingVertical: 10, color: "#000"}}>Book a Meet</Text>
                    </TouchableOpacity>
              </View>
              </View>
            </ScrollView>
        )
}

const styles = StyleSheet.create({
  More_TabLocation: {
    marginVertical: 7,
    fontSize:18,
  },
  More_Tab_profile1:{
    alignContent:"flex-start",
    marginVertical:20,
    paddingHorizontal:10,
  },
  More_Tab_profile2:{
     marginLeft:"auto",
     justifyContent:"center",
     paddingHorizontal:10,
     borderRadius:10,
  },
  More_Tab_text:{
  fontSize:20,
  marginVertical:10,
  fontWeight:"bold",
  },
  More_Tab_view: {
    flex: 1,
    flexDirection: 'row',
    textAlign:'center',
    marginVertical: 10,
    marginHorizontal:20,
    borderRadius:10,

  },
  
});
