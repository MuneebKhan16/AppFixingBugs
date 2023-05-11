import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';
import {Colors} from '../config';
import Icons from '../assets/Icons';
import RNBounceable from '@freakycoder/react-native-bounceable';

const CustomSender = ({messageInput, changeMessage, sendMessage}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type Message here"
        placeholderTextColor={Colors.grey}
        style={styles.content}
        value={messageInput}
        onChangeText={text => changeMessage(text)}
      />
      <RNBounceable style={styles.send} onPress={() => sendMessage()}>
        <Image source={Icons.send} style={styles.imgsend} />
      </RNBounceable>
    </View>
  );
};

export default CustomSender;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width + 15,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: Colors.purple,
    shadowOpacity: 2,
    alignItems: 'center',
    height: 60,
  },
  content: {
    flex: 8,
    paddingLeft: '6%',
    maxWidth: 360,
    color: Colors.white,
  },
  attach: {
    flex: 2,
    flexDirection: 'row',
    right: 10,
  },
  imgattach: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
  send: {
    flex: 2,
    flexDirection: 'row',
    right: 5,
  },
  imgsend: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginHorizontal: 20,
  },
});
