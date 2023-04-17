import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import AppBackground from '../../../components/AppBackground';
import Mainprofile from '../../../components/Mainprofile';
import {ProfileData} from '../../../config/Dummydata/Dummydata';
import {Colors} from '../../../config';
import { useSelector } from 'react-redux';

const EventProfile = () => {
  const userData = useSelector((state)=> state?.reducer?.user)
console.log('userData',userData?.name)
  return (
    <AppBackground gear title={'User Profile'} home back>
      <Mainprofile
        txt
        center
        name={userData?.name}
        subtitle={userData?.email}
        edit
      />
      <View style={{marginTop: 20}}>
        {/* <FlatList
          data={ProfileData}
          renderItem={({item, index}) => ( */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop:10
          }}>
          <View>
            <Text
              style={{
                color: Colors.black,
                fontWeight: '600',
                fontSize: 20,
              }}>
              Joining Date
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontWeight: '600',
                fontSize: 20,
              }}>
              No. of Events
            </Text>
            <Text
              style={{
                color: Colors.black,
                fontWeight: '600',
                fontSize: 20,
              }}>
              No. of Attendees
            </Text>
          </View>
          <View>
            <Text style={{fontSize:20,}}>18-12-2020</Text>
            <View style={{ alignSelf: 'center'}}>
              <Text style={{fontSize:20,fontWeight:'400',}}>25</Text>
              <Text style={{fontSize:20,fontWeight:'400',}}>25</Text>
            </View>
          </View>
        </View>
        {/* )} */}
        {/* /> */}
      </View>
    </AppBackground>
  );
};

export default EventProfile;

const styles = StyleSheet.create({});
