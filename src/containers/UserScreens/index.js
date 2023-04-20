import React from 'react';
import TabbarComp from '../../TabbarComp';
import TabbarComponent from '../../TabbarComponent';

// Navigation here
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Config
import {Colors} from '../../config';
import {ImageBackground} from 'react-native';
import Images from '../../assets/Images';
//Screens
import PreLogin from '../Auth/Login';
import Login from '../Auth/Login';
import Signup from '../Auth/Login';
import ForgetPassword from '../Auth/Login';
import OTP from '../Auth/Login';
import ResetPassword from '../Auth/Login';
import CompleteProfile from '../Auth/Login';
//LocalEvent
import Home from './Home';
import Profile from './Profile';
import TermsConditions from './TermsConditions';
import PrivacyPolicy from './PrivacyPolicy';
import Settings from './Settings';
import ChatList from './ChatList';
import ChatScreen from './ChatScreen';
import Featured from './Featured';
import Event from './Event';
import Review from './Review';
import Post from './Post';
import Aboutthecreator from './AbouttheCreator';
// EventScreens
import EventHome from '../EventScreens/EventHome';
import EventProfile from '../EventScreens/EventProfile';
import EventSetting from '../EventScreens/EventSetting';
import EventReview from '../EventScreens/EventReview';
import EventPost from '../EventScreens/EventPost';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserAuthStack = () => {
  return (
    <ImageBackground source={Images.bg} style={{flex: 1}}>
      
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
        }}
        initialRouteName="PreLogin">
        <Stack.Screen
          name="PreLogin"
          component={PreLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfile}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{headerShown: false}}
        />
       
      </Stack.Navigator>
    </ImageBackground>
  );
};

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: Colors.dark},
        animation: 'simple_push',
      }}
      tabBar={props => <TabbarComp {...props} />}
      initialRouteName={'Home'}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="Featured"
        component={Featured}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const ScreenStack = () => {
  return (
    <ImageBackground source={Images.bg} style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
          gestureEnabled: false,
        }}
        initialRouteName="Tab">
        <Stack.Screen
          name="Tab"
          component={TabStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{headerShown: false}}
        />
       
        <Stack.Screen
          name="Event"
          component={Event}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Setting"
          component={SettingsStack}
          options={{headerShown: false}}
        />
      
      
        <Stack.Screen
          name="Review"
          component={Review}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};

// EventStack
const TabStackComp = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        contentStyle: {backgroundColor: Colors.dark},
        animation: 'simple_push',
      }}
      tabBar={props => <TabbarComponent {...props} />}
      initialRouteName={'EventHome'}>
      <Tab.Screen
        name="EventHome"
        component={EventHome}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Add"
        component={() => {}}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ChatList"
        component={ChatList}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

const EventScreenStack = () => {
  return (
    <ImageBackground source={Images.bg} style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
          gestureEnabled: false,
        }}
        initialRouteName="TabComp">
        <Stack.Screen
          name="TabComp"
          component={TabStackComp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EventHome"
          component={EventHome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EventProfile"
          component={EventProfile}
          options={{headerShown: false}}
        />
       
        <Stack.Screen
          name="EventSetting"
          component={EventSetting}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EventReview"
          component={EventReview}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EventPost"
          component={EventPost}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="Aboutthecreator"
          component={Aboutthecreator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};

const SettingsStack = () => {
  return (
    <ImageBackground source={Images.bg} style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
          gestureEnabled: false,
        }}
        initialRouteName="Settings">
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsConditions"
          component={TermsConditions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
      
           <Stack.Screen
          name="Aboutthecreator"
          component={Aboutthecreator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};

export {UserAuthStack, ScreenStack, EventScreenStack};
