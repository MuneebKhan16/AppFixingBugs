import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Colors, NavService} from './config';
import Icons from './assets/Icons';
import {styles} from './TabbarComp';
import LinearGradient from 'react-native-linear-gradient';

export default class TabbarComponent extends React.Component {
  render() {
    const {state, navigation} = this.props;
    return (
      <View
        style={{
          backgroundColor: Colors.background,
          
        }}>
        <LinearGradient
          colors={['#4B0082', '#260041']}
          style={{
            flexDirection: 'row',
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

            if (route.name === 'ChatList')
              imageSrc = isFocused ? Icons.chatlist : Icons.chat;

            if (route.name === 'Add') {
              return (
                <View
                  style={{
                    flex: 1,
                    height: 65,
                    width: 65,
                  }}></View>
              );
            }

            return (
              <TouchableOpacity
                key={index}
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityRole="button"
                activeOpacity={0.8}
                onPress={onPress}
                style={{
                  marginBottom: 5,

                  marginHorizontal: 40,
                  height: 60,
                  alignItems: isFocused ? null : 'center',
                  justifyContent: isFocused ? null : 'center',
                }}>
                <Image
                  source={imageSrc}
                  style={{
                    height: isFocused ? 40 : 25,
                    width: isFocused ? 40 : 25,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          })}
        </LinearGradient>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => NavService.navigate('EventPost')}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 55,
              height: 55,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Icons.add}
              style={{
                height: 25,
                width: 25,
              }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
