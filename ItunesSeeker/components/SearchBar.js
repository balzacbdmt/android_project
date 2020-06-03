import React, {Component} from 'react';
import { StyleSheet, View, TouchableHighlight, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: null
        }
    }
    
    toggleValue = (value) => {
        this.setState({value: value});
    }

    toggleType = (newType) => {
        const toggleType = { type: "TOGGLE_TYPE", value: newType }
        this.props.dispatch(toggleType);
        const search = { type: "SEARCH", value: true }
        this.props.dispatch(search);
    }

    search = () => {
        const toggleValue = { type: "TOGGLE_VALUE", value: this.state.value }
        this.props.dispatch(toggleValue);
        const search = { type: "SEARCH", value: true }
        this.props.dispatch(search);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="enter ..."
                        onChangeText={text => this.toggleValue(text)}
                        value={this.state.value}
                    />
                    <TouchableHighlight onPress={this.search} style={styles.searchBtn}>
                        <Icon
                            name="search"
                            color={'#FFEC00'} 
                            size={30}
                        />
                    </TouchableHighlight>
                </View>
                <View style={styles.barType}>
                    {this.props.search.listType.map((type, key) => {
                        return (
                            <TouchableHighlight onPress={rate => this.toggleType(key)} style={this.props.search.type === key ? styles.typeSelected : styles.type}>
                                <Text style={styles.text}>{this.props.search.listType[key]}</Text>
                            </TouchableHighlight>
                        );
                    })}
                </View>                
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
        paddingBottom: 5
    },
    input: {
        textAlign: 'center',
        color: '#fff',
        borderColor: '#FFEC00',
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
    barType: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingBottom: 5
    },
    type: {
        backgroundColor: '#FFEC00',
        alignSelf: 'center',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 5,
        borderRadius: 10
    },
    typeSelected: {
        backgroundColor: '#fff',
        alignSelf: 'center',
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 5,
        borderRadius: 10
    },
    text: {
        fontSize: 20,
        fontWeight: '500'
    }
});

export default connect(mapStateToProps)(SearchBar);