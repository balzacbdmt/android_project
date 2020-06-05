import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import RowElement from '../components/RowElement';

class ListElement extends Component {

    constructor(props) {
        super(props)
    }

    openElement = (item, index) => {
        this.props.navigation.navigate('Element', {element: item.element, rate: item.rate, commentary: item.commentary, index: index});
    }

    render() {

        if (!this.props.favorite.listFav.length) {
            return (
                <View style={styles.containerEmpty}>
                    <Text style={styles.textEmpty}>Your library is empty !</Text>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        horizontal={false}
                        numColumns= "2"
                        data={this.props.favorite.listFav}
                        renderItem={({ item, index }) => {
                            return(
                                <TouchableHighlight onPress={() => this.openElement(item, index)}>
                                    <RowElement element={item.element} />                                  
                                </TouchableHighlight>
                            )}
                        }                        
                        keyExtractor={(item, index)=> index}
                    />
                </View>
            )
        }

    }
}

const mapStateToProps = state => {
    return { 
        favorite: state.favorite
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3D3D3D',
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },
    containerEmpty: {
        backgroundColor: '#3D3D3D',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textEmpty: {
        fontSize: 18,
        color: "#FFEC00"
    }
});

export default connect(mapStateToProps)(ListElement);