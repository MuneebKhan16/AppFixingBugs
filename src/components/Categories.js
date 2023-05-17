/* eslint-disable prettier/prettier */
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../config';
import ImageURL from '../config/Common';
const { width } = Dimensions.get('window');
import Icons from '../assets/Icons';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';
import Images from '../assets/Images';

const Categories = props => {
  const { categories } = props;
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const { category, image, onPress, name, info, title } = props;
  return (

    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.3}
      style={styles.touchable}>

      <ImageBackground
        resizeMode='cover'
        // source={Images.grid}
        source={{ uri: `${ImageURL?.ImageURL}${categories?.category_image}` }}
        style={styles.imgbg}
        imageStyle={styles.bg}>
        {isModalVisible && <View style={styles.overlay} />}
        <TouchableOpacity
          onPress={toggleModal}
          activeOpacity={0.5}
          style={styles.icon}>
          <View>
            <Image source={Icons.privacyPolicy} style={styles.policy} onPress={onPress} />
          </View>
        </TouchableOpacity>
        {isModalVisible && <View style={styles.popup}>
          <Text style={{ color: '#000000', }}>{categories?.title}</Text>
          <Text style={{ color: '#000000' }}>{categories?.category_info}</Text>

        </View>}
        {/* <Modal isVisible={isModalVisible}>
          <View style={styles.modal}>
            <Text style={styles.title}>{categories?.title}</Text>
          </View>
          <View style={styles.category}>
            <View>
              <Text style={styles.detail}>{categories?.category_info}</Text>
            </View>
          </View>
          <CustomButton
            buttonStyle={styles.mdlbtn}
            title="Close"
            onPress={toggleModal}
          />
        </Modal> */}

        {/* <Text style={styles.ctg}>{categories?.title}</Text> */}
      </ImageBackground>
    </TouchableOpacity>

  );
};

export default React.memo(Categories);

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 20,
    height: 400,
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.purple,
    
  },
  imgbg: {
    borderRadius: 10,
    shadowColor: '#000',
    flex: 1,

    
 },
  bg: { borderRadius: 10 },
  title: { fontSize: 18, color: Colors.white, fontWeight: 'bold', textTransform: 'capitalize', },
  modal: {
    backgroundColor: Colors.purple,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    paddingTop: 10,
  },
  category: {
    backgroundColor: Colors.purple,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detail: { color: Colors.white, fontWeight: '700', fontSize: 16, textTransform: 'capitalize', },
  mdlbtn: {
    alignSelf: 'center',
    marginTop: 50,
  },
  icon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    right: 5,
  },
  policy: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  ctg: {
    color: Colors.white,
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'capitalize',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, ' + 0.4 + ')', flex: 1,
    borderRadius: 12,
    // marginTop: 8,
    // marginBottom: 8,
    height: 400,
    paddingRight: 10,
    width: width * 0.89
  },
  popup: {
    backgroundColor: '#ffff',
    position: 'absolute',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    maxWidth: 220,
    top: 35,
    right: 35
  }
});
