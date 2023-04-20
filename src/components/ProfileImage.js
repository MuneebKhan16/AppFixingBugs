import React from 'react';
import {Image, Text, View} from 'react-native';
import {Colors} from '../config';

const ProfileImage = ({size = 150, imageUri, name = ' ', style}) => {
  if (imageUri)
    return (
      <Image
        source={{uri: imageUri}}
        style={[
          {
            width: 300,
            height: size,
            resizeMode: 'cover',
            borderRadius:10,
            borderColor:Colors.purple,
            borderWidth:3,
            alignSelf:"center"
            
          },
          style,
        ]}
      />
    );
  return (
    <View
      style={[
        {
          width: 300,
          height: size,
          borderRadius: 10,
          borderWidth:3,
          borderColor: Colors.purple,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf:"center"
        },
        style,
      ]}>
      {/* <Text
        numberOfLines={1}
        style={{
          color: Colors.primary,
          fontSize: size * 0.75,
          fontWeight: '800',
          width: '100%',
          textAlign: 'center',
        }}>
        {name[0].toUpperCase()}
      </Text> */}
    </View>
  );
};

export default ProfileImage;
