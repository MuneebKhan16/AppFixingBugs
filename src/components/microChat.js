import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icons from '../assets/Icons';
import {Colors} from '../config';
import Images from '../assets/Images';
import RNBounceable from "@freakycoder/react-native-bounceable";

const MicroChat = props => {
  const {image, name, msg, onPress} = props;

  return (
    <RNBounceable
      onPress={onPress}
      style={{
        width: 300,
        maxHeight: 200,
        flexDirection: 'row',
        marginBottom: 10,
        marginRight:10

      }}>
      <View
        style={{
          flex: 2,
          paddingTop: 5,
        }}>
        <Image
          resizeMode="center"
          style={{
            height: 50,
            width: 50,
            alignSelf: 'center',
            backgroundColor: 'blue',
            borderRadius: 25,
          }}
          source={image}
        />
      </View>
      <View
        style={{
          
          padding: 1,
          backgroundColor:Colors.purple,
          borderTopLeftRadius:10,
          borderTopRightRadius:10,
          width:'80%',

        }}>
        <Text
          style={{
            // flex: 8,
            paddingLeft: 4,
            paddingTop: 2,
            maxWidth: 260,
            color: Colors.white,
            fontSize: 14,
            fontWeight: '600',
          }}>
          {msg}
        </Text>
       
      </View>
    </RNBounceable>
  );
};

export default MicroChat;

const styles = StyleSheet.create({});
