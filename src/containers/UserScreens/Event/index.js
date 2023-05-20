/* eslint-disable prettier/prettier */
import {
  Dimensions,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import {categoryevents} from '../../../redux/APIs/index';
import Swiper from 'react-native-swiper';
import React, {useEffect, useState} from 'react';
import AppBackground from '../../../components/AppBackground';
import {Evntdata} from '../../../config/Dummydata/Dummydata';
import {Colors, NavService} from '../../../config';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useSelector} from 'react-redux';
import Icons from '../../../assets/Icons';
import {styles} from './event_style';
import ImageURL from '../../../config/Common';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('screen');

const Event = props => {
  const api_token = useSelector(state => state?.reducer?.user.api_token);

  const [cat, Setcat] = useState([]);
  const id = props?.route?.params;
  const filters = props?.route?.params?.filtered
  console.log('jhgfdsa@@@@@',filters)

  useEffect(() => {
    categoryevents(api_token, id).then(res => Setcat(res?.Data));
  }, []);

  return (
    <AppBackground title={'Events'} home back filter>
    {
      filters ? 
      (
        <FlatList
          data={filters}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View style={styles.top}>
              <View style={styles.container}>
                <Text style={styles.title}>{item.event_title}</Text>
                <View style={styles.filled}>
                  <Image source={Icons.starFilled} style={styles.icnfilled} />
                  <Text style={styles.review}>
                    {item.rating_count == null ? 0 + ' ' + 'Reviews' : item.rating_count + ' ' + 'Reviews'}
                  </Text>
                </View>
              </View>
              {item?.event_images?.length > 0 ? (
                <Swiper
                  style={{height: 220}}
                  activeDotColor={Colors.white}
                  dotColor={Colors.purple}>
                  {item?.event_images.map((data, index) => (
                    <RNBounceable
                      key={index + 1}
                      onPress={() =>
                        NavService.navigate('Review', {eventDetail: item})
                      }>
                      {data?.event_images?.split('.')[1] == 'mp4' ? (
                        <FastImage
                          key={index}
                          source={{
                            uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                          }}
                          style={[
                            styles.img,
                            {backgroundColor: 'grey', position: 'relative'},
                          ]}
                          imageStyle={styles.border}>
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
                          <View style={styles.loccontainer}>
                            <View style={styles.locsub}>
                              <Image
                                source={Icons.location}
                                resizeMode="contain"
                                style={styles.location}
                              />
                            </View>
                            <Text style={styles.loctxt} numberOfLines={1}>
                              {item?.event_location}
                            </Text>
                          </View>
                        </FastImage>
                      ) : (
                        <FastImage
                          source={{
                            uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                          }}
                          style={styles.img}
                          imageStyle={styles.border}>
                          <View style={styles.loccontainer}>
                            <View style={styles.locsub}>
                              <Image
                                source={Icons.location}
                                resizeMode="contain"
                                style={styles.location}
                              />
                            </View>
                            <Text style={styles.loctxt} numberOfLines={1}>
                              {item?.event_location}
                            </Text>
                          </View>
                        </FastImage>
                      )}
                    </RNBounceable>
                  ))}
                </Swiper>
              ) : null}
            </View>
          )}
        />
      ) 
      :
      (
        cat?.length > 0 ?
        (
          <FlatList
          data={cat}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <View style={styles.top}>
              <View style={styles.container}>
                <Text style={styles.title}>{item.event_title}</Text>
                <View style={styles.filled}>
                  <Image source={Icons.starFilled} style={styles.icnfilled} />
                  <Text style={styles.review}>
                    {item.rating_count + ' ' + 'Reviews'}
                  </Text>
                </View>
              </View>
              {item?.event_images?.length > 0 ? (
                <Swiper
                  style={{height: 220}}
                  activeDotColor={Colors.white}
                  dotColor={Colors.purple}>
                  {item?.event_images.map((data, index) => (
                    <RNBounceable
                      key={index + 1}
                      onPress={() =>
                        NavService.navigate('Review', {eventDetail: item})
                      }>
                      {data?.event_images?.split('.')[1] == 'mp4' ? (
                        <FastImage
                          key={index}
                          source={{
                            uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                          }}
                          style={[
                            styles.img,
                            {backgroundColor: 'grey', position: 'relative'},
                          ]}
                          imageStyle={styles.border}>
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
                          <View style={styles.loccontainer}>
                            <View style={styles.locsub}>
                              <Image
                                source={Icons.location}
                                resizeMode="contain"
                                style={styles.location}
                              />
                            </View>
                            <Text style={styles.loctxt} numberOfLines={1}>
                              {item?.event_location}
                            </Text>
                          </View>
                        </FastImage>
                      ) : (
                        <FastImage
                          source={{
                            uri: `${ImageURL?.ImageURL}${data?.event_images}`,
                          }}
                          style={styles.img}
                          imageStyle={styles.border}>
                          <View style={styles.loccontainer}>
                            <View style={styles.locsub}>
                              <Image
                                source={Icons.location}
                                resizeMode="contain"
                                style={styles.location}
                              />
                            </View>
                            <Text style={styles.loctxt} numberOfLines={1}>
                              {item?.event_location}
                            </Text>
                          </View>
                        </FastImage>
                      )}
                    </RNBounceable>
                  ))}
                </Swiper>
              ) : null}
            </View>
          )}
        />   

        )
        :
        (
          <View style={styles.container1}>
          <Text style={styles.txtheadersty}>No Events Available</Text>
        </View>
        )
      
      )
      }
     
    </AppBackground>
  );
};

export default React.memo(Event);
