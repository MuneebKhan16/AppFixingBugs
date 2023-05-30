/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import FastImage from 'react-native-fast-image';
import {Colors} from '../config';
import Icons from '../assets/Icons';
import ImageURL from '../config/Common';
import {themes} from '../config/globalFonts/globalFonts';

const {width, height} = Dimensions.get('screen');

const Posts = ({UserPost, profile_Data, deleteCurrentEvent}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imageFullScreen, setImageFullScreen] = useState('');

  const ConvertTimeStamp = date => {
    const data = new Date(date);
    const hours = data.getHours();
    const readable = hours + ' ' + 'Hours' + ' ' + 'ago';
    return readable;
  };
  const handleDelete = data => {
    const rating_id = data?.id;
    console.log('data', data);
    deleteCurrentEvent(rating_id);
  };
  const handleImagePress = image => {
    setImageFullScreen(image);
    setIsFullScreen(!isFullScreen);
  };
  const images = [
    {
      // Simplest usage.
      url: `${ImageURL?.ImageURL}${imageFullScreen}`,
    },
  ];
  return UserPost && UserPost.length > 0 ? (
    <>
      {UserPost.map(data => {
        if (data?.user?.id === profile_Data?.id) {
          return (
            <View style={styles.maincontent}>
              <View style={styles.maincontainer}>
                <Image
                  source={{
                    uri: `${ImageURL?.ImageURL}${data?.user?.profile_picture}`,
                  }}
                  style={styles.container}
                  resizeMode="cover"
                />
                <View style={{marginLeft: 10}}>
                  <Text style={styles.name}>{data.user.name}</Text>
                  <StarRating
                    fullStar={Icons.starFilled}
                    emptyStar={Icons.starEmpty}
                    starSize={14}
                    disabled={true}
                    maxStars={5}
                    rating={data.rating}
                  />
                </View>
                <Text style={styles.date}>
                  {ConvertTimeStamp(data.created_at)}
                </Text>
              </View>
              <View style={{marginTop: 10}}>
                <TouchableWithoutFeedback
                  onPress={() => handleImagePress(data?.rating_image)}>
                  <FastImage
                    source={{uri: `${ImageURL?.ImageURL}${data?.rating_image}`}}
                    resizeMode="stretch"
                    style={styles.img}
                  />
                </TouchableWithoutFeedback>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                    alignItems: 'center',
                  }}>
                  <Text style={styles.tags}>{data.tags}</Text>
                  <TouchableOpacity
                    hitSlop={10}
                    onPress={() => handleDelete(data)}
                    activeOpacity={0.8}>
                    <Image
                      source={Icons.delete}
                      resizeMode="contain"
                      style={{width: 20, height: 20, tintColor: Colors.purple}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }
      })}
      <Modal
        isVisible={isFullScreen}
        onBackdropPress={handleImagePress}
        onBackButtonPress={handleImagePress}>
        <View style={{flex: 0.5, position: 'relative'}}>
          <ImageViewer
            imageUrls={images}
            renderIndicator={(currentIndex, allSize) => null}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsFullScreen(false)}
            style={{
              position: 'absolute',
              top: height * -0.01,
              right: -5,
            }}>
            <AntDesign name={'closecircle'} size={30} color={Colors.purple} />
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  ) : (
    <View style={styles.container1}>
      <Text style={styles.txtheadersty}>No User Data Available</Text>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 6,
  },
  container: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.purple,
  },
  name: {
    color: Colors.black,
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.black,
    textTransform: 'capitalize',
  },
  date: {
    position: 'absolute',
    right: 0,
    color: Colors.black,
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.regular,
    marginRight: 10,
  },
  img: {
    marginTop: 10,
    height: 180,
    borderRadius: 10,
    width: '98%',
    marginLeft: 5,
    borderWidth: 2,
    borderColor: Colors.purple,
  },
  tags: {
    fontSize: themes?.fontSize?.regular,
    fontFamily: themes?.font?.black,
    color: '#000',
    marginLeft: 12,
    marginTop: 10,

    textTransform: 'capitalize',
  },
  maincontent: {
    borderTopWidth: 0.8,
    borderTopColor: Colors.grey,
    marginTop: 10,
  },
  container1: {
    paddingTop: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  txtheadersty: {
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.italic,
    color: 'grey',
  },
});
