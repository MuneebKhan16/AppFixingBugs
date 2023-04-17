import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppBackground from '../../../components/AppBackground'
import Mainprofile from '../../../components/Mainprofile'
import Heading from '../../../components/Heading';
import CustomButton from '../../../components/CustomButton';
import Icons from '../../../assets/Icons';
import { NavService } from '../../../config';
const EventSetting = () => {
  return (
    <AppBackground  back  title={"Settings"} home>
        <Mainprofile 
        txt
        center
        name="John Smith"
        subtitle="johnsmith@gmail.com"
        />
         <Heading name="Terms & Condition" icon={Icons.information} />
         <Heading name="Policies" icon={Icons.policies} />
          <Heading name="Help" icon={Icons.help} />
          <Heading name="Subscription" icon={Icons.subscription}/>
          <Heading name="About the creator" icon={Icons.information} onpress="Aboutthecreator"/>
          <CustomButton
              buttonStyle={{
                marginTop: '10%',
                width:'95%',
                marginLeft:10
              }}
              title="Logout"
              // onPress={() => NavService.reset(0, [{name: 'ScreenStack'}])}
              onPress={() => NavService.reset(0, [{name: 'Auth'}])}

            />
        </AppBackground>
  )
}

export default EventSetting

const styles = StyleSheet.create({})