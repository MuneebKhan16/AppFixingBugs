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
} from 'react-native';

import React, { useState, useEffect, useContext } from 'react';
import AppBackground from '../../../components/AppBackground';
import { NavService } from '../../../config';
import { styles } from './eventhome_style';
import { useSelector } from 'react-redux'
import ImageURL from '../../../config/Common'
import dummy from '../../../config/Common'
import { show_eventCreater_event } from '../../../redux/APIs'
import Icons from '../../../assets/Icons'
import eventContext from '../eventContext';


const EventHome = (props) => {
  const { showEvents } = useContext(eventContext);

  const EventReview = (item) => {

    NavService.navigate('EventReview', item)
  };

  console.log('showEvents78', showEvents)


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
                    <TouchableOpacity onPress={() => EventReview(item)}>

                      <ImageBackground
                         source={{ uri: `${ImageURL?.ImageURL}${item?.event_image}` || `${dummy.dummy}` }}
                        style={styles.imgback}
                        imageStyle={styles.img} >
                        <View style={styles.loc}>
                          <Image source={Icons.location} resizeMode="contain" style={styles.location} />
                          <Text style={styles.loctxt}>{' '}{item.event_location}</Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>

          ) :
          (
            <View style={styles.container1}>
              <Text style={styles.txtheadersty}>No Events Available</Text>
            </View>
          )
      }

    </AppBackground>
  );
};

export default React.memo(EventHome);

