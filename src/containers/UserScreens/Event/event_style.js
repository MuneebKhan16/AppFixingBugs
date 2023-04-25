import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';


export const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', },
    title: { fontSize: 18, color: Colors.black, fontWeight: 'bold', fontFamily: 'serif', marginLeft: 5 },
    filled: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      right: 5,
    },
    icnfilled: { width: 20, height: 20 },
    review: {
      marginLeft: 10,
      fontSize: 18,
      color: Colors.black,
      fontWeight: 'bold',
      fontFamily: 'serif'
    },
    img: { width: '100%', height: 180, marginTop: 10 },
    loccontainer: { flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 5, },
    locsub: {
      width: 38,
      height: 38,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    location: {
      tintColor: Colors.white, width: 24,
      height: 24,
    },
    loctxt: { color: Colors.white, fontWeight: 'bold', fontSize: 18, fontFamily: 'serif' },
    top:{ marginTop: 30 },
    border:{ borderRadius: 10 }
  });
  