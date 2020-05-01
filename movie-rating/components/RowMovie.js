import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default class rowMovie extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let date = this.props.description.replace(/[()]/g, '');
        date = date.split(" ")[0]
        return (
            <View style={styles.row}>
                <Image 
                    style={styles.cover}
                    source={{
                    uri: this.props.image,
                    }}
                />
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 20,
        padding: 15,
        margin: 10,
        width: width/2-20,
        alignItems: 'center',
    },
    cover: {
        width: 130,
        height: 190,
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        textAlign: 'center'
    }
});