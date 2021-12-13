import  React,{useState} from 'react';
import { ScrollView, StyleSheet,Button, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Text, View} from '../components/Themed';
import { RootTabScreenProps } from '../types';


export default function ParticipateScreen({ route, navigation }){
    const d = route.params;
    const[ pickerValue, setPickerValue ] =useState('Category');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      console.warn("A date has been picked: ", date);
      hideDatePicker();
    };
        return(
          <ScrollView>
            <View style={{margin:20, borderRadius:10, paddingBottom:20}}>
                    <Text style={{textAlign: 'center',fontSize: 24,marginTop:10, marginVertical: 10,}}>{d.name}</Text>
                    <TextInput
                        placeholder="Address 1"
                        onChangeText={(text) => {this.setState({name:text})}}
                        style={{borderWidth: 2,borderColor: '#dadae8', marginHorizontal: 20, marginVertical:10, paddingHorizontal:20,padding:10,borderRadius:50,}}
                    />
                    <TextInput
                        placeholder="Address 2"
                        onChangeText={(text) => {this.setState({email:text})}}
                        style={{borderWidth: 2, borderColor:'#dadae8', marginHorizontal: 20,marginVertical:10, paddingHorizontal:20,padding:10,borderRadius:50,}}
                    />
                    <TextInput
                        placeholder="City"
                        onChangeText={(text) => {this.setState({phone:text})}}
                        keyboardType={'numeric'}
                        style={{borderWidth: 2, borderColor: "#dadae8", marginHorizontal: 20,marginVertical:10, paddingHorizontal:20,padding:10,borderRadius:50,}}
                    />
                    <TextInput
                        placeholder="Country"
                        onChangeText={(text) => {this.setState({name:text})}}
                        style={{borderWidth: 2, borderColor: "#dadae8", marginHorizontal: 20,marginVertical:10, paddingHorizontal:20,padding:10,borderRadius:50,}}
                    />
                    <View  style={{borderWidth: 2, borderColor: "#dadae8",borderRadius:50,marginHorizontal:20, marginVertical:10, paddingHorizontal:10,}}>
                    <Picker selectedValue={pickerValue} onValueChange={(itemValue)=> setPickerValue(itemValue)}>
                      <Picker.Item label="Category" value="Category"/>
                      <Picker.Item label="Javascript" value=" javascript"/>
                      <Picker.Item label="Java" value=" java"/>
                      <Picker.Item label="Javas" value=" java"/>
                    </Picker>
                   </View>
                   
                   <TouchableOpacity onPress={(showDatePicker)}  >
                                    <Text  style={styles.btn1}>Date of Birth</Text>
                                    <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        
      />
                    </TouchableOpacity>
                  
                    <TouchableOpacity onPress={() => navigation.navigate('Zone', d)}>
                                    <Text style={styles.btn}>Participate</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
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
    paddingVertical: 17,
    marginVertical:10,
    color: "#000",
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  btn1:{
    
    paddingHorizontal: 22,
    paddingVertical: 17,
    marginVertical:10,
    color: "#000",
    marginLeft: 20,
    marginRight: 20,
    fontWeight:"bold",
    borderWidth: 2, borderColor:'#dadae8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
