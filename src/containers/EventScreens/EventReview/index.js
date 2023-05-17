/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import AppBackground from '../../../components/AppBackground';
import Images from '../../../assets/Images';
import Posts from '../../../components/Posts';
import {Colors} from '../../../config';
import Icons from '../../../assets/Icons';
import {styles} from './eventreview_style';
import ImageURL from '../../../config/Common';
import EventsPosts from '../../../components/EventsPosts';
import {get_reviews_event} from '../../../redux/APIs/index';

const EventReview = ({navigation, route}) => {
  const token = useSelector(state => state.reducer.user.api_token);
  const user = useSelector(state => state.reducer.user);
  console.log('user', user, 'user');
  const {eventDetail} = route?.params;
  const PassedData = [];
  const [UserPost, setUserPost] = useState([]);
  console.log('eventDetail', eventDetail, 'eventDetail');
  useEffect(() => {
    get_reviews_event(token).then(res => setUserPost(res.Data));
  }, []);

  const DateReadbleFunction = date => {
    var date = new Date();
    return date.toLocaleDateString();
  };

  const filteringData = [];
  // UserPost.filter(
  //   data => data.event_id === props.route.params.id,
  // );

  return (
    <AppBackground
      back
      home
      editicn={eventDetail?.user_id == user?.id ? true : false}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {eventDetail?.images?.length > 0 ? (
          <Swiper
            style={{height: 185}}
            activeDotColor="transparent"
            dotColor="transparent">
            {eventDetail?.images.map((data, index) => (
              <FastImage
                key={index}
                source={{
                  uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                }}
                style={styles.imgback}
                imageStyle={styles.img}
              />
            ))}
          </Swiper>
        ) : null}
        {/* <Image
          source={{uri: `${ImageURL?.ImageURL}${PassedData?.event_image}`}}
          style={styles.imgbg}
        /> */}
        <View style={styles.titlehdr}>
          <Text style={styles.title}>{eventDetail?.event_title} .</Text>
          <Text style={styles.date}>
            {DateReadbleFunction(eventDetail?.created_at)}{' '}
          </Text>
        </View>
        <Text style={styles.subtitle}>{eventDetail.event_description}</Text>
        <View style={styles.markericn}>
          <View style={styles.markericnhdr}>
            <Image source={Icons.marker} style={styles.marker} />
          </View>
          <Text style={styles.subcontent} numberOfLines={1}>
            {eventDetail.event_location}
          </Text>
        </View>
        <Text style={styles.heading}>Ratings & Post</Text>
        {<EventsPosts datas={filteringData} />}
      </ScrollView>
    </AppBackground>
  );
};

export default React.memo(EventReview);
