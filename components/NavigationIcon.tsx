import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons, Entypo, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'           

interface NavigationIconProps {
  route: string, 
  isFocused: boolean
}

const  NavigationIcon = ({route, isFocused}: NavigationIconProps) => {
  const renderIcon = (route: string, isFocues: boolean) =>{
  
    switch (route) {
        case "Floorplan":
            return isFocues?<Ionicons name="location" size={27} color="#242424"/>: <Ionicons name="location" size={27} color="#242424"/>
        case "Athletes":
          return isFocues?<Entypo name="man" size={27} color="#242424"/>: <Entypo name="man" size={27} color="#242424"/>
        case "Events":
          return isFocues?<MaterialIcons name="emoji-events" size={27} color="#242424"/>: <MaterialIcons name="emoji-events" size={27} color="#242424"/>
        case "Zones":
          return isFocues?<FontAwesome5 name="compass" size={27} color="#242424"/>: <FontAwesome5 name="compass" size={27} color="#242424"/>
        case "Settings":
          return isFocues?<Ionicons name="settings" size={27} color="#242424"/>: <Ionicons name="settings" size={27} color="#242424"/>
      default:
        break;
    }
  }

  return (
    <View>
      {renderIcon(route, isFocused)}
    </View>
  
  )
}

const styles = StyleSheet.create({})

export default NavigationIcon