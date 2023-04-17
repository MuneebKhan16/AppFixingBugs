import { Text, StyleSheet, View } from 'react-native'
import { Colors, NavService, Shadows } from '../../../config';


export const styles = StyleSheet.create({
    header:
    {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
        marginLeft: 25,
    },
    maincontainer: {
        marginLeft: 25,
        height: 170,
    },
    imgbackground: {
        width: 330 / 3,
        height: 150,
        marginTop: 10,
        borderRadius: 10,

    },
    icnstrempty:{
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        position: 'absolute',
        right: 5,
      },
      starempty:{
        width: 22,
        height: 22,
        resizeMode: 'contain',
      },
      ftrtitle:{
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center',
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 20,
      },
      modalcontainer:{
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
      },
      mdlmaincontainer:{
        alignItems: 'center',
        alignSelf: 'center',

        marginVertical: 10,
        marginLeft: 20,
      },
      lcntxtinput:{
        fontSize: 20,
        fontWeight: '500',
        width: 250,
      },
      scrlcontainer:{ marginTop: 10 },
      modal:{ margin: 0, padding: 0 },
      txtinput:{ fontSize: 18 },
      btnstyle:{
        marginTop: '5%',
        alignSelf: 'center',
      },
      tch:{
        marginHorizontal: 5,
      },
      imgbg:{ borderRadius: 10 }
})