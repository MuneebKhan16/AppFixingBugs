import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';

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
        fontWeight: '500',
        marginTop: 10,
        fontSize: 18,
        color: '#5A5A5A',
        marginLeft: 10,
        marginRight: 2
    },
    top:{ marginTop: 30 }

})