import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icons from '../assets/Icons';
import { Colors } from '../config';
import Images from '../assets/Images';
import RNBounceable from "@freakycoder/react-native-bounceable";
import ImageURL from '../config/Common'

const MicroChat = props => {
  const { image, name, msg, onPress } = props;




  return (
    <RNBounceable
      onPress={onPress}
      style={styles.container}>
      <View
        style={styles.content}>
        <Image
          resizeMode="center"
          style={styles.img}
          source={{ uri : `${ImageURL.ImageURL}${image}` ??  image}}
        />
      </View>
      <View
        style={styles.msg}>
        <Text
          style={styles.txt}>
          {msg}
        </Text>
       

      </View>
    </RNBounceable>
  );
};

export default MicroChat;

const styles = StyleSheet.create({
  container: {
    width: 300,
    maxHeight: 200,
    flexDirection: 'row',
    marginBottom: 10,
    marginRight: 10
  },
  content: {
    flex: 2,
    paddingTop: 5,
  },
  img: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderRadius: 25,
  },
  msg: {
    padding: 1,
    backgroundColor: Colors.purple,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '80%',
  },
  txt: {
    // flex: 8,
    paddingLeft: 4,
    paddingTop: 2,
    maxWidth: 260,
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    margin:10
  }
});
