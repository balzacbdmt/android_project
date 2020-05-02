import React, {Component} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ListMovies from './ListMovies'
import AddMovie from './AddMovie'
import SearchMovie from './SearchMovie'
import Settings from './Settings'

export default class Home extends Component {

    render() {

        return (
            <Tab.Navigator
                initialRouteName = 'ListMovies'
                tabBarOptions = {{
                showIcon: true,
                showLabel: false
                }}
            >
                <Tab.Screen 
                    name="ListMovies" 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="database" color={'#2196F3'} size={40} />
                        ),
                    }}>
                    {props => <ListMovies {...props} listMovie={this.props.listMovie} />}
                </Tab.Screen>
                <Tab.Screen 
                    name="SearchMovie" 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="database-search" color={'#2196F3'} size={40} />
                        ),
                    }}>
                    {props => <SearchMovie {...props} listMovie={this.props.listMovie} />}
                </Tab.Screen>
                <Tab.Screen 
                    name="AddMovie" 
                    component={AddMovie}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="database-plus" color={'#2196F3'} size={40} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name="Settings" 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="settings" color={'#2196F3'} size={40} />
                        ),
                    }}>
                    {props => <Settings {...props} username={this.props.username} />}
                </Tab.Screen>
            </Tab.Navigator>     
        )
    }
}