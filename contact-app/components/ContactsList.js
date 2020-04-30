import React, {Component} from 'react';
import { StyleSheet, View, TouchableHighlight, FlatList, Text } from 'react-native';
import Constants from 'expo-constants';

import Row from './Row';

export default class ContactsLists extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Vos contacts</Text>
                <FlatList
                    data={JSON.parse(this.props.contactList)}
                    renderItem={({ item }) => <Row name={item.name} phone={item.phone} />}
                    keyExtractor={item => item.id}
                />
                <TouchableHighlight onPress={this.props.toggleView} style={styles.button}>
                    <Text style={styles.buttonTextStyle}>+</Text>
                </TouchableHighlight>
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
        textAlign: "center",
        fontSize: 32,
        color: '#E1A226'
    },
    button: {
        backgroundColor: '#E1A226',
        borderRadius: 100,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: "center",
        right: 0,
        bottom: 0,
        left: 280,
        top: -20
    },
    buttonTextStyle: {
        fontSize: 70,
        textAlign: 'center',
        textAlignVertical: "center",
        lineHeight: 72,
        color: 'white',
        fontWeight: '800'
    }
});