import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import AppBackground from '../../../components/AppBackground';
import Mainprofile from '../../../components/Mainprofile';
import { ProfileData } from '../../../config/Dummydata/Dummydata';
import { Colors } from '../../../config';
import { useSelector } from 'react-redux';
import { styles } from './eventprofile_style';
const EventProfile = () => {
  const userData = useSelector((state) => state?.reducer?.user)
  console.log('userData', userData?.name)
  return (
    <AppBackground gear title={'User Profile'} home back>
      <Mainprofile
        txt
        center
        name={userData?.name}
        subtitle={userData?.email}
        edit
      />
      <View style={styles.content}>
        <View
          style={styles.container}>
          <View>
            <Text
              style={styles.hd1}>
              Joining Date
            </Text>
            <Text
              style={styles.hd2}>
              No. of Events
            </Text>
            <Text
              style={styles.hd3}>
              No. of Attendees
            </Text>
          </View>
          <View>
            <Text style={styles.txt}>18-12-2020</Text>
            <View style={styles.hdcontent}>
              <Text style={styles.txt}>25</Text>
              <Text style={styles.txt}>25</Text>
            </View>
          </View>
        </View>
      </View>
    </AppBackground>
  );
};

export default EventProfile;

