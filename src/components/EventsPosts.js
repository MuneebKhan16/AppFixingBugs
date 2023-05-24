/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback, ScrollView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Modal from 'react-native-modal';
import { Post } from '../config/Dummydata/Dummydata';
import { Colors } from '../config';
import StarRating from 'react-native-star-rating';
import Icons from '../assets/Icons';
import ImageURL from '../config//Common';
import FastImage from 'react-native-fast-image';
import { themes } from '../config/globalFonts/globalFonts';
import VideoPlayer from '../components/VideoPlayer';

// check
const { width, height } = Dimensions.get('screen');
const Posts = props => {
  const { datas } = props;
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [starCount, setStarCount] = useState(1);
  // const [isFullScreen, setIsFullScreen] = useState(false);

  // const handleImagePress = () => {
  //   setIsFullScreen(true);
  // };

  // const handleCloseModal = () => {
  //   setIsFullScreen(false);
  // };

  const ConvertTimeStamp = date => {
    const start = new Date(date);
    const now = new Date();
    const timeDiff = now.getTime() - start.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    const durationString = `${hoursDiff.toFixed(0)} hours ago`;
    return durationString;
  };
  const toggleVideoPopup = () => {
    setShowVideoPopup(!showVideoPopup);
  };
  return (
    <View>
      {datas?.length > 0 ? (
        datas.map((data, index) => {
          return (
            <View style={styles.mainprofile}>
              <View style={styles.container}>
                <Image
                  source={{
                    uri: `${ImageURL?.ImageURL}${data?.user?.profile_picture}`,
                  }}
                  style={styles.pic}
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.name} numberOfLines={1}>
                    {data?.user?.name}

                  </Text>
                  <View style={{ marginLeft: 10 }}>
                    <StarRating
                      fullStar={Icons.starFilled}
                      // halfStar={Icons.star_half}
                      emptyStar={Icons.starEmpty}
                      starSize={14}
                      disabled={true}
                      maxStars={5}
                      rating={data?.rating}
                      selectedStar={rating => setStarCount(rating)}
                    />
                  </View>
                </View>
                <Text style={styles.time}>
                  {ConvertTimeStamp(data?.created_at)}
                </Text>
              </View>
              {data?.rating_image?.split('.')[1] == 'mp4' ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    setVideoUrl(data?.rating_image);
                    toggleVideoPopup();
                  }}>
                  <FastImage
                    source={{
                      uri: `${ImageURL?.ImageURL}${data?.rating_image}`,
                    }}
                    style={{
                      backgroundColor: 'grey',
                      position: 'relative',
                      width: width * 0.9,
                      height: height * 0.2,
                      borderRadius: 15,
                    }}
                    imageStyle={styles.img}>
                    <Image
                      source={Icons.playIcon}
                      resizeMode="contain"
                      style={{
                        width: width * 0.1,
                        height: height * 0.05,
                        position: 'absolute',
                        top: height * 0.07,
                        left: width * 0.39,
                        tintColor: Colors.white,
                      }}
                    />
                  </FastImage>
                </TouchableOpacity>
              ) : (
                // <TouchableWithoutFeedback onPress={handleImagePress}>
                <FastImage
                  source={{
                    uri: `${ImageURL?.ImageURL}${data?.rating_image}`,
                    priority: FastImage.priority.normal,
                  }}

                  style={styles.rating}
                  resizeMode="cover"
                />
                // </TouchableWithoutFeedback>
              )}
              {/* <Image
                    source={{ uri: `${ImageURL?.ImageURL}${data.rating_image}` }}
                    resizeMode="stretch"
                    style={styles.rating}
                  /> */}
              {/* <Modal visible={isFullScreen} onRequestClose={handleCloseModal}>
                <ScrollView>
                  <FastImage
                    source={{
                      uri: `${ImageURL?.ImageURL}${data?.rating_image}`,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode="cover"
                    style={{
                      marginTop: 10,
                      height: 450,
                      borderRadius: 10,
                      width: '98%',
                      marginLeft: 5,
                      borderWidth: 2,
                      borderColor: Colors.purple,
                    }}
                  />
                  <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <TouchableWithoutFeedback onPress={handleCloseModal}>
                      <Text style={{ fontSize: 16, color: Colors.purple, fontWeight: 'bold' }}>Close</Text>
                    </TouchableWithoutFeedback>
                  </View>
                </ScrollView>
              </Modal> */}
              <Text style={styles.tags}>{data?.tags}</Text>
            </View>
          );
        })
      ) : (
        <View style={styles.container1}>
          <Text style={styles.txtheadersty}>No Reviews Found</Text>
        </View>
      )}
      <Modal
        isVisible={showVideoPopup}
        onBackButtonPress={toggleVideoPopup}
        onBackdropPress={toggleVideoPopup}>
        <View
          style={{
            borderRadius: 15,
            backgroundColor: Colors.white,
            padding: 20,
            height: height * 0.3,
            width: width * 0.9,
          }}>
          <VideoPlayer
            // video={`https://api.myprojectstaging.com/outsideee/public/images/events/rating-8631684431404.mp4`}
            video={`${ImageURL?.ImageURL}${videoUrl}`}
            style={{
              width: width * 0.8,
              height: height * 0.3,
            }}
            // mediaPlaybackRequiresUserAction={true}
            // allowsInlineMediaPlayback={true}
            javaScriptEnabled={true}
            allowsFullscreenVideo={true}
            domStorageEnabled={true}
            injectedJavaScript={`
                                 document.getElementsByTagName("video")[0].removeAttribute("autoplay");
                                 document.getElementsByTagName("video")[0].style.objectFit = "cover";
                                 document.getElementsByTagName("video")[0].style.width = "100%";
                                 document.getElementsByTagName("video")[0].style.height = "100%";
                             `}
          // allowFileAccess={false}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  mainprofile: {
    borderTopWidth: 0.8,
    borderTopColor: Colors.grey,
    marginTop: 10,
  },
  container: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  pic: {
    height: 45,
    width: 45,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: Colors.purple,
  },
  time: {
    position: 'absolute',
    right: 0,
    color: Colors.black,
    textTransform: 'capitalize',
    fontSize: themes?.fontSize?.extraSmall,
    fontFamily: themes?.font?.regular,
  },
  name: {
    color: Colors.black,
    fontSize: themes?.fontSize?.medium,
    fontFamily: themes?.font?.black,
    marginLeft: 10,
    textTransform: 'capitalize',

  },
  rating: {
    width: '100%',
    borderRadius: 20,
    marginTop: 10,
    height: 180,
    borderWidth: 2,
    borderColor: Colors.purple,
  },
  tags: {
    fontSize: themes?.fontSize?.small,
    fontFamily: themes?.font?.black,
    color: '#000',
    marginLeft: 12,
    marginTop: 10,
    fontSize: 16,
  },
  container1: {
    paddingTop: 100,
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
