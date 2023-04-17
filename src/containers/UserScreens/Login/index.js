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
  };

  render() {
    const {email, password} = this.state;
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
              Login
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
            <CustomButton
              title="Login"
              onPress={() => NavService.reset(0, [{name: 'ScreenStack'}])}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => NavService.navigate('ForgetPassword')}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: Colors.primary,
                  marginVertical: 20,
                  textDecorationLine: 'underline',
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: Colors.white,
              marginVertical: 30,
            }}>
            Don't have an account?{' '}
            <Text
              onPress={() => NavService.navigate('Signup')}
              style={{
                fontWeight: '600',
                color: Colors.primary,
                textDecorationLine: 'underline',
              }}>
              Sign Up here
            </Text>
          </Text>
        </View>
      </CustomBackground>
    );
  }
}

export default Login;
