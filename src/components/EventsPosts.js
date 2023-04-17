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
                style={{
                  borderTopWidth: 2,
                  borderTopColor: Colors.grey,
                  marginTop: 10,

                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    height: 45,
                    alignItems: 'center',
                    marginTop: 10,
                    marginRight: 10

                  }}>
                  <Image
                    source={{ uri: `${BaseUrl}${data.user.profile_picture}` }}
                    style={{
                      height: 50,
                      width: 45,
                      borderWidth:1,
                      borderRadius:20,
                    }}
                    resizeMode="center"
                  />
                  <View style={{}}>
                    <Text
                      style={{
                        color: Colors.black,
                        fontWeight: '600',
                        marginLeft:10

                      }}>
                      {data.user.name}
                    </Text>
                    <View style={{ marginLeft:10}}>

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
                    style={{
                      position: 'absolute',
                      right: 0,
                      color: Colors.black,
                      fontWeight: '600',
                    }}>
                    {ConvertTimeStamp(data.created_at)}
                  </Text>
                </View>
                <Image
                  source={{ uri: `${BaseUrl}${data.rating_image}` }}
                  resizeMode="stretch"
                  style={{
                    width: '100%',
                    borderRadius: 20,
                    marginTop: 10,
                    height: 150,
                  }}
                />

                <Text
                  style={{
                    fontWeight: '700',
                    color: '#000',
                    marginLeft: 5,
                    marginTop: 10
                  }}>
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

const styles = StyleSheet.create({});
