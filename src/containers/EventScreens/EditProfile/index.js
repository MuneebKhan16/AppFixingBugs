import React, { useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors, NavService } from '../../../config';
import {
  ProfileTextInput,
} from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import Images from '../../../assets/Images';


const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  return (
    <AppBackground title={'Edit Profile'} back home>
    <ScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, marginTop: 20 }}
      contentContainerStyle={{
        alignItems: 'center',
      }}>
      <View>
        <Image
          source={Images.avatar}
          style={{
            width: 130,
            height: 130,
            borderRadius: 80,
            borderColor: Colors.purple,
            borderWidth: 3,
            marginTop: 10,
          }}
        />

      </View>
      <View
        style={{
          marginHorizontal: 20,
          width: '90%',
        }}>
        <ProfileTextInput
          heading="Full Name"
          value={fullName}
          onChangeText={text => setFullName({ fullName: text })}
          label={'Full Name'}
          icon={Icons.user}
          placeholder={'Jhon Smith'}
        />
        <ProfileTextInput
          heading="Last Name"
          value={lastName}
          onChangeText={text => setLastName({ lastName: text })}
          label={'Last Name'}
          icon={Icons.user}
          placeholder={'Jhon Smith'}

        />
        <ProfileTextInput
          heading="Email Address"
          value={email}
          onChangeText={text => setEmail({ email: text })}
          label={'Email'}
          icon={Icons.email}
          placeholder={'jhonsmith@gmail.com'}

        />
        <ProfileTextInput
          heading="Address"
          value={address}
          onChangeText={text => setAddress({ address: text })}
          label={'Address'}
          icon={Icons.location}
          placeholder={'909 berkeley Ave, Trenton'}

        />
      </View>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 40,
        }}>
        <View style={{ marginBottom: 40 }}>
        </View>

        <CustomButton
          title={'Update'}
          onPress={() => NavService.goBack()}
        />
      </View>
    </ScrollView>
  </AppBackground>
  )
}



export default React.memo(EditProfile);

const styles = StyleSheet.create({})




