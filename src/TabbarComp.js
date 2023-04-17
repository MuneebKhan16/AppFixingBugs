// import React from 'react';
// import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
// import Device from './config/Helpers/Devices';
// import {Colors, Icon} from './config';
// import Icons from './assets/Icons';

// export default class TabbarComp extends React.Component {
//   render() {
//     const {state, descriptors, navigation} = this.props;
//     if (state.index == 1) return null;
//     return (
//       <View
//         style={{
//           padding: 20,
//           paddingTop: 0,
//           backgroundColor: Colors.drawer,
//         }}>
//         <View
//           style={{
//             backgroundColor: Colors.drawer,
//             flexDirection: 'row',
//             overflow: 'hidden',
//             width: 380,
//             alignSelf: 'center',
//           }}>
//           {state.routes.map((route, index) => {
//             const isFocused = state.index === index;
//             const onPress = () => {
//               if (route.name === 'Chat') {
//                 navigation.navigate('Chat', {screen: 'Chat'});
//               } else {
//                 navigation.navigate(route.name);
//               }
//             };
//             let imageSrc = Icons.home;
//             if (route.name === 'Home') imageSrc = Icons.home;
//             if (route.name === 'Chat') imageSrc = Icons.chat;
//             if (route.name === 'Profile') imageSrc = Icons.profile;
//             return (
//               <TouchableOpacity
//                 key={index}
//                 accessibilityState={isFocused ? {selected: true} : {}}
//                 accessibilityRole="button"
//                 activeOpacity={0.8}
//                 onPress={onPress}
//                 style={styles.tabs}>
//                 <View
//                   style={{

//                     height: 45,
//                     width: isFocused ? 92 : 38,
//                     alignItems: 'center',
//                     shadowColor: '#000',
//                     shadowOffset: {
//                       width: 0,
//                       height: 2,

//                     },
//                     shadowOpacity: 0.25,
//                     shadowRadius: 3.84,
//                     elevation: isFocused ? 5 : 0,
//                     paddingVertical: 2,

//                   }}>
//                   <Image
//                     source={imageSrc}
//                     style={{
//                       height: 25,
//                       width: 25,
//                       tintColor: Colors.white,
//                     }}
//                     resizeMode="contain"
//                   />

//                     <Text
//                       style={{
//                         color: Colors.white,
//                         fontSize: 16,
//                         fontWeight: '500',

//                       }}>
//                       {route.name}
//                     </Text>

//                 </View>
//                 {/* {isFocused ? (
//                 <View
//                   style={{
//                     width: 16,
//                     height: 16,
//                     borderRadius: 16,
//                     // borderBottomRightRadius: 16,
//                     // borderBottomEndRadius: 16,
//                     backgroundColor: '#F1668D',
//                     position: 'absolute',
//                     top: -8,
//                   }}
//                 />
//               ) : null} */}
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   tabs: {
//     flex: 1,
//     paddingVertical: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   },
// });
import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Colors, Icon} from './config';
import Icons from './assets/Icons';
import {NavService} from '../src/config';
import LinearGradient from 'react-native-linear-gradient';
import RNBounceable from "@freakycoder/react-native-bounceable";
export default class TabbarComp extends React.Component {
  render() {
    const {state, navigation} = this.props;
    return (
      <View style={{backgroundColor: Colors.background,}}>
        <LinearGradient
          colors={['#4B0082', '#260041']}
          style={{
            flexDirection: 'row',
            overflow: 'hidden',
            justifyContent: 'space-around',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              navigation.navigate(route.name);
            };

            let imageSrc = isFocused ? Icons.homelist : Icons.home;
            if (route.name === 'Featured')
              imageSrc = isFocused ? Icons.eventlist : Icons.celendar;
              
            if (route.name === 'ChatList')
              imageSrc = isFocused ? Icons.chatlist : Icons.chat;
            if (route.name === 'Profile')
              imageSrc = isFocused ? Icons.userprofile : Icons.profile;

            // if (route.name === 'Add') {
            //   return (
            //     <View
            //       style={{
            //         flex: 1,
            //         height: 75,
            //         width: 75,
            //         borderBottomLeftRadius: 75 / 2,
            //         borderBottomRightRadius: 75 / 2,
            //         marginTop: -75 / 2,
            //       }}></View>
            //   );
            // }

            return (
              <RNBounceable
                key={index}
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityRole="button"
                activeOpacity={0.8}
                onPress={onPress}
                style={{
                  marginBottom: 5,
                  height: 60,
                  alignItems: isFocused ? null : 'center',
                  justifyContent:isFocused ? null : 'center'
                }}>
                <Image
                  source={imageSrc}
                  style={{
                    height:  isFocused ? 40 : 25,
                    width: isFocused ? 40 : 25,
                    tintColor: isFocused ? null : Colors.lightGrey
                    
                  }}
                  resizeMode="contain"
                />
              </RNBounceable>
            );
          })}
        </LinearGradient>
      </View>
    );
  }
}

export const styles = StyleSheet.create({

});
