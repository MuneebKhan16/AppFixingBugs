import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../../config';

export const styles = StyleSheet.create({
    scroll: { marginTop: 20, },
    imgbg: { width: '100%', height: 180, borderRadius: 10 },
    titlehdr: { flexDirection: 'row', alignItems: 'center', marginTop: 18 },
    title: { color: Colors.black, fontWeight: 'bold', fontSize: 18,  },
    date: { fontSize: 16,  },
    subtitle: { fontWeight: '600', marginTop: 10,  },
    markericn: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    markericnhdr: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      width: 30,
      height: 38,
      borderRadius: 10,
  
    },
    marker: {
      width: 22,
      height: 22,
      resizeMode: 'contain',
      marginRight: 10
    },
    subcontent: { color: Colors.black, fontWeight: '700',  },
    heading: {
      marginVertical: 5,
      fontSize: 20,
      color: Colors.black,
      fontWeight: 'bold',
      
      marginTop: 10,
      textTransform: 'capitalize',
    },
    container1:{justifyContent:'center',alignItems:'center',flex:1,},
    txtheadersty:{fontSize:25,fontWeight:'bold'}
  });
  