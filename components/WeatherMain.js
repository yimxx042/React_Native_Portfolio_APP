import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet, Text, View, Platform, TextInput, KeyboardAvoidingView,
  ImageBackground, ActivityIndicator, Image
} from 'react-native';
import { getWeather, getImageBackground } from './WeatherApi';
import Search from './Search';



class WeatherMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: 'Dallas',
      weather: '',
      temperature: '',
      imageBackground: '',
      loading: true,
      error: false,
      humidity:'',
      minTemp:'',
      highTemp:'',
      timeZone:''

    }
  }
  async componentDidMount() {
    await this.onSubmit(`Dallas`)
  }

  onSubmit = async (text) => {
    let data = await getWeather(text);
    if (data) {
      this.setState({
        location: text,
        humidity:data.humidity,
        weather: data.weatherStateName,
        temperature: Number((data.temperature).toFixed(1)),
        minTemp: Number((data.minTemp).toFixed(1)),
        maxTemp: Number((data.maxTemp).toFixed(1)),
        imageBackground: getImageBackground(data.weatherStateAbbr),
        error: false,
        loading: false
      })

    } else {
      this.setState({
        error: true,
        loading: false,
        location: text,
        weather: `Please search another city`,
        temperature: `0`,
        humidity:'0 wind speed',
        imageBackground: getImageBackground('c'),
        minTemp: 'N/A',
        maxTemp: 'N/A',
        timeZone:'N/A'
        
      })
    }
  }

  render() {
    let { timeZone, minTemp, maxTemp, location, weather, temperature, humidity, imageBackground, loading, error } = this.state;
    if (!imageBackground) {
      imageBackground = getImageBackground('c')
    }
    return (
      <KeyboardAvoidingView style={styles.container} >
        {loading ?
            <ActivityIndicator color='black' size='large' />:
            <ImageBackground
                source={imageBackground}
                style={styles.imageContainer}
                imageStyle={styles.image}
            >
            <View style={styles.detailsContainer}>  

                <Text style={[styles.largeText, styles.textStyle]}>
                    {timeZone}
                </Text>
                <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                </Text>
                <Text style={[styles.largeText, styles.textStyle]}>
                    {temperature}°
                </Text>             
                <Search style={styles.searchBox}
                    searchPlaceHoder={"Search city"}
                    onSubmit={this.onSubmit}
                />
   
                <Text style={[styles.smallText, styles.textStyle, styles.boxStyle]}>
                <Text style={styles.contentStyle}>
                <Text style={[styles.largeText, styles.textStyle, styles.titleStyle]}>
                {weather ? weather : ''}
                </Text>{"\n"}
                <Text style={[styles.smallText, styles.otherStyle]}>
                  Humidity:{humidity}% 
                    <Image
                        style={styles.humidityicon}
                        source={{
                        uri: 'https://static.thenounproject.com/png/1001987-200.png',
                        }}
                /> {"\n"}
                </Text>
                <Text style={[styles.smallText, styles.otherStyle]}>
                  Min:{minTemp}° {"\n"}
                </Text>
                <Text style={[styles.smallText, styles.otherStyle]}>
                  Max:{maxTemp}° {"\n"}
                </Text>
                </Text>
                </Text>
               
            </View>
          </ImageBackground>
        }
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      textAlign: 'center',
      color: 'white'
    },
    largeText: {
      fontSize: 50,
    },
    smallText: {
      fontSize: 20,
    },
    textInput: {
      backgroundColor: '#666',
      color: 'black',
      height: 10,
      width: 100,
      marginTop: 30,
      marginHorizontal: 10,
      paddingHorizontal: 10,
      alignSelf: 'center',
    },
    imageContainer: {
      flex: 1
    },
    image: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
    },
    humidityicon: {
        width: 30,
        height: 30,
      },
    searchBox:{
      marginTop: 100
    },
      boxStyle: {
        marginTop: 50,
        paddingVertical:5,
        borderWidth: 2,
        borderColor: "#F8F8FF",
        borderRadius: 6,
        backgroundColor: '#DCDCDC',
        color: "#20232a",
        fontSize: 15,
        width: "90%",
        height: "30%",
        marginLeft: 20,
        padding:10
        
      },
      otherStyle:{
        marginTop: 30,
        width:"100%",
        padding: 40,
        marginBottom: 20,
        flexDirection:"row",
        fontSize: 15,
        marginLeft: "5%"
      },

    detailsContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      paddingHorizontal: 20,
  
    }
    
  });
  

export default WeatherMain; 