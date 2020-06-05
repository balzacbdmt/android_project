import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import SearchBar from '../components/SearchBar';
import RowElement from '../components/RowElement';

class AddElement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            result: null
        }
    }

    searchElement = () => {
        if (!this.props.search.value) {
            this.setState({result: null})
            const search = { type: "SEARCH", value: false }
            this.props.dispatch(search);
            return;
        }

        fetch("https://itunes.apple.com/search?term="+this.props.search.value+"&entity="+this.props.search.listTypeItunes[this.props.search.type])
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

    openElement = (item) => {
        this.props.navigation.navigate('Element', {element: item, adding: true});
    }

    render() {
        this.props.search.search ? this.searchElement() : null;

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
                            <TouchableHighlight onPress={() => this.openElement(item)}>
                                <RowElement element={item} />                                  
                            </TouchableHighlight>
                        )}
                    }                        
                    keyExtractor={(item, index)=> index}
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
        paddingTop: Constants.statusBarHeight
    },
});

export default connect(mapStateToProps)(AddElement);