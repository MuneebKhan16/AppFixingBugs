import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';
import { themes } from '../../../config/globalFonts/globalFonts';
export const styles = StyleSheet.create({
    main: { marginTop: 20 },
    heading: {
        marginLeft: 14,
        marginTop: 20,
        color: Colors.purple,
        fontWeight: 'bold',
        fontSize: 20,
        fontStyle: 'italic'
    },
    subheading: {
        textDecorationLine: 'underline',
      
        marginTop: 10,
        fontSize: themes?.fontSize?.medium,
        fontFamily: themes?.font?.bold,
       color:Colors.darkGray,
        marginLeft: 10,
        marginRight: 2
    },
    top:{ marginTop: 30 }

})