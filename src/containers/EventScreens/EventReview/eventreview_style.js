import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../../../config';

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
  markericn: {flexDirection: 'row', alignItems: 'center', marginTop: 5,},
  markericnhdr: {
    justifyContent: 'center',
    borderRadius: 10,
    width: 25,
    height: 38,
    borderRadius: 10,
    alignItems:'center'
  },
  marker: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
  },
  subcontent: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '500',
    width: 300,
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
  txtheadersty: {fontSize: 25, fontWeight: 'bold'},
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
