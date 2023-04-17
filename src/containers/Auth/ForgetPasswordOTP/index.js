import React, { Component, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Animated,Button ,StyleSheet} from 'react-native';
import { Colors, NavService } from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
// import OTPTextInput from 'react-native-otp-textinput';
import AppBackground from '../../../components/AppBackground';
import Images from '../../../assets/Images';
// import {login} from '../../redux/actions';
// import {connect} from 'react-redux';
// import {resendVerifyCode, verifyCode} from '../../redux/APIs';
import OTPTextInput from '@twotalltotems/react-native-otp-input';
const FadeInView = props => {
  const anim = new Animated.Value(0);
  const duration = 3000;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: -10,
        duration: duration,
        useNativeDriver: true,
      }),
    ).start();
    setTimeout(
      () =>
        anim.stopAnimation(({ Value }) =>
          console.log("Final Value: " + Value)
        ),
      2000
    );
  }, []);
  return (
    <View style={{
    }}>

      <Animated.View
        style={{

          ...props.style,
          transform: [{ translateY: anim }],
        }}>
        {props.children}
      </Animated.View>
    </View>
  );
};

class OTP extends Component {
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
  };12

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  SubmitCode = code => {
    const {otp} = this.state;
    const {screen} = this.props.route.params;
    if (code === otp) {
      if (screen == 'signup') {
        NavService.navigate('CompleteProfile');
      } 
      else if (screen == 'forgot') {
        NavService.navigate('ChangePassword', {screen: 'forgot'});
      }
      Toast.show(ToastSuccess('OTP verified'));
    } else {
      Toast.show(ToastError('Invalid OTP verification code.'));
    }
  };
  render() {
    const { timerCode, resend, code } = this.state;
    const { user_id } = this.props.route.params;
    return (
      <AppBackground back profile={false} title={'Verification'}>
        <CustomBackground>
          {/* <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            style={{flexGrow: 1}}
            contentContainerStyle={{
              alignItems: 'center',
              flexGrow: 1,
            }}> */}
          <FadeInView
            style={{
              paddingHorizontal: 25,
              backgroundColor: 'rgba(118,158,190,300)',
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.white
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: Colors.white,
                fontSize: 16,
                marginVertical: 20,
              }}>
              Enter verification code
            </Text>
            <OTPTextInput
            style={{width: '80%', height: 200}}
            pinCount={4}
            code={code}
            onCodeChanged={c => {
              this.setState({code: c});
            }}
            onCodeFilled={code => this.SubmitCode(code)}
            autoFocusOnLoad
            codeInputFieldStyle={{
              backgroundColor: Colors.white,
              color: Colors.black,
            
              // color: Colors.black,

            }}

            //   onCodeFilled={code => this.continue(code)}
          />
            {/* <OTPInputView
    style={{width: '80%', height: 200}}
    pinCount={4}
    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    // onCodeChanged = {code => { this.setState({code})}}
    autoFocusOnLoad
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code) => {
        console.log(`Code is ${code}, you are good to go!`)
    }}
/> */}
            {/* <OTPTextInput
              tintColor={Colors.grey}
              inputCount={4}
              // onCodeChanged = { (code) => console.log("new code" + code)}
              onCodeFilled={this.setState.code => {
                NavService.navigate('ResetPassword');
                // onPress={async () => NavService.navigate('ResetPassword')}
              }}
              ref={e => (this.code = e)}
              textInputStyle={{
                borderBottomWidth: 1,
                color: Colors.grey,
                backgroundColor: Colors.white,
              }}
              containerStyle={{
                height: 80,
              }}
            /> */}
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>

              <Image source={Icons.clock}  style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
              }} />
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>

              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginTop: 10
                }}>
                <Text
                  style={{
                    color: '#fff',
                    alignSelf: 'center',
                    fontWeight: '800',
                    fontSize: 20
                  }}>
                  00:{timerCode}
                </Text>
                <CustomButton
                  buttonStyle={{
                    marginVertical: '8%',
                    width:280
                  }}
                  title="Verify"
                  onPress={async () => NavService.navigate('ResetPassword')}
                />
              </View>
            </View>
          </FadeInView>

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
             position:'absolute',
             bottom:10,
              }}>
              Didn't Receive Code ? Resend
            </Text>
          {/* </ScrollView> */}
        </CustomBackground>
      </AppBackground>
    );
  }
}




const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
})

export default OTP;
