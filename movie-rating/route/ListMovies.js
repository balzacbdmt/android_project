import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, FlatList, TouchableHighlight } from 'react-native';
import RowMovie from '../components/RowMovie'

export default class ListMovies extends Component {

    constructor(props) {
        super(props)
    }

    openDetail = (itemDetail) => {
        this.props.navigation.navigate('Movie', {item: itemDetail.item, adding: false, rate: itemDetail.rate, commentary: itemDetail.commentary})
    }

    render() {
        const filmCount = this.props.listMovie.length
        let noMovie = 
            <View style={styles.noMovie}>
                <Text style={styles.subTitle}>Your movie list is empty :(</Text>
            </View>

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Your movies list</Text>
                {!filmCount ? noMovie :
                <FlatList
                        horizontal={false}
                        numColumns= "2"
                        data={this.props.listMovie}
                        renderItem={({ item }) => {
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
                        keyExtractor={item => item.item.id}
                        />
                }
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
    subTitle: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        textAlign: 'center',
        color: "#2196F3"
    },
    noMovie: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});