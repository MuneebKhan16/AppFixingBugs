import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
  Image
} from 'react-native';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import Mainprofile from '../../../components/Mainprofile';
import Heading from '../../../components/Heading';
import { styles } from './creator_styles';
import { themes } from '../../../config/globalFonts/globalFonts';
import { Colors } from '../../../config';
const handleInstagramPress = async () => {
  const instagramUsername = 'outsideee_tiana';
  const instagramURL = `https://www.instagram.com/${instagramUsername}`;

  try {
    await Linking.openURL(instagramURL);
  } catch (error) {
    console.log('Error opening Instagram:', error);
  }
};
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
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '90%',
              marginLeft: 20,
              marginTop: 20,
            }}
            onPress={handleInstagramPress}>
            <Image source={Icons.instagram} style={{
              width: 22,
              height: 22,
              resizeMode: 'contain',
              marginLeft: 5
            }} />
            <Text style={{
              marginLeft: 20,
              fontSize: themes?.fontSize?.medium,
              fontFamily: themes?.font?.black,
              color: Colors.black,
              textTransform: 'capitalize',
            }}>Instagram</Text>
          </TouchableOpacity>
          {/* <Heading name="Instagram" icon={Icons.instagram}  onpress={handleInstagramPress} /> */}
        </View>
        <Text style={styles.heading}>Description From The Author</Text>
        <Text style={styles.subheading}>
          Bringing you a Nightlife and Brunch-Ing Guide categorized by the VIBE.Picture and Videos so that you can get the inside before going outside.Saving you the Research & Time soo you can hurry and get Outside.
        </Text>
      </ScrollView>
    </AppBackground>
  )
}

export default React.memo(Aboutthecreator)

