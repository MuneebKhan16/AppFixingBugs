/* eslint-disable prettier/prettier */
import React,{useEffect} from 'react';
import TabbarComp from '../../TabbarComp';
import TabbarComponent from '../../TabbarComponent';

// Navigation here
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Config
import {Colors} from '../../config';
import {ImageBackground,BackHandler} from 'react-native';
import Images from '../../assets/Images';
//Screens
import PreLogin from '../Auth/Login';
import Login from '../Auth/Login';
import Signup from '../Auth/Login';
import ForgetPassword from '../Auth/Login';
import OTP from '../Auth/Login';
import ResetPassword from '../Auth/Login';
import CompleteProfile from '../Auth/CompleteProfile';
//LocalEvent
import Home from './Home';
import Profile from './Profile';
import TermsConditions from '../UserScreens/TermsConditions';
import PrivacyPolicy from '../UserScreens/PrivacyPolicy';
import Settings from './Settings';
import ChatList from './ChatList';
import ChatScreen from './ChatScreen';
import Featured from './Featured';
import Event from './Event';
import Review from './Review';
import Post from './Post';
import Aboutthecreator from './AbouttheCreator';
import Subscription from './Subscriptions';
import Help from './Help';
// EventScreens
import EventHome from '../EventScreens/EventHome';
import EventProfile from '../EventScreens/EventProfile';
import EventSetting from '../EventScreens/EventSetting';
import EventReview from '../EventScreens/EventReview';
import EventPost from '../EventScreens/EventPost';
import EditProfile from '../EventScreens/EditProfile'
import eventContext from '../EventScreens/eventContext'
import EventTermsConditions from '../EventScreens/EventTerms&Condition'
import EventPrivacyPolicy from '../EventScreens/EventPrivayPoicy'
import EventSubscription from '../EventScreens/EventSubscription';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import { show_eventCreater_event , get_reviews_event ,Get_All_Categories , showprofiledetail } from '../../redux/APIs';
import { useSelector } from 'react-redux';
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
  const userData = useSelector((state) => state?.reducer?.user)
  const [userProfile, setuserProfile] = React.useState({})
  const getProfile = async () => {
    const data = await showprofiledetail(userData.id )
    setuserProfile(data.Data)
  }
    
    React.useEffect(() => {
            getProfile();
     return () => {
    console.log('unmounting')}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <ImageBackground source={Images.bg} style={{flex: 1}}>
       <eventContext.Provider value={{ userProfile}}>


      <Stack.Navigator
        screenOptions={{
          contentStyle: {backgroundColor: 'transparent'},
          animation: 'simple_push',
          gestureEnabled: false,
        }}
       >
           <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfile}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <Stack.Screen
          name="Tab"
          component={TabStack}
          options={{headerShown: false}}
        />
  <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
         <Stack.Screen
              name="EditProfile"
              component={EditProfile}
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
          name="Subscription"
          component={Subscription}
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
          <Stack.Screen
          name="Help"
          component={Help}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      </eventContext.Provider>
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

const EventScreenStack = (props) => {
  const userData = useSelector((state) => state?.reducer?.user)
  const [ showEvents , SetshowEvents] = React.useState([]);
  const [UserPost, setUserPost] = React.useState([]);
  const [Categorys, setCategorys] = React.useState(null);
  const [userProfile, setuserProfile] = React.useState({})

  const Event_data = async () => {
    const events = await show_eventCreater_event(userData.id  );
     SetshowEvents(events.events)
  }

  const datahandle = () => {
    get_reviews_event(userData?.api_token)
    .then((res) => {
      setUserPost(res?.Data)

    })
    .catch((error) => {

    })
}

const getCategorys = async () => {
  const category = await Get_All_Categories();
  setCategorys(category.Data);
};

const getProfile = async () => {
  const data = await showprofiledetail(userData.id )
  setuserProfile(data.Data)
}
  
  React.useEffect(() => {
    showEvents && Event_data() ? datahandle : null
          datahandle();
          getCategorys();
          getProfile();
   return () => {
  console.log('unmounting')}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
        <ImageBackground source={Images.bg} style={{flex: 1}}>
    <eventContext.Provider value={{showEvents , UserPost ,Categorys , userProfile}}>
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
              name="EditProfile"
              component={EditProfile}
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
              <Stack.Screen
              name="EventTermsConditions"
              component={EventTermsConditions}
              options={{headerShown: false}}
            />
             <Stack.Screen
              name="EventPrivacyPolicy"
              component={EventPrivacyPolicy}
              options={{headerShown: false}}
            />
              <Stack.Screen
              name="EventSubscription"
              component={EventSubscription}
              options={{headerShown: false}}
            />
           
          </Stack.Navigator>
    </eventContext.Provider>
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
