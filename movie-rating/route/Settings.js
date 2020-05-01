import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, Platform } from 'react-native';

export default class Settings extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Settings</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 28,
        textAlign: 'center'
    }
});