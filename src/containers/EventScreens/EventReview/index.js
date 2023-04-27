/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React,{useState,useEffect} from 'react';
import AppBackground from '../../../components/AppBackground';
import Images from '../../../assets/Images';
import Posts from '../../../components/Posts';
import { Colors } from '../../../config';
import Icons from '../../../assets/Icons';
import { styles } from './eventreview_style';
import  ImageURL from '../../../config/Common'
import EventPost from '../../../components/EventsPosts';
import { get_reviews_event } from '../../../redux/APIs/index'
import { useSelector } from 'react-redux'
const EventReview = (props) => {
  

  const token = useSelector((state) =>  state.reducer.user.api_token  )
  const PassedData = props?.route?.params

  const [UserPost, setUserPost] = useState([]);
  console.log("UserPost45",UserPost)
  useEffect(() => {
    get_reviews_event(token).then((res) => setUserPost(res.Data));
  }, [])
  

  const DateReadbleFunction = (date ) => {
    var date = new Date();
    return date.toLocaleDateString();
  }

  return (
    <AppBackground back home>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Image
          source={{ uri :`${ImageURL?.ImageURL}${PassedData?.event_image }`}}
          style={styles.imgbg}
        />
        <View style={styles.titlehdr}>
          <Text style={styles.title}>
            {PassedData?.event_title} .
          </Text>
          <Text style={styles.date}>{ DateReadbleFunction(PassedData?.created_at)} </Text>
        </View>
        <Text style={styles.subtitle}>
          {PassedData.event_description}
        </Text>
        <View style={styles.markericn}>
          <View style={styles.markericnhdr}>
            <Image
              source={Icons.marker}
              style={styles.marker}
            />
          </View>
          <Text style={styles.subcontent}>
            {PassedData.event_location}
          </Text>
        </View>
        <Text
          style={styles.heading}>
          Ratings & Posts
        </Text>
        {
          PassedData.id === PassedData.id && UserPost.length > 0 ? 
          (
            <EventPost  UserPost={UserPost} event_id={PassedData.id} />
            
          ) :
          (
            <View style={styles.container1}>
              <Text style={styles.txtheadersty}> No Review's Found </Text>
            </View>
          )
        }
        
        
      </ScrollView>
    </AppBackground>
  );
};

export default React.memo(EventReview);

