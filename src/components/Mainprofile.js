import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors, NavService } from '../config';
import Icons from '../assets/Icons';
import StarRating from 'react-native-star-rating';
import { useSelector } from 'react-redux';

const Mainprofile = props => {
  const profile_Data = useSelector((state) => state.reducer.user);
  const BaseUrl = `https://api.myprojectstaging.com/outsideee/public/`
  const [starCount, setStarCount] = React.useState(1);
  const { name, subtitle, center, row, top, star, edit, inc, size, txt, location } = props;
  return (
    <View
      style={{
        alignItems: center ? 'center' : null,
        flexDirection: row ? 'row' : null,
        marginLeft: 5,
        marginTop: 15
      }}>
      {top ? (
        <View style={styles.container}>
          <Image
            source={{ uri: `${BaseUrl}${profile_Data?.profile_picture}` }}
            resizeMode='center'
            style={styles.pic}
          />
        </View>
      ) : (
        <View  style={styles.subimg}>
          <Image
            source={{ uri: `${BaseUrl}${profile_Data?.profile_picture}` }}
            style={{
              width: inc ? 50 : 75,
              height: inc ? 50 : 75,
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
          marginBottom: row ? 15 : null
        }}>
        <Text
          style={{
            fontSize: txt ? 20 : 17,
            fontWeight: '700',
            color: Colors.black,
            
            textAlign: row ? null : 'center',
            textTransform: 'capitalize',
            marginTop: 10
          }}>
          {props?.name}
        </Text>
        {star ? (
          <StarRating
            fullStar={Icons.starFilled}
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
              color: Colors.darkGray,
              fontWeight: '400',
               textTransform: 'capitalize',

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
  container: {
    alignItems: 'center',
    width: 80,
    height: 80,
    justifyContent: 'center',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.purple,

  },
  pic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    
  },
  profilepic: {
    padding: 12,
    alignItems: 'center',
    width: 25,
    height: 25,
    justifyContent: 'center',
    borderRadius: 40,
    top: -28,
    left: 48,
    backgroundColor: Colors.purple

  },
  edit: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    
  },
  mark: {

    flexDirection: 'row',
    right: 8,
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',

  },
  marker: { width: 30, height: 30, },
  location: { fontSize: 16, color: Colors.black,  fontWeight: '600' },
  subimg:{height:80}
});