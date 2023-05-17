import React from 'react';
import { Dimensions, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Shadows } from '../config';
const { width } = Dimensions.get('screen');
import Icons from '../assets/Icons';
import LinearGradient from 'react-native-linear-gradient';
import RNBounceable from "@freakycoder/react-native-bounceable";
import { themes } from '../config/globalFonts/globalFonts';

export default function CustomButton(props) {
  const { color, title, onPress, buttonStyle, textStyle, disabled, nextBtn } =
    props;
  return (
    <RNBounceable
      bounceVelocityIn={2}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={['#4B0082', '#260041']}
        style={[
          {
            width: width - 70,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '5%',
            borderRadius: 10,
            ...Shadows.shadow5,
            flexDirection: 'row',


          },
          buttonStyle,
        ]}
      >
        <Text style={[{
          fontSize: themes?.fontSize?.large,
          fontFamily: themes?.font?.black, color: Colors.white,  textTransform: 'capitalize',
        }, textStyle]}>
          {title}
        </Text>
        {nextBtn && (
          <Image
            resizeMode="contain"
            source={Icons.next}
            style={{
              height: 22,
              width: 22,
              marginLeft: '4%',
            }}
          />
        )}
      </LinearGradient>
    </RNBounceable>
  );
}

const styles = StyleSheet.create({})