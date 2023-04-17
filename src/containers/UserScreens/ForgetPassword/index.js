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
  };

  render() {
    const {email} = this.state;
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
              Forgot Password
            </Text>
            <CustomTextInput
              icon={Icons.email}
              placeholder="Enter Email"
              value={email}
              onChangeText={text => this.setState({email: text})}
            />

            <CustomButton
              title="Submit"
              onPress={() => NavService.navigate('OTP')}
            />
          </View>
        </View>
      </CustomBackground>
    );
  }
}

export default Login;
