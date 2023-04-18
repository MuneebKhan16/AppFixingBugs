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
import Icons from '../assets/Icons';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';
import Images from '../assets/Images';
const Categories = (props) => {


  console.log('props',props)
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const { category, image, onPress, name, info ,title} = props;
  return (
    <TouchableOpacity
    onPress={onPress}
      activeOpacity={0.3}
      style={styles.touchable}
    >
      <ImageBackground
        source={Images.background1}
        style={styles.imgbg}
        imageStyle={styles.bg}>
             <TouchableOpacity
          onPress={toggleModal}
          activeOpacity={0.5}
          style={styles.icon} >
          <View>
            <Image
              source={Icons.privacyPolicy}
              style={styles.policy}
            />
          </View>


        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <Text style={styles.title}>{name}</Text> </View>
          <View style={styles.category}>
            <View>
              <Text style={styles.detail}>{info}</Text>
            </View>
          </View>
          <CustomButton
            buttonStyle={styles.mdlbtn}
            title="Close"
            onPress={toggleModal}
          />
        </Modal>
     
        <Text
          style={styles.ctg}>
         {title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Categories;

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 28,
  },
  imgbg: {
    height: 160,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 0.5,
    marginTop: 15
  },
  bg: { borderRadius: 10 },
  title: { fontSize: 18, color: Colors.white, fontWeight: 'bold' },
  modal: { backgroundColor: Colors.purple, borderTopLeftRadius: 10, borderTopRightRadius: 10, alignItems: 'center', paddingTop: 10 },
  category: { backgroundColor: Colors.purple, paddingHorizontal: 8, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, height: 200, alignItems: 'center', justifyContent: 'center' },
  detail: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  mdlbtn: {
    alignSelf: 'center',
    marginTop: 50
  },
  icon:{
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    right: 5,
  },
  policy:{
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  ctg:{
    color: Colors.white,
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  }
});




