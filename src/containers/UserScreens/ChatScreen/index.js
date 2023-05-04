/* eslint-disable prettier/prettier */
import {
  LayoutAnimation,
  SafeAreaView,
  UIManager,
  FlatList,
  Platform,
  View,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import AppBackground from '../../../components/AppBackground';
import ChatComponent from '../../../components/ChatComponent';
import MicroChat from '../../../components/microChat';
import Images from '../../../assets/Images';
import CustomChatBox from '../../../components/CustomChatBox';
import CustomSender from '../../../components/CustomSender';
import { styles } from './chatscreen_style';
import {
  loaderStart,
  loaderStop,
  createChatConnection,
} from '../../../redux/APIs';
import dummy from '../../../config/Common'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ChatScreen = ({ route }) => {
  const { chatUser, conversation_id } = route.params;
  const user = useSelector(state => state.reducer.user);
  const socket = useSelector(state => state.reducer.socket);
  const [chatList, setChatList] = useState(null);
  const [message, setMessage] = useState('');
  // const [Data, Setdata] = useState(null);s
  const [ resp ,Setresp ] = useState('')
  const sender_id = user?.id;
  const receiver_id = chatUser?.id;
  
  
  const response = () => {
    const payload = {
      sender_id:sender_id,
      conv_id:`${sender_id}_${receiver_id}`
    }
    socket?.emit('SendChatToClient',payload);
    socket?.on('ChatList' , data => {
      setChatList(data);
      console.log('jjjjjj',data);
      // setcombine(...Data)
    });

    socket?.on(`'${sender_id}'`, data => {
      console.log('socket response', data);
      loaderStop();
      const newMessage = { message: message };
      setChatList(prevChatList => [...prevChatList, newMessage]);
      return;
    });

    socket.on('error', data => {
      console.log('data', data);
      loaderStop();
    });
  };

  useEffect(() => {
    response();
  }, []);


  const sendNewMessage = () => {
    console.log('message', message);
    console.log('sender_id', sender_id);
    console.log('reciever_id', receiver_id);
    console.log('msg_type');

    if (message.length > 0) {
      loaderStart();
      const payload = {
        sender_id: sender_id,
        receiver_id: receiver_id,
        conv_id: route.params.conversation_id,
        msg: message,
        msg_type: 'text',
      };
      socket.emit('sendChatToServer', payload);
      const nnn = {sender_id:sender_id,message: message}
      setChatList(prevChatList => [...prevChatList, nnn]);
      // console.log(chatList);
      // response();
      setMessage('');
      LayoutAnimation.linear();
      loaderStop();

    } else {
      Toast.show({
        text1: 'Enter_message',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };

console.log('conbine',chatList)

  return (
    <AppBackground title={'Chats'} back profile={false} home>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={chatList}
            style={styles.msg}
            renderItem={({ item }) => (
              <>
              {
                item.sender_id == sender_id ?
                (
                  <MicroChat msg={item.message} image={item.profile_picture || `${dummy.dummy}`}  />
                )
                :item.sender_id == receiver_id ?
                (
                  <CustomChatBox
                   msg={item.message}
                   image={item.profile_picture || `${dummy.dummy}`}
            
                 /> 

                )
                :
                null
              }
              </>
            )}
          />
          <View>
            <CustomSender
              messageInput={message}
              changeMessage={setMessage}
              sendMessage={sendNewMessage}
            />
          </View>
        </View>
      </SafeAreaView>
    </AppBackground>
  );
};

export default React.memo(ChatScreen);
