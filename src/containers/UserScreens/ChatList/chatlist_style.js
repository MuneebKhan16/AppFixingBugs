import { StyleSheet, Text, View,  Dimensions,
} from 'react-native'

export const styles = StyleSheet.create({
    flex: { flex: 1 },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    list: {
        width: Dimensions.get('window').width * 1,
        paddingTop: 5,
        marginLeft: 30
    },
    content: {
        marginTop: 25,
        width: '110%',
    }
})