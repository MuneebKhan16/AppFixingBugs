import {StyleSheet} from 'react-native';
import {Colors, NavService} from '../../../config';
import {themes} from '../../../config/globalFonts/globalFonts';

export const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  container: {
    alignItems: 'center',
    width: '95%',
    backgroundColor: 'rgba(118,158,190,300)',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  touchable: {
    alignSelf: 'center',
    marginTop: 20,
  },
  btn: {
    marginTop: '10%',
  },
  btm: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  btmtxt: {
    fontSize: themes?.fontSize?.extraSmall,
    fontFamily: themes?.font?.bold,
    color: Colors.white,
  },
  heading: {
    fontSize: themes?.fontSize?.extraSmall,
    fontFamily: themes?.font?.extraBold,
    color: Colors.white,
    textDecorationLine: 'underline',
  },
  btmheader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
