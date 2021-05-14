import axios from 'axios';

export const getLocation = async (query) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(`https://www.metaweather.com/api/location/search/?query=${query}`)
            .then(function (response) {
                if (response && response.data && response.data.length > 0) {
                    let location = response.data[0];
                    resolve(location.woeid);
                }
                resolve()
            })
            .catch(function (error) {
                reject(error);
            })
    })

}

export const getWeather = async (query) => {
    return new Promise(async (resolve, reject) => {
        let locationId = await getLocation(query);
        if (locationId) {
            await axios.get(`https://www.metaweather.com/api/location/${locationId}/`)
                .then(function (response) {
                    if (response && response.data) {
                        let predict = response.data.consolidated_weather;
                        let weatherStateName = predict[0].weather_state_name;
                        let weatherStateAbbr = predict[0].weather_state_abbr;
                        let temperature = predict[0].the_temp;
                        let humidity = predict[0].humidity;
                        let minTemp = predict[0].min_temp;
                        let maxTemp = predict[0].max_temp;
                        let timeZone = predict[0].applicable_date;
                      
                        resolve({
                            timeZone, weatherStateName, weatherStateAbbr, temperature, humidity, minTemp, maxTemp
                        })
                    } else {
                        resolve()
                    }

                })
                .catch(function (error) {
                    console.log(error);
                    reject(error)
                })

        } else {
            resolve()
        }
    })
}

export const getImageBackground = (weatherName) => {
    let WeatherIcon = { //https://www.metaweather.com/api/
        'sn': require('../assets/snow.jpg'), //snow
        'sl': require('../assets/sleet.jpg'), //Sleet
        'h': require('../assets/hail.jpg'), //Hail
        't': require('../assets/thunderstorm.jpg'), //Thunderstorm
        'hr': require('../assets/heavyrain.jpg'), //Heavy Rain
        'lr': require('../assets/lightrain.jpg'), //Light Rain
        's': require('../assets/showers.jpg'), //Showers
        'hc': require('../assets/heavycloud.jpg'), //Heavy Cloud
        'lc': require('../assets/lightcloud.jpg'), //Light Cloud
        'c': require('../assets/clear.jpg'), //Clear

    };

    return WeatherIcon[weatherName];
}

