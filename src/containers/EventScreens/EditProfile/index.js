import React, { Component, createRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors, NavService } from '../../../config';
import {
  ProfileTextInput,
} from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import moment from 'moment';
import AppBackground from '../../../components/AppBackground';
import { connect } from 'react-redux';
import Images from '../../../assets/Images';
import ImagePicker from 'react-native-image-crop-picker';

class EditProfile extends Component {


  state = {
    name: this.props.user?.name,
    state: this.props.user?.state,
    city: this.props.user?.city,
    dob: this.props.user?.dob,
    userImage: this.props.user?.image,
    selectedImage: null,
    showDOB: false,
    fullname: '',
    lastname: '',
    email: '',
    Address: '',
    userImage: this.props.user?.image,
    selectedImage: null,
  };


  constructor(props) {
    super(props);
    this.actionSheetStateRef = createRef();
    this.actionSheetCityRef = createRef();
  }

  render() {
    const {
      email,
      Address,
      fullname,
      lastname,

    } = this.state;
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
              value={fullname}
              onChangeText={text => this.setState({ fullname: text })}
              label={'Full Name'}
              icon={Icons.user}
              placeholder={'Jhon Smith'}
            />
            <ProfileTextInput
              heading="Last Name"
              value={lastname}
              onChangeText={text => this.setState({ lastname: text })}
              label={'Last Name'}
              icon={Icons.user}
              placeholder={'Jhon Smith'}

            />
            <ProfileTextInput
              heading="Email Address"
              value={email}
              onChangeText={text => this.setState({ email: text })}
              label={'Email'}
              icon={Icons.email}
              placeholder={'jhonsmith@gmail.com'}

            />
            <ProfileTextInput
              heading="Address"
              value={Address}
              onChangeText={text => this.setState({ Address: text })}
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
    );
  }
}


const styles = StyleSheet.create({})

function mapState({ reducer: { user } }) {
  return {
    user,
  };
}

export default connect(mapState)(EditProfile);