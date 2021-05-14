import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    onChangeText = (text) => {
        this.setState({
            text: text
        })
    }

    onSubmitEditing = () => {
        let { text } = this.state;
        let { onSubmit } = this.props;

        if (!text) return;
        onSubmit(text);
        this.setState({
            text: ''
        })
    }

    render() {
        let { searchPlaceHoder } = this.props;
        let { text } = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    value={text}
                    autoCorrect={false}
                    placeholder={searchPlaceHoder}
                    placeholderTextColor="#696969"
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    clearButtonMode="always"
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEditing}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        color: 'black',
        fontSize: 20,
    },
    container: {
        height: 50,
        width: 350,
        marginTop: 30,
        backgroundColor: '#DCDCDC',
        marginHorizontal: 20,
        paddingHorizontal: 15,
        borderRadius: 5,
    }
});

export default Search;