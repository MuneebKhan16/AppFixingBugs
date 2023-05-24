import {StyleSheet, Text, View} from 'react-native';
import {Colors, NavService} from '../../../config';
import {themes} from '../../../config/globalFonts/globalFonts';

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
  post: {
    color: Colors.black,
    fontSize: themes?.fontSize?.large,
    fontFamily: themes?.font?.black,
    marginTop: 30,

    marginLeft: 13,
  },
  top: {marginTop: 30},
  swiper: {height: 200, borderRadius: 15},
  topmerge: {marginTop: 5},
  img: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.purple,
  },
  border: {borderRadius: 20},
  self: {alignSelf: 'center'},
  clr: {Color: '#fff'},
  wrapper: {},
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  shadow0: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
  },
  shadow3: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2.7,

    elevation: 3,
  },
  shadow5: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  marker: {width: 25, height: 25, marginRight: 5},
  location: {
    fontSize: themes?.fontSize?.small,
    fontFamily: themes?.font?.bold,
    color: Colors.darkGray,
    ellipsizeMode: 'middle',
    maxWidth: 150,
  },
});
