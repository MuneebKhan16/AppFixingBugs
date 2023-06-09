import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';
import { themes } from '../../../config/globalFonts/globalFonts';

export const styles = StyleSheet.create({
    maincontainer:{
      flex: 1,
      alignItems: 'center',
      width: '100%',
    },
    conatiner:{
      alignItems: 'center',
      width: '90%',
      backgroundColor: 'rgba(118,158,190,300)',
      borderRadius: 20,
      borderWidth: 1.5,
      borderColor: Colors.white,
      paddingHorizontal: 10,
      paddingVertical: 15
    },
    btn:{
      marginTop: 15,
    },
    btmheader:{ marginTop: 50 },
    txt:{
      fontSize: themes?.fontSize?.extraSmall,
      fontFamily: themes?.font?.bold,
      color: Colors.white,
      position: 'absolute',
      bottom: 10,
      alignSelf: 'center'
    },
    btmtxt:{
      fontSize: themes?.fontSize?.extraSmall,
      fontFamily: themes?.font?.extraBold,
      color: Colors.white,
      textDecorationLine: 'underline',
    },
    btmheaderstyl:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:50
    },
  })