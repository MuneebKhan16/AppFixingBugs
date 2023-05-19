import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {useSelector} from 'react-redux';
import Icons from '../assets/Icons';
import {Colors, Common} from '../config';
import Images from '../assets/Images';
import { themes } from '../config/globalFonts/globalFonts';

const ChatComponent = props => {
  const user = useSelector(state => state.reducer.user);
  const {item, index, navigation} = props;
  const configureData =
    user?.id == item?.user_receiver?.id
      ? item?.user_sender
      : item?.user_receiver;
  // console.log('item', item);


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
          source={{uri: configureData?.profile_picture ?  Common.ImageURL + configureData?.profile_picture : "https://picsum.photos/200/300" }}
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
marginVertical:5,
  },
  container: {
    flex: 2,
    height: 55,
    justifyContent: 'center',
    
  },
  img: {
    height: 45,
    width: 45,
    alignSelf: 'center',
    borderRadius: 60,
    borderColor:Colors.purple,
    borderWidth:2
  },
  txt: {
    flex: 2.5,
    // paddingBottom: 6,
    fontSize: themes?.fontSize?.medium,
    fontFamily:themes?.font?.bold,
    color: Colors.black,
    paddingLeft: 4,
    marginBottom: 2,
    marginTop:8
  },
  msg: {
    flex: 7.5,
    paddingLeft: 4,
    maxWidth: 280,
    color: Colors.darkGray,
    fontSize: themes?.fontSize?.extraSmall,
    fontFamily:themes?.font?.regular,
  },
  flex: {
    flex: 8,
  },
});
