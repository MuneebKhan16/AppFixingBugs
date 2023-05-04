import React, { Component, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { Colors, NavService } from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import { ProfileTextInput } from '../../../components/CustomTextInput';
import * as EmailValidator from 'email-validator';
import Toast from 'react-native-toast-message';
import { schema } from '../../../config/validation';
import { forget_password } from '../../../redux/APIs';
import ReactNativeCalendarStrip from 'react-native-calendar-strip';
import { styles } from './forgotpassowrd_styles';

class Login extends Component {
  state = {
    email: '',
  };
  onSubmit =  () => {
    const { email } = this.state;
    if (!email) {
      Toast.show({
        text1: 'Please enter email address',
        type: 'error',
        visibilityTime: 2000,
      });
    } else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: 'Please enter a valid email address',
        type: 'error',
        visibilityTime: 2000,
      });
    } else {
      forget_password(email)
    }
  };
  render() {
    const { email } = this.state;
    return (
      <AppBackground profile={false} back title={'Forgot Password'}>
        <CustomBackground>
          <View
            style={styles.maincontainer}>
            <View
              style={styles.container}>
              <ProfileTextInput
                heading="Email Address"
                value={email}
                onChangeText={text => this.setState({ email: text })}
                icon={Icons.email}
              />
              <CustomButton
                title="Reset"
                buttonStyle={{}}
                onPress={this.onSubmit}
              />
            </View>
          </View>
        </CustomBackground>
      </AppBackground>
    );
  }
}

export default React.memo(Login);

