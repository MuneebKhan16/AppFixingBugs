import { StyleSheet, Text, View,Dimensions } from 'react-native'
import { Colors, NavService } from '../../../config';
const { width, height } = Dimensions.get('window');

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
  description: { maxHeight: 150, marginLeft: 10, marginTop: 10, color: Colors.black },
  descp: {
    height: 150,
    backgroundColor: '#ededed',
    width: 300,
    borderRadius: 10,
    marginTop: 10
  },
  btn: {
    alignSelf: 'center',
    top: 20,
    width: 300
  },
  sheet: { backgroundColor: 'transparent' },
  top: { marginTop: 50, alignSelf: 'center',height:500 },
  user: { marginTop: 40 },
  mime: { alignItems: 'center', justifyContent: 'center', width: 300, height: 150 },
  upload: { width: 50, height: 20, resizeMode: 'contain', color: Colors.black, },
  modal: { margin: 0, padding: 0 },
  posting:
  {
    backgroundColor: Colors.purple,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
    width: '95%', 
    alignSelf: 'center'
  },
  requriment: { fontSize: 17, color: Colors.white, fontWeight: 'bold',marginLeft:20 },
  category: { backgroundColor: Colors.purple, 
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10, 
    width: '95%', 
    alignSelf: 'center', 
    alignItems: 'center',
     justifyContent: 'center',
     },
  modaltxt: { color: Colors.white, fontWeight: '700', fontSize: 16, paddingHorizontal: 10, textTransform: 'capitalize' },

  txtclr: { color: Colors.black },
  container: {
    flex: 1,
    alignItems: 'center',
    height:height * 1.1
    
  },
  searchBox: {
    width: '90%',
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
  description: {
    fontSize: 16,
    color:Colors.black
  },
  selectedPlace: {
    marginTop: 10,
    alignItems: 'center',
  },
})
