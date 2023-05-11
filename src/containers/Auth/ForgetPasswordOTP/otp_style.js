import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';


export const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
      underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
      },
      maincontainer: {
        paddingHorizontal: 25,
        backgroundColor: 'rgba(118,158,190,300)',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.white
      },
      container: {
        textAlign: 'center',
        color: Colors.white,
        fontSize: 18,
        marginVertical: 20,
        fontWeight:'bold',
         textTransform: 'capitalize',
      },
      otp: { width: '80%', height: 80 ,},
      boders: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
      },
      clock:{
        width: 50,
        height: 50,
        resizeMode: 'contain',
      },
      otpcontainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      otpmain:{
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 10
      },
      counter:{
        color: '#fff',
        alignSelf: 'center',
        fontWeight: '800',
        fontSize: 20
      }
    
})