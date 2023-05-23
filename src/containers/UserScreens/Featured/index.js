import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {localevents} from '../../../redux/APIs/index';
import AppBackground from '../../../components/AppBackground';
import {Colors, Common, NavService} from '../../../config';
import {useSelector} from 'react-redux';
import Swiper from 'react-native-swiper';
import RNBounceable from '@freakycoder/react-native-bounceable';
import Icons from '../../../assets/Icons';
import {styles} from './featured_style';
import FastImage from 'react-native-fast-image';
const {width, height} = Dimensions.get('screen');
const Featured = () => {
  const [feature, Setfeatured] = useState([]);
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`;
  const api_token = useSelector(state => state.reducer.user.api_token);

  useEffect(() => {
    localevents(api_token).then(res => Setfeatured(res?.Data?.featured));
  }, []);

  return (
    <AppBackground title={'Featured'} home back>
      <FlatList
        data={feature}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={styles.container}>
            <View style={styles.header}>
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
                            uri: `${Common?.ImageURL}${data?.event_images}`,
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
                            uri: `${Common?.ImageURL}${data?.event_images}`,
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
        keyExtractor={item => item.id}
      />
    </AppBackground>
  );
};

export default React.memo(Featured);
