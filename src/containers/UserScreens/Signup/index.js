import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Colors, NavService} from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';

class Login extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  render() {
    const {email, password, confirmPassword} = this.state;
    return (
      <CustomBackground>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            width: '100%',
          }}>
          <View
            style={{
              marginTop: 20,
              alignItems: 'center',
              flex: 1,
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                color: Colors.white,
                marginVertical: 20,
              }}>
              Sign-Up
            </Text>
            <CustomTextInput
              icon={Icons.email}
              placeholder="Enter Email"
              value={email}
              onChangeText={text => this.setState({email: text})}
            />
            <CustomTextInput
              icon={Icons.password}
              placeholder="Enter Password"
              value={password}
              onChangeText={text => this.setState({password: text})}
              secureTextEntry
            />
            <CustomTextInput
              icon={Icons.password}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={text => this.setState({confirmPassword: text})}
              secureTextEntry
            />
            <CustomButton
              title="Sign-Up"
              onPress={() => NavService.navigate('AddGuardian')}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: Colors.white,
              marginVertical: 30,
            }}>
            Already have an account?{' '}
            <Text
              onPress={() => NavService.goBack()}
              style={{
                fontWeight: '600',
                color: Colors.primary,
                textDecorationLine: 'underline',
              }}>
              Login
            </Text>
          </Text>
        </View>
      </CustomBackground>
    );
  }
}

export default Login;
