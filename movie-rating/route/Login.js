import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    changeLoginUsername(text) {
        this.setState({username: text})
    }

    changeLoginPassword(text) {
        this.setState({password: text})
    }

    login = () => {
        if (this.props.tryConnect(this.state.username, this.state.password)) {
            this.props.navigation.navigate('Home')
        } else {
            alert("Username or password error")
        }
    }

    render() {
        const username = this.state.username
        const password = this.state.password
        let btnSignIn = 
            <TouchableHighlight style={styles.buttonDisabled}>
                <Text style={styles.buttonText}>SIGN IN</Text>
            </TouchableHighlight>
        if (username && password) {
            btnSignIn = 
                <TouchableHighlight onPress={this.login} style={styles.button}>
                    <Text style={styles.buttonText}>SIGN IN</Text>
                </TouchableHighlight>
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Movie rating</Text>
                <Text style={styles.subtitle}>Sign in</Text>
                <TextInput
                    style={styles.input}
                    placeholder="username"
                    onChangeText={text => this.changeLoginUsername(text)}
                    value={this.state.username}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="password"
                    onChangeText={text => this.changeLoginPassword(text)}
                    value={this.state.password}
                />
                {btnSignIn}
                <TouchableHighlight onPress={() => this.props.navigation.navigate('Portail')} style={styles.button}>
                    <Text style={styles.buttonText}>back</Text>
                </TouchableHighlight>
            </View>            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
    },
    title: {
        textAlign: "center",
        fontFamily: 'Montserrat',
        fontSize: 58,
        color: '#2196F3'
    },
    subtitle: {
        marginTop: 75,
        marginBottom: 25,
        textAlign: "center",
        fontFamily: 'Montserrat',
        fontSize: 48,
        color: 'black'
    },
    button: {
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196F3',
        color: '#fff',
        borderRadius: 10,
    },
    buttonDisabled: {
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 15,
        paddingBottom: 15,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        color: '#fff',
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Montserrat',
        color: '#fff',
    },
    input: {
        textAlign: 'center',
        color: 'black',
        borderColor: '#2196F3',
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        margin: 5,
        width: 300,
    }
});