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
import { styles } from './chatscreen_style';
import { Message } from './Dummydata';
const index = () => {
  return (
    <AppBackground title={"Chats"} back profile={false} home>
      <SafeAreaView
        style={styles.flex}
      >
        <View
          style={styles.container}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={Message}
            style={styles.msg}
            renderItem={({ item }) => (
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

export default React.memo(index);

