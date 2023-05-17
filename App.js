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
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Nav from './src';
import {store} from './src/redux';
import {Loader, Colors} from './src/config';
LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(['Remote debugger']);

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: Colors.primary,
        maxHeight: 120,
        height: '100%',
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: Colors.black,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: Colors.google,
        maxHeight: 120,
        height: '100%',
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: Colors.black,
      }}
    />
  ),
};
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
            <Toast config={toastConfig} />
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
