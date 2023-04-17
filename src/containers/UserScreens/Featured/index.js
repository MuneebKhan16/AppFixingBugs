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
import { Featureddata } from '../../../config/Dummydata/Dummydata';
import { Colors, NavService } from '../../../config';
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useSelector } from 'react-redux'
import Icons from '../../../assets/Icons';

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
          <View style={{ marginTop: 30, marginHorizontal: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ fontSize: 16, color: Colors.black, fontWeight: 'bold' }}>
                {item.event_title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 5,
                }}>
                <Image source={Icons.starFilled} style={{ width: 18, height: 18 }} />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    color: Colors.black,
                    fontWeight: '700',
                  }}>
                  {item.rating_count + " " + "Reviews"}
                </Text>
              </View>
            </View>
            <RNBounceable onPress={() => NavService.navigate('Review',item)}>
              <ImageBackground
                source={{ uri : `${BaseUrl}${item.event_image}`}}
                style={{ width: '100%', height: 150, marginTop: 10 }}
                imageStyle={{ borderRadius: 10 }}>
                <View style={{
                  width: 38,
                  height: 38,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  position: 'absolute',
                  right: 10,
                }}>
                  <Image
                    source={item.event_image}
                    style={{
                      width: 22,
                      height: 22,
                      resizeMode: 'contain',

                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    position: 'absolute',
                    bottom: 8,
                    left: 8,
                  }}>
                  <Image
                    source={Icons.location}
                    style={{
                      tintColor: Colors.white, width: 22,
                      height: 22,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text style={{ color: Colors.white, fontWeight: 'bold' }}>
                    {' '}
                    {item.event_location}
                  </Text>
                </View>
              </ImageBackground>
            </RNBounceable>
          </View>
        )
        }
        keyExtractor={item => item.id}
      />
    </AppBackground>
  );
};

export default Featured;

const styles = StyleSheet.create({});
