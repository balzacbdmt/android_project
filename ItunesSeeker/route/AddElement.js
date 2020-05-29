import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text } from 'react-native';

export default class AddElement extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Add element !</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3D3D3D',
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
});