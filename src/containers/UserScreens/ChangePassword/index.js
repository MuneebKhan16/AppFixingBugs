import React, {Component, createRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Colors, NavService} from '../../../config';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import Images from '../../../assets/Images';
import CustomTextInput from '../../../components/CustomTextInput';

class ChangePassword extends Component {
  state = {
    newPassword: '',
    confirmPassword: '',
    currentPassword: '',
    visible1: false,
    visible2: false,
    visible3: false,
  };

  render() {
    const {currentPassword, newPassword, confirmPassword} = this.state;
    return (
      <AppBackground
        title={'Change Password'}
        back
        notification={false}
        profile={false}
        >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{
            alignItems: 'center',
            flexGrow: 1,
          }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 40,
            }}>
            <Image
              source={Images.logo}
              style={{
                height: 100,
                width: 340,
                marginTop: '20%',
                marginBottom: '20%',
              }}
            />
            <View style={{flex: 1, width: 340}}>
              <CustomTextInput
                // placeholder={'New Password'}
                onChangeText={value => this.setState({currentPassword: value})}
                value={currentPassword}
                secureTextEntry={
                  this.state.visible1 ? false : true
                }
                label={'Existing Password'}
              />
               {
              !this.state.visible1 ? (
                <TouchableOpacity onPress={()=>{
                  this.setState({
                    visible1: !this.state.visible1
                  })
                  
                }} style={{
                  position:"absolute",
                 alignSelf:"flex-end",
                 top: 45,
                 right:48
                   }} >
                  <Image source={Icons.unVisible} style={{
                    height:26,
                       width:26,
                       tintColor: Colors.darkGray

                       }} />
               </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={()=>{
                  this.setState({
                    visible1: !this.state.visible1
                  })
                }} style={{
                  position:"absolute",
                 alignSelf:"flex-end",
                 top: 45,
                 right:48
    }} >
<Image source={Icons.visible} style={{
      height:26,
      width:26,
      tintColor: Colors.darkGray

    }} />
</TouchableOpacity>
              )
            }
              <CustomTextInput
                // placeholder={'New Password'}
                onChangeText={value => this.setState({newPassword: value})}
                value={newPassword}
                secureTextEntry={
                  this.state.visible2 ? false : true
                }
                label={'New Password'}
              />
              {
              !this.state.visible2 ? (
                <TouchableOpacity onPress={()=>{
                  this.setState({
                    visible2: !this.state.visible2
                  })
                  
                }} style={{
                  position:"absolute",
                 alignSelf:"flex-end",
                 top: 120,
                 right:48
                   }} >
                  <Image source={Icons.unVisible} style={{
                    height:26,
                       width:26,
                       tintColor: Colors.darkGray

                       }} />
               </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={()=>{
                  this.setState({
                    visible2: !this.state.visible2
                  })
                }} style={{
                  position:"absolute",
                 alignSelf:"flex-end",
                 top: 120,
                 right:48
    }} >
<Image source={Icons.visible} style={{
      height:26,
      width:26,
      tintColor: Colors.darkGray

    }} />
</TouchableOpacity>
              )
            }
              <CustomTextInput
                // placeholder={'Confirm New Password'}
                onChangeText={value => this.setState({confirmPassword: value})}
                value={confirmPassword}
                secureTextEntry={
                  this.state.visible3 ? false : true
                }
                label={'Confirm Password'}
              />
              {
              !this.state.visible3 ? (
                <TouchableOpacity onPress={()=>{
                  this.setState({
                    visible3: !this.state.visible3
                  })
                  
                }} style={{
                  position:"absolute",
                 alignSelf:"flex-end",
                 top: 200,
                 right:48
                   }} >
                  <Image source={Icons.unVisible} style={{
                    height:26,
                       width:26,
                       tintColor: Colors.darkGray

                       }} />
               </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={()=>{
                  this.setState({
                    visible3: !this.state.visible3
                  })
                }} style={{
                  position:"absolute",
                 alignSelf:"flex-end",
                 top: 200,
                 right:48
    }} >
<Image source={Icons.visible} style={{
      height:26,
      width:26,
      tintColor: Colors.darkGray

    }} />
</TouchableOpacity>
              )
            }
            </View>
            <View style={{marginBottom: 20}}>
              <CustomButton
                title={'Continue'}
                onPress={() => NavService.navigate('Home')}
                textStyle={{
                  fontWeight: '600',
                }}
              />
            </View>
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}

export default ChangePassword;
