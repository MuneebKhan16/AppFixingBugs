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
        marginTop: 20,
      }}>
      {top ? (
        <View style={styles.container}>
        <Image
          source={{ uri : `${BaseUrl}${profile_Data?.profile_picture}`}}
          resizeMode='center'
          style={styles.pic}
        />
        </View>
      ) : (
        <View>
          <Image
           source={{ uri : `${BaseUrl}${profile_Data?.profile_picture}`}}
            style={{
              width: inc ? 50 : 80,
              height: inc ? 50 : 80,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: Colors.purple,
            }}
          />
          {edit ? (
            <TouchableOpacity
              onPress={() => NavService.navigate('EditProfile')}
              style={styles.profilepic}>
              <Image
                source={Icons.edit}
                style={styles.edit}
              />
            </TouchableOpacity>
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
            fontSize: txt ? 20 : 17,
            fontWeight: 'bold',
            color: Colors.black,
            fontFamily: 'serif'
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
              fontSize: size ? 18 : 17,
              color: Colors.black,
              fontWeight:'700',
              fontFamily: 'serif'
            }}>
            {props?.subtitle}
          </Text>
        )}
      </View>
      {inc ? (
        <View
          style={styles.mark}>
          <Image
            source={Icons.marker}
            resizeMode="center"
            style={styles.marker}
          />
          <Text style={styles.location}>
            {props.location}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default Mainprofile;

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    width: 80,
    height: 80,
    justifyContent: 'center',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.purple,
  },
  pic:{
    width: 75,
    height: 75,
    borderRadius:40 
  },
  profilepic:{
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
  },
  edit:{
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  mark:{
    
    flexDirection: 'row',
    right: 8,
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    
  },
  marker:{ width: 30, height: 30,  },
  location:{ fontSize: 16, color: Colors.black, fontFamily: 'serif',fontWeight:'600' }
});