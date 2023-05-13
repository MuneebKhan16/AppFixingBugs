import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { localevents } from '../../../redux/APIs/index'
import AppBackground from '../../../components/AppBackground';
import { Colors, NavService } from '../../../config';
import { useSelector } from 'react-redux'
import Icons from '../../../assets/Icons';
import { styles } from './featured_style';
const Featured = () => {
  const [feature, Setfeatured] = useState([]);
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`
  const api_token = useSelector(state => state.reducer.user.api_token);

  useEffect(() => {
    localevents(api_token).then((res) => Setfeatured(res?.Data?.featured))
  }, []);



  return (
    <AppBackground title={'Featured'} home back>
      <FlatList
        data={feature}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View style={styles.header}>
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
            <TouchableOpacity onPress={() => NavService.navigate('Review', item)}>
              <ImageBackground
                source={{ uri: `${BaseUrl}${item.event_image}` }}
                style={styles.img}
                imageStyle={styles.border}>
                <View style={styles.imgbg}>
                  <Image
                    source={Icons.starEmpty}
                    style={styles.empty}
                  />
                </View>

                <View
                  style={styles.icnloc}>
                  <Image
                    source={Icons.location}
                    style={styles.location}
                  />
                  <Text style={styles.locationtxt} numberOfLines={1} >
                    {' '}
                    {item.event_location}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        )
        }
        keyExtractor={item => item.id}
      />
    </AppBackground>
  );
};

export default React.memo(Featured);

