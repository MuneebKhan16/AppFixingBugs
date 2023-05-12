/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { Colors, NavService } from '../config';
import Icons from '../assets/Icons';
import StarRating from 'react-native-star-rating';
import { useSelector } from 'react-redux';
import { backgroundUpload } from 'react-native-compressor';
import eventContext from '../containers/EventScreens/eventContext';
const Mainprofile = props => {
  const profile_Data = useSelector((state) => state.reducer.user);
  const { userProfile } = useContext(eventContext);

  console.log('userProfile', userProfile)
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
            source={{ uri: userProfile?.profile_picture ? `${BaseUrl}${userProfile?.profile_picture}` : "https://picsum.photos/200/300" }}
            resizeMode='center'
            style={styles.pic}
          />
        </View>
      ) : (
        <View style={{ marginBottom: 10, }}>
          <Image
            source={{ uri: userProfile?.profile_picture ? `${BaseUrl}${userProfile?.profile_picture}` : "https://picsum.photos/200/300" }}
            style={{
              width: inc ? 50 : 75,
              height: inc ? 50 : 75,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: Colors.purple,
              marginBottom: 10,

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
        }}>
        <Text
          style={{
            fontSize: txt ? 18 : 19,
            fontWeight: '700',
            color: Colors.black,
            textAlign: row ? null : 'center',
            textTransform: 'capitalize',

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

            }}>
            {props?.subtitle}
          </Text>
        )}
      </View>
      {inc ? (
        <View
          style={styles.mark}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18 }}>
            <Image
              source={Icons.marker}
              resizeMode="center"
              style={styles.marker}
            />
            <Text style={styles.location} numberOfLines={1} >
              {props.location}
            </Text>
          </View>
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
    borderWidth: 2,
    borderColor: Colors.purple,


  },
  profilepic: {
    padding: 12,
    alignItems: 'center',
    width: 25,
    height: 25,
    justifyContent: 'center',
    borderRadius: 40,
    top: -30,
    left: 47,
    backgroundColor: Colors.purple

  },
  edit: {
    width: 12,
    height: 12,
    resizeMode: 'contain',

  },
  mark: {
    flexDirection: 'row',
    right: 0,
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',


  },
  marker: { width: 30, height: 30, },
  location: { fontSize: 14, color: Colors.black, fontWeight: '600', ellipsizeMode: 'middle', maxWidth: 150 },
});