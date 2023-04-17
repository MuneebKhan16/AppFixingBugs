
import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    ScrollView
} from 'react-native';

import Basic from '../../../components/basic';
import SectionList from '../../../components/sectionlist';
import PerRowConfig from '../../../components/per_row_config';
import StandloneSwipeRow from '../../../components/standalone_swipe_row';
import SwipeToDelete from '../../../components/swipe_to_delete';
import SwipeValueBasedUi from '../../../components/swipe_value_based_ui';
import {Colors} from '../../../config';
import CustomButton from '../../../components/CustomButton';
import AppBackground from '../../../components/AppBackground';
import SwipeableRow from '../../../components/SwipeableRow';
import {CreditCardInput} from 'react-native-credit-card-input';
import Icons from '../../../assets/Icons';
const width = Dimensions.get('window').width;
import Modal from "react-native-modal";
import Images from '../../../assets/Images';
import { SwipeListView } from 'react-native-swipe-list-view';
// const componentMap = {
//   Basic,
//   SectionList,
//   PerRowConfig,
//     StandloneSwipeRow,
//     SwipeToDelete,
//     SwipeValueBasedUi,
//   };
  
  export default function CardDetails() {
    // const [cardNumber, setCardNumber] = useState('121212212122');
    // const [cardholderName, setCardholderName] = useState('');
    // const [cardExpiry, setCardExpiry] = useState('');
    // const [cardCVV, setCardCVV] = useState('');
    // const [text, onChangeText] = useState('Useless Text');
    // const [number, onChangeNumber] = useState(null);
    
    // let hide = false;
    // const [mode, setMode] = useState('Basic');

    // const renderExample = () => {
    //     const Component = componentMap[mode];
    //     return <Component />;
    // };

    return (
      <AppBackground
      marginHorizontal={true}
      title={'Card Details'}
      profile={false}
      back
      home>
        <SwipeListView
            showsVerticalScrollIndicator={true}
            // data={selectedGamesData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              // console.log('item.lenght',item.lenght)
              return (
                <>
                  <TouchableOpacity
                    style={{ borderColor: "#000000", borderWidth: 2, borderRadius: 10, backgroundColor: "#ffffff", marginVertical: 8, width: "88%", alignSelf: "center" }}
                    // key={index}
                    onLongPress={() => handlerLongClick(item?.id, index)}
                    activeOpacity={0.9}
                    onPress={() => onPress(item?.id)}
                  >
                    <Text style={styles.listName}>Hello</Text>

                  </TouchableOpacity>
                  <View style={styles.rowBack}>
                    {long == item?.id ?
                      <Modal
                        backdropOpacity={1}
                        onBackButtonPress={() => setModalVisible(!modalVisible)}
                        onBackdropPress={() => setModalVisible(!modalVisible)}
                        animationIn="fadeIn"
                        transparent={true}
                        isVisible={modalVisible}
                        backdropColor="#00000090"
                      >
                        <StatusBar
                          barStyle="dark-content"
                          backgroundColor={'#00000090'}
                        //translucent={true}
                        />
                        <View style={styles.centeredView}>
                          <View style={styles.modalView}>
                            <TextInput
                              onChangeText={text => setupdateName(text)}
                              value={updateName}
                              placeholder={'Heloo'}
                              style={styles.input}
                              placeholderTextColor="#000"
                            />
                            <TouchableOpacity onPress={(e) => Submit(e)} style={styles.btn}>
                              {/* <Image
                                style={styles.tic}
                                source={require('../../images/src/tic.png')}
                              /> */}
                              {/* <Text style={styles.add}>Add</Text> */}
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal> :
                      null
                    }
                  </View>
                </>

              )
            }}
            renderHiddenItem={({ item, index }) => (
              <View style={styles.rowBack} >
                <TouchableOpacity
                  onPress={() => deleteName(item?.id)}
                  style={styles.rowBack}>
                  <Image style={{ width: 25, height: 25, resizeMode: "contain" }} source={Icons.delete} />
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={() => (
              <View style={{ height: 100 }}></View>
            )}
            // leftOpenValue={75}
            rightOpenValue={-75}
          >
          </SwipeListView>
        {/* <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.switchContainer}>
            </View>
            {renderExample()}
            <View
        style={{
          flex: 1,
          alignItems: 'center',
          // justifyContent: 'center',
        }}>
          <View style={{
            borderBottomWidth:1,
            borderBottomColor:Colors.grey,
            width:'80%'
          }}>
          </View>
        <View
          style={{
            width: '100%',
            marginTop: 20,
          }}>
          <View
            style={{
              width: '85%',
              backgroundColor: Colors.white,
              alignItems: 'center',
              alignSelf: 'center',
              padding: 10,
              borderRadius: 10,
              flexDirection: 'row',
              paddingVertical: 12,
            }}>
            <Image
              source={Icons.credit}
              resizeMode="contain"
              style={{width: 20, height: 20}}
            />
            <TextInput
              style={{width: '80%', marginLeft: 10}}
              onChangeText={onChangeNumber}
              placeholder="Card Number"
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              width: '85%',
              backgroundColor: Colors.white,
              alignItems: 'center',
              alignSelf: 'center',
              padding: 10,
              borderRadius: 10,
              flexDirection: 'row',
              paddingVertical: 12,
              marginTop: 10,
            }}>
            <Image
              source={Icons.user}
              resizeMode="contain"
              style={{width: 20, height: 20}}
            />
            <TextInput
              style={{width: '80%', marginLeft: 10}}
              onChangeText={onChangeNumber}
              placeholder="Card Holder Name"
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf:'center'
            }}>
               <View
            style={{
              width: '40%',
              backgroundColor: Colors.white,
              alignItems: 'center',
              alignSelf: 'center',
              padding: 10,
              borderRadius: 10,
              flexDirection: 'row',
              paddingVertical: 12,
              marginTop: 15,
              marginRight:22
            }}>
            <Image
              source={Icons.date}
              resizeMode="contain"
              style={{width: 20, height: 20}}
            />
            <TextInput
              style={{width: '80%', marginLeft: 10}}
              onChangeText={onChangeNumber}
              placeholder="Expiry Date"
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              width: '40%',
              backgroundColor: Colors.white,
              alignItems: 'center',
              alignSelf: 'center',
              padding: 10,
              borderRadius: 10,
              flexDirection: 'row',
              paddingVertical: 12,
              marginTop: 15,
            }}>
            <Image
              source={Icons.lock}
              resizeMode="contain"
              style={{width: 20, height: 20}}
            />
            <TextInput
              style={{width: '80%', marginLeft: 10}}
              onChangeText={onChangeNumber}
              placeholder="CVV"
              keyboardType="numeric"
            />
          </View>
            </View>
          <CustomButton
            title="Pay"
            buttonStyle={{
              alignSelf: 'center',
            }}
            textStyle={{
              fontWeight: '600',
            }}
          />
        </View>
      </View>
        </ScrollView> */}
         </AppBackground>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     backgroundColor: 'white',
    // },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
        backgroundColor:'red'
    },
    // switch: {
    //     alignItems: 'center',
    //     width: Dimensions.get('window').width / 3,
    // },
});

//... note: your data array objects MUST contain a key property 
//          or you must pass a keyExtractor to the SwipeListView to ensure proper functionality
//          see: https://reactnative.dev/docs/flatlist#keyextractor

// import {Colors} from '../../../config';
// import CustomButton from '../../../components/CustomButton';
// import AppBackground from '../../../components/AppBackground';
// import SwipeableRow from '../../../components/SwipeableRow';
// import {CreditCardInput} from 'react-native-credit-card-input';
// import Icons from '../../../assets/Icons';
// const width = Dimensions.get('window').width;

// const CardDetails = () => {
//   const [cardNumber, setCardNumber] = useState('121212212122');
//   const [cardholderName, setCardholderName] = useState('');
//   const [cardExpiry, setCardExpiry] = useState('');
//   const [cardCVV, setCardCVV] = useState('');
//   const [text, onChangeText] = useState('Useless Text');
//   const [number, onChangeNumber] = useState(null);

//   let hide = false;

//   return (
//     <AppBackground
//       marginHorizontal={true}
//       title={'Card Details'}
//       profile={false}
//       back
//       home>
//       <View
//         style={{
//           flex: 1,
//           alignItems: 'center',
//           // justifyContent: 'center',
//         }}>
//           <View style={{
//             borderBottomWidth:1,
//             borderBottomColor:Colors.grey,
//             marginTop:20,
//             width:'80%'
//           }}>
//           </View>
//         <View
//           style={{
//             width: '100%',
//             marginTop: 20,
//           }}>
//           <View
//             style={{
//               width: '85%',
//               backgroundColor: Colors.white,
//               alignItems: 'center',
//               alignSelf: 'center',
//               padding: 10,
//               borderRadius: 10,
//               flexDirection: 'row',
//               paddingVertical: 12,
//             }}>
//             <Image
//               source={Icons.credit}
//               resizeMode="contain"
//               style={{width: 20, height: 20}}
//             />
//             <TextInput
//               style={{width: '80%', marginLeft: 10}}
//               onChangeText={onChangeNumber}
//               placeholder="Card Number"
//               keyboardType="numeric"
//             />
//           </View>
//           <View
//             style={{
//               width: '85%',
//               backgroundColor: Colors.white,
//               alignItems: 'center',
//               alignSelf: 'center',
//               padding: 10,
//               borderRadius: 10,
//               flexDirection: 'row',
//               paddingVertical: 12,
//               marginTop: 15,
//             }}>
//             <Image
//               source={Icons.user}
//               resizeMode="contain"
//               style={{width: 20, height: 20}}
//             />
//             <TextInput
//               style={{width: '80%', marginLeft: 10}}
//               onChangeText={onChangeNumber}
//               placeholder="Card Holder Name"
//               keyboardType="numeric"
//             />
//           </View>
//           <View
//             style={{
//               flexDirection: 'row',
//               alignSelf:'center'
//             }}>
//                <View
//             style={{
//               width: '40%',
//               backgroundColor: Colors.white,
//               alignItems: 'center',
//               alignSelf: 'center',
//               padding: 10,
//               borderRadius: 10,
//               flexDirection: 'row',
//               paddingVertical: 12,
//               marginTop: 15,
//               marginRight:22
//             }}>
//             <Image
//               source={Icons.date}
//               resizeMode="contain"
//               style={{width: 20, height: 20}}
//             />
//             <TextInput
//               style={{width: '80%', marginLeft: 10}}
//               onChangeText={onChangeNumber}
//               placeholder="Expiry Date"
//               keyboardType="numeric"
//             />
//           </View>
//           <View
//             style={{
//               width: '40%',
//               backgroundColor: Colors.white,
//               alignItems: 'center',
//               alignSelf: 'center',
//               padding: 10,
//               borderRadius: 10,
//               flexDirection: 'row',
//               paddingVertical: 12,
//               marginTop: 15,
//             }}>
//             <Image
//               source={Icons.lock}
//               resizeMode="contain"
//               style={{width: 20, height: 20}}
//             />
//             <TextInput
//               style={{width: '80%', marginLeft: 10}}
//               onChangeText={onChangeNumber}
//               placeholder="CVV"
//               keyboardType="numeric"
//             />
//           </View>
//             </View>
//           <CustomButton
//             title="Pay"
//             buttonStyle={{
//               alignSelf: 'center',
//             }}
//             textStyle={{
//               fontWeight: '600',
//             }}
//           />
//         </View>
//       </View>
//     </AppBackground>
//   );
// };

// export default CardDetails;
