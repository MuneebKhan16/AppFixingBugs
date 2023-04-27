import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';

export const styles = StyleSheet.create({
    container: { marginTop: 30, marginHorizontal: 8 },
    header: { flexDirection: 'row', alignItems: 'center' },
    title: { fontSize: 18, color: Colors.black, fontWeight: 'bold', marginLeft: 5, fontFamily: 'serif' },
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
      fontWeight: '700',
      fontFamily: 'serif',
      textTransform: 'capitalize',
    },
    empty: {
      width: 22,
      height: 22,
      resizeMode: 'contain',
    },
    img: { width: '100%', height: 180, marginTop: 10 },
    imgbg: {
      width: 38,
      height: 38,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      position: 'absolute',
      right: 10,
    },
    icnloc: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      position: 'absolute',
      bottom: 10,
      left: 8,
    },
    location: {
      tintColor: Colors.white, width: 22,
      height: 22,
      resizeMode: 'contain',
    },
    locationtxt: { color: Colors.white, fontWeight: 'bold', fontSize: 18, fontFamily: 'serif', textTransform: 'capitalize', },
    border:{ borderRadius: 10 }
  });
  