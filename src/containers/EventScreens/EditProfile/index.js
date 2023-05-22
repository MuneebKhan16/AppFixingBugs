/* eslint-disable prettier/prettier */
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors, NavService} from '../../../config';
import CustomImagePicker from '../../../components/CustomImagePicker';
import {ProfileTextInput} from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import Images from '../../../assets/Images';
import eventContext from '../eventContext';
import {updateProfile} from '../../../redux/APIs';
import ImageURL from '../../../config/Common';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const EditProfile = () => {
  // const {userProfile} = useContext(eventContext);
  const userProfile = useSelector(state => state.reducer.user);
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addresss, setAddress] = useState('');
  const [selectedImage, setselectedImage] = useState(null);

  console.log('object', userProfile);

  const handleUpdate = () => {
    if (
      fullName == '' &&
      lastName == '' &&
      addresss == '' &&
      selectedImage == null
    ) {
      return Toast.show({
        text1: 'Error',
        text2: 'Please update atleast one field',
      });
    }
    updateProfile(
      fullName ? fullName : userProfile?.name,
      lastName ? lastName : userProfile?.last_name,
      userProfile?.email,
      addresss ? addresss : userProfile?.addresss,
      selectedImage,
      userProfile?.api_token,
    );
    // if (
    //   fullName != null &&
    //   lastName == userProfile?.last_name &&
    //   addresss == userProfile?.address
    // ) {
    //   const name = fullName;
    //   const last_name = userProfile?.last_name;
    //   const address = userProfile?.address;
    //   const profile_picture = userProfile
    //     ? userProfile?.profile_picture
    //     : selectedImage;
    //   const auth_token = userProfile?.api_token;

    //   updateProfile(
    //     name?.fullName,
    //     last_name,
    //     userProfile?.email,
    //     address,
    //     profile_picture,
    //     auth_token,
    //   );
    // }

    // if (
    //   lastName != null &&
    //   fullName == userProfile?.name &&
    //   addresss == userProfile?.address
    // ) {
    //   const name = userProfile?.name;
    //   const last_name = lastName;
    //   const address = userProfile?.address;
    //   const profile_picture = userProfile?.profile_picture;
    //   const auth_token = userProfile?.api_token;

    //   updateProfile(
    //     name,
    //     last_name?.lastName,
    //     userProfile?.email,
    //     address,
    //     profile_picture,
    //     auth_token,
    //   );
    // }

    // if (
    //   addresss != null &&
    //   fullName == userProfile?.name &&
    //   lastName == userProfile?.last_name
    // ) {
    //   const name = userProfile?.name;
    //   const last_name = userProfile?.last_name;
    //   const address = addresss;
    //   const profile_picture = userProfile?.profile_picture;
    //   const auth_token = userProfile?.api_token;

    //   updateProfile(
    //     name,
    //     last_name,
    //     userProfile?.email,
    //     address?.address,
    //     profile_picture,
    //     auth_token,
    //   );
    // }

    // if (
    //   fullName != null &&
    //   lastName != null &&
    //   addresss != null &&
    //   selectedImage != null
    // ) {
    //   const name = fullName;
    //   const last_name = lastName;
    //   const address = addresss;
    //   const profile_picture = {
    //     uri: selectedImage.path,
    //     name: `rating`,
    //     type: selectedImage?.mime,
    //   };
    //   const auth_token = userProfile?.api_token;
    //   console.log(
    //     '890',
    //     name?.fullName,
    //     last_name?.lastName,
    //     email,
    //     address?.address,
    //     JSON.stringify(profile_picture),
    //     auth_token,
    //   );
    //   updateProfile(
    //     name?.fullName,
    //     last_name?.lastName,
    //     userProfile?.email,
    //     address?.address,
    //     profile_picture,
    //     auth_token,
    //   );
    // }
  };

  return (
    <AppBackground title={'Edit Profile'} back home>
      {userProfile ? (
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{flex: 1, marginTop: 20}}
          contentContainerStyle={{
            alignItems: 'center',
          }}>
          <View>
            <CustomImagePicker
              onImageChange={(path, mime) => {
                if (Array.isArray(path)) {
                  setselectedImage({path: path[0]?.path, mime: path[0]?.mime});
                } else {
                  setselectedImage({path, mime});
                }
              }}>
              <View style={styles.item}>
                {selectedImage != null ? (
                  <Image
                    source={{uri: selectedImage?.path}}
                    style={{
                      width: 130,
                      height: 130,
                      borderRadius: 80,
                      borderColor: Colors.purple,
                      borderWidth: 3,
                      marginTop: 10,
                    }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: userProfile.profile_picture
                        ? `${ImageURL.ImageURL}${userProfile?.profile_picture}`
                        : 'https://picsum.photos/200/300',
                    }}
                    style={{
                      width: 130,
                      height: 130,
                      borderRadius: 80,
                      borderColor: Colors.purple,
                      borderWidth: 3,
                      marginTop: 10,
                    }}
                  />
                )}
                {/* <Text style={styles.upload}>Upload</Text> */}
              </View>
            </CustomImagePicker>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              width: '90%',
            }}>
            <ProfileTextInput
              heading={'Full Name'}
              value={fullName}
              onChangeText={text => setFullName(text)}
              label={'Full Name'}
              icon={Icons.user}
              placeholder={userProfile?.name ? userProfile?.name : 'Full Name'}
            />
            <ProfileTextInput
              heading={'Last Name'}
              value={lastName}
              onChangeText={text => setLastName(text)}
              label={'Last Name'}
              icon={Icons.user}
              placeholder={
                userProfile?.last_name ? userProfile?.last_name : 'Last Name'
              }
            />
            {/* <ProfileTextInput
              heading="Email Address"
              value={email ? email : userProfile?.email}
              onChangeText={text => setEmail({email: text})}
              label={'Email'}
              icon={Icons.email}
              placeholder={'jhonsmith@gmail.com'}
            /> */}
            <ProfileTextInput
              heading={'Address'}
              value={addresss}
              onChangeText={text => setAddress(text)}
              label={'Address'}
              icon={Icons.location}
              placeholder={
                userProfile?.address ? userProfile?.address : 'Address'
              }
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 40,
            }}>
            <View style={{marginBottom: 40}}></View>

            <CustomButton title={'Update'} onPress={() => handleUpdate()} />
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{flex: 1, marginTop: 20}}
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
              onChangeText={text => setFullName({fullName: text})}
              label={'Full Name'}
              icon={Icons.user}
              placeholder={'Jhon Smith'}
            />
            <ProfileTextInput
              heading="Last Name"
              value={lastName ? lastName : userProfile?.last_name}
              onChangeText={text => setLastName({lastName: text})}
              label={'Last Name'}
              icon={Icons.user}
              placeholder={'Jhon Smith'}
            />
            <ProfileTextInput
              heading="Email Address"
              value={email ? email : userProfile?.email}
              onChangeText={text => setEmail({email: text})}
              label={'Email'}
              icon={Icons.email}
              placeholder={'jhonsmith@gmail.com'}
            />
            <ProfileTextInput
              heading="Address"
              value={addresss ? addresss : userProfile?.address}
              onChangeText={text => setAddress({address: text})}
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
            <View style={{marginBottom: 40}}></View>

            <CustomButton title={'Update'} onPress={() => handleUpdate()} />
          </View>
        </ScrollView>
      )}
    </AppBackground>
  );
};

export default React.memo(EditProfile);

const styles = StyleSheet.create({
  edit: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
});
