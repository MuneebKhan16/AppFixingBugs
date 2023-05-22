import React, { Component } from 'react';
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
import { Colors, NavService } from '../../../config';
import Mainprofile from '../../../components/Mainprofile';
import Heading from '../../../components/Heading';
import { styles } from './setting_style';
import { logoutUser } from '../../../redux/actions';
export class TermsConditions extends Component {
  state = {
    notifications: false,
    user: {},
  };
  onNotificationPress = () => {
    const { notifications } = this.state;
    let response;
    this.setState({ notifications: !notifications });
  };

  async componentDidMount() {
    const userData = this.props?.user;
    this.setState({ user: userData })
  }
  logout = () => {
    // NavService.reset(0, [{ name: 'Auth' }])
     logoutUser();
  }
  render() {
    const { notifications, user } = this.state;
    return (
      <AppBackground
        title={'Settings'}
        profile={false}
        notification={false}
        back
        home>
        <ScrollView style={styles.top} showsVerticalScrollIndicator={false}>
          <Mainprofile
            txt
            center
            top
            name={user.name}
            subtitle={user.email}
          />
          <View style={styles.topbtm}>

            <Heading name="Location Tracking" switchs icon={Icons.location} tintclr />
            <Heading name="Terms & Condition" icon={Icons.information} onpress="TermsConditions" />
            <Heading name="Policies" icon={Icons.policies} onpress="PrivacyPolicy"/>
            <Heading name="Help" icon={Icons.help} onpress="Help" />
            {/* <Heading name="Subscription" icon={Icons.subscription} onpress="Subscription"/> */}
            <Heading name="About the creator" icon={Icons.information} onpress="Aboutthecreator" />


          </View>
          <CustomButton
            buttonStyle={styles.btn}
            title="Logout"
            onPress={this.logout}

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


