import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, FlatList, TouchableHighlight, TextInput } from 'react-native';
import RowMovie from '../components/RowMovie'

export default class SearchMovie extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
    }

    toggleName = (text) => {
        this.setState({name: text})
    }

    openDetail = (itemDetail) => {
        this.props.navigation.navigate('Movie', {item: itemDetail.item, adding: false, rate: itemDetail.rate, commentary: itemDetail.commentary})
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Search a movie</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="enter movie title..."
                        onChangeText={text => this.toggleName(text)}
                        value={this.state.name}
                    />
                </View>
                <FlatList
                    horizontal={false}
                    numColumns= "2"
                    data={this.props.listMovie}
                    renderItem={({ item }) => {
                        if (item.item.title.includes(this.state.name) && this.state.name) {
                            return(
                            <TouchableHighlight onPress={() => this.openDetail(item)} style={styles.row}>
                                <RowMovie
                                    id={item.item.id} 
                                    title={item.item.title} 
                                    image={item.item.image} 
                                    description={item.item.description} 
                                />                                  
                            </TouchableHighlight>
                            )}
                        }                        
                    }                        
                    keyExtractor={item => item.item.id}
                    />
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
        fontFamily: 'Montserrat',
        fontSize: 28,
        textAlign: 'center'
    },
    searchContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingBottom: 5
    },
    input: {
        textAlign: 'center',
        color: 'black',
        borderColor: '#2196F3',
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        margin: 5,
        width: 300,
    },
    searchBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 5,
        height: 35
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});