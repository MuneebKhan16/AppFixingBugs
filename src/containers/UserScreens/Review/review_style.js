import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';


export const styles = StyleSheet.create({
    cardContainer: {
      height: 150,
      backgroundColor: Colors.primary,
      borderRadius: 20,
    },
    cardContent: {
      color: Colors.black,
      fontSize: 34,
      fontWeight: '500',
    },
    slide1: {
      height: 200,
      borderRadius: 15,
    },
  
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    post:{
      color: Colors.black,
      fontSize: 22,
      fontWeight: 'bold',
      marginTop: 30,
      
      marginLeft:13,
    },
    top:{ marginTop: 30 },
    swiper:{ height: 200, borderRadius: 15 },
    topmerge:{ marginTop: 5 },
    img:{ borderRadius: 20, width: '100%', height: '100%' },
    self:{ alignSelf: 'center' },
    clr:{ Color: '#fff' },
    wrapper: {},
    // slide1: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#9DD6EB',
    // },
    // slide2: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#97CAE5',
    //   transform: [{ translateX: -10 }],
    //   marginLeft:20
    // },
    // slide3: {
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor: '#92BBD9',
    //   marginLeft:10
    // },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    },
    shadow0: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
      shadowRadius: 0,
  
      elevation: 0,
    },
    shadow3: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.8,
      shadowRadius: 2.7,
  
      elevation: 3,
    },
    shadow5: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
  
  });