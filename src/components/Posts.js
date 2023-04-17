import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import React,{useState , useEffect} from 'react';
import { Post } from '../config/Dummydata/Dummydata';
import { Colors } from '../config';
import StarRating from 'react-native-star-rating';
import Icons from '../assets/Icons';
const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`
const Posts = ({UserPost,profile_Data}) => {
  const [starCount, setStarCount] = useState(1);
  
  const ConvertTimeStamp = (date) => {
    const data = new Date(date);
    const hours = data.getHours();
    const minutes = data.getMinutes();
    const readable = hours +" "+"Hours"+ ':' + minutes+" "+"Minutes" +" "+"ago";
    return readable;
  }
  return(


    UserPost && UserPost.length > 0 ? 
    (
      UserPost.map((data) => {
        if(data?.user?.id === profile_Data?.id){
          return(
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
                alignItems:'center',
                marginTop:10,
              }}>
              <Image
                source={{ uri : `${BaseUrl}${data.user.profile_picture}` }  }
                style={{
                  height: 50,
                  width: 45,
                  alignSelf: 'center',
                  borderRadius: 60,
                borderWidth:1,
                borderColor:Colors.purple

                }}
                resizeMode="center"
              />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    color: Colors.black,
                    fontWeight: '600',
                  }}>
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
                style={{
                  position: 'absolute',
                  right: 0,
                  color: Colors.black,
                  fontWeight: '600',
                  marginRight:10
                }}>
                {ConvertTimeStamp(data.created_at)}
              </Text>
            </View>
            <View style={{marginTop:10}}>

            <Image
              source={{ uri : `${BaseUrl}${data.rating_image}` }  }
              resizeMode="stretch"
              style={{
                marginTop: 10,
                height: 150,
                borderRadius:10
              }}
            />
        
            <Text
              style={{
                fontWeight: '700',
                color: '#000',
                marginLeft: 8,
                marginTop:10
              }}>
              {"#"+" "+data.tags}
            </Text>
            </View>
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
