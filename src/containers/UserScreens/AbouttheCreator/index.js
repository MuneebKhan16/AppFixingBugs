import React, { Component } from 'react';
import {
  Text,
  View,
  Switch,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import CustomButton from '../../../components/CustomButton';
import { Colors, NavService } from '../../../config';
import Mainprofile from '../../../components/Mainprofile';
import Heading from '../../../components/Heading';

const Aboutthecreator = () => {
  return (
    <AppBackground
      title={'Settings'}
      profile={false}
      notification={false}
      back
      home>
      <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
        <Mainprofile
          txt
          center
          top
          subtitle="johnsmith@gmail.com"
        />
        <View style={{ marginTop: 30 }}>
          <Heading name="Facebook.com" icon={Icons.fbk} />
          <Heading name="Twitter.com" icon={Icons.twitter} />
          <Heading name="Instagram" icon={Icons.instagram} />
        </View>
        <Text style={{
          marginLeft: 14,
          marginTop: 20,
          color: Colors.purple,
          fontWeight: 'bold',
          fontSize: 20,
          fontStyle: 'italic'
        }}>Description From The Author</Text>
        <Text style={{
          textDecorationLine:'underline',
          fontWeight:'500',
          marginTop:10,
          fontSize:18,
          color:'#5A5A5A',
          marginLeft:10,
          marginRight:2
        }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        </Text>
      </ScrollView>
    </AppBackground>
  )
}

export default Aboutthecreator

const styles = StyleSheet.create({})