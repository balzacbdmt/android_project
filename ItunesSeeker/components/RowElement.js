import React, {Component} from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';

class Element extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.element.wrapperType === "track") {
            return (
                <View style={styles.row}>
                    <Image 
                        style={styles.cover}
                        source={{
                        uri: this.props.element.artworkUrl100,
                        }}
                    />
                    <Text style={styles.title}>{this.props.element.trackName}</Text>
                    <Text style={styles.title}>{this.props.element.collectionName}</Text>
                    <Text style={styles.title}>{this.props.element.artistName}</Text>
                </View>
            )
        } else if (this.props.element.wrapperType === "collection") {
            return (
                <View style={styles.row}>
                    <Image 
                        style={styles.cover}
                        source={{
                        uri: this.props.element.artworkUrl100,
                        }}
                    />
                    <Text style={styles.title}>{this.props.element.collectionName}</Text>
                    <Text style={styles.title}>{this.props.element.artistName}</Text>
                    <Text style={styles.title}>{this.props.element.releaseDate}</Text>
                </View>
            )
        } else if (this.props.element.wrapperType === "artist") {
            return (
                <View style={styles.row}>
                    <Text style={styles.title}>{this.props.element.artistName}</Text>
                    <Text style={styles.title}>{this.props.element.primaryGenreName}</Text>
                </View>
            )
        }
        return null;
    }
}

const mapStateToProps = state => {
    return { 
        search: state.search
    }
};

const styles = StyleSheet.create({
    row: {
        borderColor: '#FFEC00',
        borderWidth: 1,
        borderRadius: 20,
        padding: 15,
        margin: 10,
        width: width/2-20,
        alignItems: 'center',
    },
    cover: {
        width: 130,
        height: 130,
    },
    title: {
        fontSize: 18,
        textAlign: 'center'
    }
});

export default connect(mapStateToProps)(Element);