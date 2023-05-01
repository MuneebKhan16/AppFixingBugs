/* eslint-disable prettier/prettier */
import {
  LayoutAnimation,
  SafeAreaView,
  UIManager,
  FlatList,
  Platform,
  View,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import AppBackground from '../../../components/AppBackground';
import ChatComponent from '../../../components/ChatComponent';
import MicroChat from '../../../components/microChat';
import Images from '../../../assets/Images';
import CustomChatBox from '../../../components/CustomChatBox';
import CustomSender from '../../../components/CustomSender';
import {styles} from './chatscreen_style';
import {
  loaderStart,
  loaderStop,
  createChatConnection,
} from '../../../redux/APIs';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ChatScreen = ({navigation, route}) => {
  const {chatUser, conversation_id} = route.params;
  const user = useSelector(state => state.reducer.user);
  const socket = useSelector(state => state.reducer.socket);
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState('');
  const sender_id = user?.id;
  const reciever_id = chatUser?.id;
  const response = () => {
    socket?.emit('SendChatToClient', {
      sender_id: reciever_id,
      receiver_id: sender_id,
    });
    socket?.on('SendChatToClient', data => {
      console.log('data', data);
      if (data?.message?.length == 0) {
        loaderStop();
        return;
      }
      if (data?.object_type == 'get_messages') {
        const messages = data?.data || [];
        messages.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setChatList(() => messages);
      } else setChatList(chatList => [...data?.data, ...chatList]);
      loaderStop();
      LayoutAnimation.linear();
    });
    socket.on('error', data => {
      console.log('data', data);
      loaderStop();
    });
  };
  const sendNewMessage = () => {
    console.log('message', message);
    console.log('sender_id', sender_id);
    console.log('reciever_id', reciever_id);
    console.log('msg_type');

    if (message.length > 0) {
      loaderStart();
      const payload = {
        sender_id: sender_id,
        receiver_id: reciever_id,
        msg: message,
        msg_type: 'text',
      };
      socket.emit('sendChatToServer', payload);
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
  useEffect(() => {
    createChatConnection(`${sender_id}_${reciever_id}`)
      .then(res => {
        console.log('res', res);
        response();
      })
      .catch(error => console.log('error', error));
  }, []);
  console.log('sender_id', sender_id, 'reciever_id', reciever_id);
  console.log('chatUser?.user_receiver?.id', chatUser);
  console.log('chatList456', chatList);
  console.log('socket', socket);
  return (
    <AppBackground title={'Chats'} back profile={false} home>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={chatList}
            style={styles.msg}
            renderItem={({item}) => (
              <>
                <MicroChat msg={item.msg} image={item.image} date={item.date} />
                <CustomChatBox
                  msg={item.msg}
                  image={item.image}
                  date={item.date}
                />
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
