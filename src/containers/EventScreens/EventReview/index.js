/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Dimensions, Text, View, Image, ScrollView, TouchableWithoutFeedback, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import AppBackground from '../../../components/AppBackground';
import Images from '../../../assets/Images';
import Posts from '../../../components/Posts';
import { Colors } from '../../../config';
import Icons from '../../../assets/Icons';
import { styles } from './eventreview_style';
import ImageURL from '../../../config/Common';
import EventsPosts from '../../../components/EventsPosts';
import VideoPlayer from '../../../components/VideoPlayer';
import { get_reviews_event } from '../../../redux/APIs/index';

const { width, height } = Dimensions.get('screen');

const EventReview = ({ navigation, route }) => {
  const token = useSelector(state => state.reducer.user.api_token);
  const { eventDetail } = route?.params;
  const [UserPost, setUserPost] = useState([]);
  console.log('eventDetail', eventDetail, 'eventDetail');
  useEffect(() => {
    get_reviews_event(token).then(res => setUserPost(res.Data));
  }, []);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleImagePress = () => {
    setIsFullScreen(true);
  };

  const handleCloseModal = () => {
    setIsFullScreen(false);
  };

  const DateReadbleFunction = date => {
    var date = new Date();
    return date.toLocaleDateString();
  };

  const filteringData = [];
  // UserPost.filter(
  //   data => data.event_id === props.route.params.id,
  // );
  console.log('eventDetail', eventDetail, 'eventDetail');
  return (
    <AppBackground back home editicn editParams={eventDetail}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        {eventDetail?.images?.length > 0 ? (
          <Swiper
            style={{ height: 170, borderRadius: 10 }}
            activeDotColor="transparent"
            dotColor="transparent">
            {eventDetail?.images.map((data, index) => (
              <React.Fragment>
                {data?.event_images?.split('.')[1] == 'mp4' ? (
                  <View style={{ height: height * 0.25, width: width * 0.9, borderRadius: 10 }}>
                    <VideoPlayer
                      video={`${ImageURL?.ImageURL}${data?.event_images}`}
                      style={{
                        width: width * 0.9,
                        height: height * 0.3,
                        borderRadius: 10,

                      }}
                      mediaPlaybackRequiresUserAction={true}
                      allowsInlineMediaPlayback={true}
                      javaScriptEnabled={true}
                      allowsFullscreenVideo={true}
                      domStorageEnabled={true}
                      hideControlsOnStart={true}
                      injectedJavaScript={`
                                 document.getElementsByTagName("video")[0].removeAttribute("autoplay");
                                 document.getElementsByTagName("video")[0].style.objectFit = "cover";
                                 document.getElementsByTagName("video")[0].style.width = "100%";
                                 document.getElementsByTagName("video")[0].style.height = "100%";
                             `}
                      allowFileAccess={false}
                    />
                  </View>
                ) : (
                  <TouchableWithoutFeedback onPress={handleImagePress}>
                    <FastImage
                      key={index}
                      source={{
                        uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                      }}
                      style={styles.imgback}
                      imageStyle={styles.img}
                    />
                  </TouchableWithoutFeedback>
                )}
                <Modal visible={isFullScreen} onRequestClose={handleCloseModal}>
                  <ScrollView>
                    <FastImage
                      source={{
                        uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                      }}
                      resizeMode="stretch"
                      style={{
                        marginTop: 10,
                        height: 500,
                        borderRadius: 10,
                        width: '98%',
                        marginLeft: 5,
                        borderWidth: 2,
                        borderColor: Colors.purple,
                      }}
                    />
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                      <TouchableWithoutFeedback onPress={handleCloseModal}>
                        <Text style={{ fontSize: 16, color: Colors.purple, fontWeight: 'bold' }}>Close</Text>
                      </TouchableWithoutFeedback>
                    </View>
                  </ScrollView>
                </Modal>
              </React.Fragment>
            ))}
          </Swiper>
        ) : null}
        {/* <Image
          source={{uri: `${ImageURL?.ImageURL}${PassedData?.event_image}`}}
          style={styles.imgbg}
        /> */}
        <View style={styles.titlehdr}>
          <Text style={styles.title}>{eventDetail?.event_title} .</Text>
          <Text style={styles.date}>{eventDetail?.event_date} </Text>
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
