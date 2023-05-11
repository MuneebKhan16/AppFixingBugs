import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Colors, Icon} from './config';
import Icons from './assets/Icons';
import {NavService} from '../src/config';
import LinearGradient from 'react-native-linear-gradient';
import RNBounceable from "@freakycoder/react-native-bounceable";
export default class TabbarComp extends React.Component {
  render() {
    const {state, navigation} = this.props;
    return (
      <View style={{backgroundColor: Colors.background,}}>
        <LinearGradient
          colors={['#4B0082', '#260041']}
          style={{
            flexDirection: 'row',
            overflow: 'hidden',
            justifyContent: 'space-around',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              navigation.navigate(route.name);
            };

            let imageSrc = isFocused ? Icons.homelist : Icons.home;
            if (route.name === 'Featured')
              imageSrc = isFocused ? Icons.eventlist : Icons.celendar;
              
            if (route.name === 'ChatList')
              imageSrc = isFocused ? Icons.chatlist : Icons.chat;
            if (route.name === 'Profile')
              imageSrc = isFocused ? Icons.userprofile : Icons.profile;


            return (
              <RNBounceable
                key={index}
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityRole="button"
                activeOpacity={0.8}
                onPress={onPress}
                style={{
                  marginBottom: 5,
                  height: 60,
                  alignItems: isFocused ? null : 'center',
                  justifyContent:isFocused ? null : 'center'
                }}>
                <Image
                  source={imageSrc}
                  style={{
                    height:  isFocused ? 40 : 25,
                    width: isFocused ? 40 : 25,
                    tintColor: isFocused ? null : Colors.lightGrey
                    
                  }}
                  resizeMode="contain"
                />
              </RNBounceable>
            );
          })}
        </LinearGradient>
      </View>
    );
  }
}

export const styles = StyleSheet.create({

});
