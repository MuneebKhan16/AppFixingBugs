/* eslint-disable prettier/prettier */
import React, {Component,useState,useRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image, Keyboard} from 'react-native';
import {Colors, NavService} from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import OTPTextInput from 'react-native-otp-textinput';
import AppBackground from '../../../components/AppBackground';
// import {login} from '../../redux/actions';
// import {connect} from 'react-redux';
// import {resendVerifyCode, verifyCode} from '../../redux/APIs';



class OTP extends Component {
  state = {
    code: '',
    timerCode: 60,
    resend: false,
    otpInput: null,
    keyboardStatus: undefined
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
      const {timerCode} = this.state;
      if (timerCode < 1) {
        clearInterval(this.timer);
        this.setState({resend: true});
      } else this.setState({timerCode: timerCode - 1});
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
   
  }
 

  render() {
    const {timerCode, resend, code} = this.state;
    const {user_id} = this.props.route.params;
    return (
      <AppBackground back profile={false} title={"OTP Verification"} >
      <CustomBackground>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{flexGrow: 1}}
          contentContainerStyle={{
            alignItems: 'center',
            flexGrow: 1,
          }}>
          <OTPTextInput
            autoFocusOnLoad={false}
            tintColor={Colors.grey}
            inputCount={6}
            ref={e => (this.otpInput = e)}
            textInputStyle={{
              borderBottomWidth: 1,
              color: Colors.grey,
            }}
            containerStyle={{
              height: 80,
            }}
            
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginVertical: '10%',
              }}>
              <Image
                style={{
                  height: 50,
                  width: 50,
                }}
                source={Icons.clock}
                resizeMode="contain"
              />
              <Text
                style={{
                  marginTop: 10,
                  color: '#fff',
                  alignSelf: 'center',
                }}>
                00:{timerCode}
              </Text>
            </View>
          </View>

          <CustomButton
            title={'CONTINUE'}
            // onPress={async () => await verifyCode(code, user_id)}
            onPress={async () => NavService.navigate('CompleteProfile')}
            buttonStyle={{marginBottom: 40}}
            label={''}
          />
          <Text
            onPress={
              resend
                ? async () => {
                    // await resendVerifyCode(user_id);
                    this.setState({timerCode: 60, resend: false, code: ''});
                    this.startInterval();
                  }
                : null
            }
            style={{
              // marginTop: 100,
              color: '#fff',
              fontWeight: resend ? '600' : '300',
              alignSelf: 'center',
              fontSize: 14,
              position: 'absolute',
              top: 410,
            }}>
            Didn't Receive Code? <Text style={{
              fontSize:16,
              fontWeight:"500"
            }} >Resend</Text>
          </Text>
        </ScrollView>
      </CustomBackground>
      </AppBackground>
    );
  }
}

export default OTP;
