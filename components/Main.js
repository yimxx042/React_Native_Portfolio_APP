import React, { Component } from 'react';
import WeatherMain from './WeatherMain';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

const WeatherNavigator = createStackNavigator(
  {
      WeatherMain: { screen: WeatherMain }
  }, 
  {
      defaultNavigationOptions: {
          headerStyle: {
              backgroundColor: '#6495ED'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              color: '#fff'
          },
      }
  }
);


const MainNavigator = createDrawerNavigator(
    {
        Home: { screen: WeatherNavigator }
    
    },
    {
        drawerBackgroundColor: '#fff'
    }
);

const AppNavigator = createAppContainer(MainNavigator);


class Main extends Component {
  render() {
      return (
          <View
              style={{
                  flex: 1,
                  paddingTop:3,
                  textAlign: 'center'
          }}>
              <AppNavigator />
          </View>
      );
  }
}



export default Main;