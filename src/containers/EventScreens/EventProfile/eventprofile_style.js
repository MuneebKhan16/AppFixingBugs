import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../../config';

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10
    },
    hd1: {
      color: Colors.black,
      fontWeight: 'bold',
      fontSize: 20,
      
      marginBottom:5
    },
    hd2: {
      color: Colors.black,
      fontWeight: 'bold',
      fontSize: 20,
      
      marginBottom:5

    },
    hd3: {
      color: Colors.black,
      fontWeight: 'bold',
      fontSize: 20,
      
      marginBottom:5

    },
    txt: { fontSize: 20, fontWeight: 'bold', marginBottom:5 , textTransform: 'capitalize',color:Colors.darkGray},
    content:{ marginTop: 20 ,},
    hdcontent:{ alignSelf: 'center',alignItems:'center' }
  });
  