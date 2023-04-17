import React, {Component} from 'react';
import {
  Text,
  View,
  Switch,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux'
import Icons from '../../../assets/Icons';
import AppBackground from '../../../components/AppBackground';
import CustomButton from '../../../components/CustomButton';
import {Colors, NavService} from '../../../config';
import Mainprofile from '../../../components/Mainprofile';
import Heading from '../../../components/Heading';
export class TermsConditions extends Component {
  state = {
    notifications: false,
    user : {},
  };
  onNotificationPress = () => {
    const {notifications} = this.state;
    let response;
    this.setState({notifications: !notifications});
  };

 async componentDidMount(){
    const userData = this.props?.user;
    this.setState({ user : userData})
  }

  render() {
    const {notifications , user} = this.state;
    return (
      <AppBackground
        title={'Settings'}
        profile={false}
        notification={false}
        back
        home>
        <ScrollView style={{marginTop: 20}} showsVerticalScrollIndicator={false}>
          <Mainprofile
          txt
            center
            top
            name={user.name}
            subtitle={user.email}
          />
          <View style={{marginTop:30}}>
          {/* <Heading name="Facebook.com" icon={Icons.fbk}/>
          <Heading name="Twitter.com" icon={Icons.twitter} />
          <Heading name="Instagram" icon={Icons.instagram}/> */}
          <Heading name="Location Tracking" switchs icon={Icons.location} tintclr/>
         <Heading name="Terms & Condition" icon={Icons.information} />
          <Heading name="Policies" icon={Icons.policies}/>
          <Heading name="Help" icon={Icons.help}/>
          <Heading name="Subscription" icon={Icons.subscription}/>
          <Heading name="About the creator" icon={Icons.information} onpress="Aboutthecreator"/>


          </View>
          <CustomButton
          // onPress={() => NavService.navigate('Auth')}
              buttonStyle={{
                marginTop: '10%',
                width:'95%',
                marginLeft:10
              }}
              title="Logout"
              // onPress={() => NavService.reset(0, [{name: 'ScreenStack'}])}
              onPress={() => NavService.reset(0, [{name: 'Auth'}])}

            />
        </ScrollView>
      </AppBackground>
    );
  }
}

const mapStateToProp = ({ reducer: { user } }) => {
  return { user };
};


export default connect(mapStateToProp)(TermsConditions);


