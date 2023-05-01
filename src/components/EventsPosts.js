/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Post } from '../config/Dummydata/Dummydata';
import { Colors } from '../config';
import StarRating from 'react-native-star-rating';
import Icons from '../assets/Icons';
import ImageURL from '../config//Common'
// check
const Posts = (props) => {

  const { datas } = props



  const [starCount, setStarCount] = useState(1);

  const ConvertTimeStamp = (date) => {

    const start = new Date(date);
    const now = new Date();
    const timeDiff = now.getTime() - start.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    const durationString = `${hoursDiff.toFixed(0)} hours ago`;
    return durationString;
  }

  

  return (
    <View>
      {
        datas?.length > 0 ?
          (
            datas.map((data) => {
              return (
                <View
                  style={styles.mainprofile}>
                  <View
                    style={styles.container}>
                    <Image
                      source={{ uri: `${ImageURL?.ImageURL}${data?.user?.profile_picture}` }}
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
                    source={{ uri: `${ImageURL?.ImageURL}${data.rating_image}` }}
                    resizeMode="stretch"
                    style={styles.rating}
                  />

                  <Text
                    style={styles.tags}>
                    {"#" + " " + data.tags}
                  </Text>
                </View>
              )
            })
          ) :
          (
            <View style={styles.container1}>
              <Text style={styles.txtheadersty}>No Reviews Found</Text>  
            </View>
      )
      }
    </View>

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
    
    textTransform: 'capitalize',
  },
  name: {
    color: Colors.black,
    fontWeight: 'bold',
    marginLeft: 10,
    
    textTransform: 'capitalize',

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
    
    fontSize: 16,
    textTransform: 'capitalize',
  },
  container1:{paddingTop:100, justifyContent:'center',alignItems:'center',flex:1,},
  txtheadersty:{fontSize:25,fontWeight:'bold'}
});
