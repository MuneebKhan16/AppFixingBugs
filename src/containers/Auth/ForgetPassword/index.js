import React, {Component, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native';
import {Colors, NavService} from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import {ProfileTextInput} from '../../../components/CustomTextInput';
import * as EmailValidator from 'email-validator';
import Toast from 'react-native-toast-message';
import { schema } from '../../../config/validation';
import { forget_password } from '../../../redux/APIs';

const FadeInView = props => {
  const anim = new Animated.Value(0);
  const duration = 2000;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: -15,
        duration: duration,
        useNativeDriver: true,
      }),
    ).start();
    setTimeout(
      () =>
        anim.stopAnimation(({Value}) => console.log('Final Value: ' + Value)),
      2000,
    );
  }, []);
  return (
    <View style={{}}>
      <Animated.View
        style={{
          ...props.style,
          transform: [{translateY: anim}],
        }}>
        {props.children}
      </Animated.View>
    </View>
  );
};

class Login extends Component {
  state = {
    email: '',
  };
  onSubmit = () => {
    const { email } = this.state;
    if (!email) {
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
    } else {
      forget_password (email)
    }
  };
  render() {
    const {email} = this.state;
    return (
      <AppBackground profile={false} back title={'Forgot Password'}>
        <CustomBackground>
          <View
            style={{
              alignItems: 'center',
              width: '90%',
            }}>
            <View
              style={{
                marginTop: -55,
                alignItems: 'center',
                backgroundColor: 'rgba(118,158,190,300)',
                paddingVertical: '8%',
                borderRadius: 20,
                borderWidth: 1,
                borderColor: Colors.white,
              paddingHorizontal:'5%'

              }}>
              {/* <Image source={Icons.mail} /> */}
              <ProfileTextInput
                heading="Email Address"
                value={email}
                onChangeText={text => this.setState({email: text})}
                icon={Icons.email}
              />

              <CustomButton
                title="Reset"
                buttonStyle={{}}
                // onPress={() => NavService.navigate('ForgetPasswordOTP')}
                onPress={this.onSubmit}
              />
            </View>
          </View>
        </CustomBackground>
      </AppBackground>
    );
  }
}

export default Login;
