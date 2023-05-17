import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';


export const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', },
    title: { fontSize: 16, color: Colors.black,   marginLeft: 5 , fontWeight:'bold'},
    filled: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      right: 5,
    },
    icnfilled: { width: 16, height: 16 },
    review: {
      marginLeft: 10,
      fontSize: 16,
      color: Colors.black,
      fontWeight:'bold',
      
    },
    img: { width: '100%', height: 200, marginTop: 10 ,borderRadius:10,borderWidth:2,borderColor:Colors.purple},
    loccontainer: { flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 5,},
    locsub: {
      width: 30,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginLeft:5
    },
    location: {
      tintColor: Colors.white, width: 16,
      height: 16,
    },
    loctxt: { color: Colors.white, fontWeight: '400', fontSize: 14,  marginRight:10,width:250 },
    top:{ marginTop: 30 },
    border:{ borderRadius: 20 },
    container1:{justifyContent:'center',alignItems:'center',flex:1,},
    txtheadersty:{fontSize:25,fontWeight:'bold'}
  });
  