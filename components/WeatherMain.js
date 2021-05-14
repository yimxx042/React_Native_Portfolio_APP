import React from 'react';
import {
  StyleSheet, Text, View, KeyboardAvoidingView,
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
      timeZone:'',
      wind:'',
      predictAbility:'',
      airPressure:''

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
        windSpeed:Number((data.windSpeed).toFixed(1)),
        temperature: Number((data.temperature).toFixed(1)),
        minTemp: Number((data.minTemp).toFixed(1)),
        maxTemp: Number((data.maxTemp).toFixed(1)),
        timeZone: Date(data.applicable_date) ,
        airPressure: Number((data.airPressure).toFixed(1)),
        imageBackground: getImageBackground(data.weatherStateAbbr),
        predictAbility:Number((data.predictAbility).toFixed(1)),
        error: false,
        loading: false
      })

    } else {
      this.setState({
        error: true,
        loading: false,
        location: text,
        weather: `Invalid Search`,
        temperature: `0`,
        humidity:'0',
        imageBackground: getImageBackground('hc'),
        minTemp: 'N/A',
        maxTemp: 'N/A',
        timeZone:'N/A',
        windSpeed:"N/A",
        predictAbility:"N/A",
        airPressure:"N/A"
        
      })
    }
  }

  static navigationOptions = {
    title: 'Search Weather'
}

  render() {
    let { airPressure, predictAbility, timeZone, windSpeed, minTemp, maxTemp, location, weather, temperature, humidity, imageBackground, loading, error } = this.state;
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
                <Text style={[styles.dateText]}>
                    {timeZone}
                </Text>     
                <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                </Text>
                <Text style={[styles.upText, styles.textStyle]}>
                    {temperature}°C
                </Text>        
                 
                <Search style={styles.searchBox}
                    searchPlaceHoder={"Search city"}
                    onSubmit={this.onSubmit}
                />

                <Text style={[styles.smallText, styles.textStyle, styles.boxStyle]}>
                <Text style={styles.contentStyle}>
                <Text style={styles.weatherText}>
                Today Weather is {"\n"}"{weather ? weather :''}"
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
                  Wind:{windSpeed} mph
                </Text>{"\n"}
                <Text style={[styles.smallText, styles.otherStyle]}>
                  Predictability: {predictAbility} %
                </Text>{"\n"}
                <Text style={[styles.smallText, styles.otherStyle]}>
                  Air Pressure: {airPressure} 
                </Text>{"\n"}
                <Text style={[styles.smallText, styles.otherStyle]}>
                  Min:{minTemp}°C | Max:{maxTemp}°C 
                </Text>{"\n"}           
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
    dateText:{
      textAlign: 'center',
      color: 'white',
      marginBottom: 80
    },
    largeText: {
      fontSize: 50,
    },
    weatherText: {
      textAlign: 'center',
      fontSize: 30,
      color:'#4682B4'
    },
    upText: {
      fontSize:50,
      marginBottom: 30
    },
    smallText: {
      fontSize: 20
    },
    textInput: {
      backgroundColor: '#666',
      color: 'black',
      height: 40,
      width: 100,
      marginTop: 20,
      marginHorizontal: 20,
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
        borderWidth: 2,
        borderColor: "#F8F8FF",
        borderRadius: 6,
        backgroundColor: '#DCDCDC',
        color: "#20232a",
        width: "90%",
        height: "30%",
        marginLeft: 20,
        padding:20,
        textAlign:'left'
        
      },
      otherStyle:{
        marginTop: 30,
        marginBottom: 10,
        fontFamily:'Roboto',
        color: "#696969",
        width:"100%",
        padding: 5,
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