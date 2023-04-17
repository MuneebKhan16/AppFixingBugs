import React, { Component } from 'react';

// Navigation here
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { NavService } from './config';
import { ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Images from './assets/Images';

//Screens
import { Auth, ScreenStack, EventScreenStack } from './containers';

const Stack = createNativeStackNavigator();

class Navigation extends Component {
  state = {
    ready: true,
    initialRouteName: 'Auth',
  };
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2500)
  }
  render() {
    const { initialRouteName, ready } = this.state;
    if (!ready) return null;
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

function mapStateToProps({ reducer: { user } }) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(Navigation);
