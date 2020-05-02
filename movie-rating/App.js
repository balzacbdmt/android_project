import React, { Component } from 'react';
import * as Font from 'expo-font';
import { StyleSheet, ActivityIndicator, View, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

import Portail from './route/Portail'
import Login from './route/Login'
import Register from './route/Register'
import Home from './route/Home'
import Movie from './route/Movie'


export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      assetsLoaded: false,
      username: "",
      password: "",
      listMovie: []
    }
  }

  async componentDidMount() {
      await Font.loadAsync({
        Montserrat: require('./assets/fonts/Montserrat.ttf')
      });
      this.setState({ assetsLoaded: true });
  }

  fillUser = (usernameNew, passwordNew) => {
    this.setState({username: usernameNew, password: passwordNew})
    return true
  }

  tryConnect = (usernameCon, passwordCon) => {
    if (usernameCon == this.state.username && passwordCon == this.state.password) {
      return true
    } else {
      return false
    }
  }
  
  addMovie = (movie) => {
    this.state.listMovie.push(movie)
  }

  updateMovie = (id, rate, commentary) => {
    this.state.listMovie.forEach(function(element) {
      if (id === element.item.id) {
        element.rate = rate
        element.commentary = commentary
      }
    });
  }

  removeMovie = (id) => {
    this.state.listMovie.forEach(function(element, index, object) {
      if (id === element.item.id) {
        object.splice(index, 1)
      }
    });
  }

  checkExistence = (id) => {
    let result = false
    this.state.listMovie.forEach(function(element, index, object) {
      if (id === element.item.id) {
        result = true
      }
    });
    return result
  }
  
  render() {
    StatusBar.setBarStyle('dark-content')

    const {assetsLoaded} = this.state;

    if( assetsLoaded ) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Portail" component={Portail} />
            <Stack.Screen name="Home">
              {props => <Home {...props} listMovie={this.state.listMovie} username={this.state.username} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {props => <Register {...props} fillUser={this.fillUser} />}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {props => <Login {...props} tryConnect={this.tryConnect} />}
            </Stack.Screen>
            <Stack.Screen name="Movie">
              {props => <Movie {...props} 
                addMovie={this.addMovie} 
                updateMovie={this.updateMovie}
                removeMovie={this.removeMovie} 
                checkExistence={this.checkExistence} 
                listMovie={this.state.listMovie} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    );
    }
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
