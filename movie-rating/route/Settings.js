import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Settings extends Component {

    constructor(props) {
        super(props)
    }

    disconnect = () => {
        this.props.navigation.navigate('Portail')
    }

    render() {
        const username = this.props.username

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Settings</Text>
                <View style={styles.content}>
                    <Text style={styles.text}>Connected as {username}</Text>
                    <TouchableHighlight onPress={this.disconnect} style={styles.searchBtn}>
                        <Icon
                            name="power-off"
                            color={'#2196F3'} 
                            size={75}
                        />
                    </TouchableHighlight>
                </View>                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 28,
        textAlign: 'center'
    },
    text: {
        marginBottom: 25,
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: 22
    }
});