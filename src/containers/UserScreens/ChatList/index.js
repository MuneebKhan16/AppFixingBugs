import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import { Colors, NavService } from '../../../config';
import AppBackground from '../../../components/AppBackground';
import Search from '../../../components/Search';
import Images from '../../../assets/Images';
import ChatComponent from '../../../components/ChatComponent';
import Icons from '../../../assets/Icons';
import { Chats } from './Dummydata';
import { styles } from './chatlist_style';
const index = ({ navigation, route }) => {
  const chatlist = () => {
    navigation.navigate('ChatScreen');
  }
  return (
    <AppBackground title={'Message'} back={false} profile={false} home>
      <SafeAreaView style={styles.flex}>
        <View
          style={styles.container}>
          <View
            style={styles.content}>
            <Search />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Chats}
            style={styles.list}
            renderItem={({ item }) => (
              <ChatComponent
                onPress={
                  chatlist
              }
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

export default React.memo(index);

