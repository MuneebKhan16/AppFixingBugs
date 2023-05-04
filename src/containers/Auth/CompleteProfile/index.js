/* eslint-disable prettier/prettier */

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  Alert
} from 'react-native';
import React, { useEffect, useCallback, } from 'react';
import CustomBackground from '../../../components/CustomBackground';
import AppBackground from '../../../components/AppBackground';
import Images from '../../../assets/Images';
import { ColorSpace } from 'react-native-reanimated';
import { Colors } from 'react-native-paper';
import { NavService } from '../../../config';
import { useSelector } from 'react-redux'

const index = (props) => {

  const ScreenStack = useCallback(() => {
    NavService.navigate('Tab')
  }, [])
  const EventStack = useCallback(() => {
    NavService.navigate('EventScreenStack')
  }, [])
  return (
    <AppBackground back={false} profile={false} title={'User Selection'}>
      <View
        style={styles.maincontainer}>
        <View>
          <TouchableOpacity
            style={styles.container}
            onPress={() => ScreenStack()}>
            <ImageBackground
              source={Images.background3}
              style={styles.imgbg}
              imageStyle={styles.opicty}
              resizeMode='cover'

            >
              <Text style={styles.txt}>Going Outsideee</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View>

          <TouchableOpacity onPress={() => EventStack()} activeOpacity={0.3}
            style={{
              marginHorizontal: 10,
              marginTop: 20

            }}>
            <ImageBackground
              source={Images.background1}
              style={styles.imgbg}
              imageStyle={styles.opicty}
              resizeMode='cover'
            >
              <Text style={styles.txt}>Host Outsideee</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </AppBackground>
  );
};

export default React.memo(index);

const styles = StyleSheet.create({
  txt: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    textTransform: 'capitalize',
    fontFamily:'NexaText-Trial-Heavy'
  },
  maincontainer: {
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    marginHorizontal: 10,
  },
  imgbg: {
    height: 200,
    borderRadius: 20,
    justifyContent: 'center'
  },
  opicty: { borderRadius: 20, opacity: 0.7 }
});
