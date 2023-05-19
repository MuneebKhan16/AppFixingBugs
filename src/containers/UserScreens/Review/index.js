/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {get_reviews_event} from '../../../redux/APIs/index';
import React, {useEffect, useState, useMemo, useContext} from 'react';
import AppBackground from '../../../components/AppBackground';
import {Colors, NavService} from '../../../config';
import EventsPosts from '../../../components/EventsPosts';
import CustomButton from '../../../components/CustomButton';
import Swiper from 'react-native-swiper';
import Mainprofile from '../../../components/Mainprofile';
import {styles} from './review_style';
import ImageURL from '../../../config/Common';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import VideoPlayer from '../../../components/VideoPlayer';
import eventContext from '../../EventScreens/eventContext';
import {themes} from '../../../config/globalFonts/globalFonts';

const MEDIA = [
  {
    id: 1,
    type: 'image',
    source: {
      uri: 'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s',
    },
  },
  {
    id: 2,
    type: 'video',
    source: {
      uri: 'https://beststatusvideo.com/siteuploads/files/sfd76/37759/Technology%20Day%20Whatsapp%20Status%202023-(BestStatusVideo.com).mp4',
    },
  },
  {
    id: 3,
    type: 'image',
    source: {
      uri: 'https://fastly.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w',
    },
  },
  {
    id: 4,
    type: 'video',
    source: {
      uri: 'https://beststatusvideo.com/siteuploads/files/sfd61/30240/National%20Technology%20Day%20Wishes%20Status%20Video%20For%20Whatsapp-(BestStatusVideo.com).mp4',
    },
  },
];
const {width, height} = Dimensions.get('screen');

const Review = props => {
  const profile_Data = useSelector(state => state.reducer.user);
  const {eventDetail} = props.route.params;
  const {user, id} = eventDetail;
  const [UserPost, setUserPost] = useState([]);
  const {userProfile} = useContext(eventContext);
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`;

  const datahandle = () => {
    get_reviews_event(profile_Data?.api_token)
      .then(res => {
        console.log('res?.Data', res?.Data, 'res?.Data');
        setUserPost(res?.Data);
      })
      .catch(error => {});
  };
  useEffect(() => {
    datahandle();
  }, []);
  useMemo(() => UserPost, [UserPost]);
  const filteringData = UserPost?.filter(data => data.event_id === id);

  const renderItem = item => {
    if (item.type === 'image') {
      return (
        <FastImage
          source={item.source}
          style={{
            height: 200,
            width: '100%',
            borderRadius: 20,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      );
    } else if (item.type === 'video') {
      return (
        <>
          <Video
            repeat={true}
            volume={0}
            source={item.source}
            style={{
              height: 200,
              width: '100%',
              borderRadius: 20,
              height: 200,
            }}
            resizeMode="cover"
          />
        </>
      );
    }
  };
  return (
    <AppBackground title={'Events'} home back chat Eventuser={user}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.top}>
        <View
          style={{
            marginTop: 20,
            borderRadius: 20,
            flexDirection: 'row',
            borderRadius: 20,
            height: 220,
          }}>
          <Swiper
            dotColor="transparent"
            activeDotColor="transparent"
            nextButton={
              <Text
                style={{fontSize: 70, marginRight: 20, color: Colors.white}}>
                ›
              </Text>
            }
            prevButton={
              <Text style={{fontSize: 70, marginLeft: 10, color: Colors.white}}>
                ‹
              </Text>
            }
            style={{
              alignItems: 'center',
              borderRadius: 20,
              height: 220,
            }}
            showsButtons>
            {eventDetail?.event_images.map((data, index) => (
              <React.Fragment>
                {data?.event_images?.split('.')[1] == 'mp4' ? (
                  <View style={{height: height * 0.24, width: width * 0.9}}>
                    <VideoPlayer
                      video={`${ImageURL?.ImageURL}${data?.event_images}`}
                      style={{
                        width: width * 0.9,
                        height: height * 0.3,
                        borderRadius: 20,
                      }}
                      mediaPlaybackRequiresUserAction={true}
                      allowsInlineMediaPlayback={true}
                      javaScriptEnabled={true}
                      allowsFullscreenVideo={true}
                      domStorageEnabled={true}
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
                  <FastImage
                    key={index}
                    source={{
                      uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                    }}
                    style={styles.img}
                    imageStyle={styles.border}
                  />
                )}
              </React.Fragment>
            ))}
          </Swiper>
        </View>

        {/* <Swiper
          style={styles.swiper}
          showsButtons={false}
          buttonWrapperStyle={styles.clr}>
          <View style={styles.slide1}>
            <Image
              source={{ uri: `${ImageURL?.ImageURL}${event_image}` }}
              style={styles.img}
            />
          </View>
        </Swiper> */}
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
          <Image
            source={{
              uri: userProfile?.profile_picture
                ? `${BaseUrl}${userProfile?.profile_picture}`
                : 'https://picsum.photos/200/300',
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              fontSize: themes?.fontSize?.medium,
              fontFamily: themes?.font?.bold,
              marginLeft: 8,
              color: Colors.black,

              marginBottom: 3,
            }}>
            {user?.name}
          </Text>
          <View
            style={{
              position: 'absolute',
              right: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={Icons.marker}
              resizeMode="contain"
              style={styles.marker}
            />
            <Text style={styles.location} numberOfLines={1}>
              {eventDetail?.event_location}
            </Text>
          </View>
          {/* <Mainprofile
            center
            name={user?.name}
            row
            inc
            size
            location={event_location}
          /> */}
        </View>
        <Text style={styles.post}>Ratings & Posts</Text>
        <EventsPosts datas={filteringData} />
      </ScrollView>
      <CustomButton
        buttonStyle={styles.self}
        title="Rate & Post"
        onPress={() => NavService.navigate('Post', id)}
      />
    </AppBackground>
  );
};

export default React.memo(Review);
