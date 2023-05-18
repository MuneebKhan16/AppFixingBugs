// eslint-disable prettier/prettier /
import React, { useRef, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  Button,
  StyleSheet,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icons from '../assets/Icons';
import Images from '../assets/Images';
import { Colors, NavService } from '../config';
import RNBounceable from '@freakycoder/react-native-bounceable';
import Modal from 'react-native-modal';
import Pickdate from './Pickdate';
import CustomButton from './CustomButton';
import { TextInput } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ImageURL from '../config/Common';
import Dummy from '../config/Common';
import Mymdll from './Mymdll';
import Datepick from './Datepick';
import { themes } from '../config/globalFonts/globalFonts';


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
  editicn = false,
  editParams = null,
  save = false,
  home,
  Eventuser,
}) {
  const onPress = () => {
    nav.length
      ? NavService.navigate(nav)
      : back
        ? NavService.goBack()
        : NavService.navigate;
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useSelector(state => state.reducer.user);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [City, setcity] = useState();
  const [State, setstate] = useState();

  const [isFocused, setIsFocused] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ModalVisible, setIsModalVisible] = useState(false);

  console.log('kl', `${Dummy.dummy}`);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  return home ? (
    <View style={{ flex: 1, backgroundColor: Colors.offWhite }}>
      <View style={styles.maincontainer}>
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
                marginTop: -8,
              }}
            />
          </TouchableOpacity>

          <View>
            <Text
              style={{
                color: Colors.black,
                fontSize: themes?.fontSize?.large,
                textTransform: 'capitalize',
                fontFamily: themes?.font?.black
              }}>
              {title}
            </Text>
          </View>
          {profile && (
            <TouchableOpacity
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
                source={{
                  uri: user?.profile_picture
                    ? `${ImageURL?.ImageURL}${user?.profile_picture}`
                    : 'https://picsum.photos/200/300',
                }}
                style={{
                  height: 40,
                  width: 40,
                  alignSelf: 'center',
                  borderRadius: 60,
                  borderWidth: 2,
                  borderColor: Colors.purple,
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
                right: 15,
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
                right: 25,
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
                  <View
                    style={{
                      borderRadius: 15,
                      backgroundColor: Colors.white,
                      width: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      padding: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        color: Colors.black,
                      }}>
                      Filters
                    </Text>
                    <View
                      // onPress={handleOpenModal}
                      style={{
                        borderColor: Colors.black,
                        borderWidth: 1,
                        width: '100%',
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
                          marginLeft: 10,
                          resizeMode: 'contain',
                          tintColor: Colors.purple,
                        }}
                      />
                      <TextInput
                      numberOfLines={1}
                        editable={true}
                        style={{
                          borderColor: 'gray',
                          borderRadius: 10,
                          width: '80%',
                          color: Colors.black,
                          fontSize: 17,
                          marginLeft:15,
                          
                        }}
                        placeholder={'City'}
                        placeholderTextColor={Colors.black}
                        // secureTextEntry={!isFocused}
                        // onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChangeText={City => setcity(City)}
                        value={City}
                      />
                    </View>
                    <View
                      // onPress={handleOpenModal}
                      style={{
                        borderColor: Colors.black,
                        borderWidth: 1,
                        width: '100%',
                        borderRadius: 10,
                        height: 45,
                        marginTop: 15,
                        bottom: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={Icons.location}
                        style={{
                          width: 22,
                          height: 22,
                          marginLeft: 10,
                          resizeMode: 'contain',
                          tintColor: Colors.purple,
                        }}
                      />
                      <TextInput
                      numberOfLines={1}
                        editable={true}
                        style={{
                          borderColor: 'gray',
                          borderRadius: 10,
                          width: '80%',
                          color: Colors.black,
                          fontSize: 17,
                          marginLeft:15,
                          
                        }}
                        placeholder={'State'}
                        placeholderTextColor={Colors.black}
                        // secureTextEntry={!isFocused}
                        // onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChangeText={State => setstate(State)}
                        value={State}
                      />
                    </View>

                    {/* <Mymdll
                      isVisible={ModalVisible}
                      onClose={handleCloseModal}
                      setLocation={setLocation}
                    /> */}
                    <Datepick />
                    <CustomButton
                      buttonStyle={{
                        width: 280,
                      }}
                      title="Continue"
                      onPress={toggleModal}
                    />
                  </View>
                </Modal>
              </View>
            </RNBounceable>
          )}
          {chat && (
            <RNBounceable
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('ChatScreen', Eventuser);
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
          {editicn && (
            <RNBounceable
              activeOpacity={0.8}
              onPress={() => {
                NavService.navigate('Editevent', { eventDetail: editParams });
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
                source={Icons.edite}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  tintColor: Colors.purple,
                }}
              />
            </RNBounceable>
          )}
          {save && (
            <RNBounceable
              activeOpacity={0.8}
              onPress={() => {
                // NavService.navigate('Editevent',);
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
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: Colors.purple,
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                Save
              </Text>
              {/* <Image
                source={Icons.edite}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'contain',
                  tintColor: Colors.purple,
                }}
              /> */}
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
      <View style={styles.maincontainer}>
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

export default React.memo(AppBackground);

const styles = StyleSheet.create({
  maincontainer: {
    marginTop: getStatusBarHeight() + 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  usertouchable: {
    position: 'absolute',
    alignItems: 'center',
    left: 20,
    justifyContent: 'center',
    top: 3,
    paddingRight: 50,
    paddingVertical: 5,
  },
  authtouchable: {
    position: 'absolute',
    alignItems: 'center',
    borderRadius: 10,
    left: 15,
    padding: 5,
    justifyContent: 'center',
    paddingRight: 50,
  },
});
