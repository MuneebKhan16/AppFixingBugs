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
import RNBounceable from '@freakycoder/react-native-bounceable';

const EventHome = () => {
  useEffect(() => {

  }, []);
  return (
    <AppBackground profile marginHorizontal title={'Home'} home>
      <View style={{marginBottom:10,marginTop:10}}>

      <FlatList
        data={Evntdata}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ marginTop: 25, marginHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{ fontSize: 16, color: Colors.black, fontWeight: 'bold' }}>
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 5,
                }}>
                <Image source={item.rating} style={{ width: 20, height: 20 }} />
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 15,
                    color: Colors.black,
                    fontWeight: '600',
                  }}>
                  {item.review}
                </Text>
              </View>
            </View>
            <RNBounceable onPress={() => NavService.navigate('EventReview')}>
              
              <ImageBackground
                source={item.background}
                style={{ width: '100%', height: 150, marginTop: 10 }}
                imageStyle={{ borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 8, left: 5, }}>
                  <Image source={item.location} resizeMode="contain" style={{ tintColor: Colors.white, width: 25, height: 25 }} />
                  <Text style={{ color: Colors.white, fontWeight: 'bold' }}>{' '}{item.loc}</Text>
                </View>
              </ImageBackground>
            </RNBounceable>
          </View>
        )}
      />
      </View>
    </AppBackground>
  );
};

export default EventHome;

const styles = StyleSheet.create({});
