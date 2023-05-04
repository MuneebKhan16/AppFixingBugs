/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  StatusBar,
  LogBox,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Toast from 'react-native-toast-message';
import Nav from './src';
import { store } from './src/redux';
import {Loader} from './src/config';

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(['Remote debugger']);
class App extends Component {
  render() {
    return (
      <Wrapper>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar
            translucent={true}
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <Provider store={store}>
            <Loader />
            <Nav />
            <Toast />
          </Provider>
        </GestureHandlerRootView>
      </Wrapper>
    );
  }
}

export default App;

function Wrapper({children}) {
  if (Platform.OS === 'ios')
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    );
  return <View style={{flex: 1}}>{children}</View>;
}
