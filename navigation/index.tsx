/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotificationScreen from '../screens/NotificationScreen';
import SearchScreen from '../screens/SearchScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ZonesScreen from '../screens/ZonesScreen';
import AthletesScreen from '../screens/AthletesScreen';
import AthleteScreen from '../screens/AthleteScreen';
import EventsScreen from '../screens/EventsScreen';
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EventScreen from '../screens/EventScreen';
import ZoneScreen from '../screens/ZoneScreen';
import BuyTicketsScreen from '../screens/BuyTicketsScreen';
import ParticipateScreen from '../screens/ParticipateScreen';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ParticipantScreen from '../screens/ParticipantScreen';
import OrganizerScreen from '../screens/OrganizerScreen';
import ScheduleScreen from '../screens/ScheduleScreen';

import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';



import TabBar  from ".././components/TabBar"; 

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
      <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen
          name="Participant"
          component={ParticipantScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="Organizer"
          component={OrganizerScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
         <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      </Stack.Group>
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="Athlete"
        component={AthleteScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="Zone"
        component={ZoneScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="BuyTicket"
        component={BuyTicketsScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="Participate"
        component={ParticipateScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Notification"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
      tabBar={props => <TabBar {...props} />}
      >
      <BottomTab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={({ navigation }: RootTabScreenProps<'Zones'>) => ({
          title: 'Feeds',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="gear"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name="Zones"
        component={ZonesScreen}
        options={({ navigation }: RootTabScreenProps<'Zones'>) => ({
          title: 'Zones',
          tabBarIcon: ({ color  }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="gear"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name="Events"
        component={EventsScreen}
        options={({ navigation }: RootTabScreenProps<'Zones'>) => ({
          title: 'Events',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="gear"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name="Athletes"
        component={AthletesScreen}
        options={({ navigation }: RootTabScreenProps<'Zones'>) => ({
          title: 'Athletes',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="gear"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name="Floorplan"
        component={MapScreen}
        options={({ navigation }: RootTabScreenProps<'Zones'>) => ({
          title: 'Floorplan',
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Settings')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="gear"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          )
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
