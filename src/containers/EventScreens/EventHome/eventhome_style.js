import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';


export const styles = StyleSheet.create({
    maincontainer:{ marginTop: 25, marginHorizontal: 20 },
    content:{ flexDirection: 'row', alignItems: 'center' },
    title:{ fontSize: 16, color: Colors.black, fontWeight: 'bold' , fontFamily: 'serif'},
    rev:{
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      right: 5,
    },
    review:{ width: 20, height: 20 },
    txt:{
      marginLeft: 10,
      fontSize: 15,
      color: Colors.black,
      fontWeight: '600',
      fontFamily: 'serif'
    },
    imgback:{ width: '100%', height: 170, marginTop: 10 },
    loc:{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 8, left: 5, },
    location:{ tintColor: Colors.white, width: 25, height: 25 },
    loctxt:{ color: Colors.white, fontWeight: 'bold', fontFamily: 'serif' },
    container:{ marginBottom: 10, marginTop: 10 }
  });
  