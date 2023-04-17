import React, {Component,useEffect} from 'react';
import {View, Text, TouchableOpacity, Image,Animated} from 'react-native';
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
import { signup } from '../../../redux/APIs';

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
    name: '',
    email: '',
    password: '',
    confirm_Password: '',
    visible1: false,
    visible2: false,
  };
  onSubmit = () => {
    const {name,email, password, confirm_Password } = this.state;
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
      signup(name,email,password,confirm_Password)
      // Toast.show({
      //   text1: 'Account Create Successfully',
      //   type: 'success',
      //   visibilityTime: 3000,
      // });
      // this.props.navigation.navigate('Otp', { screenName: 'signup' });
               //NavService.reset(0, [{name: 'CompleteProfile'}])

    }
  };
  render() {
    const {email, password, confirm_Password, name} = this.state;
    return (
      <AppBackground back profile={false} title={'Sign Up'}>
        <CustomBackground>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              width: '100%',
              
            }}>
            <FadeInView
              style={{
                alignItems: 'center',
              width: '90%',
              backgroundColor:'rgba(118,158,190,300)',
            borderRadius:20,
            borderWidth:1.5,
            borderColor:Colors.white,
            paddingHorizontal:10,
            paddingVertical:15
              }}>
              <ProfileTextInput
                heading="Full Name"
                icon={Icons.user}
                value={name}
                onChangeText={text => this.setState({name: text})}
                label={'User Name'}
              />
              <ProfileTextInput
                heading="Email Address"
                icon={Icons.email}
                value={email}
                onChangeText={text => this.setState({email: text})}
                label={'Email Address'}
              />
              <ProfileTextInput
                heading="Password"
                icon={Icons.password}
                value={password}
                onChangeText={text => this.setState({password: text})}
                secureTextEntry={this.state.visible1 ? false : true}
                label={'Password'}
              />
              {/* {!this.state.visible1 ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      visible1: !this.state.visible1,
                    });
                  }}
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    top: 215,
                    right: 30,
                  }}>
                  <Image
                    source={Icons.unVisible}
                    style={{
                      height: 26,
                      width: 26,
                      tintColor: Colors.darkGray,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      visible1: !this.state.visible1,
                    });
                  }}
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    top: 215,
                    right: 30,
                  }}>
                  <Image
                    source={Icons.visible}
                    style={{
                      height: 26,
                      width: 26,
                      tintColor: Colors.darkGray,
                    }}
                  />
                </TouchableOpacity>
              )} */}
              <ProfileTextInput
                heading="Confirm Password"
                icon={Icons.password}
                value={confirm_Password}
                onChangeText={text => this.setState({confirm_Password: text})}
                label={'Confirm Password'}
                secureTextEntry={this.state.visible2 ? false : true}
              />
              {/* {!this.state.visible2 ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      visible2: !this.state.visible2,
                    });
                  }}
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    top: 300,
                    right: 30,
                  }}>
                  <Image
                    source={Icons.unVisible}
                    style={{
                      height: 26,
                      width: 26,
                      tintColor: Colors.darkGray,
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      visible2: !this.state.visible2,
                    });
                  }}
                  style={{
                    position: 'absolute',
                    alignSelf: 'flex-end',
                    top: 300,
                    right: 30,
                  }}>
                  <Image
                    source={Icons.visible}
                    style={{
                      height: 26,
                      width: 26,
                      tintColor: Colors.darkGray,
                    }}
                  />
                </TouchableOpacity>
              )} */}

              <CustomButton
                title="Signup"
                // onPress={() => NavService.navigate('CompleteProfile')}
              onPress={this.onSubmit}

                buttonStyle={{
                  marginTop: 15,
                }}
              />
            </FadeInView>
           
          </View>
          <View style={{marginTop:50}}>

          <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: Colors.white,
                position:'absolute',
                bottom:10,
                alignSelf:'center'

              }}>
              Already have an account?{' '}
              <Text
                onPress={() => NavService.navigate('Login')}
                style={{
                  fontWeight: '600',
                  color: Colors.white,
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                Login
              </Text>
            </Text>
          </View>
        </CustomBackground>
      </AppBackground>
    );
  }
}

export default Login;
