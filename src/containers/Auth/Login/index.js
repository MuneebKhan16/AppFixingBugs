import React, {Component,useEffect} from 'react';
import {View, Text,  Image,TouchableOpacity, Dimensions, Animated,} from 'react-native';
import {Colors, NavService} from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import { ProfileTextInput } from '../../../components/CustomTextInput';
import * as EmailValidator from 'email-validator';
import Toast from 'react-native-toast-message';
import { login } from '../../../redux/APIs';
import { styles } from './Login_Style';


class Login extends Component {
  
  
  state = {
    email: 'daina@gog.com',
    password: 'Abcd@1234',
    visible: false
  };
  onSubmit = () => {
    const { email, password } = this.state;
    if (!email && !password) {
      Toast.show({
        text1: 'Please enter all fields',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!email) {
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
    }
    else if (!password) {
      Toast.show({
        text1: 'Please enter password',
        type: 'error',
        visibilityTime: 3000,
      });
    }
    else{
      login(email,password)
    }
  };
    render() {
    const {email, password} = this.state;
    return (
      <AppBackground profile={false} back={true} title={"Login"} >
        <CustomBackground>
        <View
          style={styles.maincontainer}>
          <View
            style={styles.container}>
            <ProfileTextInput
            heading="Email Address"
              value={email}
              onChangeText={text => this.setState({email: text})}
              label={'Email'}
              icon={Icons.email}
            />
            <ProfileTextInput
            heading="Password"
              value={password}
              onChangeText={text => this.setState({password: text})}
              icon={Icons.password}

              secureTextEntry={
                this.state.visible ? false : true
              }
              label={'Password'}
            />
            <TouchableOpacity
            onPress={()=>{
              NavService.navigate("ForgetPassword");
            }}
            style={{
              alignSelf:"center",
              marginTop:20
            }} >
              <Text style={{
                fontSize: 16,
                color: Colors.black,
              
            textDecorationLine:'underline',
              
              }} >Forgot Password?</Text>
            </TouchableOpacity>
            <CustomButton
              buttonStyle={{
                marginTop: '10%',
              }}
              title="Login"
              onPress={this.onSubmit}

            />
          </View>
        </View>
        <View style={{
            // top: Dimensions.get("window").height / 1
            position:'absolute',
            bottom:15,
            alignSelf:'center'
          }} >
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              color: Colors.white,
            }}>
            Don't have an account?{' '}
            <Text
              onPress={() => NavService.navigate('Signup')}
              style={{
                fontWeight: '600',
                color: Colors.white,
                fontSize: 15,
                textDecorationLine: 'underline',
              }}>
              Signup 
            </Text>
          </Text>
          </View>
        </CustomBackground>
     </AppBackground> 
    );
  }
}

export default Login;



