/* eslint-disable prettier/prettier */
import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors, NavService } from '../../../config';
import {
  ProfileTextInput,
} from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import Images from '../../../assets/Images';
import eventContext from '../eventContext';
import { updateProfile } from '../../../redux/APIs';

const EditProfile = () => {
  const { userProfile } = useContext(eventContext);
  const [fullName, setFullName] = useState(userProfile?.name ?? fullName);
  const [lastName, setLastName] = useState(userProfile?.last_name ?? lastName);
  const [email, setEmail] = useState(userProfile?.email);
  const [addresss, setAddress] = useState(userProfile?.address ?? addresss);



  const handleUpdate = () => {

    const name = fullName ? fullName : userProfile?.name
    const last_name = lastName ? lastName : userProfile?.last_name
    const email =  userProfile?.email
    const address = addresss ? addresss : userProfile?.address
    const profilePicture = userProfile?.profile_picture
    const auth_token = userProfile?.api_token

    console.log(
      name?.fullName, 
      last_name?.lastName, 
      email, 
      address?.address, 
      profilePicture, 
      auth_token,
      addresss
    )
 

    updateProfile(
      name?.fullName, 
      last_name?.lastName, 
      email, 
      address?.address, 
      profilePicture, 
      auth_token
      )

      
  }

  return (
    <AppBackground title={'Edit Profile'} back home>
      {
        userProfile ? 
        (
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
                value={fullName ? fullName : userProfile?.name}
                onChangeText={text => setFullName({ fullName: text })}
                label={'Full Name'}
                icon={Icons.user}
                placeholder={'Jhon Smith'}
              />
              <ProfileTextInput
                heading="Last Name"
                value={lastName ? lastName : userProfile?.last_name}
                onChangeText={text => setLastName({ lastName: text })}
                label={'Last Name'}
                icon={Icons.user}
                placeholder={'Jhon Smith'}

              />
              <ProfileTextInput
                heading="Email Address"
                value={email ? email : userProfile?.email}
                onChangeText={text => setEmail({ email: text })}
                label={'Email'}
                icon={Icons.email}
                placeholder={'jhonsmith@gmail.com'}

              />
              <ProfileTextInput
                heading="Address"
                value={addresss ? addresss : userProfile?.address}
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
                onPress={() => handleUpdate()}
              />
            </View>
          </ScrollView>
        ) : 
        (
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
              value={fullName ? fullName : userProfile?.name}
              onChangeText={text => setFullName({ fullName: text })}
              label={'Full Name'}
              icon={Icons.user}
              placeholder={'Jhon Smith'}
            />
            <ProfileTextInput
              heading="Last Name"
              value={lastName ? lastName : userProfile?.last_name}
              onChangeText={text => setLastName({ lastName: text })}
              label={'Last Name'}
              icon={Icons.user}
              placeholder={'Jhon Smith'}

            />
            <ProfileTextInput
              heading="Email Address"
              value={email ? email : userProfile?.email}
              onChangeText={text => setEmail({ email: text })}
              label={'Email'}
              icon={Icons.email}
              placeholder={'jhonsmith@gmail.com'}

            />
            <ProfileTextInput
              heading="Address"
              value={addresss ? addresss : userProfile?.address}
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
              onPress={() => handleUpdate()}
            />
          </View>
        </ScrollView>
        )

      }
    </AppBackground>
  )
}


export default React.memo(EditProfile);

const styles = StyleSheet.create({})