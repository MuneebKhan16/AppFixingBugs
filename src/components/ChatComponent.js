import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useSelector} from 'react-redux';
import Icons from '../assets/Icons';
import {Colors, Common} from '../config';
import Images from '../assets/Images';

const ChatComponent = props => {
  const user = useSelector(state => state.reducer.user);
  const {item, index, navigation} = props;
  const configureData =
    user?.id == item?.user_receiver?.id
      ? item?.user_sender
      : item?.user_receiver;
  console.log('item', item);


  return (
    <RNBounceable
      onPress={() =>
        navigation.navigate('ChatScreen', {
          chatUser: configureData,
          conversation_id: item?.conversation_id,
        })
      }
      style={styles.maincontainer}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{uri: Common.ImageURL + configureData?.profile_picture}}
        />
      </View>
      <View style={styles.flex}>
        <Text style={styles.txt}>{configureData?.name}</Text>
        <Text numberOfLines={2} style={styles.msg}>
          {item?.message}
        </Text>
      </View>
    </RNBounceable>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  maincontainer: {
    width: '100%',
    padding: 3,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    marginVertical: 10,
  },
  container: {
    flex: 2,
    height: 55,
    justifyContent: 'center',
  },
  img: {
    height: 55,
    width: 45,
    alignSelf: 'center',
    borderRadius: 60,
  },
  txt: {
    flex: 2.5,
    // paddingBottom: 6,
    fontSize: 16,
    fontWeight: '800',
    color: Colors.black,
    paddingLeft: 4,
    marginBottom: 2,
  },
  msg: {
    flex: 7.5,
    paddingLeft: 4,
    maxWidth: 280,
    color: Colors.darkGray,
    marginBottom: 10,
  },
  flex: {
    flex: 8,
  },
});
