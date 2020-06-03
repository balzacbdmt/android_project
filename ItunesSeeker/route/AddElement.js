import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import SearchBar from '../components/SearchBar';
import Element from '../components/Element';

class AddElement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            result: null
        }
    }

    searchMovie = () => {
        if (!this.props.search.value) {
            this.setState({result: null})
            const search = { type: "SEARCH", value: false }
            this.props.dispatch(search);
            return;
        }

        fetch("https://itunes.apple.com/search?country=fr&term="+this.props.search.value+"&entity="+this.props.search.listTypeItunes[this.props.search.type])
            .then(response => response.json())
            .then((responseJson) => {
                setTimeout(() => {
                    this.setState({
                        result: responseJson.results
                    });
                    const search = { type: "SEARCH", value: false }
                    this.props.dispatch(search);
                }, 2000)

            })
            .catch(error => console.log(error))
    }

    render() {
        this.props.search.search ? this.searchMovie() : null;

        const result = this.state.result;

        return (
            <View style={styles.container}>
                <SearchBar />
                {this.props.search.search ? <ActivityIndicator /> :
                <FlatList
                    horizontal={false}
                    numColumns= "2"
                    data={result}
                    renderItem={({ item }) => {
                        return(
                            <TouchableHighlight onPress={alert}>
                                <Element
                                    wrapperType={item.wrapperType}
                                    trackName={item.trackName}
                                    collectionName={item.collectionName}
                                    artistName={item.artistName}
                                    artworkUrl100={item.artworkUrl100}
                                    releaseDate={item.releaseDate}
                                    primaryGenreName={item.primaryGenreName}
                                />                                  
                            </TouchableHighlight>
                        )}
                    }                        
                    keyExtractor={item => item.id}
                />
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { 
        search: state.search
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3D3D3D',
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
});

export default connect(mapStateToProps)(AddElement)