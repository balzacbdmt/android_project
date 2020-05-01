import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ListMovies extends Component {

    constructor(props) {
        super(props)
    }

    updateRate = (rate) => {
        this.props.toggleRate(rate)
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={rate => this.updateRate(1)}>
                    <Icon
                        name="star"
                        color={this.props.rate >= 1 ? 'gold' : '#2196F3'} 
                        size={30}
                    />
                </TouchableHighlight>
                <TouchableHighlight onPress={rate => this.updateRate(2)}>
                    <Icon
                        name="star"
                        color={this.props.rate >= 2 ? 'gold' : '#2196F3'} 
                        size={30}
                    />
                </TouchableHighlight>
                <TouchableHighlight onPress={rate => this.updateRate(3)}>
                    <Icon
                        name="star"
                        color={this.props.rate >= 3 ? 'gold' : '#2196F3'} 
                        size={30}
                    />
                </TouchableHighlight>
                <TouchableHighlight onPress={rate => this.updateRate(4)}>
                    <Icon
                        name="star"
                        color={this.props.rate >= 4 ? 'gold' : '#2196F3'} 
                        size={30}
                    />
                </TouchableHighlight>
                <TouchableHighlight onPress={rate => this.updateRate(5)}>
                    <Icon
                        name="star"
                        color={this.props.rate >= 5 ? 'gold' : '#2196F3'} 
                        size={30}
                    />
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 28,
        textAlign: 'center'
    }
});