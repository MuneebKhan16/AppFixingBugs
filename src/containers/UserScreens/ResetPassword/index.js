import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Colors, NavService} from '../../../config';
import CustomBackground from '../../../components/CustomBackground';
import CustomTextInput from '../../../components/CustomTextInput';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
// import {resetPassword} from '../../redux/APIs';

class App extends Component {
  state = {
    password: '',
    confirmPassword: '',
  };

  render() {
    const {email} = this.props.route.params;

    const {password, confirmPassword} = this.state;

    return (
      <CustomBackground>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{
            alignItems: 'center',
            flexGrow: 1,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: Colors.white,
              marginVertical: 20,
            }}>
            Reset Password
          </Text>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 40,
            }}>
            <CustomTextInput
              icon={Icons.password}
              placeholder={'New Password'}
              onChangeText={value => this.setState({password: value})}
              secureTextEntry
            />
            <CustomTextInput
              icon={Icons.password}
              placeholder={'Confirm Password'}
              onChangeText={value => this.setState({confirmPassword: value})}
              secureTextEntry
            />
            <CustomButton
              title={'CONTINUE'}
              onPress={() => NavService.navigate('Login')}
            />
          </View>
        </ScrollView>
      </CustomBackground>
    );
  }
}

export default App;
