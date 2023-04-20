import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';

export const styles = StyleSheet.create({
    upload: { fontWeight: 'bold' },
    touchable: {
      backgroundColor: 'white',
      borderRadius: 10,
      paddingVertical: 12,
      alignItems: 'center',
    },
    cancel: {
      color: 'rgb(0,88,200)',
      fontSize: 18,
      fontWeight: '600',
    },
    action: { padding: 10, paddingBottom: 20 },
    profile: {
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 40,
    },
    picker: {
      width: 60,
      height: 35,
      // borderRadius: 35 / 2,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: -90
    },
    btn: { alignSelf: 'center', marginTop: 50 },
    tags: { fontSize: 25, marginLeft: 10 },
    check: { marginVertical: 10, flexDirection: 'row', },
    box: { marginVertical: 10, flexDirection: 'row', marginTop: 100 },
    content:{
      alignItems: 'center',
      flexGrow: 1,
      marginTop: 30
    },
    flex:{flex:1},
    top:{ marginBottom: 20 },
    backbg:{ backgroundColor: 'transparent' },
    btm:{ marginBottom: 30 },
    item:{ alignItems: 'center' },
    uploadimg:{ width: 20, height: 20, resizeMode: 'contain' },
    center:{ alignSelf: 'center' },
    txt:{ fontSize: 25, marginLeft: 10 }
  })