import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text } from 'react-native';

export default class ListEllement extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>List element !</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
});