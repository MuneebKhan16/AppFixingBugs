/* eslint-disable prettier/prettier */
import React, { useRef, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  Button,
  StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icons from '../assets/Icons';
import Images from '../assets/Images';
import { Colors, NavService } from '../config';
import RNBounceable from '@freakycoder/react-native-bounceable';
import Modal from "react-native-modal";
import Pickdate from './Pickdate';
import CustomButton from './CustomButton';
import { TextInput } from 'react-native-gesture-handler';

export function AppBackground({
  editeIcon,
  route,
  children,
  title,
  back = false,
  nav = '',
  rightIcon = Images.avatar,
  marginHorizontal,
  rightIconNav = () => { },
  profile = false,
  edit = false,
  notification = false,
  gear = false,
  filter = false,
  chat = false,
  setting = false,
  home,
}) {
  const onPress = () => {
    nav.length
      ? NavService.navigate(nav)
      : back
        ? NavService.goBack()
        : NavService.navigate;
  };
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [location, setLocation] = useState();
  //  console.log("==========="+ route.name)
  return home ? (
    <View style={{ flex: 1, backgroundColor: Colors.offWhite }}>
      <View
        style={styles.maincontainer}>
        <>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.usertouchable}>
            <Image
              source={back ? Icons.back : null}
              style={{
                width: 24,
                height: 24,
                resizeMode: 'contain',
                tintColor: Colors.purple,
              }}
            />
          </TouchableOpacity>

          <View>
            <Text
              style={{
                color: Colors.black,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {title}
            </Text>
          </View>
          {profile && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('EventProfile');
              }}
              style={{
                right: 25,
                position: 'absolute',
                height: 40,
                alignItems: 'center',
                marginTop: 10,
                borderRadius: 15,
              }}>
              <Image
                source={Images.avatar}
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: 'center',
                  borderRadius: 60,

                }}
              />
            </TouchableOpacity>
          )}
          {notification && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                position: 'absolute',
                right: 28,
                width: 38,
                height: 38,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,

              }}>
              <Image
                source={Icons.notification}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          )}
          {gear && (
            <RNBounceable
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('EventSetting');
              }}
              style={{
                position: 'absolute',
                right: 30,
                width: 38,
                height: 38,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={Icons.settings}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  tintColor: Colors.purple,
                }}
              />
            </RNBounceable>
          )}
          {setting && (
            <RNBounceable
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('Setting');
              }}
              style={{
                position: 'absolute',
                right: 30,
                width: 38,
                height: 38,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Image
                source={Icons.settings}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  tintColor: Colors.purple,
                }}
              />
            </RNBounceable>
          )}
          {filter && (
            <RNBounceable
              activeOpacity={0.8}
              onPress={toggleModal}
              style={{
                position: 'absolute',
                right: 20,
                width: 38,
                height: 38,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                // backgroundColor: Colors.white,
              }}>
              <Image
                source={Icons.filter}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  tintColor: Colors.purple,
                }}
              />
              <View>
                <Modal isVisible={isModalVisible}>
                  <View style={{ borderRadius: 15, backgroundColor: Colors.white, width: '90%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', padding: 20 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600'
                    }}>Filters</Text>
                    <View style={{
                      borderColor: Colors.black,
                      borderWidth: 1,
                      width: '96%',
                      borderRadius: 10,
                      height: 45,
                      marginTop: 25,
                      bottom: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                      <Image
                        source={Icons.location}
                        style={{
                          width: 22,
                          height: 22,
                          marginLeft: 12,
                          resizeMode: 'contain',
                          tintColor: Colors.purple,
                        }}
                      />
                      <TextInput
                        value={location}
                        placeholder="Location"
                        placeholderTextColor={Colors.black}
                        placeholderTextStyle={{ fontSize: 18 }}
                        style={{ marginLeft: 15, width: 215, height: 40 }}
                      />
                    </View>
                    <Pickdate />
                    <CustomButton
                      buttonStyle={{
                        width: 280
                      }}
                      title="Continue"
                      onPress={toggleModal}
                    />
                    {/* <Button title="Hide modal" onPress={toggleModal} /> */}
                  </View>
                </Modal>
              </View>
            </RNBounceable>
          )}
          {chat && (
            <RNBounceable
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('ChatList');
              }}
              style={{
                position: 'absolute',
                right: 20,
                width: 38,
                height: 38,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                // backgroundColor: Colors.white,
              }}>
              <Image
                source={Icons.msg}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                  tintColor: Colors.purple,
                }}
              />
            </RNBounceable>
          )}
        </>
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: !marginHorizontal ? 20 : 0,
          marginBottom: 10,
          overflow: 'visible',
        }}>
        {children}
      </View>
    </View>
  ) : (
    <ImageBackground source={Images.bg} style={{ flex: 1 }}>
      <View
        style={styles.maincontainer}>
        <>
          {back && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPress}
              style={styles.authtouchable}>
              <Image
                source={Icons.back}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: Colors.white,
                }}
              />
            </TouchableOpacity>
          )}
          <View>
            <Text
              style={{
                color: Colors.white,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {title}
            </Text>
          </View>
          {profile && (
            <RNBounceable
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('Profile');
              }}
              style={{
                position: 'absolute',
                right: 20,
                width: 38,
                height: 38,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: Colors.darkGray,
                //

              }}>
              <Image
                source={rightIcon}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  resizeMode: 'cover',
                }}
              />
            </RNBounceable>
          )}
          {edit && (
            <RNBounceable
              activeOpacity={0.8}
              onPress={rightIconNav}
              style={{
                position: 'absolute',
                right: 20,
                width: 38,
                height: 38,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: Colors.darkGray,
              }}>
              <Image
                source={editeIcon}
                style={{
                  width: 22,
                  height: 22,
                  resizeMode: 'contain',
                }}
              />
            </RNBounceable>
          )}
        </>
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: !marginHorizontal ? 20 : 0,
          marginBottom: 10,
          overflow: 'visible',
        }}>
        {children}
      </View>
    </ImageBackground>
  );
}

export default AppBackground;


const styles = StyleSheet.create({
  maincontainer:{
    marginTop: getStatusBarHeight() + 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
     marginBottom: 10,
  },
  usertouchable:{
    position: 'absolute',
    alignItems: 'center',
    left: 25,
    justifyContent: 'center',
    top: 3,
    paddingRight: 30,
  },
  authtouchable:{
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 10,
    left: 15,
    padding: 5,
    justifyContent: 'center',
    paddingRight: 50
  }
})