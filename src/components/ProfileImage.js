import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';
import {Colors} from '../config';
import Icons from '../assets/Icons';

const ProfileImage = ({
  size = 150,
  imageUri,
  showAssetDeleteIcon = false,
  deleteIconPress = () => {},
  videoUri,
  name = ' ',
  style,
}) => {
  if (imageUri) {
    return (
      <View style={{position: 'relative'}}>
        <Image
          source={{uri: imageUri}}
          style={[
            {
              width: 300,
              height: size,
              resizeMode: 'cover',
              borderRadius: 10,
              borderColor: Colors.purple,
              borderWidth: 3,
              alignSelf: 'center',
            },
            style,
          ]}
        />
        {/* {showAssetDeleteIcon && (
          <TouchableOpacity activeOpacity={0.8} onPress={deleteIconPress}>
            <Image
              source={Icons.subtract}
              style={{
                height: 30,
                width: 30,
                backgroundColor: 'red',
                position: 'absolute',
                top: 10,
              }}
            />
          </TouchableOpacity>
        )} */}
      </View>
    );
  } else if (videoUri) {
    return (
      <View
        style={[
          {
            width: 300,
            height: size,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: Colors.purple,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          },
          style,
        ]}>
        <Video
          source={{uri: videoUri}}
          volume={0}
          style={{
            width: 300,
            height: size,
            borderRadius: 10,
          }}
          resizeMode="cover"
          // controls={true}
        />
        {/* {showAssetDeleteIcon && (
          <TouchableOpacity activeOpacity={0.8} onPress={deleteIconPress}>
            <Image source={Icons.subtract} style={{height: 30, width: 30}} />
          </TouchableOpacity>
        )} */}
      </View>
    );
  } else {
    return (
      <View
        style={[
          {
            width: 300,
            height: size,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: Colors.purple,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          },
          style,
        ]}></View>
    );
  }
};

export default ProfileImage;

// const ProfileImage = ({size = 150, imageUri, name = ' ', style}) => {
//   if (imageUri)
//     return (
//       <Image
//         source={{uri: imageUri}}
//         style={[
//           {
//             width: 300,
//             height: size,
//             resizeMode: 'cover',
//             borderRadius:10,
//             borderColor:Colors.purple,
//             borderWidth:3,
//             alignSelf:"center",

//           },
//           style,
//         ]}
//       />
//     );
//   return (
//     <View
//       style={[
//         {
//           width: 300,
//           height: size,
//           borderRadius: 10,
//           borderWidth:3,
//           borderColor: Colors.purple,
//           alignItems: 'center',
//           justifyContent: 'center',
//           alignSelf:"center"
//         },
//         style,
//       ]}>
//     </View>
//   );
// };
