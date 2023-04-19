import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Post } from '../config/Dummydata/Dummydata';
import { Colors } from '../config';
import StarRating from 'react-native-star-rating';
import Icons from '../assets/Icons';
const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`
const Posts = ({ UserPost, event_id }) => {
  const [starCount, setStarCount] = useState(1);

  const ConvertTimeStamp = (date) => {
    const data = new Date(date);
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const readable = hours + " " + "Hours" + ':' + minutes + " " + "Minutes" + " " + "ago";
    return readable;
  }

  console.log("UserPost123", UserPost, event_id)
  return (


    UserPost && UserPost.length > 0 ?
      (
        UserPost.map((data) => {
          if (data?.event_id === event_id) {
            return (
              <View
                style={styles.mainprofile}>
                <View
                  style={styles.container}>
                  <Image
                    source={{ uri: `${BaseUrl}${data.user.profile_picture}` }}
                    style={styles.pic}
                    resizeMode="center"
                  />
                  <View>
                    <Text
                      style={styles.name}>
                      {data.user.name}
                    </Text>
                    <View style={{ marginLeft: 10 }}>

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
                  </View>
                  <Text
                    style={styles.time}>
                    {ConvertTimeStamp(data.created_at)}
                  </Text>
                </View>
                <Image
                  source={{ uri: `${BaseUrl}${data.rating_image}` }}
                  resizeMode="stretch"
                  style={styles.rating}
                />

                <Text
                  style={styles.tags}>
                  {"#" + " " + data.tags}
                </Text>
              </View>
            )
          }
        })
      )
      :
      (
        <View><Text> No Data coming</Text></View>
      )

  )
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
    marginBottom: 10
  },
  pic: {
    height: 45,
    width: 45,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.purple
  },
  time: {
    position: 'absolute',
    right: 0,
    color: Colors.black,
    fontWeight: '700',
    fontFamily: 'serif'
  },
  name: {
    color: Colors.black,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'serif',

  },
  rating: {
    width: '100%',
    borderRadius: 20,
    marginTop: 10,
    height: 180,
  },
  tags: {
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 12,
    marginTop: 10,
    fontFamily: 'serif',
    fontSize: 16
  }
});
