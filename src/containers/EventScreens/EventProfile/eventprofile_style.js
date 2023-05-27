import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../../config';
import { themes } from '../../../config/globalFonts/globalFonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  hd1: {
    color: Colors.black,
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.italic,


    marginBottom: 5
  },
  hd2: {
    color: Colors.black,
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.italic,
    marginBottom: 5

  },
  hd3: {
    color: Colors.black,
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.italic,
    marginRight: 5,
    marginBottom: 5,

  },
  txt: {
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.regular, marginBottom: 5, textTransform: 'capitalize', color: Colors.darkGray
  },
  content: { marginTop: 20, },
  hdcontent: { alignSelf: 'center', alignItems: 'center' },

});
