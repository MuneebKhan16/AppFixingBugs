import React, {useEffect} from 'react';
// import TabbarComp from '../../TabbarComp';
// import DrawerCustom from '../../components/Drawer';

// Navigation here
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';

import {Colors} from '../../config';
import {ImageBackground, BackHandler, Text, View} from 'react-native';
import Images from '../../assets/Images';
import SplashScreen from 'react-native-splash-screen';

//Screens
import PreLogin from './Pre-Login';
import Login from './Login';
import Signup from './Signup';
import ForgetPassword from './ForgetPassword';
import ForgetPasswordOTP from './ForgetPasswordOTP';
import OTP from './OTP';
import ResetPassword from './ResetPassword';
import CompleteProfile from './CompleteProfile';
import Starter from './Starter';
import PrivacyPolicy from './PrivacyPolicy';
import TermsConditions from './TermsConditions';

// //App
// import Home from './Home';
// import Lesson from './Lesson';
// import Connections from './Connections';
// import Quizzes from './Quizzes';
// import CreateQuiz from './CreateQuiz';
// import Profile from './Profile';
// import TermsConditions from './TermsConditions';
// import PrivacyPolicy from './PrivacyPolicy';
// import Settings from './Settings';
// import EditProfile from './EditProfile';
// import Notification from './Notification';
// import ChangePassword from './ChangePassword';
// import Topics from './Topics';
// import TopicsDetails from './TopicsDetails';
// import Quiz from './Quiz';
// import Result from './Result';
// import StudentProfile from './StudentProfile';
// import AddRemarks from './AddRemarks';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  useEffect(() => {
    SplashScreen.hide();
  });
  return (
    <ImageBackground source={Images.bg} style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
          gestureEnabled: false,
        }}
        initialRouteName="PreLogin">
        {/* <Stack.Screen
          name="Starter"
          component={Starter}
          options={{headerShown: false}}
        /> */}
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
          name="ForgetPasswordOTP"
          component={ForgetPasswordOTP}
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
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsCondition"
          component={TermsConditions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};

const StarterStack = () => {
  return (
    <ImageBackground source={Images.bg} style={{flex: 1}}>
      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
          gestureEnabled: false,
        }}
        initialRouteName="PreLogin">
        {/* <Stack.Screen
          name="Starter"
          component={Starter}
          options={{headerShown: false}}
        /> */}
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
          name="ForgetPasswordOTP"
          component={ForgetPasswordOTP}
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
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsCondition"
          component={TermsConditions}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </ImageBackground>
  );
};

export default AuthStack;
