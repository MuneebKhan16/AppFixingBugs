import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {Colors} from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import Icons from '../../../assets/Icons';

const {width, height} = Dimensions.get('window');

class App extends Component {
  state = {
    agreementModal: false,
    terms: false,
    policy: false,
    navigator: '',
  };

  render() {
    const {agreementModal, terms, policy, navigator} = this.state;
    const methods = [
      {
        name: 'Email',
        icon: Icons.email,
        onPress: () => navigation.navigate('Login'),
        color: Colors.primary,
      },
      {
        name: 'Facebook',
        icon: Icons.facebook,
        color: Colors.facebook,
        // onPress: SocialSignin.Facebook,
      },
      {
        name: 'Google',
        icon: Icons.google,
        color: Colors.google,
        // onPress: SocialSignin.Google,
      },
      {
        name: 'Apple',
        icon: Icons.apple,
        color: Colors.apple,
        // onPress: SocialSignin.Apple,
      },
    ];
    const {navigation} = this.props;
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
              Login Via
            </Text>
            {methods.map((method, i) => {
              const {color, name, icon, onPress} = method;
              if (Platform.OS !== 'ios' && name === 'Apple') return null;
              return (
                <TouchableOpacity
                  onPress={onPress}
                  key={i}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: color,
                    borderRadius: 5,
                    width: width - 60,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 7,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={icon}
                    style={{
                      marginRight: 20,
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      tintColor:
                        name === 'Apple' ? Colors.secondary : Colors.white,
                      position: 'absolute',
                      left: width / 8,
                    }}
                  />

                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 16,
                      color: name === 'Apple' ? Colors.secondary : Colors.white,
                      position: 'absolute',
                      left: width / 4,
                    }}>
                    Login With {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </CustomBackground>
    );
  }
}

export default App;

{
  /* <Modal isVisible={agreementModal} style={{flex: 1}}>
          <View
            style={{
              backgroundColor: 'white',
              overflow: 'hidden',
              borderRadius: 15,
            }}>
            <View style={{backgroundColor: Colors.button}}>
              <Text
                style={{
                  color: 'white',
                  // fontFamily: Fonts.bold,
                  margin: 15,
                  alignSelf: 'center',
                  fontSize: 18,
                }}>
                AGREEMENT
              </Text>
            </View>
            <View style={{padding: 30}}>
              <Text
                style={{
                  marginBottom: 5,
                  // fontFamily: Fonts.regular,
                }}>
                I have read and agreed with
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({terms: !terms})}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 20,
                    width: 20,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: terms ? Colors.border : 'grey',
                  }}>
                  {terms ? (
                    <Image
                      source={require('../../../assets/Icons/check.png')}
                      style={{
                        tintColor: Colors.primary,
                        width: 13,
                        height: 13,
                        resizeMode: 'contain',
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
                <Text
                  onPress={() => {
                    this.setState({agreementModal: false});
                    this.props.navigation.navigate('TermsConditionsAuth', {
                      goBack: 'PreLogin',
                    });
                  }}
                  style={{
                    marginLeft: 20,
                    // fontFamily: Fonts.regular,
                  }}>
                  Terms and Conditions
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => this.setState({policy: !policy})}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 20,
                    width: 20,
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: policy ? Colors.border : 'grey',
                  }}>
                  {policy ? (
                    <Image
                      source={require('../../../assets/Icons/check.png')}
                      style={{
                        tintColor: Colors.primary,
                        width: 13,
                        height: 13,
                        resizeMode: 'contain',
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
                <Text
                  onPress={() => {
                    this.setState({agreementModal: false});
                    this.props.navigation.navigate('PrivacyPolicyAuth', {
                      goBack: 'PreLogin',
                    });
                  }}
                  style={{
                    marginLeft: 20,
                    // fontFamily: Fonts.regular,
                  }}>
                  Privacy Policy
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', width: '100%', marginBottom: -1}}>
              <TouchableOpacity
                onPress={() => {
                  if (terms && policy) {
                    this.setState({agreementModal: false});
                    if (navigator.length)
                      this.props.navigation.navigate(navigator);
                  } else {
                    Toast.show({
                      text1:
                        'Please accept our Terms & Conditions and Privacy Policy',
                      type: 'error',
                      visibilityTime: 3000,
                    });
                  }
                }}
                style={{
                  backgroundColor: Colors.button,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 60,
                  width: '50%',
                }}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({agreementModal: false});
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 60,
                  width: '50%',
                }}>
                <Text style={{fontSize: 16}}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */
}
