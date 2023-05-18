/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import { get_reviews_event } from '../../../redux/APIs/index'
import React, { useEffect, useState, useMemo, useContext } from 'react';
import AppBackground from '../../../components/AppBackground';
import { Colors, NavService } from '../../../config';
import EventsPosts from '../../../components/EventsPosts';
import CustomButton from '../../../components/CustomButton';
import Swiper from 'react-native-swiper';
import Mainprofile from '../../../components/Mainprofile';
import { styles } from './review_style';
import ImageURL from '../../../config/Common'
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
import { color } from 'react-native-reanimated';
import Images from '../../../assets/Images';
import eventContext from '../../EventScreens/eventContext';
import { themes } from '../../../config/globalFonts/globalFonts';
const { width, height } = Dimensions.get('window');

const MEDIA = [
  { id: 1, type: 'image', source: { uri: 'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s' } },
  { id: 2, type: 'video', source: { uri: 'https://beststatusvideo.com/siteuploads/files/sfd76/37759/Technology%20Day%20Whatsapp%20Status%202023-(BestStatusVideo.com).mp4' } },
  { id: 3, type: 'image', source: { uri: 'https://fastly.picsum.photos/id/12/2500/1667.jpg?hmac=Pe3284luVre9ZqNzv1jMFpLihFI6lwq7TPgMSsNXw2w' } },
  { id: 4, type: 'video', source: { uri: 'https://beststatusvideo.com/siteuploads/files/sfd61/30240/National%20Technology%20Day%20Wishes%20Status%20Video%20For%20Whatsapp-(BestStatusVideo.com).mp4' } },

];
const Review = (props) => {
  const profile_Data = useSelector((state) => state.reducer.user)
  const { user, event_title, event_location, event_image, id } = props.route.params;
  const [UserPost, setUserPost] = useState([]);
  const { userProfile } = useContext(eventContext);
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`

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
  }, [])
  useMemo(() => UserPost, [UserPost])
  const filteringData = UserPost?.filter(data => data.event_id === props.route.params.id)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const onIndexChanged = (index) => {
    setCurrentSlide(index);
  };

  const renderItem = (item) => {
    if (item.type === 'image') {
      return (
        <FastImage
          source={item.source}
          style={{
            height: 220,
            width: '100%',
            borderRadius: 15

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
              height: 220,
              width: '100%',
              borderRadius: 15,
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
            ...Shadows.shadow3,
            height: 220,
            marginTop: 8,
            borderRadius: 10,
            flexDirection: 'row',
            borderRadius: 15

          }}>
          <Swiper
            dotColor='transparent'
            activeDotColor='transparent'
            nextButton={<Text style={{ fontSize: 70, marginRight: 20, color: Colors.white }}>›</Text>}
            prevButton={<Text style={{ fontSize: 70, marginLeft: 10, color: Colors.white }}>‹</Text>}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15

            }}
            showsButtons>
            {MEDIA.map((item) => (
              <View key={item.id} style={{
                justifyContent: 'center',
                borderRadius: 20

              }}>
                {renderItem(item)}
              </View>
            ))}
          </Swiper>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, }}>
          <Image source={{ uri: userProfile?.profile_picture ? `${BaseUrl}${userProfile?.profile_picture}` : "https://picsum.photos/200/300" }} style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: Colors.purple,
            marginBottom: 10,
            
          }} />
          <Text style={{
            fontSize: themes?.fontSize?.medium,
            fontFamily:themes?.font?.bold,
            marginLeft: 8, 
            color: Colors.black,
           
            marginBottom: 3
          }}>{user?.name}</Text>
          <View style={{ position: 'absolute', right: 0, flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={Icons.marker}
              resizeMode="contain"
              style={styles.marker}
            />
            <Text style={styles.location} numberOfLines={1} >
              {event_location}
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
        <Text
          style={styles.post}>
          Ratings & Posts
        </Text>
        {<EventsPosts datas={filteringData} />}

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

