/* eslint-disable prettier/prettier */
import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import {Colors, NavService} from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import {ProfileTextInput} from '../../../components/CustomTextInput';
import * as EmailValidator from 'email-validator';
import Toast from 'react-native-toast-message';
import {login} from '../../../redux/APIs';
import {styles} from './Login_Style';
import AuthBackground from '../../../components/AuthBackground';
import {themes} from '../../../config/globalFonts/globalFonts';

class Login extends Component {
  ForgetPassword = () => {
    NavService.navigate('ForgetPassword');
  };
  Signup = () => {
    NavService.navigate('Signup');
  };

  state = {
    email: 'Trump@gmail.com',
    password: 'Abcd123@',
    device_token: 'abc123321',
    device_type: 'android',
    visible: false,
  };
  onSubmit = () => {
    const {email, password, device_token, device_type} = this.state;
    if (!email && !password) {
      Toast.show({
        text1: 'Please enter all fields',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!email) {
      Toast.show({
        text1: 'Please enter email address',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: 'Please enter a valid email address',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!password) {
      Toast.show({
        text1: 'Please enter password',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      login(email, password);
    }
  };
  render() {
    const {email, password} = this.state;
    return (
      <AuthBackground profile={false} back={true} title={'Login'}>
        <CustomBackground>
          <View style={styles.maincontainer}>
            <View style={styles.container}>
              <ProfileTextInput
                heading="Email Address"
                value={email}
                onChangeText={text => this.setState({email: text})}
                label={'Email'}
                icon={Icons.email}
                placeholder={'Email'}
              />
              <ProfileTextInput
                heading="Password"
                value={password}
                onChangeText={text => this.setState({password: text})}
                icon={Icons.password}
                secureTextEntry={this.state.visible ? false : true}
                label={'Password'}
                placeholder={'Password'}
              />
              <TouchableOpacity
                onPress={this.ForgetPassword}
                style={styles.touchable}>
                <Text
                  style={{
                    fontSize: themes?.fontSize?.extraSmall,
                    fontFamily: themes?.font?.bold,
                    color: Colors.black,
                    textDecorationLine: 'underline',
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <CustomButton
                buttonStyle={styles.btn}
                title="Login"
                onPress={this.onSubmit}
              />
            </View>
          </View>
          <KeyboardAvoidingView style={styles.btmheader} behavior="padding">
            <Text style={styles.btmtxt}>
              Don't have an account?{' '}
              <Text onPress={this.Signup} style={styles.heading}>
                Signup
              </Text>
            </Text>
          </KeyboardAvoidingView>
        </CustomBackground>
      </AuthBackground>
    );
  }
}

export default React.memo(Login);
