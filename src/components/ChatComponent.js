import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icons from '../assets/Icons';
import {Colors} from '../config';
import Images from '../assets/Images';
import RNBounceable from "@freakycoder/react-native-bounceable";

const ChatComponent = props => {
  const {image, name, msg, onPress} = props;

  return (
    <RNBounceable
      onPress={onPress}
      style={{
        width: '100%',
        // height: 70,
        padding: 3,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grey,
        marginVertical: 10,
      }}>
      <View
        style={{
          flex: 2,
          height:55,
          justifyContent:'center'
        }}>
        <Image
          style={{
            height: 55,
            width: 45,
            alignSelf: 'center',
            borderRadius: 60,

          }}
          source={image}
        />
      </View>
      <View
        style={{
          flex: 8,
         
        }}>
        <Text
          style={{
            flex: 2.5,
            // paddingBottom: 6,
            fontSize: 16,
            fontWeight: '800',
            color: Colors.black,
            paddingLeft: 4,
            marginBottom: 2
          }}>
          {name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            flex: 7.5,
            paddingLeft: 4,
            maxWidth: 280,
            color: Colors.darkGray,
            marginBottom: 10
          }}>
          {msg}
        </Text>
      </View>
    </RNBounceable>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({});
