import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, NavService} from '../../../config';
import AppBackground from '../../../components/AppBackground';
import Search from '../../../components/Search';
import Images from '../../../assets/Images';
import ChatComponent from '../../../components/ChatComponent';
import Icons from '../../../assets/Icons';
// import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const index = ({navigation, route}) => {
  const Chats = [
    {
      image: Images.avatar,
      name: 'Jhon Kelvin',
      msg: 'How are you?',
    },
    {
      image: Images.avatar,
      name: 'Jhon Kelvin',
      msg: 'How are you?',
    },
    {
      image: Images.avatar,
      name: 'Jhon Kelvin',
      msg: 'How are you?',
    },
    {
      image: Images.avatar,
      name: 'Jhon Kelvin',
      msg: 'How are you?',
    },
    {
      image: Images.avatar,
      name: 'Jhon Kelvin',
      msg: 'How are you?',
    },
    {
      image: Images.avatar,
      name: 'Jhon Kelvin',
      msg: 'How are you?',
    },
   
   
  ];

  return (
    <AppBackground title={'Message'} back={false} profile={false} home>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            // backgroundColor: Colors.backgroundColor,
            // back
          }}>
          <View
            style={{
              marginTop:25,
              width: '110%',
            }}>
            <Search />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Chats}
            style={{
              width: Dimensions.get('window').width * 1,
              paddingTop: 5,
              marginLeft:30
            }}
            renderItem={({item}) => (
              <ChatComponent
                onPress={() => {
                  navigation.navigate('ChatScreen');
                }}
                image={item.image}
                msg={item.msg}
                name={item.name}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </AppBackground>
  );
};

export default index;

const styles = StyleSheet.create({});
