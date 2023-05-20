import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';
import { themes } from '../../../config/globalFonts/globalFonts';

export const styles = StyleSheet.create({
  container: { marginTop: 30, marginHorizontal: 0 ,},
  header: { flexDirection: 'row', alignItems: 'center' },
  title: {
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.extraBold,
    color: Colors.black,
    marginLeft: 8,
  },
  filled: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
  },
  icnfilled: { width: 15, height: 15 },
  review: {
    marginLeft: 10,
    color: Colors.black,
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.extraBold,
  },
  empty: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  img: { width: '100%', height: 180, marginTop: 10,},
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
  },
  location: {
    tintColor: Colors.white, width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  locationtxt: { color: Colors.white,fontSize: themes?.fontSize?.small,
    fontFamily: themes?.font?.bold, width: '88%', marginLeft: 5 },
  border: { borderRadius: 20,borderColor:Colors.purple,borderWidth:3 ,}
});
