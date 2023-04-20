import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import AppBackground from '../../../components/AppBackground';
import { Evntdata } from '../../../config/Dummydata/Dummydata';
import { Colors, NavService } from '../../../config';
import { styles } from './eventhome_style';
const EventHome = () => {

  const EventReview = () => {
    NavService.navigate('EventReview')
  };

  return (
    <AppBackground profile marginHorizontal title={'Home'} home>
      <View style={styles.container}>

        <FlatList
          data={Evntdata}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.maincontainer}>
              <View style={styles.content}>
                <Text
                  style={styles.title}>
                  {item.title}
                </Text>
                <View
                  style={styles.rev}>
                  <Image source={item.rating} style={styles.review} />
                  <Text
                    style={styles.txt}>
                    {item.review}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={EventReview}>

                <ImageBackground
                  source={item.background}
                  style={styles.imgback}
                  imageStyle={{ borderRadius: 10 }} >
                  <View style={styles.loc}>
                    <Image source={item.location} resizeMode="contain" style={styles.location} />
                    <Text style={styles.loctxt}>{' '}{item.loc}</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </AppBackground>
  );
};

export default React.memo(EventHome);

