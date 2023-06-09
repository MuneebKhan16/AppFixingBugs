/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useMemo, useContext} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import {get_reviews_event} from '../../../redux/APIs/index';
import AppBackground from '../../../components/AppBackground';
import {Colors, NavService} from '../../../config';
import EventsPosts from '../../../components/EventsPosts';
import CustomButton from '../../../components/CustomButton';
import ImageURL from '../../../config/Common';
import VideoPlayer from '../../../components/VideoPlayer';
import eventContext from '../../EventScreens/eventContext';
import {themes} from '../../../config/globalFonts/globalFonts';
import {styles} from './review_style';

const {width, height} = Dimensions.get('screen');

const Review = props => {
  const profile_Data = useSelector(state => state.reducer.user);
  const {eventDetail} = props.route.params;
  const {user, id} = eventDetail;
  const [UserPost, setUserPost] = useState([]);
  const {userProfile} = useContext(eventContext);
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`;
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imageFullScreen, setImageFullScreen] = useState('');

  const handleImagePress = image => {
    setImageFullScreen(image);
    setIsFullScreen(true);
  };

  // const handleCloseModal = () => {
  //   setIsFullScreen(false);
  // };

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
  const images = [
    {
      // Simplest usage.
      url: `${ImageURL?.ImageURL}${imageFullScreen}`,
    },
  ];
  console.log('eventDetail',eventDetail)
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
                  <TouchableWithoutFeedback
                    onPress={() => handleImagePress(data?.event_images)}>
                    <FastImage
                      key={index}
                      source={{
                        uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                      }}
                      style={styles.img}
                      imageStyle={styles.border}
                    />
                  </TouchableWithoutFeedback>
                )}
              </React.Fragment>
            ))}
          </Swiper>
          <Modal
            isVisible={isFullScreen}
            onBackdropPress={() => setIsFullScreen(false)}
            onBackButtonPress={() => setIsFullScreen(false)}>
            <View style={{flex: 0.5, position: 'relative'}}>
              <ImageViewer
                imageUrls={images}
                renderIndicator={(currentIndex, allSize) => null}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsFullScreen(false)}
                style={{
                  position: 'absolute',
                  top: height * -0.01,
                  right: -5,
                }}>
                <AntDesign
                  name={'closecircle'}
                  size={30}
                  color={Colors.purple}
                />
              </TouchableOpacity>
            </View>
          </Modal>
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{
              uri: user?.profile_picture
                ? `${BaseUrl}${user?.profile_picture}`
                : 'https://picsum.photos/200/300',
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              marginBottom: 10,
              borderWidth: 2,
              borderColor: Colors.purple,
            }}
          />
          <Text
            numberOfLines={1}
            style={{
              fontSize: themes?.fontSize?.medium,
              fontFamily: themes?.font?.black,
              marginLeft: 8,
              color: Colors.black,
              width: 120,
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
