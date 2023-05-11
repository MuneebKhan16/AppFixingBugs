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
      textTransform: 'capitalize',
    },
    top:{ marginTop: 30 },
    swiper:{ height: 200, borderRadius: 15 },
    topmerge:{ marginTop: 5 },
    img:{ borderRadius: 20, width: '100%', height: '100%' },
    self:{ alignSelf: 'center' },
    clr:{ Color: '#fff' }
  });