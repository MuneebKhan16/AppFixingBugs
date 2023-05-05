/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState } from 'react';
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
  // const socket = useSelector(state => state.reducer.socket);
  const [conversationList, setConversationList] = useState([]);
  useFocusEffect(
    useCallback(() => {
      chatList(user?.id)
        .then(res =>  setConversationList(res?.conversations))
        .catch(error => console.log('error', error));
    }, []),
  );

  // const sender_id = user?.id;
  // // const receiver_id = chatUser?.id;
  // const response = () => {
  //   socket?.emit('GetConversations', {
  //     sender_id: sender_id,
  //   });
  //   socket?.on('ConversationList', data => {
  //   });
  // }

  // setConversationList(response);
  // console.log(conversationList);
  return (
    <AppBackground title={'Message'} back={false} profile={false} home>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Search />
          </View>
          <View style={{marginTop:60}}>
            {
              conversationList?.length > 0 ? 
              (
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
              ) 
              :
               (
                    <Text>No Chat Found</Text>
               )
            }
         
          </View>
        </View>
      </SafeAreaView>
    </AppBackground>
  );
};

export default React.memo(ChatList);
