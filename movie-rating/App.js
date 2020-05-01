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
      listMovie: [{
        "commentary": "Bof",
        "item": {
          "description": "(1987)",
          "id": "22222222",
          "image": "https://imdb-api.com/images/original/MV5BZWVlYzU2ZjQtZmNkMi00OTc3LTkwZmYtZDVjNmY4OWFmZGJlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.7273_AL_.jpg",
          "resultType": "Title",
          "title": "RoboCop1",
        },
        "rate": 3,
      },{
        "commentary": "Bof",
        "item": {
          "description": "(1987)",
          "id": "111111111",
          "image": "https://imdb-api.com/images/original/MV5BZWVlYzU2ZjQtZmNkMi00OTc3LTkwZmYtZDVjNmY4OWFmZGJlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.7273_AL_.jpg",
          "resultType": "Title",
          "title": "RoboCop2",
        },
        "rate": 3,
      },{
        "commentary": "Bof",
        "item": {
          "description": "(1987)",
          "id": "3333333",
          "image": "https://imdb-api.com/images/original/MV5BZWVlYzU2ZjQtZmNkMi00OTc3LTkwZmYtZDVjNmY4OWFmZGJlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.7273_AL_.jpg",
          "resultType": "Title",
          "title": "RoboCop3",
        },
        "rate": 3,
      }]
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
    console.log(this.state.listMovie)
  }

  updateMovie = (id, rate, commentary) => {
    //TODO
  }

  removeMovie = (id) => {
    alert(id)
    this.state.listMovie.forEach(function(element, index, object) {
      if (id === element.item.id) {
        object.splice(index, 1)
      }
    });
  }
  
  render() {
    StatusBar.setBarStyle('dark-content')

    const {assetsLoaded} = this.state;

    if( assetsLoaded ) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home">
              {props => <Home {...props} listMovie={this.state.listMovie} />}
            </Stack.Screen>
            <Stack.Screen name="Portail" component={Portail} />
            <Stack.Screen name="Register">
              {props => <Register {...props} fillUser={this.fillUser} />}
            </Stack.Screen>
            <Stack.Screen name="Login">
              {props => <Login {...props} tryConnect={this.tryConnect} />}
            </Stack.Screen>
            <Stack.Screen name="Movie">
              {props => <Movie {...props} addMovie={this.addMovie} removeMovie={this.removeMovie} listMovie={this.state.listMovie} />}
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
