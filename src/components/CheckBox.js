import React from 'react';
import {TouchableOpacity, Image, LayoutAnimation} from 'react-native';
import Icons from '../assets/Icons';
import {Colors} from '../config';
import RNBounceable from "@freakycoder/react-native-bounceable";

const Checkbox = ({isChecked, onPress = ()=>{}, borderColor = Colors.primary}) => {
  return (
    <RNBounceable
      activeOpacity={0.8}
      onPress={() => {
        LayoutAnimation.linear();
        onPress();
      }}
      style={{
        height: 20,
        width: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {isChecked && (
        <Image
          source={Icons.check}
          style={{width: 15, height: 15, resizeMode: 'contain', tintColor:Colors.black}}
        />
      )}
    </RNBounceable>
  );
};
export default Checkbox;
