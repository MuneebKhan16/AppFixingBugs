import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';
import { themes } from '../../../config/globalFonts/globalFonts';

export const styles = StyleSheet.create({
  post: {
    marginTop: 20,

    fontSize: themes?.fontSize?.large,
    fontFamily: themes?.font?.extraBold,
    color: Colors.black,
    marginLeft: 10,

    textTransform: 'capitalize',
  },
  btm: { marginBottom: 5 },
  top: { marginTop: 10 }
})