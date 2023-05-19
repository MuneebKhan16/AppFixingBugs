/* eslint-disable prettier/prettier */
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Post} from '../config/Dummydata/Dummydata';
import {Colors} from '../config';
import StarRating from 'react-native-star-rating';
import Icons from '../assets/Icons';
import ImageURL from '../config/Common';
import FastImage from 'react-native-fast-image';
import {themes} from '../config/globalFonts/globalFonts';
const Posts = ({UserPost, profile_Data, deleteCurrentEvent}) => {
  const [starCount, setStarCount] = useState(1);

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
  return UserPost && UserPost.length > 0 ? (
    UserPost.map(data => {
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
                  selectedStar={rating => setStarCount(rating)}
                />
              </View>
              <Text style={styles.date}>
                {ConvertTimeStamp(data.created_at)}
              </Text>
            </View>
            <View style={{marginTop: 10}}>
              <FastImage
                source={{uri: `${ImageURL?.ImageURL}${data?.rating_image}`}}
                resizeMode="stretch"
                style={styles.img}
              />
              {/* <Image
                    source={{ uri: `${ImageURL?.ImageURL}${data?.rating_image}` }}
                    resizeMode="stretch"
                    style={styles.img}
                  /> */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Text style={styles.tags}>{'#' + ' ' + data.tags}</Text>
                <TouchableOpacity
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
    })
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
    fontWeight: 'bold',

    fontSize: 18,
    textTransform: 'capitalize',
  },
  date: {
    position: 'absolute',
    right: 0,
    color: Colors.black,
    fontWeight: 'bold',
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
    fontWeight: '700',
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
