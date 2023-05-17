import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';


export const styles = StyleSheet.create({
    maincontainer:{ marginTop: 25, marginHorizontal: 20 },
    content:{ flexDirection: 'row', alignItems: 'center' },
    title:{ fontSize: 19, color: Colors.black, fontWeight: 'bold' , textTransform: 'capitalize',marginLeft:8},
    rev:{
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      right: 5,
    },
    review:{ width: 13, height: 13 },
    txt:{
      marginLeft: 10,
      fontSize: 18,
      color: Colors.black,
      fontWeight: 'bold',
      marginRight:5
    },
    imgback:{ width: '100%', height: 170, marginTop: 10 ,borderRadius:10,borderWidth:2,borderColor:Colors.purple},
    loc:{ flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 12, left: 5, },
    location:{ tintColor: Colors.white, width: 20, height: 20, },
    loctxt:{ color: Colors.white, fontWeight: 'bold',  textTransform: 'capitalize',fontSize:17 ,width:250},
    container:{ marginBottom: 10, marginTop: 10, },
    img:{ borderRadius: 10 },
    container1:{justifyContent:'center',alignItems:'center',flex:1,},
    txtheadersty:{fontSize:20,fontWeight:'bold', textTransform: 'capitalize',}
  });
  