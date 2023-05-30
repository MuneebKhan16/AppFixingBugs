/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prettier/prettier */
import {SafeAreaView, UIManager, FlatList, Platform, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import AppBackground from '../../../components/AppBackground';
import MicroChat from '../../../components/microChat';
import CustomChatBox from '../../../components/CustomChatBox';
import CustomSender from '../../../components/CustomSender';
import {styles} from './chatscreen_style';
import {loaderStart, loaderStop} from '../../../redux/APIs';
import dummy from '../../../config/Common';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ChatScreen = props => {
  const {route} = props;
  const {chatUser, conversation_id} = route?.params;
  const user = useSelector(state => state?.reducer?.user);
  const picture = user.profile_picture;
  //console.log('picture',picture)
  const socket = useSelector(state => state?.reducer?.socket);
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState('');
  const sender_id = user?.id;
  const receiver_id = chatUser?.id;

  const conversation_id2 = user?.id + '_' + props?.route?.params?.id;

  const response = () => {
    const payload = {
      sender_id: sender_id,
      conv_id: conversation_id ? conversation_id : conversation_id2,
    };
    // console.log('payload ' + JSON.stringify(payload));
    socket?.emit('SendChatToClient', payload);
    socket?.on('ChatList', data => {
      if (data?.object_type == 'get_messages') {
        //  console.log('senderpayload ', data?.user_sender);
        console.log('senderpayload ', data);
        const messages = data?.data || [];
        // console.log('messages123@',data)
        setChatList(messages);
      } else if (data?.object_type == 'get_message') {
        setChatList(chatList1 => [...[data?.data], ...chatList1]);
      }
    });

    socket.on('error', data => {
      loaderStop();
    });
  };
  const sendNewMessage = () => {
    if (message.length > 0) {
      loaderStart();
      let payload;
      if (conversation_id != null) {
        payload = {
          sender_id: sender_id,
          receiver_id: receiver_id,
          conv_id: conversation_id,
          msg: message,
          msg_type: 'text',
        };
      } else {
        payload = {
          sender_id: user?.id,
          receiver_id: props?.route?.params?.id,
          conv_id: conversation_id2,
          msg: message,
          msg_type: 'text',
        };
      }
      socket.emit('sendChatToServer', payload);
      setMessage('');
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
    if (socket && typeof socket == 'object') {
      response();
    } else {
      Toast.show({
        text1: "Couldn't connect to server",
        type: 'error',
        visibilityTime: 3000,
      });
    }
  }, []);

  //console.log('chatListchatList',chatList)

  return (
    <AppBackground title={'Chats'} back profile={false} home>
      <SafeAreaView style={styles.flex}>
        <View style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={chatList}
            inverted
            style={styles.msg}
            renderItem={({item}) => (
              <>
                {console.log('checklist&&', item)}
                {item?.user_sender?.id == sender_id ? (
                  <CustomChatBox
                    msg={item?.message ? item?.message : item?.msg}
                    image={
                      item?.user_sender?.profile_picture || `${dummy?.dummy}`
                    }
                  />
                ) : item?.user_receiver?.id == receiver_id ? (
                  <MicroChat
                    msg={item?.message ? item?.message : item?.msg}
                    image={
                      item?.user_receiver?.profile_picture || `${dummy?.dummy}`
                    }
                  />
                ) : null}
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
