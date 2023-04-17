import moment from 'moment';
import React, {Component, useRef, useState , useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import {Colors, NavService} from '../../../config';
import CustomButton from '../../../components/CustomButton';
import Mainprofile from '../../../components/Mainprofile';
import Posts from '../../../components/Posts';
import { useSelector } from 'react-redux';
import { get_reviews_event } from '../../../redux/APIs/index'
const {width, height} = Dimensions.get('window');

export default Profile = props => {
  const [UserPost , setUserPost] = useState([]);
  const profile_Data = useSelector((state) => state.reducer.user)
  console.log(profile_Data)
  useEffect(() => {
    get_reviews_event(profile_Data.api_token).then((res) => setUserPost(res.Data));
  },[])

  return (
    <AppBackground title={'User Profiles'} home setting>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 5}}>
        <View style={{marginTop: 10}}>
          <Mainprofile
            center
            row
            name={profile_Data.name}
            subtitle={profile_Data.email}
            edit
          />
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
              color: Colors.black,
              fontWeight: '600',
              marginLeft:10
            }}>
            Post History
          </Text>
            <Posts UserPost={UserPost} profile_Data={profile_Data} />

        </View>
      </ScrollView>
    </AppBackground>
  );
};
