import { StyleSheet } from 'react-native';
import {Colors, NavService} from '../../../config';


export const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        alignItems: 'center',
        width: '90%',
    },
    container: {
        alignItems: 'center',
        width: '95%',
        backgroundColor: 'rgba(118,158,190,300)',
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: Colors.white,
        paddingHorizontal: 10,
        paddingVertical: 15
    }

})