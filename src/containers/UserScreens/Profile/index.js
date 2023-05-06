/* eslint-disable prettier/prettier */
import moment from 'moment';
import React, { Component, useRef, useState, useEffect , useContext } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet
} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import Mainprofile from '../../../components/Mainprofile';
import Posts from '../../../components/Posts';
import { useSelector } from 'react-redux';
import { get_reviews_event } from '../../../redux/APIs/index'
import eventContext from '../../EventScreens/eventContext';
const { width, height } = Dimensions.get('window');
import { styles } from './profile_style';
const Profile = props => {
  const [UserPost, setUserPost] = useState([]);
  const profile_Data = useSelector((state) => state.reducer.user)
  const { userProfile } = useContext(eventContext);

  console.log('userProfile',userProfile)

  useEffect(() => {
    get_reviews_event(profile_Data.api_token).then((res) => setUserPost(res.Data));
  }, [])
console.log('profile_Data',profile_Data)
  return (
    <AppBackground title={'User Profile'} home setting>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.btm}>
        <View style={styles.top}>
          <Mainprofile
            center
            row
            name={userProfile?.name}
            subtitle={userProfile?.email}
            edit
          />
          <Text
            style={styles.post}>
            Post History
          </Text>
          <Posts UserPost={UserPost} profile_Data={profile_Data} />

        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default React.memo(Profile)