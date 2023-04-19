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
const Event = (props) => {


  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`
  const api_token = useSelector(state => state?.reducer?.user.api_token);

  const [cat, Setcat] = useState([]);
  const id = props.route.params;

  const Id = id.filter((data) => {
    if (data.category_id !== null) {
      return data.category_id;
    } else {
      console.log("loading")
    }
  })

  useEffect(() => {
    categoryevents(api_token, Id)
      .then((res) => Setcat(res?.Data))
  }, [])


  console.log("catcatcat", cat)

  return (
    <AppBackground title={'Events'} home back filter>
      <FlatList
        data={cat}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginTop: 30 }}>
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
              <ImageBackground
                source={{ uri: `${BaseUrl}${item.event_image}` }}
                style={styles.img}
                imageStyle={{ borderRadius: 10 }}>
                <View style={styles.loccontainer}>
                  <View style={styles.locsub}>
                    <Image source={Icons.location} resizeMode="contain" style={styles.location} />
                  </View>
                  <Text style={styles.loctxt}>{' '}{item.event_location}</Text>
                </View>

              </ImageBackground>

            </RNBounceable>
          </View>
        )}
      />
    </AppBackground>
  );
};

export default React.memo(Event);

