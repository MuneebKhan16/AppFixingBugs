/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground, TouchableOpacity,
  Image
} from 'react-native';
import { categoryevents } from '../../../redux/APIs/index'
import React, { useEffect, useState } from 'react';
import AppBackground from '../../../components/AppBackground';
import { Evntdata } from '../../../config/Dummydata/Dummydata';
import { Colors, NavService } from '../../../config';
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useSelector } from 'react-redux';
import Icons from '../../../assets/Icons';
import { styles } from './event_style';
import ImageURL from '../../../config/Common'
import FastImage from 'react-native-fast-image'
const Event = (props) => {

  const api_token = useSelector(state => state?.reducer?.user.api_token);

  const [cat, Setcat] = useState([]);
  const id = props?.route?.params;

  useEffect(() => {
    categoryevents(api_token, id)
      .then((res) => Setcat(res?.Data))
  }, [])

  return (
    <AppBackground title={'Events'} home back filter>
      {
        cat?.length > 0 ?
          (
            <FlatList
              data={cat}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View style={styles.top}>
                  <View style={styles.container}>
                    <Text
                      style={styles.title}>
                      {item.event_title}
                    </Text>
                    <View
                      style={styles.filled}>
                      <Image source={Icons.starFilled} style={styles.icnfilled} />
                      <Text
                        style={styles.review}>
                        {item.rating_count + " " + "Reviews"}
                      </Text>
                    </View>
                  </View>
                  <RNBounceable onPress={() => NavService.navigate('Review', item)}>
                    <FastImage
                       source={{ uri: `${ImageURL?.ImageURL}${item?.event_image}` }}
                       style={styles.img}
                       imageStyle={styles.border}
                    >
                        <View style={styles.loccontainer}>
                        <View style={styles.locsub}>
                          <Image source={Icons.location} resizeMode="contain" style={styles.location} />
                        </View>
                        <Text style={styles.loctxt}>{' '}{item.event_location}</Text>
                      </View>
                      </FastImage>
                    {/* <ImageBackground
                      source={{ uri: `${ImageURL?.ImageURL}${item?.event_image}` }}
                      style={styles.img}
                      imageStyle={styles.border}>
                      <View style={styles.loccontainer}>
                        <View style={styles.locsub}>
                          <Image source={Icons.location} resizeMode="contain" style={styles.location} />
                        </View>
                        <Text style={styles.loctxt}>{' '}{item.event_location}</Text>
                      </View>
                    </ImageBackground> */}

                  </RNBounceable>
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
      }

    </AppBackground>
  );
};

export default React.memo(Event);

