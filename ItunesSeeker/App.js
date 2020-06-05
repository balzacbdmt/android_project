import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AddElement from './route/AddElement';
import ListElement from './route/ListElement';
import Element from './route/Element';

import Store from './store/configureStore';

export default class App extends Component {

  render() {

    function Home() {
      return (
        <Tab.Navigator
          initialRouteName = 'AddElement'
          tabBarOptions = {{
            showIcon: true,
            showLabel: false,
            activeBackgroundColor: '#232323',
            inactiveBackgroundColor: '#232323'
          }}>
          <Tab.Screen 
            name="AddElement" 
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="magnify-plus-outline" color={'#FFEC00'} size={40} />
              ),
            }}>
            {props => <AddElement {...props} />}
          </Tab.Screen>
          <Tab.Screen 
            name="ListElement" 
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="format-list-bulleted" color={'#FFEC00'} size={40} />
              ),
            }}>
            {props => <ListElement {...props} />}
          </Tab.Screen>
        </Tab.Navigator>          
      );
    }

    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Element">
              {props => <Element {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}
