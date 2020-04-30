import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Row extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.row}>
                <Text style={styles.name}>{this.props.name}</Text>
                <Text style={styles.phone}>{this.props.phone}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
        padding: 8
    },
    name: {

    },
    phone: {
        
    }
});

export default Row;