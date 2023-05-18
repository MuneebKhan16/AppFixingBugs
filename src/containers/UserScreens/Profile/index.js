/* eslint-disable prettier/prettier */
import moment from 'moment';
import React, { Component, useRef, useState, useEffect, useContext } from 'react';
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
import Images from '../../../assets/Images';
import { Colors, NavService } from '../../../config';
import { themes } from '../../../config/globalFonts/globalFonts';
// import eventContext from '../../EventScreens/eventContext';

const Profile = props => {
  const [UserPost, setUserPost] = useState([]);
  const profile_Data = useSelector((state) => state.reducer.user)
  const { userProfile } = useContext(eventContext);
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`

  console.log('userProfile', userProfile)

  useEffect(() => {
    get_reviews_event(profile_Data.api_token).then((res) => setUserPost(res.Data));
  }, [])
  console.log('profile_Data', profile_Data)
  return (
    <AppBackground title={'User Profile'} home setting>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.btm}>
        <View style={styles.top}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Image
                source={{ uri: userProfile?.profile_picture ? `${BaseUrl}${userProfile?.profile_picture}` : "https://picsum.photos/200/300" }}
                style={{
                  width: 75,
                  height: 75,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: Colors.purple,
                  marginBottom: 10,

                }}
              />
              <TouchableOpacity
                onPress={() => NavService.navigate('EditProfile')}
                style={{
                  padding: 12,
                  alignItems: 'center',
                  width: 25,
                  height: 25,
                  justifyContent: 'center',
                  borderRadius: 40,
                  top: -35,
                  left: 47,
                  backgroundColor: Colors.purple
                }}>
                <Image
                  source={Icons.edit}
                  style={{
                    width: 12,
                    height: 12,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 10, marginBottom: 20 }}>

              <Text style={{
                fontSize: themes?.fontSize?.large,
                fontFamily: themes?.font?.extraBold,
                color: Colors.black,
                // textAlign: row ? null : 'center',
                textTransform: 'capitalize',
              }}>{userProfile?.name}</Text>
              <Text style={{
                fontSize: themes?.fontSize?.extraVSmall,
                fontFamily: themes?.font?.regular,
                color: Colors.darkGray,

              }}>{userProfile?.email}</Text>
            </View>

          </View>
          {/* <Mainprofile
            center
            row
            name={userProfile?.name}
            subtitle={userProfile?.email}
            edit
          /> */}
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