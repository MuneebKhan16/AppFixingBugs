import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native';
import React,{useEffect} from 'react';
import CustomBackground from '../../../components/CustomBackground';
import CustomCards from '../../../components/CustomCards';
import AppBackground from '../../../components/AppBackground';
import Images from '../../../assets/Images';
import {ColorSpace} from 'react-native-reanimated';
import {Colors} from 'react-native-paper';
import {NavService} from '../../../config';
import RNBounceable from "@freakycoder/react-native-bounceable";
import { useSelector } from 'react-redux'
const FadeInView = props => {
  const anim = new Animated.Value(0);
  const duration = 2000;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: 15,
        duration: duration,
        useNativeDriver: true,
      }),
    ).start();
    setTimeout(
      () =>
       anim.stopAnimation(({ Value }) =>
          console.log("Final Value: " + Value)
        ),
      2000
    );
  }, []);
  return (
    <View style={{
    }}>

    <Animated.View
      style={{
       
        ...props.style,
        transform: [{translateY: anim}],
      }}>
      {props.children}
    </Animated.View>
    </View>
  );
};
const FadeInViews = props => {
  const anim = new Animated.Value(0);
  const duration = 2000;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anim, {
        toValue: -15,
        duration: duration,
        useNativeDriver: true,
      }),
    ).start();
    setTimeout(
      () =>
       anim.stopAnimation(({ Value }) =>
          console.log("Final Value: " + Value)
        ),
      2000
    );
  }, []);
  return (
    <View style={{
    }}>

    <Animated.View
      style={{
       
        ...props.style,
        transform: [{translateY: anim}],
      }}>
      {props.children}
    </Animated.View>
    </View>
  );
};

const index = () => {
  useSelector((state) => console.log(state));
  
  return (
    <AppBackground back={false} profile={false} title={'User Selection'}>
      <View
          style={{
            justifyContent: 'center',
            flex:1,
          }}>
      <FadeInView>
      <RNBounceable
        style={{
          marginHorizontal: 10,
        }}
        onPress={() => NavService.navigate('ScreenStack')}>
        <ImageBackground
          source={Images.background3}
          style={{
            height: 150,
            borderRadius: 20,
          }}
          imageStyle={{borderRadius: 10}}>
          <Text style={styles.txt}>Going Outsideee</Text>
        </ImageBackground>
      </RNBounceable>
      </FadeInView>
      <FadeInViews>

      <RNBounceable onPress={() => NavService.navigate('EventScreenStack') }  activeOpacity={0.3}
            style={{
              marginHorizontal: 10,
              marginTop:40
             
            }}>
        <ImageBackground
          source={Images.background1}
          style={{
            height: 150,
            borderRadius: 20,
            
          }}  imageStyle={{borderRadius: 10}}>
          <Text style={styles.txt}>Host Outsideee</Text>
        </ImageBackground>
      </RNBounceable>
      {/* </View> */}
      </FadeInViews>
      </View>
    </AppBackground>
  );
};

export default index;

const styles = StyleSheet.create({
  txt: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    marginTop: 60,
  },
});
