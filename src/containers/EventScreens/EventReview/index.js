import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import AppBackground from '../../../components/AppBackground';
import Images from '../../../assets/Images';
import Posts from '../../../components/Posts';
import { Colors } from '../../../config';
import Icons from '../../../assets/Icons';
import { styles } from './eventreview_style';
const EventReview = () => {
  return (
    <AppBackground back home>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Image
          source={Images.background3}
          style={styles.imgbg}
        />
        <View style={styles.titlehdr}>
          <Text style={styles.title}>
            Event Name .
          </Text>
          <Text style={styles.date}>25-12-2002</Text>
        </View>
        <Text style={styles.subtitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </Text>
        <View style={styles.markericn}>
          <View style={styles.markericnhdr}>
            <Image
              source={Icons.marker}
              style={styles.marker}
            />
          </View>
          <Text style={styles.subcontent}>
            909 berkeley Ave, Trenton
          </Text>
        </View>
        <Text
          style={styles.heading}>
          Ratings & Posts
        </Text>
        <Posts />
        <Posts />
      </ScrollView>
    </AppBackground>
  );
};

export default React.memo(EventReview);

