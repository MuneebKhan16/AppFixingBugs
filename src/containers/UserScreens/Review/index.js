/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { get_reviews_event } from '../../../redux/APIs/index'
import React, { useEffect, useState , useMemo } from 'react';
import AppBackground from '../../../components/AppBackground';
import { Colors, NavService } from '../../../config';
import EventsPosts from '../../../components/EventsPosts';
import CustomButton from '../../../components/CustomButton';
import Swiper from 'react-native-swiper';
import Mainprofile from '../../../components/Mainprofile';
import { styles } from './review_style';
import ImageURL from '../../../config/Common'
const Review = (props) => {
  const profile_Data = useSelector((state) => state.reducer.user)
  
  const { user, event_title, event_location, event_image, id } = props.route.params;
  const [UserPost, setUserPost] = useState([]);
  


  const datahandle = () => {
      get_reviews_event(profile_Data?.api_token)
      .then((res) => {
        setUserPost(res?.Data)
  
      })
      .catch((error) => {
  
      })
  }

  useEffect(() => {
    datahandle() 
  },[])

  useMemo(() => UserPost , [UserPost])




  return (
    <AppBackground title={'Events'} home back chat>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.top}>
        <Swiper
          style={styles.swiper}
          showsButtons={false}
          buttonWrapperStyle={styles.clr}>
          <View style={styles.slide1}>
            <Image
              source={{ uri: `${ImageURL?.ImageURL}${event_image}` }}
              style={styles.img}
            />
          </View>
        </Swiper>
        <View style={styles.topmerge}>
          <Mainprofile
            center
            name={user?.name}
            subtitle="Event Owner"
            row
            inc
            size
            location={event_location}
          />
        </View>
        <Text
          style={styles.post}>
          Ratings & Posts
        </Text>
        <EventsPosts event_id={id} UserPost={UserPost} />
      </ScrollView>
      <CustomButton
        buttonStyle={styles.self}
        title="Rate & Posts"
        onPress={() => NavService.navigate('Post' ,id)}
      />
    </AppBackground>
  );
};

export default React.memo(Review);

