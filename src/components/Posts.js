/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Post } from '../config/Dummydata/Dummydata';
import { Colors } from '../config';
import StarRating from 'react-native-star-rating';
import Icons from '../assets/Icons';
import  ImageURL  from '../config/Common'
const Posts = ({ UserPost, profile_Data }) => {
  const [starCount, setStarCount] = useState(1);

  const ConvertTimeStamp = (date) => {
    const data = new Date(date);
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const readable = hours + " " + "Hours" + ':' + minutes + " " + "Minutes" + " " + "ago";
    return readable;
  }
  return (


    UserPost && UserPost.length > 0 ?
      (
        UserPost.map((data) => {
          if (data?.user?.id === profile_Data?.id) {
            return (
              <View
                style={styles.maincontent}>
                <View
                  style={styles.maincontainer}>
                  <Image
                    source={{ uri: `${ImageURL?.ImageURL}${data?.user?.profile_picture}` }}
                    style={styles.container}
                    resizeMode="center"
                  />
                  <View style={{ marginLeft: 10 }}>
                    <Text
                      style={styles.name}>
                      {data.user.name}
                    </Text>
                    <StarRating
                      fullStar={Icons.starFilled}
                      // halfStar={Icons.star_half}
                      emptyStar={Icons.starEmpty}
                      starSize={14}
                      disabled={true}
                      maxStars={5}
                      rating={data.rating}
                      selectedStar={rating => setStarCount(rating)}
                    />
                  </View>
                  <Text
                    style={styles.date}>
                    {ConvertTimeStamp(data.created_at)}
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>

                  <Image
                    source={{ uri: `${ImageURL?.ImageURL}${data?.rating_image}` }}
                    resizeMode="stretch"
                    style={styles.img}
                  />

                  <Text
                    style={styles.tags}>
                    {"#" + " " + data.tags}
                  </Text>
                </View>
              </View>
            )
          }
        })
      )
      :
      (
        <View><Text>No Data coming</Text></View>
      )

  )
};

export default Posts;

const styles = StyleSheet.create({
  maincontainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 6
  },
  container: {
    height: 40,
    width: 45,
    alignSelf: 'center',
    borderRadius: 60,
    borderWidth: 2,
    borderColor: Colors.purple
  },
  name: {
    color: Colors.black,
    fontWeight: 'bold',
    fontFamily: 'serif',
    fontSize: 18
  },
  date: {
    position: 'absolute',
    right: 0,
    color: Colors.black,
    fontWeight: '600',
    marginRight: 10
  },
  img: {
    marginTop: 10,
    height: 180,
    borderRadius: 10,
    width:'98%',
    marginLeft:5
  },
  tags: {
    fontWeight: '700',
    color: '#000',
    marginLeft: 12,
    marginTop: 10,
    fontFamily: 'serif',
  },
  maincontent: {
    borderTopWidth: 2,
    borderTopColor: Colors.grey,
    marginTop: 10,
  }
});
