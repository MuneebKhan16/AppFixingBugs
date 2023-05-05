/* eslint-disable prettier/prettier */
import React, { Component, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated, Button, StyleSheet } from 'react-native';
import { Colors, NavService } from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import OTPTextInput from '@twotalltotems/react-native-otp-input';
import {styles} from '../ForgetPasswordOTP/otp_style'
import Toast from 'react-native-toast-message'
import AuthBackground from '../../../components/AuthBackground';
class OTP extends Component {
  ResetPassword = () => {
    NavService.navigate('ResetPassword')
  }

  state = {
    code: '',
    timerCode: 60,
    resend: false,
    otpInput: null,
    keyboardStatus: undefined,
    otp: '123456',
  };

  constructor(props) {
    super(props);
    this.timer = null;
  }
  componentDidMount() {
    this.startInterval();
  }
  startInterval = () => {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      const { timerCode } = this.state;
      if (timerCode < 1) {
        clearInterval(this.timer);
        this.setState({ resend: true });
      } else this.setState({ timerCode: timerCode - 1 });
    }, 1000);
  }; 12

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  SubmitCode = code => {
    const { otp } = this.state;
    const { screen } = this.props.route.params;
    if (code === otp) {
      if (screen == 'signup') {
        NavService.navigate('CompleteProfile');
      }
      else if (screen == 'forgot') {
        NavService.navigate('ChangePassword', { screen: 'forgot' });
      }
      Toast.show('OTP verified');
    } else {
      Toast.show('Invalid OTP verification code.');
    }
  };
  
  render() {

    const { timerCode, resend, code } = this.state;
    const { user_id } = this.props.route.params;
    return (
      <AuthBackground back profile={false} title={'Verification'}>
        <CustomBackground>
          {
          }
          <View
            style={styles.maincontainer}>
            <Text
              style={styles.container}>
              Enter verification code
            </Text>
            <OTPTextInput
              style={styles.otp}
              pinCount={4}
              code={code}
              onCodeChanged={c => {
                this.setState({ code: c });
              }}
              onCodeFilled={code => this.SubmitCode(code)}
              autoFocusOnLoad
              codeInputFieldStyle={{
                backgroundColor: Colors.white,
                color: Colors.black,
              }}
            />
            {
            }
            <View style={styles.boders}>
              <Image source={Icons.clock} 
              style={styles.clock} />
            </View>

            <View
              style={styles.optcontainer}>

              <View
                style={styles.otpmain}>
                <Text
                  style={styles.counter}>
                  00:{timerCode}
                </Text>
                <CustomButton
                  buttonStyle={{
                    marginVertical: '8%',
                    width: 250,
                    marginTop: 50
                  }}
                  title="Verify"
                  onPress={async () =>  NavService.navigate('ResetPassword' , this.props.route.params)}
                />
              </View>
            </View>
          </View>

          <Text
            onPress={
              resend
                ? async () => {
                  this.setState({ timerCode: 60, resend: false, code: '' });
                  this.startInterval();
                }
                : null
            }
            style={{
              color: '#fff',
              fontWeight: resend ? '600' : '300',
              alignSelf: 'center',
              fontSize: 14,
              marginTop:50
            }}>
            Didn't Receive Code ? Resend
          </Text>
          {/* </ScrollView> */}
        </CustomBackground>
      </AuthBackground>
    );
  }
}





export default React.memo(OTP);
