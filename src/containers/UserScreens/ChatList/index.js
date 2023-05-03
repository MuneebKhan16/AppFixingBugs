/* eslint-disable prettier/prettier */
import React, {useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {Colors, NavService} from '../../../config';
import AppBackground from '../../../components/AppBackground';
import Search from '../../../components/Search';
import Images from '../../../assets/Images';
import ChatComponent from '../../../components/ChatComponent';
import Icons from '../../../assets/Icons';
import {Chats} from './Dummydata';
import {chatList} from '../../../redux/APIs/index';
import {styles} from './chatlist_style';

const ChatList = ({navigation, route}) => {
  const user = useSelector(state => state.reducer.user);
  const [conversationList, setConversationList] = useState([]);
  useFocusEffect(
    useCallback(() => {
      chatList(user?.id)
        .then(res =>  setConversationList(res?.conversations))
        .catch(error => console.log('error', error));
    }, []),
  );

  console.log('conversationList',conversationList)

  return (
    <AppBackground title={'Message'} back={false} profile={false} home>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Search />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={conversationList}
            style={styles.list}
            renderItem={({item, index}) => (
              <ChatComponent
                item={item}
                index={index}
                navigation={navigation}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </AppBackground>
  );
};

export default React.memo(ChatList);
