import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableHighlight } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Rating from '../components/Rating'

export default class Movie extends Component {

    constructor(props) {
        super(props)
        this.state = {
            adding: false,
            item: null,
            loaded: false,
            infos: [],
            rate: 0,
            commentary: ""
        }
    }

    componentDidMount = () => {
        let item = this.props.route.params.item

        this.setState({
            item : this.props.route.params.item,
            adding : this.props.route.params.adding
        })

        if (this.props.checkExistence(item.id)  && this.props.route.params.adding) {
            //TODO "toast" to advert user already in list
            this.props.navigation.goBack()
        }

        if (!item.id) {
            this.props.navigation.goBack()
            alert("Error "+item.id)
            return
        }

        fetch("https://imdb-api.com/en/API/FullCast/k_31KZiVgx/"+item.id)
            .then(response => response.json())
            .then((responseJson) => {
                setTimeout(() => {
                    this.setState({
                        loaded: true,
                        infos: responseJson
                    })
                }, 2000)
            })
            .catch(error => console.log(error))

        if (!this.props.route.params.adding) {
            this.setState({
                rate : this.props.route.params.rate,
                commentary: this.props.route.params.commentary
            })
        }
    }

    submitBtn = () => {
        // if adding: add to list
        if (this.state.adding) {
            let movie = {item: this.state.item, rate: this.state.rate, commentary: this.state.commentary}
            this.props.addMovie(movie)
            this.props.navigation.goBack()
        } 
        // else update the movie
        else {
            this.props.updateMovie(this.state.item.id, this.state.rate, this.state.commentary)
            this.props.navigation.goBack()
        }
    }

    toggleRate = (newRate) => {
        this.setState({rate: newRate})
    }

    changeCommentary = (text) => {
        this.setState({commentary: text})
    }

    removeFromList = (idMovie) => {
        this.props.removeMovie(idMovie)
        this.props.navigation.goBack()
    }

    render() {
        const loaded = this.state.loaded

        if (loaded) {
            const item = this.state.item
            const infos = this.state.infos
            const adding = this.state.adding
            let btnTxt, rmBtn
            
            if (adding) {
                btnTxt = "Add to your list"
            } else {
                btnTxt = "Update"
                rmBtn =
                    <TouchableHighlight onPress={() => this.removeFromList(item.id)} style={styles.btn}>
                        <Text style={styles.txtBtn}>remove from list</Text>
                    </TouchableHighlight>
            }

            return (
            <ScrollView>
                <View style={styles.container}>
                    <Image 
                        style={styles.cover}
                        source={{
                        uri: item.image,
                        }}
                    />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{infos.year}</Text>
                    <Text style={styles.subtitle}>{infos.type}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Commentary"
                        onChangeText={text => this.changeCommentary(text)}
                        value={this.state.commentary}
                    />
                    <Rating rate={this.state.rate} toggleRate={this.toggleRate} />
                    <TouchableHighlight onPress={this.submitBtn} style={styles.btn}>
                        <Text style={styles.txtBtn}>{btnTxt}</Text>
                    </TouchableHighlight>
                    {rmBtn}
                    <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={styles.btn}>
                        <Text style={styles.txtBtn}>Back</Text>
                    </TouchableHighlight>                    
                </View>
            </ScrollView>
            )
        } else {
            return (
                <View style={styles.loading}>
                    <Text style={styles.textLoading}>Downloading informations</Text>
                    <ActivityIndicator />
                </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textLoading: {
        marginBottom: 10
    },
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        alignItems: 'center'
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 28,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        textAlign: 'center',
        color: '#000'
    },
    cover: {
        width: 260,
        height: 380,
    },
    btn: {
        backgroundColor: '#2196F3',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    txtBtn: {
        fontFamily: 'Montserrat',
        color: '#fff',
        fontSize: 18
    },
    input: {
        textAlign: 'center',
        color: 'black',
        borderColor: '#2196F3',
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        margin: 10,
        width: 300,
    }
});