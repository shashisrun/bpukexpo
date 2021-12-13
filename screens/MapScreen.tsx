import * as React from 'react';
import ImageView from "react-native-image-view";
import { CommonActions } from '@react-navigation/native';
import { ActivityIndicator, Dimensions } from 'react-native';
import { View } from '../components/Themed';
import Data from './../data/Data'

export default function MapScreen({navigation}){
  const [visible, setVisible] = React.useState(true);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = new Data;
        const newData = await data.getData('map');
        if (newData != null){
          setData([{source: {'uri' : newData.map}}]);
          setVisible(true);
        }
      // The screen is focused
      // Call any action
    });
    setVisible(false);
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  
  return (
    <View>
      { visible == true &&
        <ImageView
              images={data}
              imageIndex={0}
              isVisible={visible}
              onClose={() => {
                setVisible(false);
                navigation.dispatch(CommonActions.goBack())
              }}
          />
      }
      { visible == false &&
        <View style={{height: Dimensions.get('window').height}}>
          <ActivityIndicator style={{marginTop: Dimensions.get('window').height/3}} size="large" color="#dbdbdb" />
        </View>
      }
    </View>
  )
}
