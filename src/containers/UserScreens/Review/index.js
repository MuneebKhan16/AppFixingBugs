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
import React,{useEffect , useState} from 'react';
import AppBackground from '../../../components/AppBackground';
import {Colors, NavService} from '../../../config';
import EventsPosts from '../../../components/EventsPosts';
import CustomButton from '../../../components/CustomButton';
import Swiper from 'react-native-swiper';
import Images from '../../../assets/Images';
import Mainprofile from '../../../components/Mainprofile';
import RNBounceable from '@freakycoder/react-native-bounceable';

const Review = (props) => {
  const profile_Data = useSelector((state) => state.reducer.user)
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`
  const { user, event_title , event_location,event_image ,id } = props.route.params;
  const [UserPost , setUserPost] = useState([]);
  
  useEffect(() => {
    get_reviews_event(profile_Data.api_token).then((res) => setUserPost(res.Data));
  },[])

  return (
    <AppBackground title={'Events'} home back chat>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 30}}>
        <Swiper
          style={{height: 200, borderRadius: 15}}
          showsButtons={false}
          buttonWrapperStyle={{Color: '#fff'}}>
          <View style={styles.slide1}>
            <Image
              source={{ uri : `${BaseUrl}${event_image}` }}
              style={{borderRadius: 20, width: '100%', height: '100%'}}
            />
          </View>
        </Swiper>
        <View style={{marginTop: 10}}>
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
          style={{
            color: Colors.black,
            fontSize: 18,
            fontWeight: '700',
            marginTop: 20,
          }}>
          Ratings & Posts
        </Text>
        <EventsPosts  event_id={id} UserPost={UserPost}  />
      </ScrollView>
      <CustomButton
        buttonStyle={{alignSelf: 'center'}}
        title="Rate & Post"
        onPress={() => NavService.navigate('Post')}
      />
    </AppBackground>
  );
};

export default Review;

const styles = StyleSheet.create({
  cardContainer: {
    height: 150,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  cardContent: {
    color: Colors.black,
    fontSize: 34,
    fontWeight: '500',
  },
  slide1: {
    height: 200,
    borderRadius: 15,
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});