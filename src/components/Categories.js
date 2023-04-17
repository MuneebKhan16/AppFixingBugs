import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../config';
const { width } = Dimensions.get('window');
import RNBounceable from '@freakycoder/react-native-bounceable';
import Icons from '../assets/Icons';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';
import Images from '../assets/Images';
const Categories = props => {
   const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
   const { category, image, onPress, name,info } = props;

  return (
    <RNBounceable
      onPress={onPress}
      bounceEffect={0.8}
      bounceFriction={8}
      activeOpacity={0.3}
      style={{
        marginHorizontal: 28,
      }}
      >
 <ImageBackground
              source={Images.background1}
              style={{
                height: 160,
                borderRadius: 20,
                shadowColor: '#000',
                shadowOffset: { height: 3, width: 3 },
                shadowOpacity: 0.8,
                shadowRadius: 0.5,
                marginTop:15

              }}
              imageStyle={{ borderRadius: 10 }}>
   <Modal
                isVisible={isModalVisible}
              >
                <View style={{ backgroundColor: Colors.purple, borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center', paddingTop: 10 }}>
                  <Text style={{ fontSize: 25, color: Colors.white, fontWeight: 'bold' }}>𝓬𝓪𝓽𝓮𝓰𝓸𝓻𝔂</Text>
                </View>
                <View style={{ backgroundColor: Colors.purple, paddingHorizontal: 8, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, height: 200, alignItems: 'center', justifyContent: 'center' }}>
                  <View>
                    <Text style={{ color: Colors.white, fontWeight: '700', fontSize: 16 }}>mas</Text>
                  </View>

                </View>
                <CustomButton
                  buttonStyle={{
                    alignSelf: 'center',
                    marginTop: 50
                  }}
                  title="Close"
                  onPress={toggleModal}
                />
              </Modal>
              <TouchableOpacity
                onPress={toggleModal}
                activeOpacity={0.5}
                style={{
                  width: 38,
                  height: 38,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  position: 'absolute',
                  right: 5,
                }} >
<View>
<Image
                  source={Icons.privacyPolicy}
                  style={{
                    width: 22,
                    height: 22,
                    resizeMode: 'contain',
                  }}
                />
</View>
             
                         
              </TouchableOpacity>
                  <Text
                style={{
                  color: Colors.white,
                  position: 'absolute',
                  bottom: 5,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
               scrable
              </Text>
</ImageBackground>
        </RNBounceable>
  );
};

export default Categories;

const styles = StyleSheet.create({});


// const Categories = props => {
//   const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`

//  const handlechanged = () => {
//     props.categories.map((data) => console.log("hhhh",data))
//   }
 


//   return (
//    
//         {
//           props.categories.map((data) => {
//             return(
//            
//            
//             </ImageBackground>
//             )
//           })
//         }
//     </RNBounceable>

//   );
// };

// export default Categories;

// const styles = StyleSheet.create({});


