import React, { Component, createRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Colors, NavService } from '../../../config';
import {
  CustomTextInput,
  ProfileTextInput,
} from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import ActionSheet from 'react-native-actions-sheet';
import CustomSelector from '../../../components/TextWithActionSheet';
import CustomImagePicker from '../../../components/CustomImagePicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import AppBackground from '../../../components/AppBackground';
import ProfileImage from '../../../components/ProfileImage';
import { connect } from 'react-redux';
import Images from '../../../assets/Images';
// const states = [
//   {
//     state_name: 'California',
//   },
//   {
//     state_name: 'Hawaii',
//   },
//   {
//     state_name: 'California',
//   },
//   {
//     state_name: 'Hawaii',
//   },
//   {
//     state_name: 'California',
//   },
//   {
//     state_name: 'Hawaii',
//   },
// ];

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
         
          <Image
            source={Images.avatar}
            style={{
              width:130,
              height:130,
              borderRadius: 80,
              borderColor: Colors.purple,
              borderWidth: 3,
              marginTop: 10,
              backgroundColor:'red'
            }}
          />
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
          {/* <ActionSheet
            ref={this.actionSheetStateRef}
            containerStyle={{backgroundColor: 'transparent'}}>
            <View style={{padding: 10, paddingBottom: 20}}>
              <ActionSheetCommponent
                title="Select a State"
                dataset={states}
                onPress={async item => {
                  this.actionSheetStateRef.current.hide();
                  this.setState({state: item.state_name, city: ''});
                  // await getCities(item.state_id);
                }}
              />
              <TouchableOpacity
                onPress={() => actionSheetStateRef.current.hide()}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  paddingVertical: 12,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'rgb(0,88,200)',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet> */}
          {/* <ActionSheet
            ref={this.actionSheetCityRef}
            containerStyle={{backgroundColor: 'transparent'}}>
            <View style={{padding: 10, paddingBottom: 20}}>
              <ActionSheetCommponent
                title="Select a City"
                dataset={states}
                onPress={async item => {
                  this.actionSheetCityRef.current.hide();
                  this.setState({city: item.state_name});
                  // await getCities(item.state_id);
                }}
              />
              <TouchableOpacity
                onPress={() => actionSheetCityRef.current.hide()}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  paddingVertical: 12,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'rgb(0,88,200)',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </ActionSheet> */}
          {/* <DateTimePickerModal
            maximumDate={new Date()}
            themeVariant="light"
            isDarkModeEnabled={false}
            isVisible={showDOB}
            mode="date"
            onConfirm={date => {
              console.log('date', date);
              this.setState({
                showDOB: false,
                dob: moment(date).format('YYYY-MM-DD'),
              });
            }}
            onCancel={() => this.setState({showDOB: false})}
          /> */}
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 40,
            }}>
            <View style={{ marginBottom: 40 }}>
              {/* <ProfileImage
                name={name}
                imageUri={selectedImage ? selectedImage.path : userImage}
              /> */}
              {/* <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 35 / 2,
                  backgroundColor: Colors.primary,
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CustomImagePicker
                  onImageChange={(path, mime) => {
                    console.log('path', path);
                    this.setState({selectedImage: {path, mime}});
                  }}>
                  <Image
                    source={Icons.upload}
                    style={{width: 20, height: 20, resizeMode: 'contain'}}
                  />
                </CustomImagePicker>
              </View> */}
            </View>
            {/* <ProfileTextInput
              icon={Icons.user}
              placeholder={'Name'}
              onChangeText={value => this.setState({name: value})}
              value={name}
            /> */}
            {/* <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.actionSheetStateRef.current.show()}
              style={{width: '100%'}}>
              <CustomSelector
                rightIcon={true}
                placeholder={'State'}
                icon={Icons.location}
                value={state}
              />
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.actionSheetCityRef.current.show()}
              style={{width: '100%'}}>
              <CustomSelector
                rightIcon={true}
                placeholder={'City'}
                icon={Icons.location}
                value={city}
              />
            </TouchableOpacity> */}

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

const ActionSheetCommponent = ({
  title = '',
  dataset = [],
  onPress = () => { },
}) => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(241,241,241,0.9)',
        borderRadius: 10,
        marginBottom: 10,
        overflow: 'hidden',
      }}>
      <View
        style={{
          borderBottomWidth: 1.5,
          borderBottomColor: '#ccc',
          paddingVertical: 10,
        }}>
        <Text
          style={{
            color: 'rgb(0,88,200)',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '500',
          }}>
          {title}
        </Text>
      </View>
      <ScrollView style={{ maxHeight: 200 }} showsVerticalScrollIndicator={false}>
        {dataset.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onPress(item)}
              style={{
                paddingVertical: 12,
                alignItems: 'center',
                borderBottomWidth: 1.5,
                borderBottomColor: '#ccc',
              }}>
              <Text style={{ color: '#000', fontSize: 16 }} numberOfLines={1}>
                {item?.state_name?.length ? item?.state_name : item?.city_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

function mapState({ reducer: { user } }) {
  return {
    user,
  };
}

export default connect(mapState)(EditProfile);
