import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import AddContactForm from './components/AddContactForm';
import ContactsList from './components/ContactsList';

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      contactList: [{id: 1, name: "Michel", phone: "0683928492"},{id: 2, name: "Michel", phone: "0683928492"},{id: 3, name: "Michel", phone: "0683928492"},{id: 4, name: "Michel", phone: "0683928492"}],
      addContact: false
    }
  }

  toggleAddContact = () => {
    this.setState({addContact: !this.state.addContact})
  }

  addContact = (newName, newPhone) => {
    let newId = this.state.contactList.length+1
    let contact = {id: newId, name: newName, phone: newPhone}
    this.state.contactList.push(contact)
  }

  render() {
    const addContact = this.state.addContact
    const contactList = this.state.contactList

    return (
      <View style={styles.container}>
        {addContact
          ? <AddContactForm toggleView={this.toggleAddContact} addContact={this.addContact} />
          : <ContactsList toggleView={this.toggleAddContact} contactList={JSON.stringify(contactList)} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    marginTop: 100,
    marginLeft: 50
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },
});
