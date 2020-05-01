import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

export default class Portail extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Movie rating</Text>
                <Text style={styles.subtitle}>Welcome</Text>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')} style={styles.button}>
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Register')} style={styles.button}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableHighlight>
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 150,
    },
    title: {
        textAlign: "center",
        fontFamily: 'Montserrat',
        fontSize: 58,
        color: '#2196F3'
    },
    subtitle: {
        marginTop: 75,
        marginBottom: 100,
        textAlign: "center",
        fontFamily: 'Montserrat',
        fontSize: 48,
        color: 'black'
    },
    button: {
        paddingLeft: 80,
        paddingRight: 80,
        paddingTop: 20,
        paddingBottom: 20,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#2196F3',
        borderWidth: 1,
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Montserrat',
        color: '#2196F3'
    }
});