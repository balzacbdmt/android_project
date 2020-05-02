import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, Keyboard, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RowMovie from '../components/RowMovie'

export default class AddMovie extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            result: [],
            loading: false
        }
    }

    toggleName = (text) => {
        this.setState({name: text})
    }

    searchMovie = () => {
        this.setState({loading: true})
        if (!this.state.name) {
            alert("Champs invalide !")
            return;
        }
        fetch("https://imdb-api.com/en/API/Search/k_31KZiVgx/"+this.state.name)
            .then(response => response.json())
            .then((responseJson) => {
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        result: responseJson.results
                    })
                }, 2000)

            })
            .catch(error => console.log(error))
    }

    openDetail = (itemDetail) => {
        this.props.navigation.navigate('Movie', {item: itemDetail, adding: true})
    }

    render() {
        const result = this.state.result
        const loading = this.state.loading

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Add a movie</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="enter movie title..."
                        onChangeText={text => this.toggleName(text)}
                        value={this.state.name}
                    />
                    <TouchableHighlight onPress={this.searchMovie} style={styles.searchBtn}>
                        <Icon
                            name="search"
                            color={'#2196F3'} 
                            size={30}
                        />
                    </TouchableHighlight>
                </View>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {loading
                    ?<View style={styles.loadingContainer}>
                        <ActivityIndicator />
                    </View>
                    :<FlatList
                        horizontal={false}
                        numColumns= "2"
                        data={result}
                        renderItem={({ item }) => {
                            return(
                                <TouchableHighlight onPress={() => this.openDetail(item)} style={styles.row}>
                                    <RowMovie
                                        id={item.id} 
                                        title={item.title} 
                                        image={item.image} 
                                        description={item.description} 
                                    />                                  
                                </TouchableHighlight>
                            )}
                        }                        
                        keyExtractor={item => item.id}
                        />
                    } 
                </TouchableWithoutFeedback>
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