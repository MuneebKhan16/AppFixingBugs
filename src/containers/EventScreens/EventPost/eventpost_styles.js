import { StyleSheet, Text, View } from 'react-native'
import { Colors, NavService } from '../../../config';

export const styles = StyleSheet.create({
    cancel: {
      color: 'rgb(0,88,200)',
      fontSize: 18,
      fontWeight: '600',
    },
    action: { padding: 10, paddingBottom: 20 },
    picker: {
      width: 60,
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: -90,
    },
    contanier: { flex: 1, height: '100%', alignItems: 'center' },
    maincontainer: {
      backgroundColor: '#ededed',
      marginTop: 10,
      width: 300,
      paddingLeft: 15,
      borderRadius: 10,
      height: 50,
    },
    location: {
      backgroundColor: '#ededed',
      marginTop: 10,
      width: 300,
      paddingLeft: 15,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      height: 50
    },
    loc: { width: '90%' },
    marker: { width: 15, height: 18, position: 'absolute', right: 10, tintColor: '#434343' },
    description: { maxHeight: 150, marginLeft: 10, marginTop: 10 },
    descp: {
      height: 150,
      backgroundColor: '#ededed',
      width: 300,
      borderRadius: 10,
      marginTop: 10
    },
    btn: {
      marginTop: 10,
      alignSelf: 'center',
      top: 20,
      width: 300
    },
    sheet: { backgroundColor: 'transparent' },
    top: { marginTop: 60 ,alignSelf:'center'},
    user: { marginTop: 40 },
    mime: { alignItems: 'center' },
    upload: { width: 40, height: 20, resizeMode: 'contain', },
    modal: { margin: 0, padding: 0 },
    posting: { backgroundColor: Colors.purple, borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center', paddingTop: 10, width: '90%', alignSelf: 'center' },
    requriment: { fontSize: 18, color: Colors.white, fontWeight: 'bold' },
    category: { backgroundColor: Colors.purple, paddingHorizontal: 8, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, width: '90%', alignSelf: 'center', padding: 20, alignItems: 'center', justifyContent: 'center' },
    modaltxt: { color: Colors.white, fontWeight: '700', fontSize: 16, lineHeight: 28, paddingHorizontal: 10 ,fontFamily: 'serif'},
  })