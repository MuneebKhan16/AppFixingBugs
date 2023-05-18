/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  Alert,
  ActivityIndicator
} from 'react-native';
import Swiper from 'react-native-swiper';
import React, { useState, useEffect, useContext } from 'react';
import AppBackground from '../../../components/AppBackground';
import { NavService } from '../../../config';
import { styles } from './eventhome_style';
import { useSelector } from 'react-redux';
import ImageURL from '../../../config/Common';
import dummy from '../../../config/Common';
import { show_eventCreater_event } from '../../../redux/APIs';
import Icons from '../../../assets/Icons';
import eventContext from '../eventContext';
import FastImage from 'react-native-fast-image';
import Video from 'react-native-video'
const EventHome = props => {
  const { showEvents } = useContext(eventContext);

  const EventReview = item => {
    NavService.navigate('EventReview', { eventDetail: item });
  };

  return (
    <AppBackground profile marginHorizontal title={'Home'} home style={{ paddingBottom: 20 }}>

      {
        showEvents?.length > 0 ?
          (
            <View style={styles.container}>
              <FlatList
                data={showEvents}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View style={styles.maincontainer}>
                    <View style={styles.content}>
                      <Text
                        style={styles.title}>
                        {item?.event_title}
                      </Text>
                      <View
                        style={styles.rev}>
                        <Image source={Icons.starFilled} style={styles.review} />
                        <Text
                          style={styles.txt}>
                          {item?.rating_avg.map((data) => data.rating_count) || 0}{" "} Reviews
                        </Text>
                      </View>
                    </View>

                    {item?.images?.length > 0 ? (
                      <Swiper
                        style={{ height: 180 }}
                        activeDotColor="transparent"
                        dotColor="transparent">
                        {item?.images.map((data, index) => (
                          <TouchableOpacity onPress={() => EventReview({data,item})}>
                            
                            {
                              data?.event_images?.split('.')[1] == 'mp4' ?
                                (
                                  
                                    <Video
                                      source={{ uri:'https://api.myprojectstaging.com/outsideee/public/images/events/rating-5761684362950.mp4' }}
                                      volume={0}      
                                      style={styles.imgback}
                                      resizeMode="cover"
                                      //  controls={true}
                                    />
                                   
                                  
                                )
                                :
                                (
                                  <FastImage
                                    key={index}
                                    source={{
                                      uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                                    }}
                                    style={styles.imgback}
                                    imageStyle={styles.img}>
                                    <View style={styles.loc}>
                                      <Image
                                        source={Icons.location}
                                        resizeMode="contain"
                                        style={styles.location}
                                      />
                                      <Text style={styles.loctxt} numberOfLines={1}>
                                        {' '}
                                        {item.event_location}
                                      </Text>
                                    </View>
                                  </FastImage>
                                )
                            }
                          </TouchableOpacity>
                        ))}
                      </Swiper>
                    ) : null}
                  </View>

                )
                }
              />
            </View >
          ) : (
            <View style={styles.container1}>
              <Text style={styles.txtheadersty}>No Events Available</Text>
            </View>
          )}
    </AppBackground >
  );
};

export default React.memo(EventHome);
