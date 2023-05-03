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
import { Auth, ScreenStack, EventScreenStack } from './containers';

const Stack = createNativeStackNavigator();

const saveSocket = () => {
  const socket = io.connect(Common.socketURL);
  console.log('socket', socket, 'socket')
  store.dispatch({ type: 'SET_SOCKET', payload: socket });
};

// const dummyFunc = () => {
//   let users = useSelector((state) => state?.reducer?.user?.api_token);
//   console.log('new-------user', users)
// }

class Navigation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ready: true,
    };
  }


  // state = {
  //   ready: true,
  //   initialRouteName: 'Auth',
  // };
  componentDidMount() {
    // foo()
    // dummyFunc();
    saveSocket();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2500)
  }
  render() {
    const { api_token } = this.props;
    const { user } = this.props;
console.log('toeknnn', api_token)
    // const initialRouteName = api_token ? 'ScreenStack' : 'Auth';
    // const { user } = this.props;
    const ready = this.state;
    if (!ready) return null;

    const initialRouteName = 'Auth';

 ;
      
    return (
      <NavigationContainer
        ref={ref => NavService.setTopLevelNavigator(ref)}
        screenOptions={{ animation: 'simple_push' }}>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: 'transparent' },
            animation: 'simple_push',
          }}
          initialRouteName={initialRouteName}>
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
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
