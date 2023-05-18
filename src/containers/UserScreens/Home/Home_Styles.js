import { Text, StyleSheet, View } from 'react-native'
import { Colors, NavService, Shadows } from '../../../config';


export const styles = StyleSheet.create({
  header:
  {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: 20,
    textTransform: 'capitalize',
  },
  maincontainer: {
    marginLeft: 15,
    height: 185,
    width: '100%',
    paddingRight: 25
  },
  imgbackground: {
    width: 335 / 3,
    height: 150,
    marginTop: 10,
    borderRadius: 10,
    borderWidth:2,
    borderColor:Colors.purple

  },
  icnstrempty: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    right: 5,
  },
  starempty: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  ftrtitle: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 5,
    textAlign: 'center'
  },
  modalcontainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,

    marginVertical: 10,
    marginLeft: 20,
  },
  mdlmaincontainer: {
    marginVertical: 10,
    alignSelf: 'center',
    marginLeft: 35
  },
  lcntxtinput: {
    fontSize: 20,
    fontWeight: '700',
    width: 250,
  },
  scrlcontainer: { marginTop: 10 },
  modal: { margin: 0, padding: 0, },
  txtinput: { fontSize: 20, marginLeft: 30, },
  btnstyle: {
    marginTop: '5%',
    alignSelf: 'center',
  },
  tch: {
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  imgbg: { borderRadius: 10, },
  mdltxtheader: { marginTop: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 10, paddingLeft: 10, },
  mdlimg: { width: 20, height: 20, },
  mdltxt: { color: Colors.black, alignSelf: 'center', fontSize: 20, fontWeight: '600', marginVertical: 20, },
  txtinputadrs: { borderColor: 'grey', borderRadius: 10, width: '88%', color: Colors.darkGray, marginLeft: 10, fontSize: 16, fontWeight: '600', height: 45 },
  container1: { justifyContent: 'center', alignItems: 'center', flex: 1, },
  txtheadersty: { fontSize: 25, fontWeight: 'bold' }
})