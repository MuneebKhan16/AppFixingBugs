import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import Mainprofile from '../../../components/Mainprofile';
import Heading from '../../../components/Heading';
import { styles } from './creator_styles';
const Aboutthecreator = () => {
  return (
    <AppBackground
      title={'Settings'}
      profile={false}
      notification={false}
      back
      home>
      <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
        <Mainprofile
          txt
          center
          top
          subtitle="johnsmith@gmail.com"
        />
        <View style={styles.top}>
          <Heading name="Facebook.com" icon={Icons.fbk} />
          <Heading name="Twitter.com" icon={Icons.twitter} />
          <Heading name="Instagram" icon={Icons.instagram} />
        </View>
        <Text style={styles.heading}>Description From The Author</Text>
        <Text style={styles.subheading}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
        </Text>
      </ScrollView>
    </AppBackground>
  )
}

export default React.memo(Aboutthecreator)

