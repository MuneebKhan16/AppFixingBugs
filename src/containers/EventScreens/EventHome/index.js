// / eslint-disable prettier/prettier /
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import React, {useState, useEffect, useContext} from 'react';
import {useSelector} from 'react-redux';
import AppBackground from '../../../components/AppBackground';
import {NavService, Colors} from '../../../config';
import {styles} from './eventhome_style';
import ImageURL from '../../../config/Common';
import Icons from '../../../assets/Icons';
import eventContext from '../eventContext';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';
import {show_eventCreater_event} from '../../../redux/APIs';

const {width, height} = Dimensions.get('screen');

const EventHome = props => {
  const user = useSelector(state => state.reducer.user);
  const [allEvents, setAllEvents] = useState([]);
  const EventReview = item => {
    NavService.navigate('EventReview', {eventDetail: item});
  };
  useFocusEffect(
    React.useCallback(async () => {
      const result = await show_eventCreater_event(user?.id);
      // const {showEvents} = useContext(eventContext);
      console.log('result', result);
      setAllEvents(result?.events);
    }, []),
  );
  return (
    <AppBackground
      profile
      marginHorizontal
      title={'Home'}
      home
      style={{paddingBottom: 20}}>
      {allEvents?.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={allEvents}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View style={styles.maincontainer}>
                <View style={styles.content}>
                  <Text style={styles.title}>{item?.event_title}</Text>
                  <View style={styles.rev}>
                    <Image source={Icons.starFilled} style={styles.review} />
                    <Text style={styles.txt}>
                      {item?.rating_avg.map(data => data.rating_count) || 0}{' '}
                      Reviews
                    </Text>
                  </View>
                </View>
                {item?.images?.length > 0 ? (
                  <Swiper
                    style={{height: 180}}
                    activeDotColor="transparent"
                    dotColor="transparent">
                    {item?.images.map((data, index) => (
                      <TouchableOpacity
                        onPress={() => EventReview(item)}
                        activeOpacity={0.8}>
                        {data?.event_images?.split('.')[1] == 'mp4' ? (
                          <FastImage
                            key={index}
                            source={{
                              uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                            }}
                            style={[
                              styles.imgback,
                              {backgroundColor: 'grey', position: 'relative'},
                            ]}
                            imageStyle={styles.img}>
                            <Image
                              source={Icons.playIcon}
                              resizeMode="contain"
                              style={{
                                width: width * 0.1,
                                height: height * 0.05,
                                position: 'absolute',
                                top: height * 0.07,
                                left: width * 0.39,
                                tintColor: Colors.white,
                              }}
                            />
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
                        ) : (
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
                        )}
                      </TouchableOpacity>
                    ))}
                  </Swiper>
                ) : null}
              </View>
            )}
          />
        </View>
      ) : (
        <View style={styles.container1}>
          <Text style={styles.txtheadersty}>No Events Available</Text>
        </View>
      )}
    </AppBackground>
  );
};

export default React.memo(EventHome);
