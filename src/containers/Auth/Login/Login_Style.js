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
    },
touchable:{
    alignSelf:"center",
    marginTop:20
  },
  btn:{
    marginTop: '10%',
  },
  btm:{
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
  },
  btmtxt:{
    fontSize: 15,
    fontWeight: '400',
    color: Colors.white,
  },
  heading:{
    fontWeight: '600',
    color: Colors.white,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  btmheader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
})