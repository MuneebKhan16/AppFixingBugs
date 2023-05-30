/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  View,
  StatusBar,
  LogBox,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Nav from './src';
import {store} from './src/redux';
import {Loader, Colors} from './src/config';
LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(['Remote debugger']);

const requestPermissionForAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION, // or POST_NOTIFICATIONS
      {
        title: 'Outsideee',
        message: 'This App need notification access',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      requestNotificationPermission();
    } else {
    }
  } catch (err) {}
};
const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission({
    alert: true,
    announcement: false,
    badge: true,
    carPlay: true,
    provisional: false,
    sound: true,
  });
  if (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    await registerForNotifications();
  } else {
    // alert(' noti disabled’)
  }
};
const registerForNotifications = async () => {
  const isRegisted = messaging().isDeviceRegisteredForRemoteMessages;
  if (!isRegisted) {
    await messaging().registerDeviceForRemoteMessages(); // calls await messaging().registerDeviceForRemoteMessages()
  } else {
    // const fcmToken = await getFCMnotificationsToken();
    // fcmToken && (await updateBackendToken(fcmToken));
  }
};

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
  componentDidMount() {
    // if (Platform.OS == 'android' && DeviceInfo.getApiLevelSync() >= 33) {
    //   requestPermissionForAndroid();
    // } else {
      requestNotificationPermission();
    // }
  }
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
