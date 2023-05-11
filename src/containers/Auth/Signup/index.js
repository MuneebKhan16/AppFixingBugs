import React, { Component, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Animated,StyleSheet,KeyboardAvoidingView } from 'react-native';
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
import { signup } from '../../../redux/APIs';
import { styles } from './signup_style';
import AuthBackground from '../../../components/AuthBackground';
class Login extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirm_Password: '',
    visible1: false,
    visible2: false,
  };
  onSubmit = () => {
    const { name, email, password, confirm_Password } = this.state;
    if (!name && !email && !password && !confirm_Password) {
      Toast.show({
        text1: 'Please enter all fields',
        type: 'error',
        visibilityTime: 3000,
      });
    }
    else if (!name) {
      Toast.show({
        text1: 'Please enter full name',
        type: 'error',
        visibilityTime: 3000,
      });
    }
    else if (!email) {
      Toast.show({
        text1: 'Please enter email address',
        type: 'error',
        visibilityTime: 3000,
      });
    }
    else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: 'Please enter a valid email address',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!password) {
      Toast.show({
        text1: 'Password is required',
        type: 'error',
        visibilityTime: 3000,
      });
    }
    else if (!schema.validate(password)) {
      Toast.show({
        text1: 'Password not valid (Use atleast one UpperCase Letter, one number and one special character',
        type: 'error',
        visibilityTime: 3000,
      });
    }
    else if (!confirm_Password) {
      Toast.show({
        text1: 'Confirm password is required',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (password !== confirm_Password) {
      Toast.show({
        text1: 'Password and confirm password must be same',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      signup(name, email, password, confirm_Password)


    }
  };
  render() {
    const { email, password, confirm_Password, name } = this.state;
    return (
      <AuthBackground back profile={false} title={'Sign Up'}>
        <CustomBackground>
          <View
            style={styles.maincontainer}>
            <View
              style={styles.conatiner}>
              <ProfileTextInput
                heading="Full Name"
                icon={Icons.user}
                value={name}
                onChangeText={text => this.setState({ name: text })}
                label={'User Name'}
              />
              <ProfileTextInput
                heading="Email Address"
                icon={Icons.email}
                value={email}
                onChangeText={text => this.setState({ email: text })}
                label={'Email Address'}
              />
              <ProfileTextInput
                heading="Password"
                icon={Icons.password}
                value={password}
                onChangeText={text => this.setState({ password: text })}
                secureTextEntry={this.state.visible1 ? false : true}
                label={'Password'}
              />
              <ProfileTextInput
                heading="Confirm Password"
                icon={Icons.password}
                value={confirm_Password}
                onChangeText={text => this.setState({ confirm_Password: text })}
                label={'Confirm Password'}
                secureTextEntry={this.state.visible2 ? false : true}
              />
              <CustomButton
                title="Signup"
                onPress={this.onSubmit}
                buttonStyle={styles.btn}
              />
            </View>
          </View>
          <KeyboardAvoidingView style={styles.btmheaderstyl} behavior="padding">
            <Text
              style={styles.txt}>
              Already have an account?{' '}
              <Text
                onPress={() => NavService.navigate('Login')}
                style={styles.btmtxt}>
                Login
              </Text>
            </Text>
            </KeyboardAvoidingView>
        </CustomBackground>
      </AuthBackground>
    );
  }
}

export default React.memo(Login);


