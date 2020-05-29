import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AddElement from './route/AddElement';
import ListElement from './route/ListElement';

export default class App extends Component {

  render() {

      return (
        <NavigationContainer>
          <Tab.Navigator
              initialRouteName = 'ListMovies'
              tabBarOptions = {{
                showIcon: true,
                showLabel: false,
                activeBackgroundColor: '#232323',
                inactiveBackgroundColor: '#232323'
              }}>
              <Tab.Screen 
                  name="ListMovies" 
                  options={{
                      tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="magnify-plus-outline" color={'#FFEC00'} size={40} />
                      ),
                  }}>
                  {props => <AddElement {...props} />}
              </Tab.Screen>
              <Tab.Screen 
                  name="SearchMovie" 
                  options={{
                      tabBarIcon: ({ color, size }) => (
                          <MaterialCommunityIcons name="format-list-bulleted" color={'#FFEC00'} size={40} />
                      ),
                  }}>
                  {props => <ListElement {...props} />}
              </Tab.Screen>
          </Tab.Navigator>     
        </NavigationContainer>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
