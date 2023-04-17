// import {
//   StyleSheet,
//   Text,
//   SafeAreaView,
//   Image,
//   View,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import React,{
//   useState
// } from 'react';
// import AppBackground from '../../../components/AppBackground';
// import CustomBackground from '../../../components/CustomBackground';
// import Images from '../../../assets/Images';
// import {Colors} from '../../../config';
// import CustomButton from '../../../components/CustomButton';
// import Icons from '../../../assets/Icons';
// import {NavService} from '../../../config';
// import { useEffect } from 'react';
// import SplashScreen from 'react-native-splash-screen';


// const Starter = () => {
  
//   useEffect(()=>{
//     SplashScreen.hide()
//   },[])


//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: Colors.backgroundColor,
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <View
//         style={{
//           flex: 4.8,
//           backgroundColor: Colors.backgroundColor,
//           width: '100%',
//         }}>
//         <Image
//           style={{
//             height: '100%',
//             width: '100%',
//           }}
//         />
//       </View>

//       <View
//         style={{
//           flex: 5.2,
//           width: '100%',
//           // alignItems: 'center',
//         }}>
//         <View
//           style={{
//             marginTop: '12%',
//             marginHorizontal: '5%',
//           }}>
//           <Text style={styles.headerTitle}>Explore top decorating</Text>
//           <Text style={styles.headerTitle}>brands for you</Text>
//           <View
//             style={{
//               marginTop: 10,
//             }}>
//             <Text style={styles.bottomTitle}>Discover best decorating</Text>
//             <Text style={styles.bottomTitle}>for your dream home</Text>
//           </View>
//         </View>
//         <CustomButton
//           nextBtn
//           onPress={() => {
//             NavService.navigate('PreLogin');
//           }}
//           buttonStyle={{
//             width: Dimensions.get('window').width * 0.4,
//             marginLeft: '5%',
//             paddingRight: 20,
//           }}
//           textStyle={{
//             fontWeight:"600"
//           }}
//           title="Log In"
//         />
//        <TouchableOpacity 
//        onPress={()=>{
//         NavService.navigate("Signup")
//        }}
//        style={{
//         // backgroundColor:"red",
//         width: 100,
//         height:40,
//         alignItems:"center",
//         justifyContent: "center",
//         marginTop: "10%"
//        }} >
//         <Text style={{
//           fontSize:18,
//           color: Colors.white
//         }} >Sign Up</Text>
//        </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default Starter;

// // const styles = StyleSheet.create({
// //   headerTitle: {
// //     color: Colors.white,
// //     fontSize: 26,
// //     fontWeight: '800',
// //     paddingVertical: 2,
// //   },
// //   bottomTitle: {
// //     color: Colors.grey,
// //     fontSize: 16,
// //     fontWeight: '400',
// //   },
// // });
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useDispatch} from 'react-redux';

// import * as authActions from '../store/actions/auth';
import Icons from '../../../assets/Icons';
import Images from '../../../assets/Images';

const Starter = ({navigation}) => {
  

  useEffect(() => {
   
    setTimeout(() => {
      navigation.navigate('PreLogin');
    }, 2000);

    // getUser();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="" />
      {/* <Image source={Images.logo} resizeMode="cover" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Starter;
