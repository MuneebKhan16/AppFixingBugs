import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import Icons from '../assets/Icons';
import { Colors } from '../config';
import Images from '../assets/Images';
import RNBounceable from "@freakycoder/react-native-bounceable";
import { yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import ImageURL from '../config/Common'
const MicroChat = props => {
  const { image, name, msg, onPress ,date } = props;

  const db = `${ImageURL.ImageURL}${image}`
  const bd = image
  

  return (
    <View style={styles.self} >
      <RNBounceable
        onPress={onPress}
        style={styles.maincontainer}>
        <View
          style={styles.flex}>
          <View
            style={styles.container}>
            <Text
              style={styles.msg}>
              {msg}
            </Text>
           
          </View>

        </View>
        <View
          style={styles.flexable}>
          <Image
            resizeMode="cover"
            style={styles.img}
            source={{ uri : db ? db : bd}}
          />
        </View>
      </RNBounceable>
    </View>
  );
};

export default MicroChat;

const styles = StyleSheet.create({
  maincontainer: {
    width: 360,
    maxHeight: 200,
    padding: 3,
    flexDirection: 'row',
    marginBottom: '4%',
    paddingLeft: 20
  },
  flex: {
    flex: 8,
    padding: 1,
  },
  container: {
    width: '100%',
    backgroundColor: Colors.darkGray,
    padding: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: 10,
  },
  msg: {
    // flex: 8,
    paddingLeft: 6,
    maxWidth: 260,
    color: Colors.grey,
    fontSize: 14,
    fontWeight: '600',
  },
  flexable: {
    flex: 2,
  },
  img: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 10,
   backgroundColor:'grey'
  },
  self: {
    alignSelf: "flex-end"
  }
});
