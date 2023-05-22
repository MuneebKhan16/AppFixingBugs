import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';
import { themes } from '../../../config/globalFonts/globalFonts';


export const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', },
  title: {
    color: Colors.black,
    marginLeft: 5,
    fontSize: themes?.fontSize?.large,
    fontFamily: themes?.font?.extraBold
  },
  filled: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
  },
  icnfilled: { width: 16, height: 16 },
  review: {
    marginLeft: 10,
    color: Colors.black,
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.extraBold,

  },
  img: { width: '100%', height: 200, marginTop: 10, borderRadius: 10, borderWidth: 2, borderColor: Colors.purple },
  loccontainer: { flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 5, },
  locsub: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 5
  },
  location: {
    tintColor: Colors.white, width: 16,
    height: 16,
  },
  loctxt: {
    color: Colors.white, fontSize: themes?.fontSize?.small,
    fontFamily: themes?.font?.bold, marginRight: 10, width: 250
  },
  top: { marginTop: 30 },
  border: { borderRadius: 20 },
  container1: { justifyContent: 'center', alignItems: 'center', flex: 1, },
  txtheadersty: {
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.italic,
    color: 'grey'
  }
});
