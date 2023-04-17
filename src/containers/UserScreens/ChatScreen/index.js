import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AppBackground from '../../../components/AppBackground';
import ChatComponent from '../../../components/ChatComponent';
import MicroChat from '../../../components/microChat';
import Images from '../../../assets/Images';
import CustomChatBox from '../../../components/CustomChatBox';
import CustomSender from '../../../components/CustomSender';

const Message = [
  {
    image: Images.avatar,
    msg: 'loreum spam is working on different devices on daily basese',
    date: '02:48 PM',
  },
  {
    image: Images.avatar,
    msg: 'loreum spam is working on different devices on daily basese',
    date: '02:48 PM',
  },
];

const index = () => {
  return (
    <AppBackground title={"Chats"} back profile={false} home>
      <SafeAreaView
        style={{
          flex: 1,
         
        }}
        >
        <View
          style={{
            flex: 1,
            marginTop: 30,
            alignItems: 'center',
           
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Message}
            style={{
              width: Dimensions.get('window').width - 20 ,
              // backgroundColor:"blue",
              // flex:1
            }}
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
            <CustomSender />
          </View>
        </View>
      </SafeAreaView>
    </AppBackground>
  );
};

export default index;

const styles = StyleSheet.create({});
