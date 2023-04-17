import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Images from '../assets/Images';
import { Colors, NavService } from '../config';
import Icons from '../assets/Icons';
import StarRating from 'react-native-star-rating';
import { useSelector } from 'react-redux';
import RNBounceable from '@freakycoder/react-native-bounceable';

const Mainprofile = props => {
  const profile_Data = useSelector((state) => state.reducer.user);
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`
  const [starCount, setStarCount] = React.useState(1);
  const { name, subtitle, center, row, top, star, edit, inc, size, txt,location } = props;
  console.log("jjjjj",starCount)
  return (
    <View
      style={{
        alignItems: center ? 'center' : null,
        flexDirection: row ? 'row' : null,
        marginLeft: 5,
        marginTop: 25,
      }}>
      {top ? (
        <View style={{
          alignItems: 'center',
          width: 80,
          height: 80,
          justifyContent: 'center',
          borderRadius: 40,
          borderWidth: 2,
          borderColor: Colors.purple,

        }}>
        <Image
          source={{ uri : `${BaseUrl}${profile_Data?.profile_picture}`}}
          resizeMode='center'
          style={{
            width: 75,
            height: 75,
            borderRadius:40
           
          }}
        />
        </View>
      ) : (
        <View>
          <Image
           source={{ uri : `${BaseUrl}${profile_Data?.profile_picture}`}}
            style={{
              width: inc ? 50 : 100,
              height: inc ? 50 : 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: Colors.purple,
            }}
          />
          {edit ? (
            <RNBounceable
              onPress={() => NavService.navigate('EditProfile')}
              style={{
                backgroundColor: Colors.purple,
                padding: 8,
                alignItems: 'center',
                bottom: 5,
                position: 'absolute',
                right: 0,
                width: 30,
                height: 30,
                justifyContent: 'center',
                borderRadius: 40,
              }}>
              <Image
                source={Icons.edit}
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: 'contain',
                }}
              />
            </RNBounceable>
          ) : null}
        </View>
      )}
      <View
        style={{
          marginLeft: row ? 10 : null,
          marginTop: top ? 10 : null,
        }}>
        <Text
          style={{
            textAlign: txt ? 'center' : null,
            fontSize: txt ? 18 : 16,
            fontWeight: '700',
            color: Colors.black,
          }}>
          {props?.name}
        </Text>
        {star ? (
          <StarRating
            fullStar={Icons.starFilled}
            // halfStar={Icons.star_half}
            emptyStar={Icons.starEmpty}
            starSize={14}
            disabled={false}
            maxStars={5}
            rating={starCount}
            selectedStar={rating => setStarCount(rating)}
          />
        ) : (
          <Text
            style={{
              fontSize: size ? 14 : 18,
              color: Colors.black,
            }}>
            {props?.subtitle}
          </Text>
        )}
      </View>
      {inc ? (
        <View
          style={{
            flexDirection: 'row',
            right: 4,
            height: 50,
            alignItems: 'center',
            borderRadius: 10,
            position: 'absolute',
          }}>
          <Image
            source={Icons.marker}
            resizeMode="center"
            style={{ width: 25, height: 30, right: 5 }}
          />
          <Text style={{ fontSize: 18, color: Colors.black }}>
            {props.location}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Mainprofile;

const styles = StyleSheet.create({});