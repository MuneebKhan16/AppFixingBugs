/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Image,ScrollView } from 'react-native'
import React, { useContext } from 'react'
import AppBackground from '../../../components/AppBackground'
import Mainprofile from '../../../components/Mainprofile'
import Heading from '../../../components/Heading';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import { NavService, Colors } from '../../../config';
import { useSelector } from 'react-redux'
import { logoutUser } from '../../../redux/actions';
import eventContext from '../../EventScreens/eventContext';
import { themes } from '../../../config/globalFonts/globalFonts';

const EventSetting = () => {
  const { userProfile } = useContext(eventContext);
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`

  const logout = () => {
    // NavService.reset(0, [{ name: 'AuthStack' }])
    logoutUser();
  }
  const user_id = useSelector((state) => state.reducer.user);
  return (
    <AppBackground back title={"Settings"} home>
        <ScrollView style={styles.top} showsVerticalScrollIndicator={false}>
      <View style={styles.top}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <View>
            <Image
              source={{ uri: userProfile?.profile_picture ? `${BaseUrl}${userProfile?.profile_picture}` : "https://picsum.photos/200/300" }}
              style={{
                width: 75,
                height: 75,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: Colors.purple,
                marginBottom: 10,

              }}
            />


          </View>

          <Text style={{
            fontSize: themes?.fontSize?.large,
            fontFamily: themes?.font?.black,
            color: Colors.black,
            textTransform: 'capitalize',
            marginTop: 10
          }}>{user_id?.name}</Text>
          <Text style={{
            fontSize: themes?.fontSize?.large,
            fontFamily: themes?.font?.regular,
            color: Colors.darkGray,


          }}>{user_id?.email}</Text>
        </View>
      </View>
      {/* <Mainprofile
        txt
        center
        name={user_id?.name}
        subtitle={user_id?.email}
      /> */}
      <View style={{ marginTop: 20 }}>
        <Heading name="Terms & Condition" icon={Icons.information} onpress="EventTermsConditions" />
        <Heading name="Policies" icon={Icons.policies} onpress="EventPrivacyPolicy" />
        <Heading name="Help" icon={Icons.help} onpress="EventHelp" />
        <Heading name="Subscription" icon={Icons.subscription} onpress="EventSubscription" />
        <Heading name="About the creator" icon={Icons.information} onpress="Aboutthecreator" />

        {/* <Heading name="About the creator" icon={Icons.information} onpress="Aboutthecreator" /> */}
      </View>
      <CustomButton
        buttonStyle={styles.btm}
        title="Logout"
        onPress={logout}

      />
      </ScrollView>
    </AppBackground>
  )
}

export default React.memo(EventSetting)

const styles = StyleSheet.create({
  btm: {
    marginTop: '10%',
    width: '95%',
    marginLeft: 10
  }
})