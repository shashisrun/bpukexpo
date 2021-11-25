import * as React from 'react';
import { ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';

import { Text, View} from '../components/Themed';
import { RootTabScreenProps } from '../types';


export default function BuyTicketsScreen({ route, navigation }){
    const d = route.params;
    
        return(
            <View style={{margin:20, borderRadius:10, paddingBottom:20}}>
                    <Text style={{textAlign: 'center'}}>{d.name}</Text>
                    <TextInput
                        placeholder="Enter your Name"
                        onChangeText={(text) => {this.setState({name:text})}}
                        style={{borderWidth: 2, borderColor: "#ffe51e", margin: 20, padding:10}}
                    />
                    <TextInput
                        placeholder="Enter your Email"
                        onChangeText={(text) => {this.setState({email:text})}}
                        style={{borderWidth: 2, borderColor: "#ffe51e", margin: 20, padding:10}}
                    />
                    <TextInput
                        placeholder="Phone Number"
                        onChangeText={(text) => {this.setState({phone:text})}}
                        keyboardType={'numeric'}
                        style={{borderWidth: 2, borderColor: "#ffe51e", margin: 20, padding:10}}
                    />
                    <TextInput  
                        placeholder="Quantity"  
                        underlineColorAndroid='transparent'
                        keyboardType={'numeric'}
                        style={{borderWidth: 2, borderColor: "#ffe51e", margin: 20, padding:10}}
                    /> 
                    <TouchableOpacity onPress={() => navigation.navigate('Zone', d)}>
                                    <Text style={styles.btn}>Buy Now</Text>
                    </TouchableOpacity>

                </View>
            
        )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn:{
    backgroundColor: '#ffe51e',
    borderRadius: 15,
    paddingHorizontal: 22,
    paddingVertical: 7,
    color: "#000",
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
