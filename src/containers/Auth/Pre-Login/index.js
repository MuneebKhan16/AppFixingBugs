import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import {Colors, NavService} from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import Icons from '../../../assets/Icons';
import AgreementModal from '../../../components/AgreementModal';
// import SplashScreen from 'react-native-splash-screen';
import AppBackground from '../../../components/AppBackground';
import RNBounceable from "@freakycoder/react-native-bounceable";
const {width, height} = Dimensions.get('window');

class App extends Component {
  state = {
    showModal: false,
    currentOption:''
  };

  // componentDidMount() {
  //   SplashScreen.hide()
  // }
   componentDidMount() {
    // Runs after the first render() lifecycle
  }

  render() {
    const {showModal, currentOption} = this.state;
    
    const methods = [
      {
        name: 'Email',
        icon: Icons.email,
        onPress:  () =>  NavService.navigate('Login'),
        color: Colors.purple,
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
     <AppBackground  back={false} title={"Pre Login"} profile={false} >
      <CustomBackground>
      
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            width: '100%',

          }}>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              width: '100%',
            }}>
          
            {methods.map((method, i) => {
              const {color, name, icon, onPress} = method;
              if (Platform.OS !== 'ios' && name === 'Apple ID') return null;
              return (
                <RNBounceable
                bounceFriction={0.8}
                onPress={onPress}
                key={i}
                activeOpacity={0.8}
                style={{
                  backgroundColor: color,
                  borderRadius: 10,
                  width: width - 60,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 5,
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderColor:Colors.white,
                  // borderWidth:2
                }}>
                  <Image
                    source={icon}
                    style={{
                      marginRight: 20,
                      width: 20,
                      height: 20,
                      resizeMode: 'contain',
                      tintColor: name === 'Apple ID' || name === "Email" ? Colors.white : Colors.white,
                      position: 'absolute',
                      left: width / 8,
                    }}
                    />

                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 16,
                      color: name === 'Apple ID' || name === "Email" ? Colors.white : Colors.white,
                      position: 'absolute',
                      left: width / 4,
                    }}>
                    Sign in with {name}
                  </Text>
                </RNBounceable>
              );
            })}
          </View>
          <View style={{
            // top: Dimensions.get("window").height / 9.4
            width:'70%',
            marginBottom:20
          }} >
          <Text
            style={{
              color: Colors.white,
              textAlign:'center',
              fontSize:16
              
            }}>
           By sign up you agree to our{' '}  
           <Text style={{fontWeight:'700',textDecorationLine: 'underline',}}
           onPress={() => NavService.navigate('TermsCondition')}>
          Terms & Condition
           </Text>
           {'  '}and{'  '} 
           <Text style={{fontWeight:'700',textDecorationLine: 'underline',}}
           onPress={() => NavService.navigate('PrivacyPolicy')}>
           Privacy Policy
           </Text>
          
          
          </Text>
          </View>
        </View>
        
      </CustomBackground>
      </AppBackground>
    );
  }
}

export default App;

{
}
