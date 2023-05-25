import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Colors, NavService } from '../../../config';
import { Platform } from 'react-native';
import { themes } from '../../../config/globalFonts/globalFonts';
const { width, height } = Dimensions.get('window')
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
    marginTop: -80,
  },
  contanier: { flex: 1, height: '100%', alignItems: 'center' },
  maincontainer: {
    backgroundColor: '#ededed',
    marginTop: 10,
    width: 300,
    paddingLeft: 15,
    borderRadius: 10,
    height: 50,
    color: Colors.black

  },
  location: {
    backgroundColor: '#ededed',
    marginTop: 20,
    width: 300,
    paddingLeft: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    color: Colors.black
  },
  loc: { width: '90%', color: Colors.black },
  marker: { width: 15, height: 18, position: 'absolute', right: 10, tintColor: '#434343' },
  description: { maxHeight: 150, marginLeft: 10, marginTop: 10, color: Colors.black ,},
  descp: {
    height: 120,
    backgroundColor: '#ededed',
    width: 300,
    borderRadius: 10,
    marginTop: 10,
    
  },
  btn: {
    alignSelf: 'center',
    width: 300
  },
  sheet: { backgroundColor: 'transparent' },
  top: { marginTop: 20, alignSelf: 'center', height: 500 },
  user: { marginTop: 40, height: 150, },
  // mime: { alignItems: 'center', width: 300, height: 100, },
  top: { marginTop: 30, alignSelf: 'center', height: 500 },
  user: { marginTop: 40 },
  mime: { alignItems: 'center', width: 300, height: 150 },
  upload: { width: 50, height: 20, resizeMode: 'contain', color: Colors.black,marginLeft:10 },
  modal: { margin: 0, padding: 15, },
  posting:{
    backgroundColor: Colors.purple,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
    width: '95%',
    alignSelf: 'center'
  },
  requriment: {

    fontSize: themes?.fontSize?.large,
    fontFamily: themes?.bold,
    color: Colors.white,
    marginLeft: 20,
    marginTop:15
  },
  category: {
    backgroundColor: Colors.purple,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: '95%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modaltxt: {
    color: Colors.white,
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.bold,
    paddingHorizontal: 10,
    textTransform: 'capitalize'
  },

  txtclr: { color: Colors.black },
  container: {
    flex: 1,
    alignItems: 'center',
    height: Platform.select({
      android: 870,
      ios: 1100,
    }),
  },
  searchBox: {
    width: '90%',
  },
  containers: {
    width: 141,
    borderRadius: 20,
    color:Colors.black,
    marginVertical:10,
    backgroundColor:'#ededed',
    marginHorizontal:5

  },
  listView: {
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#DDD',
    position: 'absolute',
    top: 55,
    left: 5,
    right: 5,
    borderRadius: 5,
    maxHeight: 200,
  },
  separator: {
    backgroundColor: '#DDD',
    height: 1,
    color: Colors.black
  },
  // description: {
  //   fontSize: 16,
  //   color: Colors.black,
  //   marginLeft: 10,
  //   marginTop:Platform.OS === 'ios' ? 10 :null,
  // },
  selectedPlace: {
    marginTop: 10,
    alignItems: 'center',
  },
  city: {
    backgroundColor: '#ededed',
    marginTop: 10,
    width: 150,
    paddingLeft: 15,
    borderRadius: 10,
    height: 50,
    color: Colors.black,
    marginRight: 5
  },
  state: {
    backgroundColor: '#ededed',
    marginTop: 10,
    width: 150,
    paddingLeft: 15,
    borderRadius: 10,
    height: 50,
    color: Colors.black
  },
  city: {
    backgroundColor: '#ededed',
    marginTop: 10,
    width: 140,
    paddingLeft: 15,
    borderRadius: 10,
    height: 50,
    color: Colors.black,
    justifyContent: 'center'
  },
  state: {
    backgroundColor: '#ededed',
    marginTop: 10,
    width: 150,
    paddingLeft: 15,
    borderRadius: 10,
    height: 50,
    color: Colors.black,
    marginLeft: 10,
    justifyContent: 'center'

  },
  item: { alignItems: 'center', justifyContent: 'center', width: 300, height: 50,marginTop:-20 },
  uploadimg: { width: 20, height: 20, resizeMode: 'contain' },



})