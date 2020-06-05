import React, {Component} from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View, Text, Image, ActivityIndicator, TouchableHighlight, Linking, Dimensions } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import Rating from '../components/Rating';

const screenHeight = Math.round(Dimensions.get('window').height);

class Element extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rate: 0,
            commentary: ""
        }
    }

    checkExistence = () => {
        let existence = false;
        this.props.favorite.listFav.forEach(element => {
            element.element === this.props.route.params.element ? existence = true : null;
        });
        return existence;
    }

    componentDidMount = () => {
        console.log(this.checkExistence());

        //check if already in list
        if (this.checkExistence()  && this.props.route.params.adding) {
            alert("Already in list !");
            this.props.navigation.goBack()
        }

        //if already in list, get current rate & commentary
        if (!this.props.route.params.adding) {
            this.setState({
                rate : this.props.route.params.rate,
                commentary: this.props.route.params.commentary
            })
        }
    }

    submitBtn = () => {
        if (this.props.route.params.adding) {
            let elem = {element: this.props.route.params.element, rate: this.state.rate, commentary: this.state.commentary}
            const addFav = { type: "ADD_FAV", value: elem }
            this.props.dispatch(addFav);
            this.props.navigation.goBack();
        }
        else {
            let elem = {element: this.props.route.params.element, rate: this.state.rate, commentary: this.state.commentary, index: this.props.route.params.index }
            const editElem = { type: "EDIT_FAV", value: elem }
            this.props.dispatch(editElem);
            this.props.navigation.goBack();
        }
    }

    toggleRate = (newRate) => {
        this.setState({rate: newRate});
    }

    changeCommentary = (text) => {
        this.setState({commentary: text});
    }

    openArtistDetail = (url) => {
        Linking.openURL(url).catch(err => console.error('An error occurred', err));
    }

    removeFromList = () => {
        const rmElem = { type: "RM_FAV", value: this.props.route.params.index }
        this.props.dispatch(rmElem);
        this.props.navigation.goBack();
    }

    render() {
        const element = this.props.route.params.element;
        const adding = this.props.route.params.adding;
        let content, btnTxt, rmBtn;
        
        if (adding) {
            btnTxt = "Add to favorite"
        } else {
            btnTxt = "Update"
            rmBtn =
                <TouchableHighlight onPress={() => this.removeFromList()} style={styles.btn}>
                    <Text style={styles.txtBtn}>remove from favorite</Text>
                </TouchableHighlight>
        }

        if (element.wrapperType === "track") {
            content = 
                <View style={styles.content}>
                    <Image 
                        style={styles.cover}
                        source={{
                        uri: element.artworkUrl100,
                        }}
                    />
                    <Text style={styles.title}>{element.trackName}</Text>
                    <Text style={styles.title}>{element.collectionName}</Text>
                    <Text style={styles.title}>{element.artistName}</Text>
                </View>
        } else if (element.wrapperType === "collection") {
            content =
                <View style={styles.content}>
                    <Image 
                        style={styles.cover}
                        source={{
                        uri: element.artworkUrl100,
                        }}
                    />
                    <Text style={styles.title}>{element.collectionName}</Text>
                    <Text style={styles.title}>{element.artistName}</Text>
                    <Text style={styles.title}>{element.releaseDate}</Text>
                </View>
        } else if (element.wrapperType === "artist") {
            content =
                <View style={styles.content}>
                    <Text style={styles.title}>{element.artistType}</Text>
                    <Text style={styles.title}>{element.artistName}</Text>
                    <Text style={styles.title}>{element.primaryGenreName}</Text>
                    <TouchableHighlight onPress={() => this.openArtistDetail(element.artistLinkUrl)} style={styles.btn}>
                        <Text style={styles.txtBtn}>get more details on itunes website</Text>
                    </TouchableHighlight>
                </View>
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    {content}
                    <View style={styles.options}>
                        <Rating rate={this.state.rate} toggleRate={this.toggleRate}/>
                        <TextInput
                            style={styles.input}
                            placeholder="Commentary"
                            onChangeText={text => this.changeCommentary(text)}
                            value={this.state.commentary}
                        />
                        <TouchableHighlight onPress={this.submitBtn} style={styles.btn}>
                            <Text style={styles.txtBtn}>{btnTxt}</Text>
                        </TouchableHighlight>
                        {rmBtn}
                        <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={styles.btn}>
                            <Text style={styles.txtBtn}>Back</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        minHeight: screenHeight,
        backgroundColor: '#3D3D3D',
        alignItems: 'center'
    },
    content: {
        margin: 20
    },
    options: {
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#000'
    },
    cover: {
        width: 300,
        height: 300,
    },
    btn: {
        backgroundColor: '#FFEC00',
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    txtBtn: {
        color: '#000',
        fontSize: 18
    },
    input: {
        textAlign: 'center',
        color: 'black',
        borderColor: '#FFEC00',
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        margin: 10,
        width: 300,
    }
});

const mapStateToProps = state => {
    return { 
        favorite: state.favorite
    }
};

export default connect(mapStateToProps)(Element);