import { StyleSheet, Text, View } from 'react-native';
import { Colors, NavService } from '../../../config';
import { themes } from '../../../config/globalFonts/globalFonts';

export const styles = StyleSheet.create({
  maincontainer: { marginTop: 25, marginHorizontal: 20 },
  content: { flexDirection: 'row', alignItems: 'center' },
  title: {
    fontFamily: themes?.font?.black,
    fontSize: themes?.fontSize?.medium,
    color: Colors.black,
    textTransform: 'capitalize',
    marginLeft: 8,
  },
  rev: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
  },
  review: { width: 13, height: 13 },
  txt: {
    marginLeft: 10,
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.extraBold,
    color: Colors.black,
    marginRight: 5,
  },
  imgback: {
    width: '100%',
    height: 170,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.purple
  },
  loc: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 12,
    left: 5,
  },
  location: { tintColor: Colors.white, width: 20, height: 20 },
  loctxt: {
    color: Colors.white,
    textTransform: 'capitalize',
    fontFamily: themes?.font?.bold,
    fontSize: themes?.fontSize?.medium,
    width: 240,
  },
  container: { marginBottom: 10, marginTop: 10 },
  img: { borderRadius: 10 },
  container1: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  txtheadersty: {
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.italic,
    color: 'grey'
  },
});
