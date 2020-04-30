import React, {Component} from 'react';
import { StyleSheet, TouchableWithoutFeedback, TextInput, View, Text, Button, Keyboard } from 'react-native';

export default class AddContactsForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contactName: "Paul Lemoine",
            contactPhone: "0684932945"
        }
    }

    changeContactName = (text) => {
        this.setState({contactName: text})
    }

    changeContactPhone = (text) => {
        this.setState({contactPhone: text})
    }

    saveContact = () => {
        const contactName = this.state.contactName
        const contactPhone = this.state.contactPhone
        
        this.props.addContact(contactName, contactPhone)

        this.props.toggleView()
    }

    render() {
        const contactName = this.state.contactName
        const contactPhone = this.state.contactPhone
        let buttonCreate = <Button
            onPress={this.saveContact}
            title="Create"
            color="white"
            accessibilityLabel="Create the contact button"
            disabled="true"
        />
        if (contactName && contactPhone) {
            buttonCreate = <Button
                onPress={this.saveContact}
                title="Create"
                color="white"
                accessibilityLabel="Create the contact button"
            />
        }

        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.title}>Create a new contact</Text>
                    <Text style={styles.subtitle}>Name</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='default'
                        onChangeText={text => this.changeContactName(text)}
                        value={this.state.contactName}
                    />
                    <Text style={styles.subtitle}>Phone number</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType= 'phone-pad'
                        onChangeText={text => this.changeContactPhone(text)}
                        value={this.state.contactPhone}
                    />
                    <View style={styles.button}>
                        { buttonCreate }
                    </View>
                    <View style={styles.button}>
                        <Button
                            onPress={this.props.toggleView}
                            title="Cancel"
                            color="white"
                            accessibilityLabel="Cancel the contact button"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 100
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        color: 'black',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        color: 'black',
        marginTop: 25
    },
    input: {
        textAlign: 'center',
        color: 'black',
        borderColor: '#E1A226',
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 5,
        padding: 8,
        margin: 5,
        width: 300,
    },
    button: {
        marginTop: 25,
        textAlign: 'center',
        backgroundColor: '#E1A226',
        borderRadius: 5,
        padding: 8,
        width: 200,
        justifyContent: 'center'
    }
});
