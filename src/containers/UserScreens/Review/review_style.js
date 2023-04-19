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
      fontFamily: 'serif',
      marginLeft:13
    }
  });