/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

// Navigation here
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { NavService, Common } from './config';
import { ImageBackground } from 'react-native';
import { connect, useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import Images from './assets/Images';
import { store } from './redux';

//Screens
import { AuthStack, ScreenStack, EventScreenStack } from './containers';

const Stack = createNativeStackNavigator();

const saveSocket = () => {
  const socket = io.connect(Common.socketURL);
  console.log('socket', socket, 'socket')
  store.dispatch({ type: 'SET_SOCKET', payload: socket });
};



class Navigation extends Component {

  constructor(props) {
    super(props);

    this.state = {
  
    };
  }


 
  componentDidMount() {
 
    saveSocket();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2500)
  }
  render() {
   

    //  const initialRouteName = this?.props?.api_token ? ScreenStack : Auth;
         
    return (
      <NavigationContainer
        ref={ref => NavService.setTopLevelNavigator(ref)}
        screenOptions={{ animation: 'simple_push' }}>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: 'transparent' },
            animation: 'simple_push',
          }}
          >
            {
                this?.props?.api_token ? 
                (
                  <>
                    <Stack.Screen
                    name="ScreenStack"
                    component={ScreenStack}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="EventScreenStack"
                    component={EventScreenStack}
                    options={{ headerShown: false }}
                  />
                  </>
                 
                ) 
                :
                (
                  <Stack.Screen
                  name="AuthStack"
                  component={AuthStack}
                  options={{ headerShown: false }}
                />
                )
            }
          
        
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    api_token: state?.reducer?.user?.api_token,
    user: state?.reducer?.user,
  };
};

export default connect(mapStateToProps)(Navigation);
