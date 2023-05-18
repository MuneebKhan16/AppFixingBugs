import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../config';
import { themes } from '../../../config/globalFonts/globalFonts';

export const styles = StyleSheet.create({
  scroll: {marginTop: 20},
  imgbg: {width: '100%', height: 180, borderRadius: 10},
  titlehdr: {flexDirection: 'row', alignItems: 'center', marginTop: 18},
  title: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  date: {fontSize: 17, color: Colors.darkGray, marginLeft: 5},
  subtitle: {marginTop: 10, fontSize: 17, color: Colors.black, marginLeft: 5},
  markericn: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  markericnhdr: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 30,
    height: 38,
    borderRadius: 10,
  },
  marker: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  subcontent: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '500',
    width: 250,
  },
  heading: {
    marginVertical: 5,
    fontSize: 20,
    color: Colors.black,
    fontWeight: 'bold',

    marginTop: 10,
    textTransform: 'capitalize',
  },
  container1: {justifyContent: 'center', alignItems: 'center', flex: 1},
  txtheadersty: {
    fontSize: themes?.fontSize?.medium,
    fontFamily:themes?.font?.italic,
    color:'grey'
  },
  imgback: {
    width: '100%',
    height: 170,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.purple,
  },
  img: {borderRadius: 10},
});
