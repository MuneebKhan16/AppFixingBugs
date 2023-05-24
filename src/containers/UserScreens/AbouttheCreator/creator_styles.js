import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';
import { themes } from '../../../config/globalFonts/globalFonts';
export const styles = StyleSheet.create({
    main: { marginTop: 20, },
    heading: {
        marginLeft: 14,
        marginTop: 20,
        color: Colors.purple,
        fontWeight: 'bold',
        fontSize: 20,
        fontStyle: 'italic'
    },
    subheading: {
        // textDecorationLine: 'underline',
      fontWeight:'bold',
        marginTop: 10,
        fontSize: themes?.fontSize?.medium,
        // fontFamily: themes?.font?.extraBold,
       color:Colors.black,
        marginLeft: 10,
        marginRight: 2,
        letterSpacing:1,
    },
    top:{ marginTop: 30 }

})